/* global wx getApp*/
const { globalData: a, lib: { $page, $set } } = getApp();

$page('notice', {
  data: {
    page: [
      {
        tag: 'head',
        title: '内网公告',
        leftText: '功能大厅'
      }
    ],
    page2: [{ tag: 'foot' }],
    notice: []
  },
  onLoad() {
    $set.Set(this.data.page, a, null, this, false);
    $set.request('mpServer/notice/notice', notice => {
      this.setData({ notice });
    });
  },
  onPullDownRefresh() {
    $set.request('mpServer/notice/notice', notice => {
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
