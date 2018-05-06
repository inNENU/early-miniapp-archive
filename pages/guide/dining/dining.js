var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '食堂' },
      { tag: 'p', head: '本部校区', text: '  本部校区有北苑餐厅和南苑餐厅两个食堂。北苑餐厅共两层，南苑餐厅共三层。地理位置如图：', src: 'https://pic.kuaizhan.com/g1/M01/6C/9E/CgpQU1l8LBKAAIbWAAD7j-z-b3M8245036/imageView/v1/thumbnail/640x0' },
      { tag: 'list', head: false, content: [{ text: '北苑餐厅', url: 'details/dining1' }, { text: '南苑餐厅', url: 'details/dining2' }] },
      { tag: 'list', head: '净月校区', content: [{ text: '净月校区有两个食堂，分别为中快食堂和二食堂，中快食堂有三层、二食堂有两层。中快餐厅共三层楼，每一层楼有自己的特色。' }, { text: '中快餐厅', url: 'details/dining4' }, { text: '二食堂', url: 'details/dining5' }] },
      { tag: 'list', head: '美食节', foot: '学校食堂每年都会举行美食节', content: [{ text: '再加点介绍' }, { text: '本部美食节', url: 'details/dining3' }, { text: '净月美食节', url: 'details/dining6' }] },
      { tag: 'foot' },
    ],
  },
  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },
  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})