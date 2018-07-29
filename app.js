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
    console.log(this.globalData.info);
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
	onError: function (msg) {
		console.log(msg)
	},
  globalData: {
    Version: 'V 0.7.10',
    imgMode: "widthFix"
  },
  util: require('utils/util'),
  watcher: require('utils/watcher'),
  common: require('utils/common'),
})