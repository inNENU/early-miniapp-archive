/* global wx getApp*/
const { globalData: a, lib: { $act, $page, $set } } = getApp();
const tab = require('../lib/tab');


$page('guide', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      {
        tag: 'head',
        title: '东师指南',
        action: true,
        aimDepth: 1,
        grey: true
      },
      {
        tag: 'grid',
        head: '',
        content: [
          // { text: '新生报到', icon: '/icon/guide/check.svg', aim: 'check0' },
          { text: '学习', icon: '/icon/guide/study.svg', aim: 'study0' },
          { text: '食堂', icon: '/icon/guide/dining.svg', aim: 'dining0' },
          { text: '生活', icon: '/icon/guide/life.svg', aim: 'life0' },
          { text: '寝室', icon: '/icon/guide/dorm.svg', aim: 'dorm0' },
          { text: '校园网', icon: '/icon/guide/network.svg', aim: 'network0' },
          { text: '校园卡', icon: '/icon/guide/card.svg', aim: 'card0' },
          { text: '吃喝玩乐', icon: '/icon/guide/nearby.svg', aim: 'nearby0' },
          { text: '交通', icon: '/icon/guide/traffic.svg', aim: 'traffic0' },
          { text: '学生组织', icon: '/icon/guide/studentOrg.svg', aim: 'studentOrg0' },
          { text: '社团', icon: '/icon/guide/corporation.svg', aim: 'corporation0' },
          { text: '资助', icon: '/icon/guide/subsidize.svg', aim: 'subsidize0' }
          // { text: 'SIM卡', icon: '/icon/guide/sim.svg', aim: 'sim0' }
        ]
      }
    ]
  },
  onPreload(res) {
    $set.preSet(this.$take(res.query.name), a, { aim: 'guide' }, this, false);
    this.set = true;
    console.log(`${this.aim}预加载用时${new Date() - a.date}ms`);
  },
  onLoad() {
    this.setData({ T: a.T, nm: a.nm });
    if (!this.set) {
      const page = wx.getStorageSync('guide');

      $set.Set(page ? page : this.data.page, a, { aim: 'guide' }, this, false);
    }
    $set.Notice('guide');
    tab.update('page', '150K');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const [nc, bc] = $set.color(a.nm, this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onReady() {
    const test = wx.getStorageSync('test');

    // 开启测试
    if (test) $act.request('main/guideTest', data => {
      wx.setStorageSync('guide', data);
      $set.Set(data, a, { aim: 'guide' }, this, false);
    });
    // 正常加载逻辑
    else if (!this.set) $act.request('main/guide', data => {
      wx.setStorageSync('guide', data);
      $set.Set(data, a, { aim: 'guide' }, this, false);
    });

    this.$on('theme', T => {
      this.setData({ T });
    });
    this.$on('nightmode', nm => {
      this.setData({ nm });
    });
    $set.preLoad(this, a);
  },
  onPullDownRefresh() {
    const test = wx.getStorageSync('test');

    // 开启测试时刷新页面
    if (test) $act.request('main/guideTest', data => {
      wx.setStorageSync('guide', data);
      $set.Set(data, a, { aim: 'guide' }, this, false);
    });

    tab.update('page', '145K');
    wx.stopPullDownRefresh();
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  },
  onShareAppMessage: () => ({ title: '东师指南', path: '/page/guide' })
});
