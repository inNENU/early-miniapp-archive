var a = getApp().globalData,
  P = require("../../utils/wxpage"),
  S = require("../../utils/setPage"),
  u = require("../../utils/util"),
  app = require("../../utils/app"),
  tab = require("../../utils/tab");
var time = new Array(new Array(), new Array());
for (let i = 0; i <= 23; i++) {
  time[0].push(i + "时");
}
for (let i = 0; i <= 59; i++) {
  i < 10 ? time[1].push("0" + i + "分") : time[1].push(i + "分");
}

P("setting", {
  data: {
    page: [{
      tag: "head",
      title: "设置",
      grey: true
    }, {
      tag: "list",
      head: "主题设置",
      foot: "NENU主题处于内测阶段",
      content: [{
        text: "主题设置",
        key: "themeNum",
        single: true,
        pickerValue: ["iOS", "Android", "NENU"],
        picker: "setTheme"
      }]
    }, {
      tag: "list",
      head: "夜间模式",
      foot: "“夜间模式”启用后，所有界面的背景被置于暗色并采用亮色文字以在保护眼睛的同时，保持暗光下显示效果。",
      content: [{
        text: "夜间模式",
        Switch: "switchnm",
        swiKey: "nightmode"
      }]
    }, {
      tag: "list",
      foot: "亮度数据为百分比",
      content: [{
        text: "设定时间",
        Switch: "switchnmAC",
        swiKey: "nightmodeAutoChange"
      }, {
        text: "开始时间",
        inlay: true,
        key: "nmStart",
        pickerValue: time
      }, {
        text: "结束时间",
        inlay: true,
        key: "nmEnd",
        pickerValue: time
      }, {
        text: "日间亮度调整开关",
        Switch: "swithDay",
        swiKey: "dayBrightnessChange"
      }, {
        text: "日间模式亮度",
        slider: "dB",
        min: 0,
        max: 100,
        sliKey: "dayBrightness"
      }, {
        text: "夜间亮度调整开关",
        Switch: "swithNight",
        swiKey: "nightBrightnessChange"
      }, {
        text: "夜间模式亮度",
        slider: "nB",
        min: 0,
        max: 100,
        sliKey: "nightBrightness"
      }]
    }, {
      tag: "list",
      head: "资源更新",
      foot: "如果页面显示出现问题请强制更新资源",
      content: [
        { text: "功能资源更新提示", swiKey: "funcNotify" },
        { text: "现在更新功能资源", button: "refreshFunc" },
        { text: "指南资源更新提示", swiKey: "guideNotify" },
        { text: "现在更新指南资源", button: "refreshGuide" }]
    }, {
      tag: "foot",
    }],
  },
  onPreload(res) {
    let p = this.data.page,
      list = p[3].content,
      nightmodeAutoChange = wx.getStorageSync("nightmodeAutoChange"),
      dayBrightnessChange = wx.getStorageSync("dayBrightnessChange"),
      nightBrightnessChange = wx.getStorageSync("nightBrightnessChange");
    if (!nightmodeAutoChange || !dayBrightnessChange) {
      list[4].display = false;
    }
    if (!nightmodeAutoChange || !nightBrightnessChange) {
      list[6].display = false;
    }
    if (!nightmodeAutoChange) {
      list[1].display = list[2].display = list[3].display = list[5].display = false;
    }
    if (!S.preSet(this.data.page, a, res.query, this, false)) {
      this.set = true;
      console.log("Preload set");
    }
    console.log("Settings preload finished.");
  },
  onLoad(res) {
    if (!this.set) {
      S.Set(this.data.page, a, res, this, false);
    }
    S.Notice("theme");
  },
  onReady() {
    S.preLoad(this, a);
  },
  onPageScroll(e) {
    S.nav(e, this);
  },
  refreshGuide() {
    tab.request("guideRes", data => {
      tab.resDownload(data, null);
    }, null);
  },
  refreshFunc() {
    tab.request("functionRes", data => {
      tab.resDownload(data, null);
    }, null);
  },
  cA(e) {
    S.component(e, this);
  },
  onUnload() {
    a.nm = app.nightmode(new Date());
  },
  switchnm(e) {
    let p = u.Switch(e, this),
      list = p[3].content,
      value = e.detail.value,
      frontColor, backgroundColor;
    if (value && list[5].status) {
      wx.setScreenBrightness({
        value: list[6].value / 100
      });
    } else if (!value && list[3].status) {
      wx.setScreenBrightness({
        value: list[4].value / 100
      });
    }
    list[0].status = list[1].display = list[2].display = list[3].display = list[4].display = list[4].visible = list[5].display = list[6].display = list[6].visible = false;
    wx.setStorageSync("nightmodeAutoChange", false);
    this.setData({
      nm: value,
      page: p
    });
    a.nm = value;
    this.$emit("nightmode", value);
    [frontColor, backgroundColor] = value ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
    wx.setNavigationBarColor({
      frontColor,
      backgroundColor
    })
  },
  switchnmAC(e) {
    let p = u.Switch(e, this),
      list = p[3].content,
      frontColor, backgroundColor;
    let nm = app.nightmode(new Date());
    p[2].content[0].status = nm;
    wx.setStorageSync("nightmode", nm);
    if (nm && list[5].status) {
      wx.setScreenBrightness({
        value: list[6].value / 100
      });
    } else if (!nm && list[3].status) {
      wx.setScreenBrightness({
        value: list[4].value / 100
      });
    }
    if (e.detail.value) {
      list[1].display = list[2].display = list[3].display = list[5].display = true;
    } else {
      list[1].display = list[2].display = list[3].display = list[4].visible = list[5].display = list[6].visible = false;
    }
    if (!list[0].status) {
      list[4].display = false;
    } else {
      !list[3].status ? list[4].display = false : list[4].display = true;
    }
    !list[0].status ? list[6].display = false : !list[5].status ? list[6].display = false : list[6].display = true;
    this.setData({
      nm: nm,
      page: p
    });
    a.nm = nm;
    this.$emit("nightmode", nm);
    [frontColor, backgroundColor] = nm ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
    wx.setNavigationBarColor({
      frontColor,
      backgroundColor
    })
  },
  swithDay(e) {
    let p = u.Switch(e, this),
      list = p[3].content;
    list[4].visible = list[4].display = e.detail.value;
    this.setData({
      page: p
    });
  },
  swithNight(e) {
    let p = u.Switch(e, this),
      list = p[3].content;
    list[6].visible = list[6].display = e.detail.value;
    this.setData({
      page: p
    });
  },
  dB(e) {
    S.component(e, this);
    if (!a.nm && this.data.page[3].content[3].status) {
      wx.setScreenBrightness({
        value: e.detail.value / 100
      });
    }
  },
  nB(e) {
    S.component(e, this);
    if (a.nm && this.data.page[3].content[5].status) {
      wx.setScreenBrightness({
        value: e.detail.value / 100
      });
    }
  },
  setTheme(e) {
    S.component(e, this);
    let theme = this.data.page[1].content[0].pickerValue[e.detail.value];
    a.T = theme;
    wx.setStorageSync("theme", theme);
    S.Set(this.data.page, a, null, this);
    this.$emit("theme", theme);
    console.log("theme切换为" + theme); //调试
  }
});