/* global wx getApp*/
let { globalData: a, lib: { $page, $set } } = getApp();

$page("main", {
  data: {
    page: [{
      tag: "head",
      title: "首页",
      action: true,
      aimDepth: 1,
      grey: true,
      shareable: true,
      aim: "main"
    }, {
      tag: "list",
      head: "了解学业",
      content: [{
        text: "我要上哪些课？", desc: "课程计划", aim: "study9"
      }, {
        text: "通识教育课程", aim: "study5"
      }, {
        text: "专业教育课程", aim: "study6"
      }, {
        text: "发展方向课程", aim: "study7"
      }, {
        text: "了解更多", aim: "study5"
      }]
    }]
  },
  onPageLaunch() {
    console.log("主页面启动：", new Date() - a.date, "ms");
    let page = wx.getStorageSync("main"), color = a.nm ? ["#000000", "white"] : ["#ffffff", "black"];
    $set.preSet(page ? page : this.data.page, a, { aim: "main" }, this, false);
    wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
  },
  onLoad() {
    $set.request("Res/others/main", data => {
      $set.Set(data, a, null, this);
    });
    $set.Notice("main");
  },
  onShow() {
    let [frontColor, backgroundColor] = this.data.nm ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
    wx.setNavigationBarColor({ frontColor, backgroundColor });
  },
  onReady() {
    this.$on("theme", T => {
      this.setData({ T });
    });
    this.$on("nightmode", nm => {
      this.setData({ nm });
    });
    ["guide", "function"].forEach(x => {
      $set.request(`Res/others/${x}`, data => {
        this.$put(x, data);
        this.$preload(`${x}?name=${x}&aim=${x}`);
        wx.setStorageSync(x, data);
      });
    });
    this.$preload("me");
  },
  onPullDownRefresh() {
    $set.request("Res/others/main", data => {
      $set.Set(data, a, null, this);
      wx.stopPullDownRefresh();
    });
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  },
  onShareAppMessage: () => ({ title: "myNENU", path: "/page/main" })
});