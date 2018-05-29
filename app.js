var u = require('utils/util.js'); 
// var event = require('utils/event.js');
App({
  data: { theme: "auto", startTime: '20-0', endTime: "5-0", },
  onLaunch() {
    // u.cV(this.globalData.Version);
    this.globalData.T = u.sT(this.data.theme);
    this.globalData.nm = u.nm(new Date(), this.data.startTime, this.data.endTime);
    this.globalData.info = wx.getSystemInfoSync();
  },
  globalData: { Version: 'V 0.5.3', imgMode: "widthFix" },
  util: require('utils/util.js'),
  // event: require('utils/event.js'),
})