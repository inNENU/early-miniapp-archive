var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '借书权限' },
      { tag: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/CC/CgpQVFl9qwWAL7ysAAAl7dk1wGc2885871/imageView/v1/thumbnail/640x0' }
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})