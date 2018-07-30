var c = getApp().common,
  u = getApp().util,
  a = getApp().globalData;
Page({
  clickNumber: 0,
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
          openType: 'exit',
          target: 'miniProgram'
        }, {
          text: '退出开发者模式',
          button: 'debugMode',
        }, ]
      }, {
        tag: 'p',
        head: '正式版开发日志',
        text: 'V1.0.0\n小程序正式发布；'
      },
      {
        tag: 'p',
        head: '重大bug：',
        text: '切换网络后，当前加载界面会被刷新，图片显示异常；'
      }, {
        tag: 'p',
        head: '已知bug：',
        text: '转发界面存在问题；\nlogin界面布局动画异常；\n安卓tabbar阴影有问题；\nNENU标题背景有问题；\n测试界面NENU主题返回按钮有问题；\n绩点计算器输入时键盘异常收起；\n绩点计算器夜间模式显示异常；\niOSpicker-view夜间模式异常；'
      }, {
        tag: 'p',
        head: '即将实现的内容：',
        text: 'p标签使用text，text2，text3分段；\ntab页载入速度的提高；\n优化wechat.wxss；\n利用head对微信主题tabbar加入阴影；\n尝试wx.setBackgroundcolor；\nmarker.json的处理；\n标注点的筛选功能；\nbutton的open-type；\n公众号跳转组件；\n构建双排img组件；\n微信列表改为点击展开样式；\nphone组件与doc组件宽度自调整；'
      },
      {
        tag: 'p',
        head: '等待官方改进才能实现的内容：',
        text: 'regionchange多次触发'
      }, {
        tag: 'foot',
        desc: '当前版本：' + a.Version
      }
    ]
  },
  onLoad(e) {
    let p = this.data.page,
      value = wx.getStorageSync('developMode'),
      developMode = (value || value == false) ? value : (wx.setStorageSync('developMode', false));
    this.developMode = developMode;
    p[1].content[4].display = false;
    if (developMode) {
      p[1].content[1].display = true, p[1].content[2].display = true, p[1].content[3].display = true, p[1].content[5].display = true;
    } else {
      p[1].content[1].display = false, p[1].content[2].display = false, p[1].content[3].display = false, p[1].content[5].display = false;
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
    let clickNumber = this.clickNumber;
    if (this.developMode) {
      wx.setStorageSync('developMode', false)
      let p = this.data.page;
      p[1].content[1].display = false, p[1].content[2].display = false, p[1].content[3].display = false, p[1].content[5].display = false;
      this.setData({
        page: p
      });
      this.clickNumber = 0, this.developMode = false;
    } else {
      if (clickNumber < 5) {
        this.clickNumber += 1;
      } else if (clickNumber < 10) {
        let remainNumber = 10 - clickNumber;
        wx.showToast({
          title: '再点击' + remainNumber + '次即可启用开发者模式',
          icon: 'none'
        });
        this.clickNumber += 1;
      } else {
        wx.showToast({
          title: '已启用开发者模式',
          icon: 'none'
        });
        let p = this.data.page;
        p[1].content[1].display = true, p[1].content[2].display = true, p[1].content[3].display = true, p[1].content[5].display = true;
        this.setData({
          page: p
        });
        wx.setStorageSync('developMode', true);
        this.developMode = true;
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
    let that = this,
      p = this.data.page;
    wx.clearStorageSync();
    wx.showModal({
      title: '小程序初始化完成',
      content: '请单击退出小程序按钮退出小程序',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          p[1].content[4].display = true;
          that.setData({
            page: p
          })
        }
      }
    })
  }
})