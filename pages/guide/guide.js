var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '东师指南', top: true, aimStep: 1, grey: true },
      { tag: 'list', content: [{ text: '新生报到', aim: 'chec' }, { text: '寝室', aim: 'dorm' }, { text: '生活', aim: 'life' }, { text: '食堂', aim: 'dining' }, { text: '校园卡', url: 'card/card' }, { text: '学习', aim: 'study' }, { text: '资助', aim: 'subsidize' },] },
    ],
  },
  onLoad() { u.sP(this.data.page, this, a); u.cRU(); },
  onShow() { this.setData({ nm: a.nm }) },
  onPageScroll(e) { u.nav(e, this) },
})