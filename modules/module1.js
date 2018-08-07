var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData;

P('module1', {
  onNavigate(res) {
    console.log('将要跳转：', res)
    this.aim = S.preSet(this.$session.get(res.query.aim + 'Temp'), a, res, this);
    this.set = true;
    console.log(this.aim + '载入'), console.log(this.data);
  },
  onLoad(res) {
    if (!this.set) {
      this.aim = S.Online(a, res, this)
    }
    S.Notice(this.aim);
  },
  onReady() {
    S.preLoad(this, a);
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
  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: '/templates/module1?From=主页&step=1&share=true&aim=' + this.name
    }
  },
  redirect() {
    $switch('guide')
    // wx.switchTab({
    //   url: '/pages/guide'
    // })
  },
})