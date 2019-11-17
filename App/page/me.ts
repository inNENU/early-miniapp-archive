/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:49:51
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-03 13:12:04
 * @Description: 我的东师
 */
import * as $register from 'wxpage';
import {
  changeNav,
  popNotice,
  resolvePage,
  setColor,
  setPage
} from '../utils/page';
const { globalData: a } = getApp<{}, GlobalData>();

$register('me', {
  data: {
    T: a.T,
    nm: a.nm,
    env: a.env,
    appID: a.appID,

    /** 自定义导航栏配置 */
    head: {
      title: '我的东师',
      action: true,
      grey: true,
      statusBarHeight: a.info.statusBarHeight
    },
    page: [
      { tag: 'head', title: '我的东师', hidden: true },
      {
        tag: 'list',
        head: false,
        content: [
          {
            text: '外观设置',
            icon: '/icon/tabPage/setting.svg',
            url: '/settings/outlook'
          },
          {
            text: '权限设置',
            icon: '/icon/tabPage/setting.svg',
            url: '/settings/authorize'
          },
          {
            text: '存储设置',
            icon: '/icon/tabPage/setting.svg',
            url: '/settings/storage'
          },
          {
            text: '更新日志',
            icon: '/icon/tabPage/about.svg',
            url: '/settings/log',
            desc: a.version
          },
          {
            text: '小程序内容',
            desc: '帮助更新?',
            icon: '/icon/tabPage/about.svg',
            url: '/settings/resource'
          },
          {
            text: '关于',
            icon: '/icon/tabPage/about.svg',
            url: '/settings/about'
          },
          {
            text: '捐赠Mr.Hope',
            icon: '/icon/tabPage/donate.svg',
            desc: '了解详情',
            url: '/settings/donate',
            hidden: a.appID === 'wx9ce37d9662499df3'
          }
        ]
      }
    ],
    foot: {
      author: '',
      desc: `当前版本：${a.version}\n小程序由${
        a.appID === 'wx9ce37d9662499df3' ? '校学生会委托Mr.Hope' : 'Mr.Hope个人'
      }制作，如有错误还请见谅`
    }
  },

  onPreload(res) {
    this.$put('me', resolvePage(res, this.data.page));
    console.log(`我的东师预加载用时${new Date().getTime() - a.date}ms`);
  },

  onLoad() {
    setPage({ option: { aim: 'me' }, ctx: this }, this.$take('me'));
    popNotice('me');
  },

  onShow() {
    const color = this.data.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];
    const { nc, bc } = setColor(true);

    // 设置胶囊、背景颜色以及tab栏颜色
    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
    wx.setTabBarStyle({
      color: '#8a8a8a',
      selectedColor: '#3cc51f',
      backgroundColor: color[0],
      borderStyle: color[1]
    });
  },

  onReady() {
    // 注册事件监听器
    this.$on('theme', (T: string) => {
      this.setData({ T });
    });
    this.$on('nightmode', (nm: boolean) => {
      this.setData({ nm });
    });
  },

  onPageScroll(event) {
    changeNav(event, this, 'head');
  },

  onShareAppMessage: () => ({ title: '我的东师', path: '/page/me' })
});
