var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [{name:'head',title:'类型'},
      { name: 'h3', text: ' 类型' }, { name: 'img', src:'https://pic.kuaizhan.com/g1/M01/92/6E/wKjmqVl-lICAZLt6AABd3QCEIo47154996/imageView/v1/thumbnail/640x0'}
  
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})