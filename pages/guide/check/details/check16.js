var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '净月校区校门' },
      { name: 'h3', text: '净月校区图' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/82/B2/wKjmqll93pWAaqvCAAQbHyLV_ko9159655/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '净月东门' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7D/AF/wKjmqll637CAd3TdAB92hvI6uGk6755607/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '这个门正对着图书馆，进门后一直往前走，往前走（这条路有点长），经过大菜花（其实是生命树）后再往前走，走到头就是图书馆前的空地了，迎新摆台就在那里。' },
      { name: 'h3', text: '净月北门（雕塑门）' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/8E/77/wKjmqVl7QcGAJ2j_AAGRcU9FO803479870/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '从这个门进去之后直走，看到右手边有一些雕塑（或者图书馆）后右拐，一直走到图书馆前的空地，那里就是迎新摆台的地方。' },
    ],
  },
  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },
  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } },
  back() { u.back() },
})