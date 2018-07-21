var u = getApp().util,
  a = getApp().globalData;
var sliderWidth = 96;
Page({
  data: {
    map: {
      latitude: 43,
      longitude: 125,
      scale: 18
    },
    tabs: ["本部", "净月", "长春"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    select: 0,
    list: false,
    points: false,
  },
  onLoad: function(e) {
    let info = a.info,
      iPhoneX = false;
    if (info.model.substring(0, 8) === 'iPhone X') {
      iPhoneX = true;
    };
    this.setData({
      info: {
        iPhoneX: iPhoneX,
        screenHeight: info.screenHeight,
        screenWidth: info.screenWidth,
        statusBarHeight: info.statusBarHeight,
      }
    });
  },
  onReady: function(e) {
    this.mapCtx = wx.createMapContext('schoolMap')
  },
  locate: function() {
    let map = this.data.map,
      that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res);
        map.latitude = res.latitude;
        // this.mapCtx
        map.longitude = res.longitude;
        that.setData({
          map: map
        })
      },
    });
  },
  moveToLocation() {
    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log(res);
      }
    })
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
  scale(e) {
    let map = this.data.map,
      action = e.currentTarget.dataset.action;
    if (action == 'enlarge') {
      map.scale = map.scale + 1;
    } else if (action == 'narrow') {
      map.scale = map.scale - 1;
    }
    this.setData({
      map: map
    })
  },
  cA(e) {
    u.cA(e, this)
  },
  showList(e) {
    this.setData({
      list: !this.data.list
    })
  }
})