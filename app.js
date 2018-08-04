var u = require('utils/util'),
  app = require('utils/app');
// var worker = wx.createWorker('workers/worker.js') //test
App({
  data: {
    theme: "auto",
    startTime: '20-0',
    endTime: "5-0",
  },
  onLaunch() {
    app.checkDebug();
    this.globalData.T = app.setTheme(this.data.theme);
    this.globalData.nm = app.nightmode(new Date(), this.data.startTime, this.data.endTime);
    this.globalData.info = wx.getSystemInfoSync();
    console.log(this.globalData.info); //调试
    this.common.loadFont(this.globalData.T);
    // worker.postMessage({
    //   msg: 'hello worker'
    // })//test
    // worker.onMessage(function (msg) {
    // 	console.log('[AppService] onWorkerMessage', msg)
    // })
  },
  onShow() {
    app.noticeCheck();
  },
  onError: function(msg) {
    console.warn('error msg is'), console.warn(msg) //调试
  },
  onPageNotFound(msg) {
    console.warn('Page not found!'), console.warn(msg); //调试
    wx.switchTab({
      url: 'pages/main'
    })
  },
  globalData: {
    Version: 'V 0.9.1',
    imgMode: "widthFix",
    music: {
      play: false
    }
  },
  util: require('utils/util'),
  watcher: require('utils/watcher'),
  common: require('utils/common'),
})