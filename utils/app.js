module.exports = {
  init: initialize,
  setTheme,
  nightmode,
  checkDebug,
  noticeCheck,
}

//开启开发模式  from app.js
function checkDebug() {
  if (wx.getStorageSync('debugMode')) {
    wx.setEnableDebug({
      enableDebug: true
    })
  } else {
    wx.setEnableDebug({
      enableDebug: false
    })
  }
}

//弹窗检查 from app.js
function noticeCheck() {
  wx.request({
    url: 'https://mrhope.top/mp/notice.json',
    success(res) {
      console.log(res); //调试
      if (res.statusCode == 200) {
        let data = res.data,
          category = Object.keys(data);
        for (let i = 0; i < category.length; i++) {
          if (data[category[i]][2] != wx.getStorageSync(category[i] + 'noticeVersion')) {
            wx.setStorageSync(category[i] + 'notice', [data[category[i]][0], data[category[i]][1]]);
            wx.setStorageSync(category[i] + 'noticeVersion', data[category[i]][2]);
            wx.setStorageSync(category[i] + 'noticeNotify', true);
          }
        }
      }
    },
    fail() {
      wx.showToast({
        title: '似乎未检测到互联网连接',
        icon: 'none',
        duration: 3000
      })
      console.error('noticeList error')
    }
  })
}

// 初始化存储
function initialize(key, defaultKey) {
  let value = wx.getStorageSync(key);
  return (value || value === false) ? value : (wx.setStorageSync(key, defaultKey), defaultKey);
}

//设置主题
function setTheme(theme) {
  let value = wx.getStorageSync('theme');
  if (value) {
    return value
  } else {
    if (theme == "auto") {
      let p = wx.getSystemInfoSync().platform,
        t, num;
      switch (p) {
        case 'ios':
          t = 'iOS',
            num = 0;
          break;
        case 'android':
          t = 'wechat',
            num = 1;
          break;
        default:
          t = 'iOS',
            num = 0;
      }
      wx.setStorageSync('theme', t);
      wx.setStorageSync('themeNum', num);
      return t;
    } else {
      return theme;
    }
  }
}

// 夜间模式
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
  let start = Number(s[0]) * 100 + Number(s[1]),
    end = Number(e[0]) * 100 + Number(e[1]),
    temp;
  if (nmAC) {
    (start <= end) ? temp = ((time >= start && time <= end) ? true : false): temp = ((time <= start && time >= end) ? false : true);
    if (temp && nBC) {
      wx.setScreenBrightness({
        value: nB / 100
      })
    } else if (!temp && dBC) {
      wx.setScreenBrightness({
        value: dB / 100
      })
    }
    wx.setStorageSync('nightmode', temp);
    return temp;
  } else {
    if (nm && nBC) {
      wx.setScreenBrightness({
        value: nB / 100
      });
    } else if (!nm && dBC) {
      wx.setScreenBrightness({
        value: dB / 100
      });
    }
    return nm;
  }
}