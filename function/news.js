/* global wx getApp*/
const { globalData: a, lib: { $act, $page, $set } } = getApp();

$page('notice', {
  data: {
    page: [
      {
        tag: 'head',
        title: '东师新闻',
        leftText: '功能大厅'
      }
    ],
    page2: [{ tag: 'foot' }],
    news: []
  },
  onLoad() {
    $set.Set(this.data.page, a, null, this, false);
    $act.request('news/news', news => {
      this.setData({ news });
    });
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
