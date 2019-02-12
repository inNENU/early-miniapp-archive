/* global wx getApp*/
let a = getApp().globalData, { $page, $set } = getApp().lib;
const tab = require("../utils/tab");

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

        /*
         * }, {
         *   text: "影约东师", icon: "/icon/function/movie.svg", url: "/function/video"
         */
      }, {
        text: "校园公众号", icon: "/icon/function/gzh.svg", aim: "gzh0"
      }, {
        text: "内网公告", icon: "/icon/function/notice.svg", url: "/function/notice"
      }, {
        text: "体测计算器", icon: "/icon/function/PECal.svg", url: "/function/PEcal"
      }]
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
    }]
  },
  onPreload(res) {
    $set.preSet(this.$take(res.query.name), a, { aim: "function" }, this, false);
    this.set = true;
    console.log(`${this.aim}预加载用时${new Date() - a.date}ms`);
  },
  onLoad() {
    this.setData({ T: a.T, nm: a.nm });
    if (!this.set) {
      let page = wx.getStorageSync("function");
      $set.Set(page ? page : this.data.page, a, { aim: "function" }, this, false);
    }
    $set.Notice("function");
    tab.update("function", "70K");
  },
  onShow() {
    let [frontColor, backgroundColor] = this.data.nm ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
    wx.setNavigationBarColor({ frontColor, backgroundColor });
  },
  onReady() {
    if (!this.set) $set.request("Res/others/function", data => {
      wx.setStorageSync("function", data);
    });
    this.$on("theme", T => {
      this.setData({ T });
    }), this.$on("nightmode", nm => {
      this.setData({ nm });
    });
    tab.markerSet();// 此处还需要再优化
  },
  onPullDownRefresh() {
    tab.update("function", "70K");
    wx.stopPullDownRefresh();
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  }
});