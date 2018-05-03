var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '净月美食节' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/FC/wKjmqll8S-uAc3_FAADkO8quTr06176119/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/FC/wKjmqll8TAeAJSd_AACUpE4nxHc7211506/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/FC/wKjmqll8TAqAN1CDAAGCsn0h8F48867427/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7F/40/CgpQVFl8TAyAMlO2AADkUEmv9nA3724359/imageView/v1/thumbnail/640x0' },
    ],
  },
  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },
  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } },
  back() { u.back() },
})