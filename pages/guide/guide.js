var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '东师指南', top: true, aimStep: 1, grey: true },
      { tag: 'list', content: [{ text: '新生报到', url: 'check/check' }, { text: '寝室', url: 'dorm/dorm', aim: 'dorm' }, { text: '生活', url: 'life/life', aim: 'life' }, { text: '食堂', url: 'dining/dining', aim: 'dining' }, { text: '校园卡', url: 'card/card' }, { text: '学习', url: 'study/study', aim: 'study' }, { text: '资助', url: 'subsidize/subsidize' }, { text: '资助2', url: 'subsidize/subsidize2' },] },
    ],
  },
  onShow() { u.sP(this.data.page, this, a) },
  onPageScroll(e) { u.nav(e, this.data.page, this) },
})