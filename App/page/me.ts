/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:49:51
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-11 21:07:37
 * @Description: 我的东师
 */
import $register, { WXPage } from 'wxpage';
import $page from '../utils/page';
const { globalData: a } = getApp();

$register('me', {
  data: {
    T: a.T,
    nm: a.nm,
    head: { title: '我的东师', action: true, grey: true, statusBarHeight: a.info.statusBarHeight },
    page: [
      { tag: 'head', title: '我的东师', hidden: true },
      {
        tag: 'list', foot: ' ',
        content: [
          { text: '外观设置', icon: '/icon/tabPage/setting.svg', url: 'setting' },
          { text: '权限设置', icon: '/icon/tabPage/setting.svg', url: 'authorize' },
          { text: '存储设置', icon: '/icon/tabPage/setting.svg', url: 'storage' },
          { text: '关于', icon: '/icon/tabPage/about.svg', url: 'about', desc: a.version },
          { text: '捐赠Mr.Hope', icon: '/icon/tabPage/donate.svg', desc: '了解详情', url: 'donate' }
        ]
      }
    ],
    foot: { author: '', desc: `当前版本：${a.version}\n小程序由Mr.Hope个人制作，如有错误还请见谅` }
  },
  onPreload(res: WXPage.PageLifeTimeOptions) {
    $page.resolve(res, this.data.page);
    console.log(`我的东师预加载用时${new Date().getTime() - a.date}ms`);
  },
  onLoad() {
    $page.Set({ option: { aim: 'me' }, ctx: this });
    $page.Notice('me');
  },
  onShow() {
    const color = this.data.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];
    const { nc, bc } = $page.color(this.data.page[0].grey);

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
    $page.nav(event, this, 'head');
  },
  onShareAppMessage: () => ({ title: '我的东师', path: '/page/me' })
});
