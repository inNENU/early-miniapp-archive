/*
 * @Author: Mr.Hope
 * @Date: 2019-04-15 08:18:06
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-25 07:08:35
 * @Description: 功能大厅
 */
import $register from 'wxpage';
import {
  resolvePage, setPage, popNotice, setColor, changeNav
} from '../utils/page';
import { checkResUpdate, markerSet, refreshPage } from '../utils/tab';
const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);

$register('function', {
  data: {
    T: a.T,
    nm: a.nm,

    /** 自定义导航栏配置 */
    head: { tag: 'head', title: '功能大厅', action: true, statusBarHeight: a.info.statusBarHeight },
    page: [
      { tag: 'head', title: '功能大厅', hidden: true },
      {
        tag: 'grid',
        head: false,
        content: [
          { text: '校园地图', color: 'orange', name: 'Map', icon: '/icon/tabPage/map.svg', url: '/function/map' },
          { text: '音律东师', color: 'red', name: 'Music', icon: '/icon/tabPage/music.svg', url: '/function/player' },
          {
            text: '体测计算器', color: 'blue', name: 'PE Calucator',
            icon: '/icon/tabPage/calculate.svg', url: '/function/PEcal'
          },
          {
            text: '校历', color: 'purple', name: 'Calendar',
            icon: '/icon/tabPage/calendar.svg', url: '/function/calendar'
          }
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
      },
      {
        tag: 'p',
        style: 'color:#888;font-size:14px;',
        text: '   Mr.Hope要考研了，小程序在年底之前应该不会推出新功能。Mr.Hope会尽量在明年推出大家需要的课程表、成绩查询等功能。'
      }
    ]
  },

  onPreload(res) {
    this.$put('function', resolvePage(res, wx.getStorageSync('function') || this.data.page));
    console.log(`功能大厅预加载用时${new Date().getTime() - a.date}ms`);
  },

  onLoad() {
    setPage(
      { option: { aim: 'function' }, ctx: this },
      this.$take('function') || this.data.page
    );
    popNotice('function');
    checkResUpdate('function', '100K');
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(true);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onReady() {
    // 注册事件监听器
    this.$on('theme', (T: string) => {
      this.setData({ T });
    });
    this.$on('nightmode', (nm: boolean) => {
      this.setData({ nm });
    });

    // 此处还需要再优化
    markerSet();
  },

  onPullDownRefresh() {
    refreshPage('function', this, a);
    checkResUpdate('function', '100K');
    wx.stopPullDownRefresh();
  },

  onPageScroll(event) {
    changeNav(event, this, 'head');
  },

  onShareAppMessage: () => ({ title: '功能大厅', path: '/page/function' })
});
