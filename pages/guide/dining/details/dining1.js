var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '北苑餐厅' },
      { name: 'h3', text: '一楼' },
      { name: 'p', text: '北苑餐厅一楼整体区域分为两个部分。位于北侧的区域为基本餐区，每天分时间段供应三餐, 相对于其他档口，基本餐价格比较亲民。一楼南侧为其他档口，以特色餐和各式快餐为主。几乎所有档口不分时段供应对应饮食，价格比外面餐馆略低。' },
      { name: 'list', content: [{ text: '了解更多', url: 'dining7' }] },
      { name: 'h3', text: '' },
      { name: 'h3', text: '二楼' },
      { name: 'h3', text: '此处是二楼介绍' },
      { name: 'p', text: '。。。。。。' },
      { name: 'list', content: [{ text: '了解更多', url: 'dining8' }] },
      { name: 'h3', text: '' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})