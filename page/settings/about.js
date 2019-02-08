/*global wx getApp*/
var P = require("../../utils/wxpage"),
  S = require("../../utils/setPage"),
  a = getApp().globalData;

P("about", {
  clickNumber: 0,
  data: {
    T: a.T,
    nm: a.nm,
    page: [{
      tag: "head",
      title: "关于",
      aimDepth: 1,
      grey: true,
      feedback: true,
      contact: true
    }, {
      tag: "list",
      head: "版本号",
      content: [{
        text: a.version,
        button: "debugMode"
      }, {
        text: "开发日志",
        aim: "log0"
        // }, {
        //   text: '调试开关',
        //   swiKey: 'debugMode',
        //   Switch: 'debugSwitch'
      }, {
        text: "初始化小程序",
        button: "resetApp",
      }, {
        text: "退出小程序",
        navigate: true,
        openType: "exit",
        target: "miniProgram"
      }, {
        text: "退出开发者模式",
        button: "debugMode",
      }, ]
    }, {
      tag: "list",
      head: "正式版开发日志",
      content: [{
        text: `${a.version}\nbug修复与显示优化；\n新增分享悬浮窗；\n新增腾讯视频播放；\n新增公众号文章跳转；\n新增强制更新功能；\n移除东青文创；`
      }, {
        text: "查看详细日志",
        url: "/pages/settings/1.1"
      }]
    }, {
      tag: "list",
      head: "工作室与开发者介绍",
      content: [{
        text: "   小程序全部内容均由Hope Studio独立开发。"
      }, {
        text: "Hope Studio介绍",
        aim: "MrHope0"
      }, {
        text: "Mr.Hope个人介绍",
        aim: "MrHope1"
      }, {
        text: "   感谢陈旭、董雨馨、傅阳、林传舜、沈竞泽、苏炀、邱诗懿、王一竹、张霁月在界面编写、排版与订正上给予的无私帮助。"
      }, {
        text: "问题反馈：请联系QQ1178522294或点击右下角并选择提交页面错误。"
        // }, {
        //   button: "donate",
        //   text: "支持Mr.Hope"
      }]
    }, {
      tag: "list",
      content: [{
        text: "小程序功能太少?",
        aim: "MrHope2"
      }]
    }, {
      tag: "foot",
      desc: "当前版本：" + a.version
    }]
  },
  onPreload(res) {
    let p = this.data.page,
      value = wx.getStorageSync("developMode"),
      developMode = (value || value == false) ? value : (wx.setStorageSync("developMode", false));
    this.developMode = developMode;
    if (developMode) {
      p[1].content.forEach(x => {
        x.display = true;
      });
    } else {
      p[1].content.forEach((x, y) => {
        x.display = y == 0 ? true : false;
      });
    }
    console.log(p);
    console.log(res.query);
    if (!S.preSet(p, a, res.query, this, false)) {
      this.set = true;
    }
  },
  onLoad(res) {
    if (!this.set) {
      S.Set(this.data.page, a, res, this, false);
    }
    S.Notice("about");
  },
  onReady() {
    if (this.set) {
      S.preLoad(this, a);
    }
    // S.request('main/about', function(data, ctx) {
    //   S.Set(ctx.data.page.slice(0, 2).concat(data, ctx.data.page.slice(-1)), a, null, ctx);
    //   S.preLoad(ctx, a);
    // }, this)
  },
  onPageScroll(e) {
    S.nav(e, this);
  },
  cA(e) {
    S.component(e, this);
  },
  debugMode() {
    let clickNumber = this.clickNumber;
    if (this.developMode) {
      wx.setStorageSync("developMode", false);
      let p = this.data.page;
      p[1].content.forEach((x, y) => {
        x.display = y == 0 ? true : false;
      });
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
          title: "再点击" + remainNumber + "次即可启用开发者模式",
          icon: "none"
        });
        this.clickNumber += 1;
      } else {
        wx.showToast({
          title: "已启用开发者模式",
          icon: "none"
        });
        let p = this.data.page;
        p[1].content.forEach(x => {
          x.display = true;
        });
        this.setData({
          page: p
        });
        wx.setStorageSync("developMode", true);
        this.developMode = true;
      }
    }
  },
  // debugSwitch(e) {
  //   u.Switch(e, this);
  //   if (wx.getStorageSync('debugMode')) {
  //     wx.setEnableDebug({
  //       enableDebug: true
  //     })
  //   } else {
  //     wx.setEnableDebug({
  //       enableDebug: false
  //     })
  //   }
  // },
  resetApp() {
    wx.clearStorageSync();
    wx.showModal({
      title: "小程序初始化完成",
      content: "请单击退出小程序按钮退出小程序",
      showCancel: false
    });
  },
  // donate() {
  //   wx.getClipboardData({
  //     data: 'Sl6dhW316U',
  //     success: function(res) {
  //       wx.showToast({
  //         title: '口令已复制',
  //         duration: 1000,
  //       });
  //       setTimeout(function() {
  //         wx.showToast({
  //           title: '请打开支付宝领取红包支持Mr.Hope',
  //           icon: 'none',
  //           duration: 2000,
  //         })
  //       }, 1000)
  //       // 感谢您选择捐赠以支持Mr.Hope，您的每一次捐赠都会让小程序变得更好！
  //       // 请点击下方的捐赠按钮并手动跳转到支付宝来注您捐赠的用途：
  //       // 升级服务器配置；
  //       // 支持Mr.Hope
  //     }
  //   })
  // }
});