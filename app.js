/* global wx*/
const $App = require('./lib/wxpage').A;
const app = require('./lib/app');

// Var worker = wx.createWorker("worker/worker.js") //worker test

$App({

  // 小程序全局数据
  globalData: {
    version: 'V 1.3.5',
    music: { play: false, played: false, index: 0 },
    page: {
      data: [],
      aim: ''
    }
    // T, nm, date, info也在globalData中
  },

  // 在APP中封装js库对象
  lib: {
    $component: require('./lib/component'),
    $file: require('./lib/file'),
    $page: require('./lib/setpage'),
    $register: require('./lib/wxpage'),
    $wx: require('./lib/lib')
  },

  // 路径解析配置
  config: {
    route: ['/page/$page', '/module/$page', '/function/$page', '/settings/$page'],
    // eslint-disable-next-line no-confusing-arrow
    resolvePath: name => ['main', 'function', 'guide', 'me'].includes(name)
      ? `/page/${name}`
      : ['setting', '1.3', 'about'].includes(name) ? `/settings/${name}` : `/module/${name}`
  },

  onLaunch(opts) {
    console.info('小程序启动，参数为', opts); // 调试

    // Const capsule = wx.getMenuButtonBoundingClientRect();

    // Console.log(capsule);

    // 保存启动时间
    this.globalData.date = new Date();

    // 如果初次启动执行初始化
    if (!wx.getStorageSync('inited')) app.appInit();

    // 获取主题、夜间模式、设备信息
    this.globalData.T = wx.getStorageSync('theme');
    this.globalData.nm = app.nightmode();
    this.globalData.info = wx.getSystemInfoSync();

    console.info('设备信息为', this.globalData.info); // 调试

    app.startup(this.globalData.version);
  },
  onAwake(time) {
    console.log('小程序在', time, 'ms之后被唤醒');
    this.logger.debug(`"onAwake after ${time}ms`);// 调试

    // 重新应用夜间模式、
    this.globalData.nm = app.nightmode();

    app.noticeCheck(this.globalData.version);
    app.appUpdate();
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
    this.logger.warn('未找到界面', msg); // 调试
  },

  // 日志管理器对象
  logger: wx.getLogManager({ level: 1 })
});
