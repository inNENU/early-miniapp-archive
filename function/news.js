/* global wx getApp*/
const { globalData: a, lib: { $act, $page, $set } } = getApp();

$page('notice', {
  data: {
    page: [{ tag: 'head', title: '东师新闻', leftText: '功能大厅' }],
    news: []
  },
  onLoad() {
    $set.Set(this.data.page, a, null, this, false);
    $act.request('news/news', news => {
      this.setData({ news });
    });

    // 设置胶囊和背景颜色
    const [nc, bc] = $set.color(a, true);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPullDownRefresh() {
    $act.request('news/news', news => {
      this.setData({ news });
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

    this.$route(`/function/newsDetail?id=${id}`);
  }
});
