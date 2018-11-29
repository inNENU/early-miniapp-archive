var P = require("../utils/wxpage"),
  S = require("../utils/setPage"),
  a = getApp().globalData;

P("notice", {
  data: {
    page: [{
      tag: "head",
      title: "内网公告",
      leftText: "功能大厅"
    }],
    page2: [{
      tag: "foot"
    }],
    notice: []
  },
  onLoad() {
    S.Set(this.data.page, a, null, this, false);
    S.request("mpServer/notice/notice", (data, ctx) => {
      ctx.setData({
        notice: data
      });
    }, this);
  },
  onPullDownRefresh() {
    S.request("mpServer/notice/notice", (data, ctx) => {
      ctx.setData({
        notice: data
      });
      wx.stopPullDownRefresh();
    }, this);
  },
  onPageScroll(e) {
    S.nav(e, this);
  },
  cA(e) {
    S.component(e, this);
  },
  notice(res) {
    let id = res.currentTarget.dataset.id;
    this.$route(`/function/noticeDetail?id=${id}`);
  }
});