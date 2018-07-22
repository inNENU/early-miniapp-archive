var u = getApp().util,
  a = getApp().globalData;
var trigger = true;
Page({
  data: {
    map: {
      latitude: 43.862007982140646,
      longitude: 125.33405307523934,
      // scale: 17.38965707232666,
      scale: 17,
    },
    tabs: ["本部", "净月", "长春"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    left: true,
    list: false,
    points: false,
    closeTop: -31
  },
  onLoad: function(e) {
    let mapSwitch = u.init('mapSwitch', true),
      info = a.info,
      iPhoneX = false,
      that = this,
      map = this.data.map;
    if (info.model.substring(0, 8) === 'iPhone X') {
      iPhoneX = true;
    };
    this.setData({
      info: {
        iPhoneX: iPhoneX,
        screenHeight: info.screenHeight,
        screenWidth: info.screenWidth,
        statusBarHeight: info.statusBarHeight,
      },
      mapSwitch: mapSwitch
    });
    this.mapCtx = wx.createMapContext('schoolMap');
    console.log('create')
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 43.857857,
        longitude: 125.325317,
      }, {
        latitude: 43.863834,
        longitude: 125.337898,
      }]
    });
    console.log('includePoints')
    setTimeout(function() {
      that.mapCtx.getScale({
        success: function(res) {
          map.scale = res.scale;
          console.log('scale')
          that.mapCtx.getCenterLocation({
            success: function(res) {
              map.latitude = res.latitude;
              map.longitude = res.longitude;
              that.setData({
                map: map
              });
              console.log('set')
            }
          });
        }
      });
    }, 500)
  },
  onReady: function(e) {
    let that = this;
    wx.createSelectorQuery().select('#mapTab').boundingClientRect(function(rect) {
      console.log(rect.height);
      that.setData({
        tabHeight: rect.height
      })
    }).exec();
  },
  showList(e) {
    let that = this;
    if (this.data.list) {
      that.setData({
        list: !this.data.list,
      });
      setTimeout(function() {
        that.setData({
          closeTop: -31
        })
      }, 500)
    } else {
      that.setData({
        list: !this.data.list,
        closeTop: a.info.statusBarHeight + 5.5
      });
    }
  },
  change() {
    let temp = !this.data.mapSwitch
    this.setData({
      mapSwitch: temp
    });
    wx.setStorageSync("mapSwitch", temp);
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
  cA(e) {
    u.cA(e, this)
  },
  point() {
    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log(res)
      }
    });
    this.mapCtx.getScale({
      success: function(res) {
        console.log(res);
      }
    })
  },
  // locate: function() {
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
        latitude: 43.857857,
        longitude: 125.325317,
      }, {
        latitude: 43.863834,
        longitude: 125.337898,
      }]
    })
  },
})