var P = require("../utils/wxpage"),
  S = require("../utils/setPage"),
  a = getApp().globalData;

P("situs", {
  data: {},
  onPreload(res) {
    this.xiaoqu = res.query.xiaoqu, this.id = res.query.id;
    this.aim = S.preSet(wx.getStorageSync(res.query.aim), a, res, this, false);
    console.log("Situs preload");
  },
  onLoad(res) {
    console.log(res);
    if (res.aim != this.aim) {
      this.aim = S.Online(a, res, this);
      console.log("onLoad 成功");
    }
    console.log(this.data.page);
    S.Notice(this.aim);
  },
  onReady() {
    this.marker = wx.getStorageSync(this.xiaoqu + "-all")[this.id];
  },
  // detail() {
  //   let markers = this.marker;
  //   wx.openLocation({
  //     latitude: marker.latitude,
  //     longitude: markers.longitude,
  //     name: markers.title,
  //   });
  // },
  onPageScroll(e) {
    S.nav(e, this);
  },
  cA(e) {
    S.component(e, this);
  },
  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: `/function/situs?From=主页&depth=1&share=true&xiaoqu=${this.xiaoqu}&id=${this.id}&aim=${this.aim}`
    };
  },
  redirect() {
    this.$switch("/pages/main");
  },
});