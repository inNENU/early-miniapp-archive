/*
 * @Author: Mr.Hope
 * @Date: 2019-04-15 08:18:06
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-21 20:40:06
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
    words: [] as string[],
    head: { title: '首页', action: true, statusBarHeight: a.info.statusBarHeight },
    page: [
      { tag: 'head', title: '首页', aim: 'main', grey: true, hidden: true },
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

    // 小程序已经初始化完成，检查页面资源
    if (wx.getStorageSync('inited')) $tab.update('page', '235K');

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
