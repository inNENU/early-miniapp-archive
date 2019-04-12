/* global getApp*/

const { globalData: a, lib: { $page, $set } } = getApp();

$page('1.3', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '更新日志', grey: true, aim: 'currentLog' },
      { tag: 'p', head: 'V1.3.0 2019.04.13', text: '完善体测计算器' },
      { tag: 'p', head: 'V1.3.1 2019.04.13', text: '修复体测计算器成绩优于满分会计算为0的bug' },
      { tag: 'foot', author: 'Mr.Hope' }
    ]
  },
  onLoad(res) {
    $set.Set(this.data.page, a, res, this, false);
    $set.Notice(this.aim);
    // 设置胶囊和背景颜色
    const [nc, bc] = $set.color(a, this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  }
});
