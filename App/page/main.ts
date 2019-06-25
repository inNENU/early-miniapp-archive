/*
 * @Author: Mr.Hope
 * @Date: 2019-04-15 08:18:06
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-06-24 23:53:46
 * @Description: 主页
 */
import $register from 'wxpage';
import $component from '../utils/component';
import $my from '../utils/wx';
import $page from '../utils/setpage';
import $tab from '../utils/tab';
const { globalData: a } = getApp();

$register('main', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      {
        tag: 'head', title: '首页', aim: 'main',
        action: true, aimStep: 1, aimDepth: 1, grey: true
      },
      {
        tag: 'grid',
        head: '新生你好',
        content: [
          { text: '报到流程', icon: 'https://mp.nenuyouth.com/icon/module/list.svg', aim: 'check9' },
          { text: '需带物品', icon: 'https://mp.nenuyouth.com/icon/module/good.svg', aim: 'check7' },
          { text: '缴费相关', icon: 'https://mp.nenuyouth.com/icon/module/pay.svg', aim: 'check10' },
          { text: '防盗防骗', icon: 'https://mp.nenuyouth.com/icon/module/safe.svg', aim: 'check14' }
        ]
      },
      {
        tag: 'list',
        head: '报到流程',
        content: [
          {
            text: '查看更多',
            icon: '/icon/tabPage/check.svg',
            aim: 'check0'
          }
        ],
        foot: ' '
      }
    ]
  },
  onPageLaunch() {
    console.log('主页面启动：', new Date().getTime() - a.date, 'ms');
    const page = wx.getStorageSync('main');
    const color = a.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];

    $page.resolve({ query: { aim: 'main' } }, page ? page : this.data.page);
    wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
  },
  onLoad() {
    $page.Set({ option: { aim: 'main' }, ctx: this });
    $tab.refresh('main', this, a);
    $page.Notice('main');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onReady() {
    // 注册事件监听器
    this.$on('theme', (T: string) => {
      this.setData!({ T });
    });
    this.$on('nightmode', (nm: boolean) => {
      this.setData!({ nm });
    });

    // 执行tab页预加载
    ['guide', 'function'].forEach(x => {
      $my.request(`config/${a.version}/${x}`, (data: object) => {
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
  onPageScroll(e: any) {
    $component.nav(e, this);
  },
  cA(e: any) {
    $component.trigger(e, this);
  },
  onShareAppMessage: () => ({ title: 'myNENU', path: '/page/main' })
});
