/* global getApp*/

const { globalData: a, lib: { $page, $set } } = getApp();

$page('1.1', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '更新日志', grey: true, aim: 'currentLog' },
      { tag: 'p', head: 'V1.2.0 2019.04.03', text: 'iOS主题在安卓设备下的显示优化' },
      { tag: 'p', head: 'V1.2.1 2019.04.05', text: '小程序右上角显示胶囊的优化' },
      { tag: 'p', head: 'V1.2.2 2019.04.07', text: '重构小程序目录' },
      { tag: 'foot', author: 'Mr.Hope' }
    ]
  },
  onLoad(res) {
    $set.Set(this.data.page, a, res, this, false);
    $set.Notice(this.aim);
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  }
});
