var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '图书馆开门时间' },
      { name: 'h3', text: '本部校区' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/91/99/wKjmqVl9qfmAbEZDAAA35Azp2Vw8569121/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '净月校区' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6E/5A/CgpQU1l9qfuAZQuUAAAdeHg8vEk7191896/imageView/v1/thumbnail/640x0' }
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})