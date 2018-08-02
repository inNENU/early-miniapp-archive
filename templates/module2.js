var c = getApp().common,
  a = getApp().globalData;
Page({
	data: {
		T: a.T,
		nm: a.nm
	},
  onLoad(e) {
    // c.getContent(this, a, e)
  },
  onReady() {
    c.preloadPage(this.data.page, a);
  },
  onPageScroll(e) {
    c.nav(e, this)
  },
  cA(e) {
    c.componentAction(e, this)
  },
	onShareAppMessage() {
		return {
			title: this.data.page[0].title,
			path: '/templates/module1?From=主页&step=1&share=true&aim=' + this.name
		}
	},
  redirect() {
    wx.switchTab({
      url: '/pages/main/guide'
    })
  },
})