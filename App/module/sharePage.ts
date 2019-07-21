import $register, { WXPage } from 'wxpage';
import $component from '../utils/component';
import $page from '../utils/page';

$register('sharePage', {
  onNavigate(res: WXPage.PageArg) {
    $page.resolve(res);
  },
  onLoad(res: any) {
    if ('scene' in res) {
      res.From = '主页';
      res.aim = decodeURIComponent(res.scene);
      res.share = true;
      res.depth = 1;
    }
    console.log(res);
    $page.Online(res, this);
    wx.reportMonitor('2', 1);
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPageScroll(res) {
    $component.nav(res, this);
  },
  cA(res) {
    $component.trigger(res, this);
  },
  redirect() {
    this.$launch('/page/main');
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
