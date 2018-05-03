var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '类型及评定时间' },
      { name: 'h3', text: ' 类型' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/92/6E/wKjmqVl-lICAZLt6AABd3QCEIo47154996/imageView/v1/thumbnail/640x0' },
      { name: 'h3', title: '评定时间' },
      { name: 'h3', text: ' 9月' },
      { name: 'p', text: '宝钢奖学金' },
      { name: 'h3', text: ' 10月' },
      { name: 'p', text: '国家奖学金' },
      { name: 'p', text: '学年奖学金（校长奖学金、一等奖学金、二等奖学金、三等奖学金）' },
      { name: 'p', text: '单项奖学金' },
      { name: 'p', text: '国家励志奖学金' },
      { name: 'p', text: '叶圣陶奖学金' },
      { name: 'h3', text: ' 次年3月' },
      { name: 'p', text: '明德奖学金' },
      { name: 'h3', text: ' 次年6月' },
      { name: 'p', text: '学年奖学金（针对毕业生）' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})