/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:49:51
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-06-25 19:21:50
 * @Description: 我的东师
 */
import $register, { WXPage } from 'wxpage';
import $component from '../utils/component';
import $page from '../utils/page';
const { globalData: a } = getApp();

$register('me', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '我的东师', aim: 'me', action: true, grey: true },
      {
        tag: 'list',
        content: [
          { text: '设置', icon: '/icon/setting.svg', url: '/settings/setting?From=我的东师&aim=settings' },
          { text: '关于', icon: '/icon/about.svg', url: '/settings/about?From=我的东师&aim=about', desc: a.version }
        ]
      },
      { tag: 'foot', desc: `当前版本：${a.version}\n小程序由Mr.Hope个人制作，如有错误还请见谅` }
    ]
  },
  onPreload(res: WXPage.PageArg) {
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
    wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
    /*
     * this.$preload('setting?From=我的东师&aim=setting');
     * this.$preload('about?From=我的东师&aim=about');
     */
  },
  onReady() {
    // 注册事件监听器
    this.$on!('theme', (T: string) => {
      this.setData!({ T });
    });
    this.$on!('nightmode', (nm: boolean) => {
      this.setData!({ nm });
    });
  },
  onPageScroll(e) {
    $component.nav(e, this);
  },
  cA(e: any) {
    $component.trigger(e, this);
  },
  onShareAppMessage: () => ({ title: '我的东师', path: '/page/me' })
});
