/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:49:51
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-21 16:40:25
 * @Description: 我的东师
 */
import * as $register from 'wxpage';
import {
  changeNav,
  popNotice,
  resolvePage,
  setColor,
  setPage
} from '../../utils/page';
import { AppOption } from '../../app';
const { globalData } = getApp<AppOption>();

$register('me', {
  data: {
    T: globalData.T,
    nm: globalData.nm,
    env: globalData.env,
    appID: globalData.appID,

    /** 自定义导航栏配置 */
    head: {
      title: '我的东师',
      action: true,
      grey: true,
      statusBarHeight: globalData.info.statusBarHeight
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
            url: 'outlook'
          },
          {
            text: '权限设置',
            icon: '/icon/tabPage/setting.svg',
            url: 'auth'
          },
          {
            text: '存储设置',
            icon: '/icon/tabPage/setting.svg',
            url: 'storage'
          },
          {
            text: '更新日志',
            icon: '/icon/tabPage/about.svg',
            url: 'log',
            desc: globalData.version
          },
          {
            text: '小程序内容',
            desc: '帮助更新?',
            icon: '/icon/tabPage/about.svg',
            url: 'resource'
          },
          {
            text: '关于',
            icon: '/icon/tabPage/about.svg',
            url: 'about'
          },
          {
            text: '捐赠Mr.Hope',
            icon: '/icon/tabPage/donate.svg',
            desc: '了解详情',
            url: 'donate',
            hidden: globalData.appID === 'wx9ce37d9662499df3'
          }
        ]
      }
    ],
    foot: {
      author: '',
      desc: `当前版本：${globalData.version}\n小程序由${
        globalData.appID === 'wx9ce37d9662499df3'
          ? '校学生会委托Mr.Hope'
          : 'Mr.Hope个人'
      }制作，如有错误还请见谅`
    }
  },

  onPreload(res) {
    this.$put('me', resolvePage(res, this.data.page));
    console.log(
      `我的东师预加载用时${new Date().getTime() - globalData.date}ms`
    );
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

  onShareAppMessage: () => ({
    title: globalData.appID === 'wx9ce37d9662499df3' ? 'myNENU' : 'in东师',
    path: '/page/main/main',
    imageUrl: `https://mp.innenu.com/img/${
      globalData.appID === 'wx9ce37d9662499df3' ? 'myNENU' : 'inNENU'
    }Share.jpg`
  })
});
