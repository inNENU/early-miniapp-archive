var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '理发、照相、打印' },
      { name: 'p', head: '理发', text: '本部：浴池二楼净月：二食堂楼下（书店、水果店旁）、浴池外洗衣房旁' },
      { name: 'p', head: '照相', text: '本部：浴池一楼；北苑复印店（但是他们家主营打印复印，而且比较忙……）净月：二食堂楼下（书店、水果店旁）、二食堂一楼超市对面' },
      { name: 'p', head: '打印', text: '本部打印店分布于:浴池二楼、北苑超市旁、南苑、图书馆一楼、图书馆电子阅览室、师训大楼一楼（现搬至北苑地下一楼）净月打印店有：二食堂超市对面复印店、师大图文复印店' },
      { name: 'list', content: [{ text: '东师史上最全的复印店数据评估', url: 'http://mp.weixin.qq.com/s/SIVZp56HZTmvMfqua2c_VQ' }] },
    ],
  },
  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },
  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})