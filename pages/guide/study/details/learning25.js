var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '馆藏分布' },
      { tag: 'h3', text: ' 本部校区' },
      { tag: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6E/4F/CgpQU1l9prSAXSeJAABZblS3sG87598972/imageView/v1/thumbnail/640x0' },
      { tag: 'h3', text: ' 净月校区' },
      { tag: 'img', src: 'https://pic.kuaizhan.com/g2/M01/91/67/wKjmqlmDE_mAM9RxAABwbEJI6104290272/imageView/v1/thumbnail/640x0' },
      { tag: 'h3', text: ' 图书馆馆藏分布' },
      { tag: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6E/59/CgpQU1l9qISATKcEAA_anR6DMbc6240540/imageView/v1/thumbnail/640x0' }

    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})