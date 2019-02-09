/* global wx*/
const $App = require("./lib/wxpage").A,
  app = require("./lib/app");

// var worker = wx.createWorker("workers/worker.js") //worker test

$App({
  data: { theme: "auto", startTime: "0-0", endTime: "5-0" },
  config: { route: ["/page/$page", "/module/$page", "/function/$page"], resolvePath: name => `/module/${name}` },
  globalData: {
    version: "V 1.2.0",
    music: { play: false, played: false, index: 0 }
    // T, nm, date, info也在globalData中
  },
  lib: {
    $page: require("./lib/wxpage"), $set: require("./lib/setpage")// 在APP中封装两个js库对象
  },
  onLaunch(opts) {
    console.info("APP 启动，参数为", opts);// 调试用
    this.globalData.date = new Date();// 记录启动时间
    // app.checkDebug();//检测开发
    if (!wx.getStorageSync("launched")) app.appInit(this.data);// 如果初次启动执行初始化
    this.globalData.T = wx.getStorageSync("theme");
    this.globalData.nm = app.nightmode();// 设置主题,夜间模式
    /*
     * let [frontColor, backgroundColor] = this.globalData.nm ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
     * wx.setNavigationBarColor({ frontColor, backgroundColor });
     */
    this.globalData.info = wx.getSystemInfoSync();
    this.logger = wx.getLogManager({ level: 1 });
    app.noticeCheck();
    app.appUpdate(true, false);
    console.info("设备信息为", this.globalData.info);     // 调试
    wx.onMemoryWarning(() => {
      wx.showToast({ title: "内存不足", icon: "none", duration: 1500 });
      console.log("onMemoryWarningReceive");
    });

    /*
     * wxpage.on("some_message", function(msg) {
     *   console.log("Receive message:", msg)
     * })
     */

    /*
     * let fileManager = wx.getFileSystemManager();
     * fileManager.readdir({
     *   dirPath: `${wx.env.USER_DATA_PATH}`,
     *   success: res0 => {
     *     console.log(res0)
     *     fileManager.access({
     *       path: `${wx.env.USER_DATA_PATH}/guideVersion.json`,
     *       complete: res => {
     *         console.log(res)
     *         fileManager.readFile({
     *           filePath: `${wx.env.USER_DATA_PATH}/guideVersion.json`,
     *           encoding: 'utf-8',
     *           complete: res => {
     *             console.log(res)
     *             console.log(JSON.parse(res.data))
     *           }
     *         })
     *       }
     *     })
     *   }
     * })
     * JSON.parse(fileManager.readFileSync(`${wx.env.USER_DATA_PATH}/guide/study/study.json`, 'utf-8'))
     */


  },
  onAwake(time) {
    console.log("小程序在", time, "ms之后被唤醒");// 调试
    this.globalData.nm = app.nightmode();
    let [frontColor, backgroundColor] = this.globalData.nm ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
    wx.setNavigationBarColor({ frontColor, backgroundColor });
    app.noticeCheck();
    app.checkUpdate(true, false);
    this.logger.debug(`"onAwake after ${time}ms`);// 调试
  },
  // onShow: function () { },
  onError(msg) {
    console.error("error msg is", msg);
    this.logger.warn("Error ocurred", msg); // 调试
  },
  onPageNotFound(msg) {
    wx.switchTab({ url: "pages/main" });
    console.warn("Page not found:", msg);
    this.logger.warn("Page not found!", msg); // 调试
  }
  // logger对象也在APP中
});

/*
 * "plugins": {
 *  "wxparserPlugin": {
 *    "version": "0.2.1",
 *      "provider": "wx9d4d4ffa781ff3ac"
 *  }
 * }
 * ,
 *  "usingComponents": {
 *    "my-component": "./components/tab"
 *  }
 */

/*
 *调试
 * wx.openUrl({
 *   url: 'http://nenuyouth.com',
 *   fail: (msg) => {
 *     console.log('fail:', msg)
 *   },
 *   success: (msg) => {
 *     console.log('success:', msg)
 *   }
 * })
 */