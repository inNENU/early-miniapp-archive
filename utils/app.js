module.exports = {
  init: initialize,
  setTheme,
  nightmode,
  checkDebug,
  checkUpdate,
  noticeCheck,
}

//开启开发模式  for app.js & theme.js
function checkDebug() {
  wx.getStorageSync('debugMode') ? wx.setEnableDebug({
    enableDebug: true
  }) : wx.setEnableDebug({
    enableDebug: false
  })
}

//弹窗检查 for app.js
function noticeCheck() {
  wx.request({
    url: `https://mrhope.top/mpRes/notice.json`,
    success: res => {
      console.log(res); //调试
      if (res.statusCode == 200) {
        let data = res.data,
          category = Object.keys(data);
        category.forEach(x => {
          if (data[x][3]) {
            wx.setStorageSync(`${x}notice`, [data[x][0], data[x][1]]);
            wx.setStorageSync(`${x}Notify`, true);
          } else if (data[x][2] != wx.getStorageSync(x + 'noticeVersion')) {
            wx.setStorageSync(`${x}notice`, [data[x][0], data[x][1]]);
            wx.setStorageSync(`${x}noticeVersion`, data[x][2]);
            wx.setStorageSync(`${x}Notify`, true);
          }
        })
        if (wx.getStorageSync('appNotify')) {
          wx.showModal({
            title: data.app[0],
            content: data.app[1],
            showCancel: false,
            success: () => {
              wx.removeStorageSync('appNotify');
            }
          })
        }
      }
    },
    fail() {
      wx.showToast({
        title: '服务器似乎不堪重负',
        icon: 'none',
        duration: 2000
      })
      console.error('noticeList error'), wx.reportMonitor('24', 1);
    }
  })
}

// 初始化存储
function initialize(key, defaultKey) {
  let value = wx.getStorageSync(key);
  return (value || value === false) ? value : (wx.setStorageSync(key, defaultKey), defaultKey);
}

//设置主题 for app.js & theme.js
function setTheme(theme) {
  let value = wx.getStorageSync('theme');
  if (value) {
    return value
  } else {
    if (theme == "auto") {
      let t, num, p = wx.getSystemInfoSync().platform;
      switch (p) {
        case 'ios':
          t = 'iOS',
            num = 0;
          break;
        case 'android':
          t = 'Android',
            num = 1;
          break;
        default:
          t = 'iOS',
            num = 0;
      }
      wx.setStorageSync('theme', t), wx.setStorageSync('themeNum', num);
      return t;
    } else {
      return theme;
    }
  }
}

// 夜间模式 for app.js & theme.js
function nightmode(date, startTime, endTime) {
  let nm = initialize('nightmode', true),
    nmAC = initialize('nightmodeAutoChange', true),
    nB = initialize('nightBrightness', 30),
    dB = initialize('dayBrightness', 70),
    nBC = initialize('nightBrightnessChange', false),
    dBC = initialize('dayBrightnessChange', false),
    s = initialize('nmStart', startTime).split('-'),
    e = initialize('nmEnd', endTime).split('-'),
    time = date.getHours() * 100 + date.getMinutes();
  let temp, value, start = Number(s[0]) * 100 + Number(s[1]),
    end = Number(e[0]) * 100 + Number(e[1]);
  if (nmAC) {
    (start <= end) ? temp = ((time >= start && time <= end) ? true : false): temp = ((time <= start && time >= end) ? false : true);
    if (temp && nBC)
      wx.setScreenBrightness({
        value: nB / 100
      })
    else if (!temp && dBC)
      wx.setScreenBrightness({
        value: dB / 100
      });
    wx.setStorageSync('nightmode', temp);
    return temp;
  } else {
    if (nm && nBC)
      wx.setScreenBrightness({
        value: nB / 100
      })
    else if (!nm && dBC)
      wx.setScreenBrightness({
        value: dB / 100
      });
    return nm;
  }
}

function checkUpdate(forceUpdate = true, reset = false) {
  if (forceUpdate) {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(res => {
      console.log(`HasUpdate status ${res.hasUpdate}`)
      if (res.hasUpdate) wx.showToast({
        title: '检测到更新，下载中...',
        icon: 'none'
      });
    })
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '提示',
        content: reset ? '新版本已安装，请重启应用。该版本会初始化小程序。' : '新版本已安装，请重启应用。',
        showCancel: reset ? true : false,
        success: res => {
          if (res.confirm) updateManager.applyUpdate();
        }
      })
    })
    updateManager.onUpdateFailed(() => {
      console.warn('Update failure'), wx.reportMonitor('23', 1)
    })
  }
}