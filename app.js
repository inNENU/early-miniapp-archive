/* global wx*/
const $App = require("./lib/wxpage").A,
  app = require("./lib/app");

// const $file = require("./lib/file");

// var worker = wx.createWorker("worker/worker.js") //worker test

$App({

  // 小程序全局数据
  globalData: {
    version: "V 1.2.0",
    music: { play: false, played: false, index: 0 }
    // T, nm, date, info也在globalData中
  },

  // 在APP中封装两个js库对象
  lib: {
    $page: require("./lib/wxpage"), $set: require("./lib/setpage")
  },

  // 路径解析配置
  config: {
    route: ["/page/$page", "/module/$page", "/function/$page"],
    resolvePath: name => {
      let path;
      if (["main", "function", "guide", "me"].includes(name) > -1) path = `/page/${name}`;
      else if (["setting", "1.1", "about"].includes(name) > -1) path = `setting/${name}`;
      else path = `/module/${name}`;

      return path;
    }
  },

  onLaunch(opts) {
    console.info("APP 启动，参数为", opts); // 调试

    // 保存启动时间
    this.globalData.date = new Date();

    // 如果初次启动执行初始化
    if (!wx.getStorageSync("inited")) app.appInit(this.data);

    // 获取主题、夜间模式、设备信息
    this.globalData.T = wx.getStorageSync("theme");
    this.globalData.nm = app.nightmode();
    this.globalData.info = wx.getSystemInfoSync();

    // 检查通知更新与小程序更新
    app.noticeCheck(), app.appUpdate();

    console.info("设备信息为", this.globalData.info); // 调试

    // 设置内存不足警告
    wx.onMemoryWarning(() => {
      wx.showToast({ title: "内存不足", icon: "none", duration: 1500 });
      console.warn("onMemoryWarningReceive");
    });

    // console.log($file.readFile("page/card/card0.json"));
    // const fileManager = wx.getFileSystemManager(), userPath = wx.env.USER_DATA_PATH;

    /*
     * console.log(fileManager.readdirSync(`${userPath}/page/card`));
     * console.log(fileManager.statSync(`${userPath}/page/card/`, true));
     * console.log(fileManager.statSync(`${userPath}/page/card/`, true).isDirectory());
     * console.log(fileManager.statSync(`${userPath}/page/card/`, true).isFile());
     * console.log(fileManager.statSync(`${userPath}/page/card/card0.json`, true));
     * console.log(fileManager.statSync(`${userPath}/page/card/card0.json`, true).isDirectory());
     * console.log(fileManager.statSync(`${userPath}/page/card/card0.json`, true).isFile());
     */
    /*
     * $file.saveOnlineFile("Res/page/card/card0.json", "test", () => {
     *   console.log($file.readFile("test.txt"));
     * });
     */
    // console.log(fileManager.readFileSync(`${userPath}/page/card/card0.json`, "utf8"))
    // let downTask = wx.downloadFile({
    //   url: "https://nenuyouth.com/Res/page/card/card0.json",
    //   success: res => {
    //     console.log(res.tempFilePath);
    //     try {
    //       fileManager.mkdirSync(`${userPath}/test`, true);
    //     } catch (e) {
    //       console.log("创建目录失败");
    //     }
    //     console.log("保存状态", fileManager.saveFileSync(res.tempFilePath, `${userPath}/test/test.json`));
    //     console.log("保存完成");
    //     console.log(fileManager.readFileSync(`${userPath}/test/test.json`, "utf8"))
    //   },
    //   fail: () => { },
    //   complete: () => {
    //     console.log("complete");
    //   }
    // });


  },
  onAwake(time) {
    console.log("小程序在", time, "ms之后被唤醒"), this.logger.debug(`"onAwake after ${time}ms`);// 调试

    // 重新应用夜间模式、检查通知与小程序更新
    this.globalData.nm = app.nightmode();
    app.noticeCheck();
    app.appUpdate(true, false);
  },

  // onShow: function () { },

  onError(msg) {
    console.error("出错信息为：", msg), this.logger.warn("Error ocurred", msg); // 调试
  },
  onPageNotFound(msg) {

    // 重定向到主界面
    wx.switchTab({ url: "pages/main" });

    console.warn("未找到界面:", msg), this.logger.warn("Page not found!", msg); // 调试
  },

  // 日志管理器对象
  logger: wx.getLogManager({ level: 1 })
});

/*
 * "plugins": {
 *  "wxparserPlugin": {
 *    "version": "0.2.1",
 *      "provider": "wx9d4d4ffa781ff3ac"
 *  }
 * }
 */