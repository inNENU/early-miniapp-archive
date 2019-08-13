/*
 * @Author: Mr.Hope
 * @Date: 2019-04-15 08:18:06
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-13 19:25:14
 * @Description: 主页
 */
import $register from 'wxpage';
import $wx from '../utils/wx';
import $page from '../utils/page';
import $search from '../utils/search';
import $tab from '../utils/tab';
const { globalData: a } = getApp();

$register('main', {
  data: {
    T: a.T,
    nm: a.nm,
    words: [],
    head: { title: '首页', action: true, statusBarHeight: a.info.statusBarHeight },
    page: [
      { tag: 'head', title: '首页', aim: 'main', grey: true, hidden: true },
      {
        tag: 'grid',
        head: '新生你好',
        content: [
          {
            text: '报到流程', color: 'orange', name: 'Check',
            icon: 'https://mp.nenuyouth.com/icon/module/list.svg', aim: 'check9'
          },
          {
            text: '需带物品', color: 'blue', name: 'Necessary',
            icon: 'https://mp.nenuyouth.com/icon/module/good.svg', aim: 'check7'
          },
          {
            text: '缴费相关', color: 'red', name: 'Payment',
            icon: 'https://mp.nenuyouth.com/icon/module/pay.svg', aim: 'check10'
          },
          {
            text: '防盗防骗', color: 'purple', name: 'Fraud Guard',
            icon: 'https://mp.nenuyouth.com/icon/module/safe.svg', aim: 'check14'
          }
        ]
      },
      {
        tag: 'list',
        head: false,
        content: [
          {
            text: '查看更多',
            icon: '/icon/tabPage/check.svg',
            aim: 'check0'
          }
        ],
        foot: ' '
      },
      {
        tag: 'list',
        head: '新生关心的问题',
        content: [
          {
            text: '新生入学前课程学习',
            icon: '/icon/tabPage/course.svg',
            aim: 'FAQ11'
          },
          {
            text: '报道时间',
            icon: '/icon/tabPage/check.svg',
            aim: 'FAQ7'
          },
          {
            text: '导员姓名及联系方式',
            icon: '/components/common/phone/phone.svg',
            aim: 'FAQ10'
          },
          {
            text: '查看更多',
            icon: 'https://mp.nenuyouth.com/icon/module/list.svg',
            aim: 'FAQ0'
          }
        ]
      },
      {
        tag: 'list',
        head: '专业调整',
        content: [
          {
            text: '双学位与辅修',
            icon: '/icon/tabPage/course.svg',
            aim: 'course13'
          },
          {
            text: '转专业',
            icon: '/icon/tabPage/course.svg',
            aim: 'course12'
          },
          {
            text: '查看更多',
            icon: '/icon/tabPage/course.svg',
            aim: 'course0'
          }
        ]
      },
      {
        tag: 'p',
        head: ' ',
        style: 'font-size:14px;color:#888;',
        text: '   如果各位新生同学们还有什么疑问，但是小程序中没有提及的，欢迎联系QQ1178522294咨询。'
      }
    ]
  },
  onPageLaunch() {
    console.log('主页面启动：', new Date().getTime() - a.date, 'ms');
    const page = wx.getStorageSync('main');
    const color = a.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];

    $page.resolve({ query: { aim: 'main' } }, page ? page : this.data.page);
    wx.setTabBarStyle({
      color: '#8a8a8a',
      selectedColor: '#3cc51f',
      backgroundColor: color[0],
      borderStyle: color[1]
    });
    $search.init();
  },
  onLoad() {
    $page.Set({ option: { aim: 'main' }, ctx: this });
    $tab.refresh('main', this, a);
    $page.Notice('main');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);
    const color = this.data.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];

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

    // 执行tab页预加载
    ['guide', 'function'].forEach(x => {
      $wx.request(`config/${a.appID}/${a.version}/${x}`, (data: object) => {
        this.$put(x, data);
        this.$preload(`${x}?aim=${x}`);
        wx.setStorageSync(x, data);
      });
    });
    this.$preload('me?aim=me');
  },
  onPullDownRefresh() {
    $tab.refresh('main', this, a);
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
  onShareAppMessage: () => ({ title: 'myNENU', path: '/page/main' })
});
