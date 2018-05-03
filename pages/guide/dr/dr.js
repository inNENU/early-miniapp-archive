var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'head', title: '餐厅' },
      { name: 'h2', text: '本部校区' },
      { name: 'list', content: [{ text: '北苑食堂', url: 'details/dr1' }, { text: '南苑食堂', url: 'details/dr2' }, { text: '美食节', url: 'details/dr3' },], },
      { name: 'h2', text: '净月校区' },
      { name: 'list', content: [{ text: '中快餐厅', url: 'details/dr4' }, { text: '二食堂', url: 'details/dr5' }, { text: '美食节', url: 'details/dr6' },], },
    ],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})