/* global wx getApp*/
const { globalData: a, lib: { $act, $page, $set } } = getApp();

$page('notice', {
  data: {
    page: [
      {
        tag: 'head',
        title: '内网公告',
        leftText: '功能大厅'
      }
    ],
    notice: []
  },
  onLoad() {
    $set.Set(this.data.page, a, null, this, false);
    $act.request('notice/notice', notice => {
      this.setData({ notice });
    });

    // 设置胶囊和背景颜色
    const [nc, bc] = $set.color(a.nm, true);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPullDownRefresh() {
    $act.request('notice/notice', notice => {
      this.setData({ notice });
      wx.stopPullDownRefresh();
    });
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  },
  notice(res) {
    const { id } = res.currentTarget.dataset;

    this.$route(`/function/noticeDetail?id=${id}`);
  }
});
