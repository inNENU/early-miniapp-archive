var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData;

P('noticeDetail', {
  data: {
    page: [{
      tag: 'head',
      title: '通知详情',
      leftText: "通知列表",
      grey: true
    }],
    notice: [],
    page2: [{
      tag: 'foot'
    }]
  },
  onLoad(res) {
    S.Set(this.data.page, a, null, this, false);
    S.request(`notice/${res.id}`, (data, indicator) => {
      indicator.setData({
        notice: data
      })
    }, this);
    this.id = res.id;
  },
  onPullDownRefresh() {
    S.request(`notice/${this.id}`, (data, indicator) => {
      indicator.setData({
        notice: data
      })
      wx.stopPullDownRefresh();
    }, this);
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  }
})