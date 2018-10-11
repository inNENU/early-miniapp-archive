var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData;

P('notice', {
  data: {
    page: [{
      tag: 'head',
      title: '内网公告',
      leftText: "功能大厅"
    }],
		notice:[

		]
  },
  onLoad(options) {
    S.Set(this.data.page, a, null, this, false);
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
})