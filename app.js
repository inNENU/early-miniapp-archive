var wxpage = require('utils/wxpage'),
  app = require('utils/app');

// var worker = wx.createWorker('workers/worker.js') //test

wxpage.A({
  data: {
    theme: "auto",
    startTime: '0-0',
    endTime: "5-0",
  },
  config: {
    route: ['/pages/$page', '/modules/$page', '/function/$page'],
    resolvePath(name) {
      return '/modules/' + name
    }
  },
  onLaunch: function(opts) {
    console.log('APP is Running', opts)
    this.globalData.d = new Date();
    // app.checkDebug();
    this.globalData.T = app.setTheme(this.data.theme);
    this.globalData.nm = app.nightmode(new Date(), this.data.startTime, this.data.endTime);
    this.globalData.info = wx.getSystemInfoSync();
    console.log(this.globalData.info); //调试
    app.noticeCheck();
    app.checkUpdate();
    // this.common.loadFont(this.globalData.T);
    // wxpage.on('some_message', function(msg) {
    //   console.log('Receive message:', msg)
    // })
  },
  onAwake: function(time) {
    console.log('onAwake, after', time, 'ms')
    app.noticeCheck();
    app.checkUpdate();
  },
  onShow: function() {},
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
    Version: 'V 1.0.8',
    music: {
      play: false,
      played: false,
      index: 0
    }
  },
})