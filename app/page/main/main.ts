/*
 * @Author: Mr.Hope
 * @Date: 2019-04-15 08:18:06
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-21 17:16:55
 * @Description: 主页
 */
import * as $register from 'wxpage';
import {
  changeNav,
  popNotice,
  resolvePage,
  setColor,
  setPage
} from '../../utils/page';
import { checkResUpdate, refreshPage } from '../../utils/tab';
import $search from '../../utils/search';
import { requestJSON } from '../../utils/wx';
const { globalData: a } = getApp<{}, GlobalData>();

$register('main', {
  data: {
    T: a.T,
    nm: a.nm,

    /** 候选词 */
    words: [] as string[],

    /** 自定义导航栏配置 */
    head: {
      title: '首页',
      action: true,
      statusBarHeight: a.info.statusBarHeight
    },
    page: [
      { tag: 'head', title: '首页', aim: 'main', grey: true, hidden: true },
      {
        tag: 'p',
        head: ' ',
        style: 'font-size:14px;color:#888;',
        text:
          '   如果各位新生同学们还有什么疑问，但是小程序中没有提及的，欢迎联系 QQ 1178522294 咨询。'
      }
    ]
  },

  onPageLaunch() {
    console.log('主页面启动：', new Date().getTime() - a.date, 'ms');
    const page = wx.getStorageSync('main');

    resolvePage({ query: { aim: 'main' } }, page ? page : this.data.page);

    // 初始化搜索词
    $search.init();
  },

  onLoad() {
    const color = a.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];

    // 设置tabbar颜色
    wx.setTabBarStyle({
      color: '#8a8a8a',
      selectedColor: '#3cc51f',
      backgroundColor: color[0],
      borderStyle: color[1]
    });

    setPage({ option: { aim: 'main' }, ctx: this });
    refreshPage('main', this, a);
    popNotice('main');
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(this.data.page[0].grey);
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

    // 小程序已经初始化完成，检查页面资源
    if (wx.getStorageSync('inited')) checkResUpdate('page', '250K');

    // 执行tab页预加载
    ['guide', 'function'].forEach((x) => {
      requestJSON(`config/${a.appID}/${a.version}/${x}`, (data: object) => {
        wx.setStorageSync(x, data);
        this.$preload(`${x}?aim=${x}`);
      });
    });
    this.$preload('me?aim=me');
  },

  onPullDownRefresh() {
    refreshPage('main', this, a);
    wx.stopPullDownRefresh();
  },

  onPageScroll(event) {
    changeNav(event, this, 'head');
  },

  onShareAppMessage: () => ({
    title: a.appID === 'wx9ce37d9662499df3' ? 'myNENU' : 'in东师',
    path: '/page/main/main',
    imageUrl: `https://mp.innenu.com/img/${
      a.appID === 'wx9ce37d9662499df3' ? 'myNENU' : 'inNENU'
    }Share.jpg`
  }),

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
