var wxpage = require('utils/wxpage'),
  A = require('utils/wxpage').A,
  C = require('utils/wxpage').C,
  u = require('utils/util'),
  app = require('utils/app');


A({
  data: {
    theme: "auto",
    startTime: '20-0',
    endTime: "5-0",
  },
  config: {
    route: ['/pages/$page', '/modules/$page'],
    resolvePath(name) {
      return '/modules/' + name
    }
  },
  onLaunch: function(opts) {
    this.globalData.d = new Date();
    app.checkDebug();
    this.globalData.T = app.setTheme(this.data.theme);
    this.globalData.nm = app.nightmode(new Date(), this.data.startTime, this.data.endTime);
    this.globalData.info = wx.getSystemInfoSync();
    console.log(this.globalData.info); //调试
    this.common.loadFont(this.globalData.T);
    wxpage.on('some_message', function(msg) {
      console.log('Receive message:', msg)
    })
    console.log('APP is Running', opts)
  },
  onAwake: function(time) {
    console.log('onAwake, after', time, 'ms')
  },
  onShow: function() {
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
    music: {
      play: false
    }
  },
  util: require('utils/util'),
  watcher: require('utils/watcher'),
  common: require('utils/common'),
})
// var worker = wx.createWorker('workers/worker.js') //test
// App({

//   onLaunch() {

//   },
//   onShow() {
//     
//   },

// })