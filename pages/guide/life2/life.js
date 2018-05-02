var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'head', title: '生活' },
      { name: 'list', content: [{ text: '洗浴', url: 'details\life1' }, { text: '理发、照相、打印', url: 'details\life2' }, { text: '超市、ATM', url: 'details\life3' }, { text: '快递', url: 'details\life4' },], },

    ],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})