/* global getApp*/

const { globalData: a, lib: { $page, $set } } = getApp();

$page('1.3', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '更新日志', grey: true, aimDepth: 1, aim: 'currentLog' },
      { tag: 'p', head: 'V1.3.0 2019.04.12', text: '完善体测计算器' },
      { tag: 'p', head: 'V1.3.1 2019.04.12', text: '修复体测计算器成绩优于满分会计算为0的bug\n修复体测计算器忘记计算BMI的bug\n修复体测计算器将高年级及格定为60分的bug\n完善了体测计算器的分享逻辑' },
      { tag: 'p', head: 'V1.3.2 2019.04.14', text: '为体测计算器的每一项加入具体分值\n修复一些可能导致成绩计算错误的bug' },
      { tag: 'list', content: [{ text: '历史更新', desc: '点击查看', aim: 'log0' }] },
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

    // 显示通知
    $set.Notice('currentLog');
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  }
});
