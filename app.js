/*global wx*/
var $App = require("./lib/wxpage").A,
  app = require("./utils/app");

// var worker = wx.createWorker("workers/worker.js") //worker test

$App({
  data: { theme: "auto", startTime: "0-0", endTime: "5-0" },
  config: { route: ["/page/$page", "/module/$page", "/function/$page"], resolvePath: name => "/module/" + name },
  globalData: {
    version: "V 1.2.0",
    music: { play: false, played: false, index: 0 },
    //T, nm, date, info也在globalData中
  },
  lib: {
    $page: require("./lib/wxpage"), $set: require("./lib/setpage")//在APP中封装两个js库对象
  },
  onLaunch: function (opts) {
    console.log("APP is Running", opts);
    this.globalData.date = new Date();
    // app.checkDebug();//检测开发
    if (!wx.getStorageSync("launched")) app.appInit(this.data);
    this.globalData.T = wx.getStorageSync("theme"), this.globalData.nm = app.nightmode();
    let [frontColor, backgroundColor] = this.globalData.nm ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
    wx.setNavigationBarColor({ frontColor, backgroundColor });
    this.globalData.info = wx.getSystemInfoSync();
    this.logger = wx.getLogManager({ level: 1 });
    app.noticeCheck(), app.appUpdate(true, false);
    console.log(this.globalData.info);     //调试
    wx.onMemoryWarning(() => {
      console.log("onMemoryWarningReceive");
      wx.showToast({ title: "内存不足", icon: "none", duration: 1500 });
    });
    // wxpage.on("some_message", function(msg) {
    //   console.log("Receive message:", msg)
    // })
  },
  onAwake(time) {
    console.log("onAwake, after", time, "ms"), this.logger.debug(`"onAwake after ${time}ms`);
    this.globalData.nm = app.nightmode();
    let [frontColor, backgroundColor] = this.globalData.nm ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
    wx.setNavigationBarColor({ frontColor, backgroundColor });
    app.noticeCheck(), app.checkUpdate(true, false);
  },
  // onShow: function () { },
  onError(msg) {
    console.error("error msg is", msg), this.logger.warn("Error ocurred", msg); //调试
  },
  onPageNotFound(msg) {
    wx.switchTab({
      url: "pages/main"
    });
    console.warn("Page not found!"), console.warn(msg), this.logger.warn("Page not found!", msg); //调试
  }
  //logger对象也在APP中
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