var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData,
  tab = require("../utils/tab");

P('main', {
  data: {
    page: [{
      tag: 'head',
      title: '首页',
      action: true,
      aimStep: 1,
      grey: true,
    }, {
      tag: 'list',
      head: '报到当天',
      content: [{
        text: '我该做什么',
        aim: 'check12'
      }, {
        text: '报到的流程',
        aim: 'check9'
      }]
    }, {
      tag: 'list',
      content: [{
          text: "我的学院在哪里？我的寝室在哪里？食堂在哪里？"
        }, {
          text: "查看详情",
          url: "/function/map"
        }, {
          text: '寝室环境是怎样的？寝室是几人寝？寝室有独立卫浴么？'
        }, {
          text: "本部寝室环境",
          aim: "dorm3"
        },
        {
          text: "净月寝室环境",
          aim: "dorm4"
        },
        {
          text: "了解更多",
          aim: "dorm0"
        }
      ]
    }],
  },
  onPageLaunch() {
    console.log('主页面启动：', new Date() - a.d, 'ms');
    S.preSet(this.data.page, a, null, this, false);
    tab.tabBarChanger(a.nm);
  },
  onLoad() {
    S.request('main/main', function(data, indicator) {
      S.Set(data, a, null, indicator);
    }, this);
    tab.tabBarChanger(a.nm);
  },
  onReady() {
    let that = this;
    this.$on('theme', function(data) {
      that.setData({
        T: data
      });
    });
    this.$on('nightmode', function(data) {
      that.setData({
        nm: data
      });
    });
    ['guide', 'function', 'shop'].forEach(x => {
      S.request('main/' + x, function(data, indicator) {
        indicator.$put(x, data);
        indicator.$preload(`${x}?name=${x}`);
      }, this)
    });
    this.$preload(`me`);
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
	onShareAppMessage() {
		return {
			title: 'NenuYouth',
			path: `/pages/main`
		}
	},
})