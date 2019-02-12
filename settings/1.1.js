/* global getApp*/

let { globalData: a, lib: { $page, $set } } = getApp();

$page("1.1", {
  data: {
    page: [{
      tag: "head",
      title: "更新日志",
      grey: true,
      aim: "currentLog"
    }, {
      tag: "p", head: "V1.1 2018.09.26",
      text: "bug修复与显示优化；\n添加分享悬浮窗；\n新增公众号文章跳转；\n优化小程序更新逻辑；\n移除东青文创；\n初步适配大屏设备；"
    }, {
      tag: "p", head: "V1.1.1 2018.10.11",
      text: "加入预加载分包功能；"
    }, {
      tag: "p", head: "V1.1.2 2018.10.21",
      text: "加入内网公告功能并进行测试；"
    }, {
      tag: "p", head: "V1.1.3 2018.11.30",
      text: "大量外观优化；\n大量函数重构；"
    }, {
      tag: "p", head: "V1.1.4 2018.12.15",
      text: "优化了tab栏的显示；"
    }, {
      tag: "p", head: "V1.1.5 2018.01.01",
      text: "设计了新的安卓list外观；"
    }, {
      tag: "p", head: "V1.1.6 2018.01.15",
      text: "重新整理了小程序源代码；"
    }, {
      tag: "p", head: "V1.1.7 2018.01.25",
      text: "引入自定义组件；"
    }, {
      tag: "p", head: "V1.1.8 2018.02.01",
      text: "加入fileManager文件管理系统；"
    }, {
      tag: "p", head: "V1.1.9 2018.02.10",
      text: "优化更新提示与版本设置；"
    }, {
      tag: "foot", author: "Mr.Hope"
    }]
  },
  onLoad(res) {
    $set.Set(this.data.page, a, res, this, false);
    $set.Notice(this.aim);
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  }
});