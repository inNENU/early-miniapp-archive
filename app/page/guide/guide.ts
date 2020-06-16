/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:48:39
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-17 17:39:42
 * @Description: 东师指南
 */
import $register = require('wxpage');
import {
  changeNav,
  popNotice,
  resolvePage,
  setColor,
  setPage
} from '../../utils/page';
import { checkResUpdate, refreshPage } from '../../utils/tab';
import $search from '../../utils/search';
import { AppOption } from '../../app';
const { globalData } = getApp<AppOption>();

$register('guide', {
  data: {
    theme: globalData.theme,

    /** 候选词 */
    words: [] as string[],

    /** 自定义导航栏配置 */
    head: {
      title: '东师指南',
      action: true,
      statusBarHeight: globalData.info.statusBarHeight
    },
    page: [
      { tag: 'head', title: '东师指南', hidden: true },
      {
        tag: 'grid',
        head: '学在东师',
        content: [
          {
            text: '课程',
            color: 'blue',
            name: 'Course',
            icon: '/icon/tabPage/course.svg',
            aim: 'course0'
          },
          {
            text: '学习',
            color: 'orange',
            name: 'Study',
            icon: '/icon/tabPage/study.svg',
            aim: 'study0'
          },
          {
            text: '图书馆',
            color: 'red',
            name: 'Library',
            icon: '/icon/tabPage/library.svg',
            aim: 'library0'
          },
          {
            text: '考试',
            color: 'purple',
            name: 'Exam',
            icon: '/icon/tabPage/test.svg',
            aim: 'test0'
          }
        ]
      },
      {
        tag: 'grid',
        head: '行在东师',
        content: [
          {
            text: '校园卡',
            color: 'blue',
            name: 'Card',
            icon: '/icon/tabPage/card.svg',
            aim: 'card0'
          },
          {
            text: '账户',
            color: 'orange',
            name: 'Account',
            icon: '/icon/tabPage/account.svg',
            aim: 'account0'
          },
          {
            text: '食堂',
            color: 'red',
            name: 'Dining',
            icon: '/icon/tabPage/dining.svg',
            aim: 'dining0'
          },
          {
            text: '生活',
            color: 'purple',
            name: 'Life',
            icon: '/icon/tabPage/life.svg',
            aim: 'life0'
          },
          {
            text: '寝室',
            color: 'cyan',
            name: 'Dorm',
            icon: '/icon/tabPage/dorm.svg',
            aim: 'dorm0'
          },
          {
            text: '校园网',
            color: 'olive',
            name: 'Network',
            icon: '/icon/tabPage/network.svg',
            aim: 'network0'
          },
          {
            text: '资助',
            color: 'mauve',
            name: 'Subsidize',
            icon: '/icon/tabPage/subsidize.svg',
            aim: 'subsidize0'
          }
        ]
      },
      {
        tag: 'grid',
        head: '乐在东师',
        content: [
          {
            text: '学生组织',
            color: 'blue',
            name: 'Orgnazation',
            icon: '/icon/tabPage/studentOrg.svg',
            aim: 'studentOrg0'
          },
          {
            text: '社团',
            color: 'orange',
            name: 'Coporation',
            icon: '/icon/tabPage/corporation.svg',
            aim: 'corporation0'
          },
          {
            text: '交通',
            color: 'red',
            name: 'Traffic',
            icon: '/icon/tabPage/traffic.svg',
            aim: 'traffic0'
          },
          {
            text: '吃喝玩乐',
            color: 'purple',
            name: 'Nearby',
            icon: '/icon/tabPage/nearby.svg',
            aim: 'nearby0'
          }
        ],
        foot: ' '
      },
      {
        tag: 'grid',
        head: '关于东师',
        content: [
          {
            text: '学校概况',
            color: 'blue',
            name: 'Description',
            icon: '/icon/tabPage/about.svg',
            aim: 'about0'
          },
          {
            text: '学校机构',
            color: 'orange',
            name: 'Apartment',
            icon: '/icon/tabPage/apartment.svg',
            aim: 'apartment0'
          }
        ],
        foot: ' '
      },
      {
        tag: 'grid',
        head: '新生你好',
        content: [
          {
            text: 'SIM卡',
            color: 'blue',
            name: 'SIM',
            icon: '/icon/tabPage/sim.svg',
            aim: 'sim0'
          },
          {
            text: '新生报到',
            color: 'orange',
            name: 'Check',
            icon: '/icon/tabPage/check.svg',
            aim: 'check0'
          }
        ]
      }
    ]
  },

  onPreload(res) {
    this.$put(
      'guide',
      resolvePage(res, wx.getStorageSync('guide') || this.data.page)
    );
    console.log(
      `东师指南预加载用时${new Date().getTime() - globalData.date}ms`
    );
  },

  onLoad() {
    setPage(
      { option: { aim: 'guide' }, ctx: this },
      this.$take('guide') || this.data.page
    );
    popNotice('guide');
    checkResUpdate('page', '250K');
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(true);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onReady() {
    // 注册事件监听器
    this.$on('theme', (theme: string) => {
      this.setData({ theme });
    });
  },

  onPullDownRefresh() {
    refreshPage('guide', this, globalData);
    checkResUpdate('page', '235K');
    wx.stopPullDownRefresh();
  },

  onPageScroll(event) {
    changeNav(event, this, 'head');
  },

  onShareAppMessage: () => ({ title: '东师指南', path: '/page/guide/guide' }),

  /**
   * 在搜索框中输入时触发的函数
   *
   * @param value 输入的搜索词
   */
  searching({ detail: { value } }: WXEvent.Input) {
    this.setData({ words: $search.searching(value) });
  },

  /**
   * 跳转到搜索页面
   *
   * @param value 输入的搜索词
   */
  search({ detail }: WXEvent.Input) {
    this.$route(`search?words=${detail.value}`);
  }
});
