/* global wx */

// 初始化文件管理器、日志管理器
const fileManager = wx.getFileSystemManager(), logger = wx.getLogManager({ level: 1 });
const userPath = wx.env.USER_DATA_PATH,

  // 小程序配置
  appOption = {
    "theme": "auto",
    "nightmode": false,
    "nightmodeAutoChange": true,
    "dayBrightnessChange:": false,
    "nightBrightnessChange": false,
    "dayBrightness": 70,
    "nightBrightness": 30,
    "nightmodeStartTime": "0-0",
    "nightmodeEndTime": "5-0",
    "functionResNotify": true,
    "pageResNotify": true
  };

const resDownload = list => { // 下载name对应资源

  let listenNumber = list.length;

  list.forEach(name => {
    // 下载zip包
    wx.downloadFile({
      url: `https://nenuyouth.com/Res/${name}.zip`,
      success: res => {
        console.log(`${name} statusCode is ${res.statusCode}`);// 调试
        if (res.statusCode === 200) {

          // 保存压缩文件到压缩目录
          fileManager.saveFileSync(res.tempFilePath, `${userPath}/${name}Zip`);
          console.log(`save ${name} success`);// 调试

          // 解压文件到根目录
          fileManager.unzip({
            zipFilePath: `${userPath}/${name}Zip`, targetPath: userPath, success: () => {
              console.log(`unzip ${name} sucess`);// 调试

              // 删除压缩目录，并将下载成功信息写入存储、判断取消提示
              fileManager.unlinkSync(`${userPath}/${name}Zip`);
              wx.setStorageSync(`${name}Download`, true);
              console.log(`delete ${name} sucess`);// 调试

              // 改变监听数
              listenNumber--;
              if (!listenNumber) wx.hideLoading();
            },

            // 解压失败
            fail: msg2 => console.error(`unzip ${name} fail:`, msg2)
          });
        }
      },

      // 下载失败
      fail: msg1 => console.error(`download ${name} fail:`, msg1)
    });
  });
};

// 初始化小程序
const appInit = () => {
  wx.showLoading({ title: "初始化中...", mask: true });// 提示用户正在初始化
  console.log("初次启动");

  // 设置主题
  if (appOption.theme == "auto") {
    let num, platform = wx.getSystemInfoSync().platform, theme;
    switch (platform) {
      case "ios": theme = "iOS", num = 0;
        break;
      case "android": theme = "Android", num = 1;
        break;
      default: theme = "iOS", num = 0;
    }
    wx.setStorageSync("theme", theme), wx.setStorageSync("themeNum", num);
  } else wx.setStorageSync("theme", appOption.theme);

  // 写入预设数据
  for (let x in appOption) if (x != "theme") wx.setStorageSync(x, appOption[x]);

  // 下载资源文件并写入更新时间
  resDownload(["page", "function"]);
  wx.setStorageSync("pageUpdateTime", Math.round(new Date() / 1000));
  wx.setStorageSync("functionUpdateTime", Math.round(new Date() / 1000));

  // 成功初始化
  wx.setStorageSync("inited", true);
};

// 弹窗通知检查 for app.js
const noticeCheck = () => {

  // 获取通知列表
  wx.request({
    url: "https://nenuyouth.com/mpRes/notice.json",

    // 网络请求成功
    success: res => {
      console.log(res); // 调试

      // 如果状态码正确
      if (res.statusCode == 200) {
        let data = res.data, category = Object.keys(data);
        category.forEach(i => {

          // 如果读取到强制通知设置，每次都要通知，直接写入通知信息
          if (data[i][3])
            wx.setStorageSync(`${i}notice`, [data[i][0], data[i][1]]), wx.setStorageSync(`${i}Notify`, true);

          // 如果在线通知版本号更高，写入通知内容、通知提示与通知版本
          else if (data[i][2] != wx.getStorageSync(`${i}noticeVersion`)) {
            wx.setStorageSync(`${i}notice`, [data[i][0], data[i][1]]);
            wx.setStorageSync(`${i}noticeVersion`, data[i][2]); // 写入
            wx.setStorageSync(`${i}Notify`, true);// 写入
          }
        });

        // 如果找到APP级通知，立即提醒
        if (wx.getStorageSync("appNotify")) wx.showModal({
          title: data.app[0], content: data.app[1], showCancel: false,
          success: () => wx.removeStorageSync("appNotify")
        });

        // 服务器请求路径出错
      } else {
        wx.showToast({ title: "通知请求出错", icon: "none", duration: 2000 });
        console.error("NoticeList address error");// 调试
        wx.reportMonitor("24", 1), logger.warn("noticeList error", "Address Error");// 调试
      }
    },

    // 网络请求失败，提示用户通知获取出错
    fail: () => {
      wx.showToast({ title: "服务器似乎不堪重负", icon: "none", duration: 2000 });
      console.error("Get noticeList fail");// 调试
      wx.reportMonitor("24", 1), logger.warn("noticeList error", "Net Error");// 调试
    }
  });
};

