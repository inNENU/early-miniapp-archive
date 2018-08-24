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
    app.checkDebug();
    this.globalData.T = app.setTheme(this.data.theme);
    this.globalData.nm = app.nightmode(new Date(), this.data.startTime, this.data.endTime);
    this.globalData.info = wx.getSystemInfoSync();
    console.log(this.globalData.info); //调试
    // this.common.loadFont(this.globalData.T);
    // wxpage.on('some_message', function(msg) {
    //   console.log('Receive message:', msg)
    // })
  },
  onAwake: function(time) {
    console.log('onAwake, after', time, 'ms')
    app.noticeCheck();
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function(res) {
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已安装，请重启应用',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function() {
      console.warn('Update failure')
    })
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
    Version: 'V 1.0.6',
    music: {
      play: false,
      played: false,
      index: 0
    }
  },
})