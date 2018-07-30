var c = getApp().common,
  u = getApp().util,
  a = getApp().globalData;
Page({
  temp: {
    clickNumber: 0,
  },
  data: {
    page: [{
      tag: 'head',
      title: '关于',
      aimStep: 2,
      grey: true,
    }, {
      tag: 'list',
      head: '版本号',
      content: [{
        text: a.Version,
        button: 'debugMode'
      }, {
        text: '开发日志',
        aim: 'log'
      }, {
        text: '调试开关',
        swiKey: 'debugMode',
        Switch: 'debugSwitch'
      }, {
        text: '初始化小程序',
        button: 'initApp',
      }, {
        text: '退出小程序',
        url: '',
      }, {
        text: '退出开发者模式',
        button: 'debugMode',
      }, ]
    }, {
      tag: 'p',
      head: '正式版开发日志',
      text: 'V1.0.0\n小程序正式发布；'
    }, ]
  },
  onLoad(e) {
    let p = this.data.page,
      value = wx.getStorageSync('developMode'),
      developMode = (value || value == false) ? value : (wx.setStorageSync('developMode', false));
    this.developMode = developMode;
    p[1].content[4].display = false;
    if (developMode) {
      p[1].content[1].display = true,
        p[1].content[2].display = true,
        p[1].content[3].display = true,
        p[1].content[5].display = true;
    } else {
      p[1].content[1].display = false,
        p[1].content[2].display = false,
        p[1].content[3].display = false,
        p[1].content[5].display = false;
    }
    console.log(p)
    c.setPage(p, this, a, e);
  },
  onReady() {
    c.preloadPage(this.data.page, a);
  },
  onPageScroll(e) {
    c.nav(e, this);
  },
  cA(e) {
    c.componentAction(e, this)
  },
  debugMode(e) {
    let clickNumber = this.temp.clickNumber,
      that = this;
    if (developMode) {
      wx.setStorageSync('developMode', false)
      let p = that.data.p;
      p[1].content[1].display = false,
        p[1].content[2].display = false,
        p[1].content[3].display = false,
        p[1].content[5].display = false;
      that.setData({
        page: p
      })
    } else {
      if (clickNumber < 5) {
        this.temp.clickNumber += 1;
      } else if (clickNumber < 10) {
        let remainNumber = 10 - clickNumber;
        wx.showToast({
          title: '再点击' + remainNumber + '次即可启用开发者模式',
          icon: 'none'
        });
        this.temp.clickNumber += 1;
      } else {
        wx.showToast({
          title: '已启用开发者模式',
          icon: 'none'
        });
        let p = this.data.page;
        p[1].content[1].display = true,
          p[1].content[2].display = true,
          p[1].content[3].display = true,
          p[1].content[5].display = true;
        that.setData({
          page: p
        });
        wx.setStorageSync('developMode', true)
      };
    }
  },
  debugSwitch(e) {
    u.Switch(e, this);
    if (wx.getStorageSync('debugMode')) {
      wx.setEnableDebug({
        enableDebug: true
      })
    } else {
      wx.setEnableDebug({
        enableDebug: false
      })
    }
  },
  initApp() {
    let that = this;
    wx.clearStorageSync();
    wx.showModal({
      title: '小程序初始化完成',
      content: '请单击退出小程序按钮退出小程序',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          let p = that.data.p;
          p[1].content[4].display = true;
          that.setData({
            page: p
          })
        }
      }
    })
  }
})