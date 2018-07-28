var a = getApp().globalData,
  w = getApp().watcher,
  c = getApp().common,
  tab = require("../../utils/tab");
Page({
  data: {
    page: [{
        tag: 'head',
        title: '首页',
        action: true,
        aimStep: 1,
        grey: true,
      }, {
        tag: 'h3',
        text: '当前版本：' + a.Version,
        style: 'text-align:center;'
      }, {
        tag: 'p',
        head: '重大bug：',
        text: '切换网络后，当前加载界面会被刷新，图片显示异常；\n图片lazyload模式异常；'
      }, {
        tag: 'p',
        head: '已知bug：',
        text: 'login界面布局动画异常；\n安卓tabbar阴影有问题；\nNENU标题背景有问题；\n测试界面NENU主题返回按钮有问题；\n绩点计算器输入时键盘异常收起；\n绩点计算器夜间模式显示异常；\niOSpicker-view夜间模式异常；'
      }, {
        tag: 'p',
        head: '即将实现的内容：',
        indent: true,
        text: 'p标签使用text，text2，text3分段；\n修复lazyload故障；\n进入app弹窗功能实现；\nnotice加入每次打开界面都弹窗的功能；\ntab页载入速度的提高；\n优化wechat.wxss；\n利用head对微信主题tabbar加入阴影；\n尝试wx.setBackgroundcolor；\nmarker.json的处理；\n标注点的筛选功能；\nbutton的open-type；\n公众号跳转组件；\n构建双排img组件；\n微信列表改为点击展开样式；\nphone组件与doc组件宽度自调整；'
      },
      {
        tag: 'p',
        head: '当前版本已实现的特性：',
        text: '独家主题模式，已经初步构建wechat与iOS两种主题，第一次进入小程序会自动根据系统来加载对应的主题；iOS主题实现99%界面仿真，已实现iOSnav特性动画；夜间模式已加入，拥有其开启开关和自动开启开关，可以在设置中自行选择开始时间与结束时间；东师指南所有子界面实现动态加载，拉取指定的json文件完成界面构建；所有界面文件支持Wifi下下载并本地缓存，界面文件更新时具有更新提示；每个界面都可以弹窗通知；'
      },
      {
        tag: 'list',
        head: '日志如下：',
        content: [{
          text: 'alpha日志',
          icon: '/icon/debug.svg',
          aim: 'log1'
        }, {
          text: 'V0.1开发日志',
          icon: '/icon/debug.svg',
          aim: 'log2'
        }, {
          text: 'V0.2开发日志',
          icon: '/icon/debug.svg',
          aim: 'log3'
        }, {
          text: 'V0.3开发日志',
          icon: '/icon/debug.svg',
          aim: 'log4'
        }, {
          text: 'V0.4开发日志',
          icon: '/icon/debug.svg',
          aim: 'log5'
        }, {
          text: 'V0.5开发日志',
          icon: '/icon/debug.svg',
          aim: 'log6'
        }, {
          text: 'V0.6开发日志',
          icon: '/icon/debug.svg',
          aim: 'log7'
        }, {
          text: 'V0.7开发日志',
          icon: '/icon/debug.svg',
          url: '0.7'
        }, ]
      },
      {
        tag: 'p',
        head: '等待官方改进才能实现的内容：',
        text: 'regionchange多次触发'
      },
      {
        tag: 'foot',
        author: 'Mr.Hope',
        time: '2018/7/22'
      },
    ],
  },
  onLoad() {
    c.setPage(this.data.page, this, a);
    w.on('theme', this, function(data) {
      this.setData({
        T: data
      });
    });
    w.on('nightmode', this, function(data) {
      console.log(data)
      this.setData({
        nm: data
      });
    });
  },
  onShow() {
    tab.tabBarChanger(a.nm);
  },
  onPageScroll(e) {
    c.nav(e, this)
  }
})