/* global getApp*/

const { globalData: a, lib: { $component, $file, $page, $register, $wx } } = getApp();

$register('2.0', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '更新日志', grey: true, aimDepth: 1, aim: 'currentLog' },
      { tag: 'p', head: 'V2.0.0 2019.06.23', text: '重构小程序\n更新编译基础库为2.7.2\n小程序现在拥有更好的性能' },
      { tag: 'list', content: [{ text: '历史更新', desc: '点击查看', aim: 'log0' }] },
      { tag: 'foot', author: 'Mr.Hope' }
    ]
  },
  onLoad(res) {
    $page.Set({ option: res, ctx: this });

    // 显示通知
    $page.Notice(this.aim);
  },
  onShow() {
    // 设置胶囊和背景颜色
    const [nc, bc] = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPageScroll(e) {
    $component.nav(e, this);
  },
  cA(e) {
    $component.trigger(e, this);
  }
});
