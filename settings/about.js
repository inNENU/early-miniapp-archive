/* global getApp wx*/
const { globalData: a, lib: { $page, $set } } = getApp();

$page('about', {
  clickNumber: 0,
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '关于', aimDepth: 1, grey: true, feedback: true, contact: true },
      {
        tag: 'list',
        head: '版本号',
        content: [
          { text: a.version, button: 'debugMode' },
          { text: '开发日志', aim: 'log0' },
          { text: '调试开关', swiKey: 'debugMode', Switch: 'debugSwitch' },
          { text: '初始化小程序', button: 'resetApp' },
          { text: '退出小程序', navigate: true, openType: 'exit', target: 'miniProgram' },
          { text: '退出开发者模式', button: 'debugMode' }
        ]
      },
      {
        tag: 'list',
        head: '正式版开发日志',
        content: [
          { text: `${a.version}\n底层优化` },
          { text: '查看详细日志', url: '/settings/1.2' }
        ]
      },
      {
        tag: 'list',
        head: '工作室与开发者介绍',
        content: [
          { text: '   小程序全部内容均由Hope Studio独立开发。' },
          { text: 'Hope Studio介绍', aim: 'MrHope0' },
          { text: 'Mr.Hope个人介绍', aim: 'MrHope1' },
          { text: '   感谢陈旭、董雨馨、傅阳、林传舜、沈竞泽、苏炀、邱诗懿、王一竹、张霁月在界面编写、排版与订正上给予的无私帮助。' }
        ]
      },
      {
        tag: 'list',
        head: '遇到问题？',
        content: [
          { text: '联系开发者？\n请添加QQ 1178522294 或点击右下角选择意见反馈来提交你的意见或遇到的错误。' },
          { text: '小程序功能太少?', aim: 'MrHope2' },
          { text: '小程序响应慢？', desc: '欢迎捐赠', url: '/settings/donate' }
        ]
      },
      { tag: 'foot', desc: `当前版本：${a.version}` }
    ]
  },
  onPreload(res) {
    const p = this.data.page,
      value = wx.getStorageSync('developMode');

    this.developMode = value || value === false ? value : wx.setStorageSync('developMode', false);
    if (wx.getStorageSync('debugMode')) p[1].content[2].status = true;
    if (!this.developMode) p[1].content.forEach((x, y) => {
      x.hidden = !(y === 0);
    });
    console.log(p, res.query);
    if (!$set.preSet(p, a, res.query, this, false)) this.set = true;
  },
  onLoad(res) {
    if (!this.set) {
      const p = this.data.page,
        value = wx.getStorageSync('developMode');

      this.developMode = value || value === false ? value : wx.setStorageSync('developMode', false);
      if (!this.developMode) p[1].content.forEach((x, y) => {
        x.hidden = !(y === 0);
      });
      $set.Set(p, a, res, this, false);
      console.log(p, res.query);
      this.set = true;
    }
    $set.Notice('about');
  },
  onReady() {
    if (this.set) $set.preLoad(this, a);

    /*
     * $set.request('main/about', data => {
     *   $set.Set(this.data.page.slice(0, 2).concat(data, this.data.page.slice(-1)), a, null, this);
     *   $set.preLoad(this, a);
     * })
     */
  },
  onPageScroll(res) {
    $set.nav(res, this);
  },
  cA(res) {
    $set.component(res, this);
  },
  debugMode() {
    if (this.developMode) {
      wx.setStorageSync('developMode', false);
      this.data.page[1].content.forEach((x, y) => {
        x.hidden = !(y === 0);
      });
      this.setData({ page: this.data.page });
      this.clickNumber = 0;
      this.developMode = false;
    } else if (this.clickNumber < 5) this.clickNumber += 1;
    else if (this.clickNumber < 10) {
      wx.showToast({ title: `再点击${10 - this.clickNumber}次即可启用开发者模式`, icon: 'none' });
      this.clickNumber += 1;
    } else {
      this.setData({ debug: true });
      wx.nextTick(() => {
        this.setData({ focus: true });
      });
    }
  },
  password(e) {
    if (e.detail.value.length === 7) {
      if (e.detail.value === '5201314') { // 密码正确
        wx.showToast({ title: '已启用开发者模式', icon: 'none' });
        this.data.page[1].content.forEach(x => {
          x.hidden = false;
        });
        this.setData({ page: this.data.page, debug: false });
        wx.setStorageSync('developMode', true);
        this.developMode = true;

      } else { // 密码错误
        wx.showToast({ title: '密码错误', icon: 'none', duration: 1000, image: '/icon/close.png' });
        this.setData({ debug: false });
      }
      e.detail.value = '';
    }

    return e.detail.value;
  },
  cancelInput() {
    this.setData({ debug: false });
  },
  debugSwitch(e) {
    const pos = e.target.dataset.id.split('-');

    this.data.page[pos[0]].content[pos[1]].status = e.detail.value;
    this.setData({ page: this.data.page });
    wx.setStorageSync('debugMode', e.detail.value);
    if (e.detail.value) wx.setEnableDebug({ enableDebug: true });
    else wx.setEnableDebug({ enableDebug: false });
  },
  resetApp() {
    // 清除文件系统文件
    const $file = require('../lib/file');
    const fileList = $file.listFile('');

    fileList.forEach(filePath => {
      $file.Delete(filePath);
    });

    // 清理数据存储
    wx.clearStorageSync();

    // 提示用户重启
    wx.showModal({ title: '小程序初始化完成', content: '请单击退出小程序按钮退出小程序', showCancel: false });
  }

  /*
   * Donate() {
   *   wx.getClipboardData({
   *     data: 'Sl6dhW316U',
   *     success: function(res) {
   *       wx.showToast({
   *         title: '口令已复制',
   *         duration: 1000,
   *       });
   *       setTimeout(function() {
   *         wx.showToast({
   *           title: '请打开支付宝领取红包支持Mr.Hope',
   *           icon: 'none',
   *           duration: 2000,
   *         })
   *       }, 1000)
   *       // 感谢您选择捐赠以支持Mr.Hope，您的每一次捐赠都会让小程序变得更好！
   *       // 请点击下方的捐赠按钮并手动跳转到支付宝来注您捐赠的用途：
   *       // 升级服务器配置；
   *       // 支持Mr.Hope
   *     }
   *   })
   * }
   */
});
