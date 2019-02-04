var $App = require("./lib/wxpage").A,
  app = require("./utils/app");

// var worker = wx.createWorker("workers/worker.js") //test

$App({
  data: {
    theme: "auto",
    startTime: "0-0",
    endTime: "5-0"
  },
  config: {
    route: ["/pages/$page", "/modules/$page", "/function/$page"],
    resolvePath: name => "/modules/" + name
  },
  globalData: {
    version: "V 1.2.0",
    music: { play: false, played: false, index: 0 },
    //T, nm, date, info ,logger也在globalData中
  },
  lib: {
    //在APP中封装两个js库对象
    $page: require("./lib/wxpage"),
    $set: require("./lib/setpage"),
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
    console.log(this.globalData.info);     //调试
    wx.onMemoryWarning(() => {
      console.log("onMemoryWarningReceive");
      wx.showToast({ title: "内存不足", icon: "none", duration: 1500 });
    })
    // wxpage.on("some_message", function(msg) {
    //   console.log("Receive message:", msg)
    // })
  },
  onAwake: time => {
    console.log("onAwake, after", time, "ms"), this.logger.debug(`"onAwake after ${time}ms`);
    this.globalData.nm = app.nightmode();
    [frontColor, backgroundColor] = this.globalData.nm ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
    wx.setNavigationBarColor({ frontColor, backgroundColor });
    app.noticeCheck(), app.checkUpdate(true, false);
  },
  // onShow: function () { },
  onError(msg) {
    console.error("error msg is", msg), this.logger.warn("Error ocurred", msg);; //调试
  },
  onPageNotFound(msg) {
    wx.switchTab({
      url: "pages/main"
    });
    console.warn("Page not found!"), console.warn(msg), this.logger.warn("Page not found!", msg); //调试
  },
  logger: wx.getLogManager(),//在APP中封装日志管理器对象
});
// "plugins": {
// 	"wxparserPlugin": {
// 		"version": "0.2.1",
// 			"provider": "wx9d4d4ffa781ff3ac"
// 	}
// }
// ,
// 	"usingComponents": {
// 		"my-component": "./components/tab"
// 	}

    //调试
    // wx.openUrl({
    //   url: 'http://nenuyouth.com',
    //   fail: (msg) => {
    //     console.log('fail:', msg)
    //   },
    //   success: (msg) => {
    //     console.log('success:', msg)
    //   }
    // })