// 夜间模式 for app.js & theme.js
const nightmode = () => {
  let date = new Date(), time = date.getHours() * 100 + date.getMinutes(), // 获得当前时间
    nm = wx.getStorageSync("nightmode"), nmAC = wx.getStorageSync("nightmodeAutoChange"), // 获得夜间模式、自动开启夜间模式设置
    nB = wx.getStorageSync("nightBrightness"), dB = wx.getStorageSync("dayBrightness"), // 获得夜间模式亮度，日渐模式亮度
    nBC = wx.getStorageSync("nightBrightnessChange"), dBC = wx.getStorageSync("dayBrightnessChange"), // 获得日夜间模式亮度改变状态
    nmStart = wx.getStorageSync("nightmodeStartTime").split("-"), // 获得夜间模式开始时间
    nmEnd = wx.getStorageSync("nightmodeEndTime").split("-"), // 获得夜间模式结束时间
    temp, start = Number(nmStart[0]) * 100 + Number(nmStart[1]), end = Number(nmEnd[0]) * 100 + Number(nmEnd[1]);

  // 如果开启了自动夜间模式，判断是否启用夜间模式及应用亮度
  if (nmAC) {
    temp = start <= end ? time >= start && time <= end : !(time <= start && time >= end);
    if (temp && nBC) wx.setScreenBrightness({ value: nB / 100 });
    else if (!temp && dBC) wx.setScreenBrightness({ value: dB / 100 });
    wx.setStorageSync("nightmode", temp);

    // 否则查看夜间模式开启状态，并根据状态应用决定是否应用亮度
  } else {
    if (nm && nBC) wx.setScreenBrightness({ value: nB / 100 });
    else if (!nm && dBC) wx.setScreenBrightness({ value: dB / 100 });
    temp = nm;
  }

  return temp;// 返回夜间模式状态
};

// 检查小程序更新并应用
const appUpdate = (forceUpdate = true, reset = false) => { // 参数：是否强制更新，是否重置小程序
  const updateManager = wx.getUpdateManager();
  let version;
  updateManager.onCheckForUpdate(res1 => {

    // 找到更新
    if (res1.hasUpdate) {

      // 提示用户获取到更新
      wx.showToast({ title: "检测到更新，下载中...", icon: "none" });
      console.warn("APP has a Update Version");// 调试

      // 请求配置文件
      wx.request({
        url: "https://nenuyouth.com/mpRes/config.json",
        success: res2 => {
          console.log(res2); // 调试

          // 获取成功，覆盖默认参数
          if (res2.statusCode == 200) ({ forceUpdate, reset, version } = res2.data);

        }
      });

    }
  });

  updateManager.onUpdateReady(() => {

    // 更新下载就绪，提示用户重新启动
    if (forceUpdate) wx.showModal({
      title: "已找到新版本",
      content: `版本${version}已下载，请重启应用更新。${(reset ? "该版本会初始化小程序。" : "")}`,
      showCancel: !reset, confirmText: "应用", cancelText: "取消",
      success: res => {

        // 用户确认，应用更新
        if (res.confirm) updateManager.applyUpdate();

      }
    });
  });

  updateManager.onUpdateFailed(() => {

    // 更新下载失败，提示用户网络出现问题
    wx.showToast({ title: "小程序更新下载失败，请检查您的网络！", icon: "none" });
    console.warn("Update failure"), wx.reportMonitor("23", 1), logger.warn("Upate App error", "Net Error");// 调试

  });
};

module.exports = { appInit, appUpdate, nightmode, noticeCheck };// 暴露函数模块