var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '类型及评定时间' },
      { name: 'h3', text: ' 类型' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/92/6E/wKjmqVl-lICAZLt6AABd3QCEIo47154996/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '评定时间' },
      { name: 'p', head: '9月', text: '宝钢奖学金' },
      { name: 'p', head: '10月', text: '国家奖学金\n学年奖学金(校长奖学金、一等奖学金、二等奖学金、三等奖学金)\n单项奖学金\n国家励志奖学金\n叶圣陶奖学金' },
      { name: 'p', head: '次年3月', text: '明德奖学金' },
      { name: 'p', head: '次年6月', text: '学年奖学金(针对毕业生)' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})