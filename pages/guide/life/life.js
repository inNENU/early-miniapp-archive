var util = require('../../../utils/util.js');
const app = getApp();
Page({
  data: {
    imagemode: app.globalData.imagemode,
    t: app.globalData.theme,
    nm: app.globalData.nightmode,
  },
  goBath() { util.go('details/bath') },
  goExpress() { util.go('details/express') },

  onLoad() { this.setData({ t: app.globalData.theme, nm: app.globalData.nightmode, }) },
  onPageScroll(e) {
    let temp = util.nav(e);
    if (this.data.n != temp) { this.setData({ n: temp }); }
  },
  back() { util.back() },
})