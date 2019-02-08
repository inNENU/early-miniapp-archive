/*global wx*/
//初始化日志管理器
const logger = wx.getLogManager({ level: 1 }), fileManager = wx.getFileSystemManager()

const resDownload = (path, fileUrl) => {
  console.log(wx.env.USER_DATA_PATH);
  console.log("开始下载");
  fileManager.mkdir({
    dirPath: `${wx.env.USER_DATA_PATH}/${path}`,
    success: () => {
      console.log("创建文件夹成功");
      wx.downloadFile({
        url: `https://nenuyouth.com/Res/${fileUrl}.zip`,
        success: res => {
          console.log(res);
          if (res.statusCode === 200) fileManager.saveFile({
            tempFilePath: res.tempFilePath, filePath: `${wx.env.USER_DATA_PATH}`,
            success: () => {
              console.log("保存文件成功");
              fileManager.unzip({
                zipFilePath: `${wx.env.USER_DATA_PATH}/${path}.zip`, targetPath: wx.env.USER_DATA_PATH,
                success: () => {
                  console.log('unzip sucess');
                  fileManager.unlink({
                    filePath: `path.zip`,
                    success: () => { console.log('delete sucess'); },
                    fail: msg4 => { console.error('delete failure:', msg4); }
                  })
                },
                fail: msg3 => { console.error('unzip fail:', msg3); }
              })
            },
            fail: msg2 => { console.error('save file fail:', msg2); }
          })
        },
        fail: msg1 => { console.error('download file fail:', msg1); }
      })
    },
    fail: msg => {
      console.log(msg);
      if (msg == `fail file already exists ${this.dirPath}`) {
        fileManager.access({
          path: `${wx.env.USER_DATA_PATH}/${path}/${pathVersion}.json`,
          success: () => {
            console.log("存在版本文件")
          },
          fail: () => { console.error('空目录'); }
        });
      }
    }
  })
}

//初始化小程序
const appInit = data => {
  console.log("初次启动");
  //设置主题
  if (data.theme == "auto") {
    let theme, num, platform = wx.getSystemInfoSync().platform;
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
  wx.setStorageSync('funcNotify', true), wx.setStorageSync('localFunc', undefined);
  wx.setStorageSync('resNotify', true), wx.setStorageSync('localRes', undefined);
  wx.setStorageSync("localFuncTime", Math.round(new Date() / 1000)), wx.setStorageSync("localResTime", Math.round(new Date() / 1000));
  resDownload("guide", "guide"),// resDownload("function", "function");
    wx.setStorageSync("launched", true);
}

//开启开发模式  for app.js & theme.js
const checkDebug = () => {
  wx.getStorageSync("debugMode") ? wx.setEnableDebug({ enableDebug: true }) : wx.setEnableDebug({ enableDebug: false });
}

//弹窗通知检查 for app.js
const noticeCheck = () => {
  wx.request({
    url: "https://nenuyouth.com/mpRes/notice.json",
    success: res => {
      console.log(res); //调试
      if (res.statusCode == 200) {
        let data = res.data, category = Object.keys(data);
        category.forEach(x => {
          if (data[x][3]) {
            wx.setStorageSync(`${x}notice`, [data[x][0], data[x][1]]), wx.setStorageSync(`${x}Notify`, true);
          } else if (data[x][2] != wx.getStorageSync(x + "noticeVersion")) {
            wx.setStorageSync(`${x}notice`, [data[x][0], data[x][1]]);
            wx.setStorageSync(`${x}noticeVersion`, data[x][2]);
            wx.setStorageSync(`${x}Notify`, true);
          }
        });
        if (wx.getStorageSync("appNotify"))
          wx.showModal({
            title: data.app[0], content: data.app[1], showCancel: false,
            success: () => { wx.removeStorageSync("appNotify"); }
          });
      }
    },
    fail: () => {
      wx.showToast({ title: "服务器似乎不堪重负", icon: "none", duration: 2000 });
      console.error("noticeList error"), wx.reportMonitor("24", 1), logger.warn("noticeList error", "Net Error");
    }
  });
}

// 夜间模式 for app.js & theme.js
const nightmode = () => {
  let date = new Date(), time = date.getHours() * 100 + date.getMinutes(),
    nm = wx.getStorageSync("nightmode"), nmAC = wx.getStorageSync("nightmodeAutoChange"),
    nB = wx.getStorageSync("nightBrightness"), dB = wx.getStorageSync("dayBrightness"),
    nBC = wx.getStorageSync("nightBrightnessChange"), dBC = wx.getStorageSync("dayBrightnessChange"),
    s = wx.getStorageSync("nmStart").split("-"), e = wx.getStorageSync("nmEnd").split("-");
  let temp, start = Number(s[0]) * 100 + Number(s[1]), end = Number(e[0]) * 100 + Number(e[1]);
  if (nmAC) {
    start <= end ? temp = time >= start && time <= end ? true : false : temp = time <= start && time >= end ? false : true;
    if (temp && nBC) wx.setScreenBrightness({ value: nB / 100 });
    else if (!temp && dBC) wx.setScreenBrightness({ value: dB / 100 });
    wx.setStorageSync("nightmode", temp);
    return temp;
  } else {
    if (nm && nBC) wx.setScreenBrightness({ value: nB / 100 });
    else if (!nm && dBC) wx.setScreenBrightness({ value: dB / 100 });
    return nm;
  }
}

//检查小程序更新并应用
const appUpdate = (forceUpdate, reset) => { //参数：是否强制更新，是否重置小程序
  const updateManager = wx.getUpdateManager();
  updateManager.onCheckForUpdate(res => {
    console.log(`HasUpdate status ${res.hasUpdate}`);
    if (res.hasUpdate) {
      wx.request({
        url: "https://nenuyouth.com/mpRes/config.json",
        success: res => {
          console.log(res); //调试
          if (res.statusCode == 200) ({ forceUpdate, reset, version } = res.data);
        }
      });
      wx.showToast({ title: "检测到更新，下载中...", icon: "none" });
    }
  });
  updateManager.onUpdateReady(() => {
    if (forceUpdate) {
      wx.showModal({
        title: "已找到新版本",
        content: `版本${version}已下载，请重启应用更新。${(reset ? "该版本会初始化小程序。" : "")}`,
        showCancel: reset ? false : true,
        confirmText: "应用", cancelText: "取消",
        success: res => {
          if (res.confirm) updateManager.applyUpdate();
        }
      });
    }
  });
  updateManager.onUpdateFailed(() => {
    wx.showToast({ title: "小程序更新下载失败，请检查您的网络！", icon: "none" });
    console.warn("Update failure"), wx.reportMonitor("23", 1), logger.warn("Upate App error", "Net Error");
  });
}

module.exports = { appInit, appUpdate, checkDebug, nightmode, noticeCheck };