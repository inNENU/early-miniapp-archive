var app = getApp().app,
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
    closeTop: -31,
    markers1: [{
      iconPath: "/function/icon/marker.png",
      id: 0,
      latitude: 43.86188,
      longitude: 125.33137,
      width: 25,
      height: 25,
      alpha: 0.8,
      title: '东北师范大学本部校区',
      label: {
        content: "本部校区",
        color: "#1A9D5E",
        fontSize: "10",
        anchorX: -24,
        anchorY: 0,
        // anchorY: -43,
        bgColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#efeef4',
        borderRadius: 2,
        padding: "3",
      },
      callout: {
        content: "吉林省长春市南关区人民大街5268号",
        color: "#ffffff",
        fontSize: "16",
        borderRadius: "10",
        bgColor: "#1A9D5E",
        padding: "10",
        display: "BYCLICK"
      }
    }, {
      iconPath: "/function/icon/marker.png",
      id: 1,
      latitude: 43.857857,
      longitude: 125.325317,
      width: 25,
      height: 25,
      alpha: 0.8,
    }, {
      iconPath: "/function/icon/marker.png",
      id: 2,
      latitude: 43.863834,
      longitude: 125.337898,
      width: 25,
      height: 25,
      alpha: 0.8,
    }, ]
  },
  onLoad: function(e) {
    wx.showLoading({
      title: '加载中...'
    });
    let value = wx.getStorageSync('mapSwitch'),
      mapSwitch = (value || value === false) ? value : (wx.setStorageSync('mapSwitch', true), true),
      info = a.info,
      that = this,
      map = this.data.map,
      markers;
    if (mapSwitch) {
      console.log('left')
      markers = this.data.markers1;
    } else {
      console.log('right')
      markers = this.data.markers2;
    }
    this.setData({
      info: {
        screenHeight: info.screenHeight,
        screenWidth: info.screenWidth,
        statusBarHeight: info.statusBarHeight,
      },
      mapSwitch: mapSwitch,
      markers: markers
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
      wx.hideLoading();
    }, 500);
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
    });
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
      }
    })
  },

  markers(e) {
    console.log(e);
    if (e.type == 'callouttap') {
      wx.navigateTo({
        url: 'situs?id=' + e.markerId,
      })
    }
  },
  back() {
    wx.navigateBack({})
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
  // translateMarker: function() {
  //   this.mapCtx.translateMarker({
  //     markerId: 0,
  //     autoRotate: true,
  //     duration: 1000,
  //     destination: {
  //       latitude: 23.10229,
  //       longitude: 113.3345211,
  //     },
  //     animationEnd() {
  //       console.log('animation end')
  //     }
  //   })
  // },
  // includePoints: function() {
  //   this.mapCtx.includePoints({
  //     padding: [10],
  //     points: [{
  //       latitude: 43.857857,
  //       longitude: 125.325317,
  //     }, {
  //       latitude: 43.863834,
  //       longitude: 125.337898,
  //     }]
  //   })
  // },
})