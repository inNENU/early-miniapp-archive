var u = require('utils/util');
App({
  data: {
    theme: "auto",
    startTime: '20-0',
    endTime: "5-0",
  },
  onLaunch() {
    u.nC();
    this.globalData.T = u.sT(this.data.theme);
    this.globalData.nm = u.nm(new Date(), this.data.startTime, this.data.endTime);
    this.globalData.info = wx.getSystemInfoSync();
    console.log(this.globalData.info);
  },
  globalData: {
    Version: 'V 0.7.2',
    imgMode: "widthFix"
  },
  util: require('utils/util'),
})