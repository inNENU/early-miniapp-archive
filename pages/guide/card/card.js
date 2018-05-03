var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '校园卡' },
      { name: 'h2', text: '校园卡说明' },
      { name: 'p', text: '使用校园卡可以在校园内消费， 包括图书馆电子阅览室、图书超期罚款、宿舍网络的自助付费、食堂消费、超市购物、浴池洗澡等，进入图书馆或体育馆也需要用校园卡进行身份认证，洗漱间的生活用水、直饮水机的冷热水都需要用校园卡才能接到。' },
      { name: 'h2', text: '' },
      { name: 'p', text: '校园卡默认单次消费限额为20元，每日累计消费限额为100元，消费金额超过限额时需要输入密码，当然，也可以根据消费习惯通过自助终端机修改消费限额。', src: 'https://pic.kuaizhan.com/g1/M01/90/7B/wKjmqVl8kiiAI0oWAAFJCRiW1KA9407409/imageView/v1/thumbnail/640x0' },
      { name: 'list', heading: false,  content: [{ text: '一卡通自动终端机', url: 'details/card1' }, { text: '使用校园卡前需要做的三件事', url: 'details/card2' }, { text: '校园卡丢失', url: 'details/card3' }, { text: '更多服务', url: 'details/card4' }] },
      { name: 'h3', text: '' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})