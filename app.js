var $App = require("utils/wxpage"),
  app = require("utils/app");

// var worker = wx.createWorker('workers/worker.js') //test

$App.A({
  data: {
    theme: "auto",
    startTime: "0-0",
    endTime: "5-0"
  },
  config: {
    route: ["/pages/$page", "/modules/$page", "/function/$page"],
    resolvePath(name) {
      return "/modules/" + name;
    }
  },
  globalData: {
    version: "V 1.2.0",
    music: {
      play: false,
      played: false,
      index: 0
    }
  },
  onLaunch: function (opts) {
    console.log("APP is Running", opts);
    this.globalData.date = new Date();
    // app.checkDebug();//检测开发
    if (!wx.getStorageSync("launched")) app.appInit(this.data);
    this.globalData.T = wx.getStorageSync("theme");
    this.globalData.nm = app.nightmode();
    [frontColor, backgroundColor] = this.globalData.nm ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
    wx.setNavigationBarColor({ frontColor, backgroundColor });
    this.globalData.info = wx.getSystemInfoSync();
    this.globalData.logger = wx.getLogManager({ level: 1 });
    app.noticeCheck(), app.appUpdate(true, false);
    console.log(this.globalData.info); //调试
    // wxpage.on('some_message', function(msg) {
    //   console.log('Receive message:', msg)
    // })
  },
  onAwake: time => {
    console.log("onAwake, after", time, "ms");
    this.globalData.nm = app.nightmode();
    [frontColor, backgroundColor] = this.globalData.nm ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
    wx.setNavigationBarColor({ frontColor, backgroundColor });
    app.noticeCheck(), app.checkUpdate(true, false);
  },
  // onShow: function () { },
  onError: msg => {
    console.warn("error msg is"), console.warn(msg); //调试
  },
  onPageNotFound: msg => {
    console.warn("Page not found!"), console.warn(msg); //调试
    wx.
      wx.switchTab({
        url: "pages/main"
      });
  },
});
// "plugins": {
// 	"wxparserPlugin": {
// 		"version": "0.2.1",
// 			"provider": "wx9d4d4ffa781ff3ac"
// 	}
// }