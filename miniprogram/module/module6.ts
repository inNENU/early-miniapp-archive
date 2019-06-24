import $register, { WXPage } from 'wxpage';
import $component from '../utils/component';
import $page from '../utils/setpage';

$register('module6', {
  onNavigate(res: WXPage.PageArg) {
    $page.resolve(res);
  },
  onLoad(res: any) {
    $page.Online(res, this);
  },
  onShow() {
    // 设置胶囊和背景颜色
    const {nc, bc} = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPageScroll(res: any) {
    $component.nav(res, this);
  },
  cA(res: any) {
    $component.trigger(res, this);
  },
  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: `/module/sharePage?From=主页&depth=1&share=true&aim=${this.data.page[0].aim}`
    };
  },
  onUnload() {
    delete this.data.page;
  }
});
