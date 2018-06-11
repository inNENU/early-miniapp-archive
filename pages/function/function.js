var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [{
        tag: 'head',
        title: '功能大厅',
        top: true
      },
      {
        tag: 'foot'
      },
    ],
  },
  onShow() {
    u.sP(this.data.page, this, a)
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
})