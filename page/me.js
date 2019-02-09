/* global wx getApp*/
let a = getApp().globalData, { $page, $set } = getApp().lib;

$page("me", {
  data: {
    page: [{
      tag: "head",
      title: "我的东师",
      action: true,
      grey: true
    }, {
      tag: "list",
      content: [{
        text: "设置",
        icon: "/icon/setting.svg",
        url: "settings/setting"
      }, {
        text: "关于",
        icon: "/icon/about.svg",
        url: "settings/about",
        desc: a.version
      }]
    }, {
      tag: "foot",
      desc: `当前版本：${a.version}`
    }]
  },
  onPreload() {
    if (!$set.preSet(this.data.page, a, null, this, false))
      this.set = true;

    console.log("Me preload finished time:", new Date() - a.date, "ms");
  },
  onLoad() {
    if (!this.set) $set.Set(this.data.page, a, null, this, false);
    $set.Notice("me");
  },
  onShow() {
    let [frontColor, backgroundColor, color] = this.data.nm ?
      ["#ffffff", "#000000", ["#000000", "white"]] :
      ["#000000", "#ffffff", ["#ffffff", "black"]];
    wx.setNavigationBarColor({ frontColor, backgroundColor });
    wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
    this.$preload("setting?From=我的东师"), this.$preload("about?From=我的东师");
  },
  onReady() {
    if (!this.set) $set.Set(this.data.page, a, null, this);
    this.$on("theme", T => {
      this.setData({ T });
    }), this.$on("nightmode", nm => {
      this.setData({ nm });
    });
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  }
});