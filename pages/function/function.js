var u = require('../../utils/util.js');
const a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '功能大厅', top: true },
      { name: 'p', text: '\n哦伙计，我是开发者，我很抱歉，我还没有来得及做这一页，您先等一会儿吧。这页空着也不太好看，这样吧，我先写上：\n我爱陈璐~——Mr.Hope\n 您看怎么样？什么？您不同意？哦，没关系的，反正我已经写完了，也改不掉了。什么？您要打我？噢您不能这样对待您的老伙计！\n呜呜呜┭┮﹏┭┮ ......欸？您打不到我？哇！O(∩_∩)O\n那么，我就先溜了，拜拜了您那我敬爱的老伙计~\n么么哒(づ￣ 3￣)づ~' },
      { name: 'list', content: [{ text: '绩点计算(beta)', url: 'details/cal' }] },
    ],
  },
  onShow(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a,e) }); },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
})