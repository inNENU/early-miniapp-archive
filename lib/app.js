/* global wx*/
// 初始化日志管理器
const fileManager = wx.getFileSystemManager(), logger = wx.getLogManager({ level: 1 });
const userPath = wx.env.USER_DATA_PATH;

const resDownload = name => {
  wx.downloadFile({
    url: `https://nenuyouth.com/Res/${name}.zip`,
    success: res => {
      console.log(`${name} statusCode is ${res.statusCode}`);
      if (res.statusCode === 200) {
        fileManager.saveFileSync(res.tempFilePath, `${userPath}/${name}Zip`);
        console.log("save success");
        fileManager.unzip({
          zipFilePath: `${userPath}/${name}Zip`, targetPath: userPath, success: () => {
            console.log("unzip sucess");// 调试
            fileManager.unlinkSync(`${userPath}/${name}Zip`);
            wx.setStorageSync(`${name}Download`, true);
            console.log("delete sucess");// 调试
          },
          fail: msg2 => console.error(`unzip ${name} fail:`, msg2)
        });
      }
    },
    fail: msg1 => console.error(`download ${name} fail:`, msg1)
  });

  /*
   * },
   * //   fail: msg => {
   * //     console.log(msg);
   * //     if (msg == `fail file already exists ${this.dirPath}`) {
   * //       fileManager.access({
   * //         path: `${wx.env.USER_DATA_PATH}/${path}Version`,
   * //         success: () => {
   * //           console.log("存在版本文件")
   * //           let version = fileManager.readFileSync(`${wx.env.USER_DATA_PATH}/${path}Version.json`, 'utf-8')
   * //           console.log(version);
   * //           wx.setStorageSync(`${path}Download`, true);
   * //         },
   * //         fail: () => { console.error('空目录'); }
   * //       });
   * //     }
   * //   }
   * })
   */
};

// 初始化小程序
const appInit = data => {
  console.log("初次启动");
  // 设置主题
  if (data.theme == "auto") {
    let num, platform = wx.getSystemInfoSync().platform, theme;
    switch (platform) {
      case "ios": theme = "iOS", num = 0;
        break;
      case "android": theme = "Android", num = 1;
        break;
      default: theme = "iOS", num = 0;
    }
    wx.setStorageSync("theme", theme), wx.setStorageSync("themeNum", num);
  } else wx.setStorageSync("theme", data.theme);
  wx.setStorageSync("nightmode", true), wx.setStorageSync("nightmodeAutoChange", true);
  wx.setStorageSync("nightBrightness", 30), wx.setStorageSync("dayBrightness", 70);
  wx.setStorageSync("nightBrightnessChange", false), wx.setStorageSync("dayBrightnessChange", false);
  wx.setStorageSync("nmStart", data.startTime), wx.setStorageSync("nmEnd", data.endTime);
  wx.setStorageSync("functionResNotify", true), wx.setStorageSync("pageResNotify", true);
  wx.setStorageSync("pageUpdateTime", Math.round(new Date() / 1000));
  wx.setStorageSync("functionUpdateTime", Math.round(new Date() / 1000));
  resDownload("page"), resDownload("function");
  wx.setStorageSync("launched", true);
};

// 开启开发模式  for app.js & theme.js
const checkDebug = () => {
  wx.getStorageSync("debugMode") ?
    wx.setEnableDebug({ enableDebug: true }) :
    wx.setEnableDebug({ enableDebug: false });
};

// 弹窗通知检查 for app.js
const noticeCheck = () => {
  wx.request({
    url: "https://nenuyouth.com/mpRes/notice.json",
    success: res => {
      console.log(res); // 调试
      if (res.statusCode == 200) {
        let data = res.data, category = Object.keys(data);
        category.forEach(i => {
          if (data[i][3])
            wx.setStorageSync(`${i}notice`, [data[i][0], data[i][1]]), wx.setStorageSync(`${i}Notify`, true);
          else if (data[i][2] != wx.getStorageSync(`${i}noticeVersion`)) {
            wx.setStorageSync(`${i}notice`, [data[i][0], data[i][1]]);
            wx.setStorageSync(`${i}noticeVersion`, data[i][2]);
            wx.setStorageSync(`${i}Notify`, true);
          }
        });
        if (wx.getStorageSync("appNotify"))
          wx.showModal({
            title: data.app[0], content: data.app[1], showCancel: false,
            success: () => wx.removeStorageSync("appNotify")
          });
      }
    },
    fail: () => {
      wx.showToast({ title: "服务器似乎不堪重负", icon: "none", duration: 2000 });
      console.error("noticeList error"), wx.reportMonitor("24", 1), logger.warn("noticeList error", "Net Error");
    }
  });
};

// 夜间模式 for app.js & theme.js
const nightmode = () => {
  let date = new Date(), time = date.getHours() * 100 + date.getMinutes(),
    nm = wx.getStorageSync("nightmode"), nmAC = wx.getStorageSync("nightmodeAutoChange"),
    nB = wx.getStorageSync("nightBrightness"), dB = wx.getStorageSync("dayBrightness"),
    nBC = wx.getStorageSync("nightBrightnessChange"), dBC = wx.getStorageSync("dayBrightnessChange"),
    nmStart = wx.getStorageSync("nmStart").split("-"), nmEnd = wx.getStorageSync("nmEnd").split("-");
  let temp, start = Number(nmStart[0]) * 100 + Number(nmStart[1]), end = Number(nmEnd[0]) * 100 + Number(nmEnd[1]);
  if (nmAC) {
    temp = start <= end ? time >= start && time <= end : !(time <= start && time >= end);
    if (temp && nBC) wx.setScreenBrightness({ value: nB / 100 });
    else if (!temp && dBC) wx.setScreenBrightness({ value: dB / 100 });
    wx.setStorageSync("nightmode", temp);
  } else {
    if (nm && nBC) wx.setScreenBrightness({ value: nB / 100 });
    else if (!nm && dBC) wx.setScreenBrightness({ value: dB / 100 });
    temp = nm;
  }

  return temp;
};

// 检查小程序更新并应用
const appUpdate = (forceUpdate, reset) => { // 参数：是否强制更新，是否重置小程序
  const updateManager = wx.getUpdateManager();
  let version;
  updateManager.onCheckForUpdate(res1 => {
    console.log(`HasUpdate status ${res1.hasUpdate}`);
    if (res1.hasUpdate) {
      wx.request({
        url: "https://nenuyouth.com/mpRes/config.json",
        success: res2 => {
          console.log(res2); // 调试
          if (res2.statusCode == 200) ({ forceUpdate, reset, version } = res2.data);
        }
      });
      wx.showToast({ title: "检测到更新，下载中...", icon: "none" });
    }
  });
  updateManager.onUpdateReady(() => {
    if (forceUpdate) wx.showModal({
      title: "已找到新版本",
      content: `版本${version}已下载，请重启应用更新。${(reset ? "该版本会初始化小程序。" : "")}`,
      showCancel: !reset, confirmText: "应用", cancelText: "取消",
      success: res => {
        if (res.confirm) updateManager.applyUpdate();
      }
    });
  });
  updateManager.onUpdateFailed(() => {
    wx.showToast({ title: "小程序更新下载失败，请检查您的网络！", icon: "none" });
    console.warn("Update failure"), wx.reportMonitor("23", 1), logger.warn("Upate App error", "Net Error");
  });
};

module.exports = { appInit, appUpdate, checkDebug, nightmode, noticeCheck };