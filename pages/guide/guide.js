var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '东师指南', top: true },
      { name: 'list', content: [{ text: '新生报到', url: 'check/check' }, { text: '寝室', url: 'dorm/dorm' }, { text: '食堂', url: 'dining/dining' }, { text: '校园卡', url: 'card/card' }, { text: '学习', url: 'study/study' }, { text: '资助', url: 'subsidize/subsidize' }, { text: '资助2', url: 'subsidize/subsidize2' },] },
    ], grey: true,
  },
  onShow() { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
})