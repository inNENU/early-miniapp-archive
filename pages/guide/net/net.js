var util = require('../../../utils/util.js');
const app = getApp();
Page({
  data: {
    t: app.globalData.theme,
    nm: app.globalData.nightmode,
  },
  onLoad() { this.setData({ t: app.globalData.theme, nm: app.globalData.nightmode, }) },
  onPageScroll(e) {
    let temp = util.nav(e);
    if (this.data.n != temp) { this.setData({ n: temp }); }
  },
  back() { util.back() },
})