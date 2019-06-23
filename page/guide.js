/* global wx getApp*/
const { globalData: a, lib: { $component, $page, $register, $wx } } = getApp();
const $tab = require('../lib/tab');

$register('guide', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '东师指南', action: true, aimDepth: 1, grey: true },
      {
        tag: 'grid',
        head: '学在东师',
        content: [
          { text: '学习', icon: '/icon/tabPage/study.svg', aim: 'study0' },
          { text: '课程', icon: '/icon/tabPage/course.svg', aim: 'course0' },
          { text: '图书馆', icon: '/icon/tabPage/library.svg', aim: 'library0' },
          { text: '考试', icon: '/icon/tabPage/test.svg', aim: 'test0' }
        ]
      },
      {
        tag: 'grid',
        head: '行在东师',
        content: [
          { text: '食堂', icon: '/icon/tabPage/dining.svg', aim: 'dining0' },
          { text: '校园卡', icon: '/icon/tabPage/card.svg', aim: 'card0' },
          { text: '生活', icon: '/icon/tabPage/life.svg', aim: 'life0' },
          { text: '寝室', icon: '/icon/tabPage/dorm.svg', aim: 'dorm0' },
          { text: '校园网', icon: '/icon/tabPage/network.svg', aim: 'network0' },
          { text: '资助', icon: '/icon/tabPage/subsidize.svg', aim: 'subsidize0' }
        ]
      },
      {
        tag: 'grid',
        head: '乐在东师',
        content: [
          { text: '学生组织', icon: '/icon/tabPage/studentOrg.svg', aim: 'studentOrg0' },
          { text: '社团', icon: '/icon/tabPage/corporation.svg', aim: 'corporation0' },
          { text: '交通', icon: '/icon/tabPage/traffic.svg', aim: 'traffic0' },
          { text: '吃喝玩乐', icon: '/icon/tabPage/nearby.svg', aim: 'nearby0' }
          /*
           * { text: '新生报到', icon: '/icon/guide/check.svg', aim: 'check0' },
           * { text: 'SIM卡', icon: '/icon/guide/sim.svg', aim: 'sim0' }
           */

        ],
        foot: ' '
      }
    ]
  },
  onPreload(res) {
    const pageData = this.$take('guide');

    $page.resolve(res, pageData ? pageData : wx.getStorageSync('guide'));
    console.log(`东师指南预加载用时${new Date() - a.date}ms`);
  },
  onLoad() {
    $page.Set({ option: { aim: 'guide' }, ctx: this });
    $page.Notice('guide');
    $tab.update('page', '150K');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const [nc, bc] = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onReady() {
    this.$on('theme', T => {
      this.setData({ T });
    });
    this.$on('nightmode', nm => {
      this.setData({ nm });
    });
    $page.preGet(this.data.page);
  },
  onPullDownRefresh() {
    $tab.refresh('guide', this, a);
    $tab.update('page', '145K');
    wx.stopPullDownRefresh();
  },
  onPageScroll(e) {
    $component.nav(e, this);
  },
  cA(e) {
    $component.trigger(e, this);
  },
  onShareAppMessage: () => ({ title: '东师指南', path: '/page/guide' })
});
