var u = getApp().util,
  a = getApp().globalData;
var sliderWidth = 96;
Page({
  data: {
    page: [{
      tag: 'head',
      title: '校园地图'
    }],
    map: {
      latitude: 43,
      longitude: 125
    },
    tabs: ["本部", "净月", "长春"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function(e) {
    let info = a.info,
      iPhoneX;
    if (info.model.substring(0, 8) === 'iPhone X') {
      iPhoneX = true;
    };
    this.setData({
      info: {
        iPhoneX: iPhoneX,
        screenHeight: info.screenHeight,
        screenWidth: info.screenWidth
      }
    })
    u.sP(this.data.page, this, a, e);
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  onReady: function(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function() {
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function(res) {
        let map = that.data.map;
        map.longitude = res.longitude;
        map.latitude = res.latitude;
        that.setData({
          map: map
        })
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function() {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
	},
	sN(e) {
		u.sN(e)
	}
})