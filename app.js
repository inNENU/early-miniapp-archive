var u = require('utils/util.js');
App({
  data: { theme: "iOS" },
  onLaunch() {
    this.globalData.T = u.init("theme", this.data.theme);
    this.globalData.info = wx.getSystemInfoSync();
    this.globalData.nm = u.nm(new Date());
  },
  globalData: { imgMode: "widthFix" },
})