var c = getApp().common,
  a = getApp().globalData;
Page({
  data: {
    page: [{
      tag: "head",
      title: "校园风景"
    }],
    currentSrc: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
    imgs: [{
      id: 1,
      url: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
    }, {
      id: 2,
      url: "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg"
    },
    {
      id: 3,
      url: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"
    }
    ]
  },
  onLoad(e) {
    c.setPage(this.data.page, this, a, e);
    this.setData({ info: a.info });
  },

  /*
   * onReady() {
   * 	c.preloadPage(this.data.page, a);
   * },
   */
  onPageScroll(e) {
    c.nav(e, this);
  },
  cA(e) {
    c.componentAction(e, this);
  }

  /*
   * onShareAppMessage() {
   * 	return {
   * 		title: this.data.page[0].title,
   * 		path: '/templates/module1?From=主页&depth=1&share=true&aim=' + this.name
   * 	}
   * },
   * redirect() {
   * 	console.log(getCurrentPages())
   * 	wx.switchTab({
   * 		url: '/pages/guide'
   * 	})
   * },
   */
});