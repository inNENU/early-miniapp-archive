var a = getApp().globalData,
  w = getApp().watcher,
  c = getApp().common,
  tab = require("../utils/tab");
Page({
  data: {
    page: [{
        tag: 'head',
        title: '首页',
        action: true,
        aimStep: 1,
        grey: true,
      }, {
        tag: 'p',
        head: '重大bug：',
        text: '切换网络后，当前加载界面会被刷新，图片显示异常；'
      }, {
        tag: 'p',
        head: '已知bug：',
        text: 'login界面布局动画异常；\n安卓tabbar阴影有问题；\nNENU标题背景有问题；\n测试界面NENU主题返回按钮有问题；\n绩点计算器输入时键盘异常收起；\n绩点计算器夜间模式显示异常；\niOSpicker-view夜间模式异常；'
      }, {
        tag: 'p',
        head: '即将实现的内容：',
        text: 'p标签使用text，text2，text3分段；\n进入app弹窗功能实现；\nnotice加入每次打开界面都弹窗的功能；\ntab页载入速度的提高；\n优化wechat.wxss；\n利用head对微信主题tabbar加入阴影；\n尝试wx.setBackgroundcolor；\nmarker.json的处理；\n标注点的筛选功能；\nbutton的open-type；\n公众号跳转组件；\n构建双排img组件；\n微信列表改为点击展开样式；\nphone组件与doc组件宽度自调整；'
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