var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', text: '超市' },
      { name: 'p', head: '超市位置', text: '本部超市位于北苑地下一层净月超市位于校区二食堂一楼' },
      { name: 'p', head: '超市周边', text: '本部超市周边有奶茶店、干果店、眼镜店、服装店、药店、移动运营店、电脑维修店、打印店、仿吾书店、ATM机以及自动取票机等净月净月超市周边包括干果店、打印店、水果店、饮品店、仿吾书店、眼镜店、服装店、药店、移动运营店、电脑维修店等等。' },
      { name: 'p', head: 'ATM', text: '本部ATM机区域位于学校超市旁，目前已有ATM入驻的银行有交通银行（可存钱）、中国邮政储蓄银行、中国农业银行、长春农业银行、中国建设银行等净月ATM机区域位于一食堂北边（靠近博硕路一侧），目前已有ATM入驻的银行有交通银行(可存钱) 、中国银行、中国建设银行、中国邮政储蓄银行、中国农业银行。另外，纽瓦克学院（行政楼）一楼也有交通银行取款机。' },
    ],
  },
  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },
  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})