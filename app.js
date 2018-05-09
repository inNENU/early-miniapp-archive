var u = require('utils/util.js');
App({
  data: { theme: "auto", startTime: '20-0', endTime: "5-0", },
  onLaunch() {
    u.cV(this.globalData.Version); u.cRU();
    this.globalData.T = u.sT(this.data.theme);
    this.globalData.nm = u.nm(new Date(), this.data.startTime, this.data.endTime);
    this.globalData.info = wx.getSystemInfoSync();
  },
  globalData: { Version: 'V 0.3.10', imgMode: "widthFix" },
  util: require('utils/util.js'),
})