/*global wx getApp*/
var a = getApp().globalData, { $page, $set } = getApp().lib, tab = require("../utils/tab");

// var P = require("../utils/wxpage"),
//   S = require("../utils/setPage"),
//   a = getApp().globalData,
//   app = require("../utils/app"),
//   tab = require("../utils/tab");

$page("function", {
  data: {
    page: [{
      tag: "head", title: "功能大厅", action: true, grey: true
    }, {
      tag: "grid",
      head: "",
      content: [{
        text: "校园地图", icon: "/icon/function/map.svg", url: "/function/map"
      }, {
        text: "音律东师", icon: "/icon/function/music.svg", url: "/function/player"
        // }, {
        //   text: "影约东师", icon: "/icon/function/movie.svg", url: "/function/video"
      }, {
        text: "校园公众号", icon: "/icon/function/gzh.svg", aim: "gzh0"
      }, {
        text: "内网公告", icon: "/icon/function/notice.svg", url: "/function/notice"
      }, {
        text: "体测计算器", icon: "/icon/function/PECal.svg", url: "/function/PEcal"
      },]
    }, {
      tag: "grid",
      head: "即将推出",
      content: [{
        text: "成绩查询", icon: "/icon/function/exam.svg", url: "/modules/building?month=3"
      }, {
        text: "课表查询", icon: "/icon/function/schedule.svg", url: "/modules/building?month=3"
      }, {
        text: "考场查询", icon: "/icon/function/score.svg", url: "/modules/building?month=5"
      }, {
        text: "绩点计算", icon: "/icon/function/scoreCal.svg", url: "/modules/building?month=3"
      }, {
        text: "故障报修", icon: "/icon/function/repair.svg", url: "/modules/building?month=4"
      }, {
        text: "东师掠影", icon: "/icon/function/scenery.svg", url: "/modules/building?month=1"
      }, {
        text: "校历", icon: "/icon/function/calendar.svg", url: "/modules/building?month=1"
      }]
    }],
  },
  onPreload(res) {
    $set.preSet(this.$take(res.query.name), a, { aim: "function" }, this, false);
    this.set = true;
    console.log("Function preload finished time:", new Date() - a.date, "ms");
  },
  onLoad() {
    this.$set({ T: a.T, nm: a.nm });
    if (!this.set) {
      let page = wx.getStorageSync("function");
      $set.Set(page ? page : this.data.page, a, { aim: "function" }, this, false);
    }
    $set.Notice("function");
    tab.checkUpdate("funcNotify", "localFunc", "functionRes", "20K");
  },
  onShow() {
    let [frontColor, backgroundColor] = this.data.nm ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
    wx.setNavigationBarColor({ frontColor, backgroundColor });
  },
  onReady() {
    if (!this.set) {
      wx.startPullDownRefresh();
      $set.request("functionVersion", (data, ctx) => {
        $set.Set(data, a, null, ctx);
        wx.stopPullDownRefresh();
        wx.setStorageSync("function", data);
      }, this)
    }
    this.$on("theme", T => { this.$set({ T }) }), this.$on("nightmode", nm => { this.$set({ nm }) });
    tab.markerSet();//此处还需要再优化
  },
  onPullDownRefresh() {
    $set.request("functionVersion", (data, ctx) => {
      $set.Set(data, a, null, ctx);
      wx.stopPullDownRefresh();
      wx.setStorageSync("function", data);
    }, this);
    tab.checkUpdate("funcNotify", "localFunc", "functionVersion", "20K");
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  }
});