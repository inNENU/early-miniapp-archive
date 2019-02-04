var P = getApp().lib.$page, S = getApp().lib.$set, a = getApp().globalData, tab = require("../utils/tab");

P("me", {
  data: {
    page: [{
      tag: "head",
      title: "我的东师",
      action: true,
      grey: true,
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
      desc: "当前版本：" + a.version
    }]
  },
  onPreload() {
    if (!S.preSet(this.data.page, a, null, this, false)) {
      this.set = true;
    }
    console.log("Me preload finished time:", new Date() - a.date, "ms");
  },
  onLoad() {
    if (!this.set) S.Set(this.data.page, a, null, this, false);
    S.Notice("me");
    this.$on("theme", data => {
      this.setData({ T: data });
    });
    this.$on("nightmode", data => {
      this.setData({ nm: data });
    });
  },
  onShow() {
    tab.tabBarChanger(a.nm);
    this.$preload("setting?From=我的东师"), this.$preload("about?From=我的东师");
  },
  onReady() {
    if (!this.set) S.Set(this.data.page, a, null, this);
  },
  onPageScroll(e) {
    S.nav(e, this);
  },
  cA(e) {
    S.component(e, this);
  },
});