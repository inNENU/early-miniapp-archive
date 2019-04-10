/* global wx*/
const $App = require('./lib/wxpage').A;
const app = require('./lib/app');

// Var worker = wx.createWorker("worker/worker.js") //worker test

$App({

  // 小程序全局数据
  globalData: {
    version: 'V 1.2.5',
    music: { play: false, played: false, index: 0 }
    // T, nm, date, info也在globalData中
  },

  // 在APP中封装两个js库对象
  lib: { $page: require('./lib/wxpage'), $set: require('./lib/setpage') },

  // 路径解析配置
  config: {
    route: ['/page/$page', '/module/$page', '/function/$page'],
    // eslint-disable-next-line no-confusing-arrow
    resolvePath: name => ['main', 'function', 'guide', 'me'].includes(name)
      ? `/page/${name}`
      : ['setting', '1.1', 'about'].includes(name) ? `setting/${name}` : `/module/${name}`
  },

  onLaunch(opts) {
    console.info('APP 启动，参数为', opts); // 调试

    // 保存启动时间
    this.globalData.date = new Date();

    // 如果初次启动执行初始化
    if (!wx.getStorageSync('inited')) app.appInit();

    // 获取主题、夜间模式、设备信息
    this.globalData.T = wx.getStorageSync('theme');
    this.globalData.nm = app.nightmode();
    this.globalData.info = wx.getSystemInfoSync();

    // 检查通知更新与小程序更新
    app.noticeCheck();
    app.appUpdate();

    console.info('设备信息为', this.globalData.info); // 调试

    // 设置内存不足警告
    wx.onMemoryWarning(() => {
      wx.showToast({ title: '内存不足', icon: 'none', duration: 1500 });
      console.warn('onMemoryWarningReceive');
    });
  },
  onAwake(time) {
    console.log('小程序在', time, 'ms之后被唤醒');
    this.logger.debug(`"onAwake after ${time}ms`);// 调试

    // 重新应用夜间模式、检查通知与小程序更新
    this.globalData.nm = app.nightmode();
    app.noticeCheck();
    app.appUpdate(true, false);
  },

  // OnShow: function () { },

  onError(errorMsg) {
    console.error('出错信息为：', errorMsg);
    this.logger.warn('Error ocurred', errorMsg); // 调试
  },
  onPageNotFound(msg) {

    // 重定向到主界面
    wx.switchTab({ url: 'pages/main' });

    console.warn('未找到界面:', msg);
    this.logger.warn('Page not found!', msg); // 调试
  },

  // 日志管理器对象
  logger: wx.getLogManager({ level: 1 })
});
