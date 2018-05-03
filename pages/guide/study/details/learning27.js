var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '借书权限' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/CC/CgpQVFl9qwWAL7ysAAAl7dk1wGc2885871/imageView/v1/thumbnail/640x0' }
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})