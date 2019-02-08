var { globalData: a, lib: { $page, $set } } = getApp();

$page("test", {
  data: {
    page: [{
      tag: "head",
      title: "首页",
      action: true,
      aimDepth: 1,
      grey: true,
      shareable: true,
      aim: "main",
      display: false
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
    }],
  },
  // onPageLaunch() {
  //   console.log("主页面启动：", new Date() - a.date, "ms");
  //   let page = wx.getStorageSync("main");
  //   $set.preSet(page ? page : this.data.page, a, null, this, false);
  //   tab.tabBarChanger(a.nm);
  // },
  onLoad() {
    // tab.tabBarChanger(a.nm);
    // wx.startPullDownRefresh();
    // $set.request("Res/others/main", (data, ctx) => {
    //   $set.Set(data, a, null, ctx);
    //   wx.stopPullDownRefresh();
    //   wx.setStorageSync("main", data);
    // }, this);
    // $set.Notice("main");
  },
  // onReady() {
  //   this.$on("theme", data => { this.setData({ T: data }) });
  //   this.$on("nightmode", data => { this.setData({ nm: data }) });
  //   ['guide', 'function'].forEach(x => {
  //     $set.request(`Res/others/${x}`, (data, ctx) => {
  //       ctx.$put(x, data);
  //       ctx.$preload(`${x}?name=${x}`);
  //       wx.setStorageSync(x, data);
  //     }, this)
  //   });
  //   this.$preload("me");
  // },
  // onPullDownRefresh() {
  //   $set.request("Res/others/main", (data, ctx) => {
  //     $set.Set(data, a, null, ctx);
  //     wx.stopPullDownRefresh();
  //   }, this);
  // },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  // cA(e) {
  //   $set.component(e, this);
  // },
  // onShareAppMessage: () => ({ title: "myNENU", path: "/page/main" })
  // onShareAppMessage() {
  //   return { title: "myNENU", path: "/page/main" };
  // },
});