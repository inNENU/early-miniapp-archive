var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '资助' },
      { tag: 'h3', text: '资助申请流程' },
      { tag: 'p', text: '入学后，学校统一组织资助对象认定，对于获得资助对象资格的家庭经济困难学生给予相应资助。' },
      { tag: 'h3', text: '资助对象申请流程' },
      { tag: 'img', src: 'https://pic.kuaizhan.com/g1/M01/90/75/wKjmqVl8jQuABA5-AAAY6X0YK2o1398622/imageView/v1/thumbnail/640x0' },
      { tag: 'h3', text: '勤工助学岗位申请流程' },
      { tag: 'img', src: 'https://pic.kuaizhan.com/g1/M00/90/75/wKjmqVl8jQyAcBHIAAAwWIM0kLY4581472/imageView/v1/thumbnail/640x0' },
      { tag: 'h3', text: '' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})