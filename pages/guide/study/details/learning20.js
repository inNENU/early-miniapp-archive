var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [{ name: 'head', title: '专业准入细则' }, { name: 'p', text:'请复制网址后到浏览器查看。\nhttps://pan.baidu.com/s/1skQZr7R'}


    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})