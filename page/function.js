/* global wx getApp*/
const { globalData: a, lib: { $component, $page, $register, $wx } } = getApp();
const $tab = require('../utils/tab');

$register('function', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '功能大厅', action: true, grey: true }, {
        tag: 'grid',
        head: '',
        content: [
          { text: '校园地图', icon: '/icon/tabPage/map.svg', url: '/function/map' },
          { text: '音律东师', icon: '/icon/tabPage/music.svg', url: '/function/player' },
          { text: '体测计算器', icon: '/icon/tabPage/calculate.svg', url: '/function/PEcal' }
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
    const pageData = this.$take('function');

    $page.resolve(res, pageData ? pageData : wx.getStorageSync('function'));
    console.log(`功能大厅预加载用时${new Date() - a.date}ms`);
  },
  onLoad() {
    $page.Set({ option: { aim: 'function' }, ctx: this });
    $page.Notice('function');
    $tab.update('function', '70K');
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

    // 此处还需要再优化
    $tab.markerSet();
  },
  onPullDownRefresh() {
    $tab.refresh('guide', this, a);
    $tab.update('function', '80K');
    wx.stopPullDownRefresh();
  },
  onPageScroll(e) {
    $component.nav(e, this);
  },
  cA(e) {
    $component.trigger(e, this);
  },
  onShareAppMessage: () => ({ title: '功能大厅', path: '/page/function' })
});
