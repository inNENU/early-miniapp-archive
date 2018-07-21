var u = getApp().util,
  a = getApp().globalData;
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
      },
      {
        tag: 'p',
        head: '已知bug：',
        text: 'NENU主题title位置错误；\niOS error返回按钮；\n测试界面NENU主题返回按钮有问题；\n地图界面返回按钮点击态失效；\n绩点计算器输入时键盘异常收起；\n切换网络后，当前加载界面会被刷新，图片显示异常；'
      },
      {
        tag: 'p',
        head: '即将实现的内容：',
        text: '公众号跳转组件；\n弹窗通知部分；\n模板中加入style；\n在线缓存icon或利用iconfont压缩代码体积；\n适配iOSpicker-view夜间模式；\n思考离线照片；\n构建双排img组件；\n微信列表改为点击展开样式；\n构建新的footer；\nphone组件与doc组件宽度自调整；\n优化login界面；'
      },
      {
        tag: 'p',
        head: '当前版本已实现的特性：',
        text: '独家主题模式，已经初步构建wechat与iOS两种主题，第一次进入小程序会自动根据系统来加载对应的主题；iOS主题实现99%界面仿真，已实现iOSnav特性动画；夜间模式已加入，拥有其开启开关和自动开启开关，可以在设置中自行选择开始时间与结束时间；东师指南所有子界面实现动态加载，拉取指定的json文件完成界面构建；所有界面文件支持Wifi下下载并本地缓存，界面文件更新时具有更新提示；'
      },
      {
        tag: 'list',
        head: '日志如下：',
        content: [{
            text: 'alpha日志',
            icon: '/icon/debug.svg',
            aim: 'log1'
          },
          {
            text: 'V0.1开发日志',
            icon: '/icon/debug.svg',
            aim: 'log2'
          },
          {
            text: 'V0.2开发日志',
            icon: '/icon/debug.svg',
            aim: 'log3'
          },
          {
            text: 'V0.3开发日志',
            icon: '/icon/debug.svg',
            aim: 'log4'
          },
          {
            text: 'V0.4开发日志',
            icon: '/icon/debug.svg',
            aim: 'log5'
          },
          {
            text: 'V0.5开发日志',
            icon: '/icon/debug.svg',
            aim: 'log6'
          },
          {
            text: 'V0.6开发日志',
            icon: '/icon/debug.svg',
            url: '0.6'
          },
        ]
      },
      {
        tag: 'p',
        head: '等待官方改进才能实现的内容：',
        text: '暂无'
      },
      {
        tag: 'foot'
      },
    ],
  },
  onLoad() {
    u.on('theme', this, function(data) {
      this.setData({
        T: data
      });
    });
  },
  onShow() {
    u.sP(this.data.page, this, a);
    u.tBC(a.nm);
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
  sN(e) {
    u.sN(e)
  }
})