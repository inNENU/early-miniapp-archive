var P = require("../utils/wxpage"),
  S = require("../utils/setPage"),
  a = getApp().globalData;

P("noticeDetail", {
  data: {
    page: [{
      tag: "head",
      title: "通知详情",
      leftText: "通知列表",
      grey: true
    }, {
      tag: "h3",
      text: "加载中..."
    }, {
      tag: "p",
      text: "\n\n\n\nloading......\n\n\n\n"
    }, {
      tag: "p",
      align: "right",
      text: "机构：  \n时间：  "
    }]
  },
  onLoad(res) {
    S.Set(this.data.page, a, null, this, false);
    S.request(`mpServer/notice/${res.id}`, (data, ctx) => {
      let attachment = data.attachment;
      if (attachment) {
        delete data.attachment;
        attachment.forEach(x => {
          let temp = x.docName.split(".")[1];
          x.docName = x.docName.split(".")[0];
          x.docType = temp == "docx" || temp == "doc" ? "doc" : temp == "pptx" || temp == "ppt" ? "ppt" : temp == "xlsx" || temp == "xls" ? "xls" : temp == "jpg" || temp == "jpeg" ? "jpg" : temp == "pdf" || temp == "png" || temp == "gif" ? temp : temp == "mp4" || temp == "mov" || temp == "avi" || temp == "rmvb" ? "video" : "document";
        });
        ctx.setData({
          "page[1].text": data.title,
          "page[2].text": data.content,
          "page[3].text": data.footer,
          attachment
        });
      } else {
        ctx.setData({
          "page[1].text": data.title,
          "page[2].text": data.content,
          "page[3].text": data.footer,
        });
      }
    }, this);
    this.id = res.id;
  },
  onPullDownRefresh() {
    S.request(`mpServer/notice/${this.id}`, (data, ctx) => {
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
  }
});