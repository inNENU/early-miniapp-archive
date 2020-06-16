/*
 * @Author: Mr.Hope
 * @Date: 2019-04-15 08:18:06
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-21 17:16:55
 * @Description: 主页
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
import { requestJSON } from '../../utils/wx';
const { globalData } = getApp<AppOption>();

$register('main', {
  data: {
    theme: globalData.theme,

    /** 候选词 */
    words: [] as string[],

    /** 自定义导航栏配置 */
    head: {
      title: '首页',
      action: true,
      statusBarHeight: globalData.info.statusBarHeight
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
    console.log('主页面启动：', new Date().getTime() - globalData.date, 'ms');
    const page = wx.getStorageSync('main');

    resolvePage({ query: { aim: 'main' } }, page ? page : this.data.page);

    // 初始化搜索词
    $search.init();
  },

  onLoad() {
    setPage({ option: { aim: 'main' }, ctx: this });
    refreshPage('main', this, globalData);
    popNotice('main');
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onReady() {
    // 注册事件监听器
    this.$on('theme', (theme: string) => {
      this.setData({ theme });
    });

    // 小程序已经初始化完成，检查页面资源
    if (wx.getStorageSync('inited')) checkResUpdate('page', '250K');

    // 执行tab页预加载
    ['guide', 'function'].forEach((x) => {
      requestJSON(
        `config/${globalData.appID}/${globalData.version}/${x}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: Record<string, any>) => {
          wx.setStorageSync(x, data);
          this.$preload(`${x}?aim=${x}`);
        }
      );
    });
    this.$preload('me?aim=me');
  },

  onPullDownRefresh() {
    refreshPage('main', this, globalData);
    wx.stopPullDownRefresh();
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
