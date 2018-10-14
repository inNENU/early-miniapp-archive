var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData;

P('sharePage', {
  onNavigate(res) {
    S.preSet(this.$session.get(res.query.aim + 'Temp'), a, res, this)
  },
  onLoad(res) {
    if (!this.aim) {
      if ('scene' in res) {
        res.From = "主页", res.aim = decodeURIComponent(res.scene), res.share = true, res.step = 1;
      }
      S.Online(a, res, this);
    }
    wx.reportMonitor('2', 1)
  },
  navigate(res) {
    this.$route(res.currentTarget.dataset.url)
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
  redirect() {
    this.$launch('/pages/main')
  },
  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: `/modules/sharePage?From=主页&step=1&share=true&aim=${this.aim}`
    }
  },
  onUnload() {
    delete this.data.page;
  }
})