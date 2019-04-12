/* global wx getApp*/
const { globalData: a, lib: { $act, $page, $set } } = getApp();

$page('noticeDetail', {
  data: {
    page: [
      { tag: 'head', title: '通知详情', leftText: '通知列表', grey: true },
      { tag: 'title', text: '加载中...' },
      { tag: 'p', text: '\n\n\n\nloading......\n\n\n\n' },
      { tag: 'p', align: 'right', text: '机构：  \n时间：  ' }
    ]
  },
  onLoad(res) {
    $set.Set(this.data.page, a, null, this, false);
    $act.request(`notice/${res.id}`, notice => {
      const { attachment } = notice;

      if (attachment && attachment.length !== 0) {
        console.log(attachment);
        delete notice.attachment;
        attachment.forEach(x => {
          const temp = x.docName.split('.')[1];

          x.docName = x.docName.split('.')[0];
          x.docType = temp === 'docx' || temp === 'doc'
            ? 'doc'
            : temp === 'pptx' || temp === 'ppt'
              ? 'ppt'
              : temp === 'xlsx' || temp === 'xls'
                ? 'xls'
                : temp === 'jpg' || temp === 'jpeg'
                  ? 'jpg'
                  : temp === 'mp4' || temp === 'mov' || temp === 'avi' || temp === 'rmvb'
                    ? 'video'
                    : temp === 'pdf'
                      ? 'pdf'
                      : temp === 'png' || temp === 'gif'
                        ? temp
                        : 'document';
        });
        this.setData({ 'page[1].text': notice.title, 'page[2].text': notice.content, 'page[3].text': notice.footer, attachment });
      } else this.setData({ 'page[1].text': notice.title, 'page[2].text': notice.content, 'page[3].text': notice.footer });
    });
    this.id = res.id;

    // 设置胶囊和背景颜色
    const [nc, bc] = $set.color(a.nm, true);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPullDownRefresh() {
    $act.request(`notice/${this.id}`, notice => {
      this.setData({ notice });
      wx.stopPullDownRefresh();
    });
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  }
});
