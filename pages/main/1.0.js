var P = require('../../utils/wxpage'),
  S = require('../../utils/setPage'),
  a = getApp().globalData;

P('0.9', {
  data: {
    page: [{
      tag: 'head',
      title: '更新日志',
      grey: true
    }],
  },
  onLoad(res) {
    S.Set(this.data.page, a, res, this, false);
    S.Notice(this.aim);
    console.log('V0.9Log onLoad finished.')
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  }
})