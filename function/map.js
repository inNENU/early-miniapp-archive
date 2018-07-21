var u = getApp().util,
  a = getApp().globalData;
var sliderWidth = 96;
var trigger = true;
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
    left: true,
    list: false,
    points: false,
		bgLayerPos:a.info.screenHeight
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
  // map() {
  //   let map = this.data.map,
  //     that = this;
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success: function(res) {
  //       console.log(res);
  //       map.latitude = res.latitude;
  //       map.longitude = res.longitude;
  //       that.setData({
  //         map: map
  //       })
  //     },
  //   });
  // },
  moveToLocation() {
    this.mapCtx.moveToLocation();
  },
  update() {
    console.log('update')
    this.mapCtx.getScale({
      success: function(res) {
        console.log('get scale');
        console.log(res);
      }
    });
    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log('getCenterLocation');
        console.log(res);
      }
    });
  },
  regionChange(e) {
    // console.log('regionChange');
    // console.log(trigger)
    // if (e.type == 'end' && trigger) {
    //   console.log('fuctioning');
    //   trigger = false;
    //   console.log(trigger);
    //   let that = this,
    //     map = this.data.map;
    //   setTimeout(function() {
    //     trigger = true;
    //     console.log("true")
    //     console.log(trigger)
    //   }, 500)
    //   var regionChange;
    //   this.mapCtx.getScale({
    //     success: function(res) {
    //       map.scale = res.scale;
    //       console.log('scale' + res.scale);
    //       regionChange = true;
    //     }
    //   });
    //   this.mapCtx.getCenterLocation({
    //     success: function(res) {
    //       console.log(res);
    //       console.log('distance is' + u.gD(map.latitude, map.longitude, res.latitude, res.longitude))
    //       if (regionChange && (u.gD(map.latitude, map.longitude, res.latitude, res.longitude) > 1)) {
    //         map.latitude = res.latitude;
    //         map.longitude = res.longitude;
    //         that.setData({
    //           map: map
    //         });
    //       };
    //       regionChange = false;
    //     }
    //   });
    // }
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
      that = this,
      regionChange,
      action = e.currentTarget.dataset.action;
    this.mapCtx.getScale({
      success: function(res) {
        if (action == 'enlarge') {
          map.scale = map.scale + 1;
        } else if (action == 'narrow') {
          map.scale = map.scale - 1;
        };
        console.log('scale' + res.scale);
        regionChange = true;
      }
    });
    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log(res);
        if (regionChange) {
          map.latitude = res.latitude;
          map.longitude = res.longitude;
          that.setData({
            map: map
          });
        };
        regionChange = false;
      }
    });
  },
  cA(e) {
    u.cA(e, this)
  },
  showList(e) {
    this.setData({
      list: !this.data.list,
    })
  },
  change() {
    this.setData({
      left: !this.data.left
    });
  }
})