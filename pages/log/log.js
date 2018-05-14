var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '开发日志', top: true, grey: true },
      { tag: 'h3', text: '当前版本' + a.Version, style: 'text-align:center;' },
      { tag: 'p', head: '已知bug：', text: '升级版本后初始化函数存在问题；\n切换主题后主题界面会显示异常；\n绩点计算器输入时键盘异常收起；\n报到界面无法正常展示；\n切换网络后，当前加载界面会被刷新，图片显示异常；\n微信导航栏夜间模式显示异常；' },
      { tag: 'p', head: '即将实现的内容：', text: '模板中加入style；\n构建list中的picker；\n重构主页界面；\n在icon变多后尝试利用iconfont压缩代码体积；\n构建iOSlist icon；\n适配iOSpicker-view夜间模式；\n针对列表head和foot的进一步改进；\n思考离线照片；\n构建双排img组件；\n微信列表改为点击展开样式；\n考虑footer的必要性，对footer做优化或者构建新的footer；\n构建grid九宫格样式组件；\nphone组件与doc组件宽度自调整；' },
      { tag: 'p', head: '当前版本已实现的特性：', text: '独家主题模式，已经初步构建wechat与iOS两种主题，第一次进入小程序会自动根据系统来加载对应的主题；iOS主题实现99%界面仿真，已实现iOSnav特性动画；夜间模式已加入，拥有其开启开关和自动开启开关，可以在设置中自行选择开始时间与结束时间；东师指南所有子界面实现动态加载，拉取指定的json文件完成界面构建；所有界面文件支持Wifi下下载并本地缓存，界面文件更新时具有更新提示；' },
      {
        tag: 'list', head: '日志如下：', content: [
          { text: 'alpha日志', url: 'alpha' },
          { text: 'V0.1开发日志', url: '0.1', icon: '/image/nenuyouth.png' },
          { text: 'V0.2开发日志', url: '0.2' },
          { text: 'V0.3开发日志', url: '0.3' },
          { text: 'V0.4开发日志', url: '0.4' },
        ]
      },
      { tag: 'p', head: '等待官方改进才能实现的内容：', text: 'iOS的navigationBar回弹动画；' },
    ],
  },
  onShow() { u.sP(this.data.page, this, a); u.tBC(a.nm); },
  onPageScroll(e) { u.nav(e, this) },
})