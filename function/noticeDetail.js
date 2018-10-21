var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData;

P('noticeDetail', {
  data: {
    page: [{
      tag: 'head',
      title: '通知详情',
      leftText: "通知列表",
      grey: true
    }],
    notice: [],
    page2: [{
      tag: 'foot'
    }]
  },
  onLoad(res) {
    S.Set(this.data.page, a, null, this, false);
    S.request(`notice/${res.id}`, (data, indicator) => {
      let attachment = data.attachment;
      if (attachment) {
        delete data.attachment;
        attachment.forEach(x => {
          let temp = x.docName.split('.')[1];
          x.docName = x.docName.split('.')[0];
          x.docType = temp == 'docx' || temp == 'doc' ? 'doc' : temp == 'pptx' || temp == 'ppt' ? 'ppt' : temp == 'xlsx' || temp == 'xls' ? 'xls' : temp == 'jpg' || temp == 'jpeg' ? 'jpg' : temp == 'pdf' || temp == 'png' || temp == 'gif' ? temp : temp == 'mp4' || temp == 'mov' || temp == 'avi' || temp == 'rmvb' ? 'video' : 'document';
        });
        indicator.setData({
          notice: data,
          attachment
        })
      } else {
        indicator.setData({
          notice: S.dispose(data)
        })
      }
    }, this);
    this.id = res.id;
  },
  onPullDownRefresh() {
    S.request(`notice/${this.id}`, (data, indicator) => {
      indicator.setData({
        notice: data
      })
      wx.stopPullDownRefresh();
    }, this);
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  }
})