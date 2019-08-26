/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:48:39
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-25 13:53:13
 * @Description: 东师指南
 */
import $register from 'wxpage';
import $page from '../utils/page';
import $search from '../utils/search';
import $tab from '../utils/tab';
const { globalData: a } = getApp();

$register('guide', {
  data: {
    T: a.T,
    nm: a.nm,
    words: [] as string[],
    head: { title: '东师指南', action: true, statusBarHeight: a.info.statusBarHeight },
    page: [
      { tag: 'head', title: '东师指南', hidden: true },
      {
        tag: 'grid',
        head: '学在东师',
        content: [
          { text: '学习', color: 'orange', name: 'Study', icon: '/icon/tabPage/study.svg', aim: 'study0' },
          { text: '课程', color: 'blue', name: 'Course', icon: '/icon/tabPage/course.svg', aim: 'course0' },
          { text: '图书馆', color: 'red', name: 'Library', icon: '/icon/tabPage/library.svg', aim: 'library0' },
          { text: '考试', color: 'purple', name: 'Exam', icon: '/icon/tabPage/test.svg', aim: 'test0' }
        ]
      },
      {
        tag: 'grid',
        head: '行在东师',
        content: [
          { text: '食堂', color: 'orange', name: 'Dining', icon: '/icon/tabPage/dining.svg', aim: 'dining0' },
          { text: '校园卡', color: 'blue', name: 'Card', icon: '/icon/tabPage/card.svg', aim: 'card0' },
          { text: '生活', color: 'red', name: 'Life', icon: '/icon/tabPage/life.svg', aim: 'life0' },
          { text: '寝室', color: 'purple', name: 'Dorm', icon: '/icon/tabPage/dorm.svg', aim: 'dorm0' },
          { text: '校园网', color: 'cyan', name: 'Network', icon: '/icon/tabPage/network.svg', aim: 'network0' },
          { text: '资助', color: 'olive', name: 'Subsidize', icon: '/icon/tabPage/subsidize.svg', aim: 'subsidize0' },
          { text: '学校机构', color: 'mauve', name: 'Apartment', icon: '/icon/tabPage/studentOrg.svg', aim: 'apartment0' }
        ]
      },
      {
        tag: 'grid',
        head: '乐在东师',
        content: [
          {
            text: '学生组织', color: 'orange', name: 'Orgnazation',
            icon: '/icon/tabPage/studentOrg.svg', aim: 'studentOrg0'
          },
          { text: '社团', color: 'blue', name: 'Coporation', icon: '/icon/tabPage/corporation.svg', aim: 'corporation0' },
          { text: '交通', color: 'red', name: 'Traffic', icon: '/icon/tabPage/traffic.svg', aim: 'traffic0' },
          { text: '吃喝玩乐', color: 'purple', name: 'Nearby', icon: '/icon/tabPage/nearby.svg', aim: 'nearby0' }
          // { text: 'SIM卡', icon: '/icon/guide/sim.svg', aim: 'sim0' }
        ],
        foot: ' '
      },
      {
        tag: 'grid',
        head: '新生你好',
        content: [
          { text: '新生报到', color: 'orange', name: 'Check', icon: '/icon/tabPage/check.svg', aim: 'check0' },
          {
            text: '防盗防骗', color: 'blue', name: 'Safety',
            icon: 'https://mp.nenuyouth.com/icon/module/safe.svg', aim: 'check14'
          },
          {
            text: '缴费相关', color: 'red', name: 'Payment',
            icon: 'https://mp.nenuyouth.com/icon/module/pay.svg', aim: 'check10'
          }
        ]
      }
    ]
  },
  onPreload(res) {
    const pageData = this.$take('guide');

    $page.resolve(res, pageData ? pageData : wx.getStorageSync('guide'));
    console.log(`东师指南预加载用时${new Date().getTime() - a.date}ms`);
  },
  onLoad() {
    $page.Set({ option: { aim: 'guide' }, ctx: this });
    $page.Notice('guide');
    $tab.update('page', '235K');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(true);

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
  },
  onPullDownRefresh() {
    $tab.refresh('guide', this, a);
    $tab.update('page', '235K');
    wx.stopPullDownRefresh();
  },
  onPageScroll(event) {
    $page.nav(event, this, 'head');
  },
  searching({ detail }: WXEvent.Input) {
    this.setData({ words: $search.searching(detail.value) });
  },
  search({ detail }: WXEvent.Input) {
    this.$route(`search?words=${detail.value}`);
  },
  onShareAppMessage: () => ({ title: '东师指南', path: '/page/guide' })
});
