/* global wx getApp*/
const tab = require('../lib/tab');
const { globalData: a, lib: { $act, $page, $set } } = getApp();

$page('function', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '功能大厅', action: true, grey: true }, {
        tag: 'grid',
        head: '',
        content: [
          { text: '校园地图', icon: '/icon/function/map.svg', url: '/function/map' },
          { text: '音律东师', icon: '/icon/function/music.svg', url: '/function/player' },
          { text: '体测计算器', icon: '/icon/function/PECal.svg', url: '/function/PEcal' },
          { text: '内网公告', icon: '/icon/function/notice.svg', url: '/function/notice' }
        ]
        /*
         * }, {
         *   tag: 'grid',
         *   head: '即将推出',
         *   content: [
         *     { text: '校园公众号', icon: '/icon/function/gzh.svg', aim: 'gzh0' },
         *     { text: '成绩查询', icon: '/icon/function/exam.svg', url: '/module/building?month=3' },
         *     { text: "影约东师", icon: "/icon/function/movie.svg", url: "/function/video" },
         *     { text: '课表查询', icon: '/icon/function/schedule.svg', url: '/module/building?month=3' },
         *     { text: '考场查询', icon: '/icon/function/score.svg', url: '/module/building?month=5' },
         *     { text: '绩点计算', icon: '/icon/function/scoreCal.svg', url: '/module/building?month=3' },
         *     { text: '故障报修', icon: '/icon/function/repair.svg', url: '/module/building?month=4' },
         *     { text: '东师掠影', icon: '/icon/function/scenery.svg', url: '/module/building?month=1' },
         *     { text: '校历', icon: '/icon/function/calendar.svg', url: '/module/building?month=1' }
         *   ]
         */
      }
    ]
  },
  onPreload(res) {
    $set.preSet(this.$take(res.query.name), a, { aim: 'function' }, this, false);
    this.set = true;
    console.log(`${this.aim}预加载用时${new Date() - a.date}ms`);
  },
  onLoad() {
    this.setData({ T: a.T, nm: a.nm });
    if (!this.set) {
      const page = wx.getStorageSync('function');

      $set.Set(page ? page : this.data.page, a, { aim: 'function' }, this, false);
    }
    $set.Notice('function');
    tab.update('function', '70K');
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
    if (test) $act.request('main/functionTest', data => {
      wx.setStorageSync('function', data);
      $set.Set(data, a, { aim: 'function' }, this, false);
    });
    // 正常加载逻辑
    else if (!this.set) $act.request('main/function', data => {
      wx.setStorageSync('function', data);
      $set.Set(data, a, { aim: 'function' }, this, false);
    });

    this.$on('theme', T => {
      this.setData({ T });
    });
    this.$on('nightmode', nm => {
      this.setData({ nm });
    });

    // 此处还需要再优化
    tab.markerSet();
  },
  onPullDownRefresh() {
    const test = wx.getStorageSync('test');

    // 开启测试时刷新页面
    if (test) $act.request('main/functionTest', data => {
      wx.setStorageSync('function', data);
      $set.Set(data, a, { aim: 'function' }, this, false);
    });

    tab.update('function', '80K');
    wx.stopPullDownRefresh();
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  }
});
