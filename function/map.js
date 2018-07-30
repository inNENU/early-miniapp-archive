var app = getApp().app,
  c = getApp().common,
  t = require('../utils/tab'),
  a = getApp().globalData,
  includePoint1 = {
		padding: [30, 20, 30, 20],
    points: [{
      latitude: 43.8578480844,
      longitude: 125.3252720833,
    }, {
      latitude: 43.8633404949,
      longitude: 125.3379964828,
    }]
  },
  includePoint2 = {
		padding: [30, 20, 30, 20],
    points: [{
      latitude: 43.8256570334,
      longitude: 125.4175829887,
    }, {
      latitude: 43.8247281876,
      longitude: 125.4359936714,
    }]
  };

// var trigger = true

Page({
  data: {
    map: {
      latitude: 43.862007982140646,
      longitude: 125.33405307523934,
      scale: 17,
    },
    list: false,
    pointDisplay: false,
    closeTop: -31,
    selectBottom: 0,
    selectItem: 'all',
    category: [
      ['全部', 'all'],
      ['校门', 'gate'],
      ['学院', 'school'],
      ['建筑', 'buildings'],
      ['寝室', 'dormitory'],
      ['设施', 'facility'],
      ['运动场', 'sportsField'],
      ['风景', 'scenery'],
    ]
  },
  onLoad: function(e) {
    wx.showLoading({
      title: '加载中...'
    });
    t.markerSet();
    let that = this,
      value = wx.getStorageSync('mapSwitch'),
      mapSwitch = (value || value === false) ? value : (wx.setStorageSync('mapSwitch', true), true),
      map = this.data.map,
      markers = wx.getStorageSync(mapSwitch ? 'benbu-all' : 'jingyue-all');
    this.setData({
      mapSwitch: mapSwitch,
      markers: markers,
      info: a.info
    });
    this.mapCtx = wx.createMapContext('schoolMap');
    this.mapCtx.includePoints(mapSwitch ? includePoint1 : includePoint2);
    setTimeout(function() {
      that.mapCtx.getScale({
        success(r1) {
          that.mapCtx.getCenterLocation({
            success(r2) {
              that.setData({
                map: {
                  scale: r1.scale,
                  latitude: r2.latitude,
                  longitude: r2.longitude
                }
              });
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
      that.setData({
        tabHeight: rect.height
      })
    }).exec();
  },
  Switch() {
    let that = this,
      temp = !this.data.mapSwitch,
      map = this.data.map,
      markers = wx.getStorageSync(temp ? 'benbu-all' : 'jingyue-all');
    this.setData({
      mapSwitch: temp,
      markers: markers
    });
    this.mapCtx = wx.createMapContext('schoolMap');
    this.mapCtx.includePoints(temp ? includePoint1 : includePoint2);
    setTimeout(function() {
      that.mapCtx.getScale({
        success(r1) {
          that.mapCtx.getCenterLocation({
            success(r2) {
              that.setData({
                map: {
                  scale: r1.scale,
                  latitude: r2.latitude,
                  longitude: r2.longitude
                }
              });
            }
          });
        }
      });
    }, 500);
    wx.setStorageSync("mapSwitch", temp);
  },
  scale(e) {
    let that = this,
      map = this.data.map;
    this.mapCtx.getCenterLocation({
      success(r2) {
        that.setData({
          map: {
            scale: map.scale + (e.currentTarget.dataset.action == 'enlarge' ? 1 : -1),
            latitude: r2.latitude,
            longitude: r2.longitude
          }
        });
      }
    });
    // this.mapCtx.getScale({
    //   success(r1) {
    //     that.mapCtx.getCenterLocation({
    //       success(r2) {
    //         that.setData({
    //           map: {
    //             scale: r1.scale + (e.currentTarget.dataset.action == 'enlarge' ? 1 : -1),
    //             latitude: r2.latitude,
    //             longitude: r2.longitude
    //           }
    //         });
    //       }
    //     });
    //   }
    // });
  },
  moveToLocation() {
    this.mapCtx.moveToLocation();
  },
  point() {
    let that = this;
    if (this.data.pointDisplay) {
      this.setData({
        pointDisplay: !this.data.pointDisplay,
      });
      setTimeout(function() {
        that.setData({
          selectBottom: a.info.screenHeight / a.info.screenWidth * 750
        })
      }, 500)
    } else {
      this.setData({
        pointDisplay: !this.data.pointDisplay,
        selectBottom: 190
      });
    }
  },
  select(e) {
    let name = this.data.mapSwitch ? 'benbu' : 'jingyue',
      current = e.target.dataset.category,
      markers = wx.getStorageSync(name + '-' + current);
    this.setData({
      markers: markers,
      selectItem: current
    });
    this.mapCtx.includePoints({
      padding: [30, 20, 30, 20],
      points: markers
    });
  },
  markers(e) {
    let mapSwitch = this.data.mapSwitch,
      xiaoqu = mapSwitch ? 'benbu' : 'jingyue';
    if (e.type == 'markertap') {
      let pageData = wx.getStorageSync(xiaoqu + e.markerId);
      if (pageData) {
        wx.setStorageSync(xiaoqu + e.markerId + 'temp', c.setPageData(pageData, a, null))
      }
    } else if (e.type == 'callouttap') {
      wx.navigateTo({
        url: 'situs?id=' + e.markerId + '&xiaoqu=' + xiaoqu,
      })
    }
  },
  showList(e) {
    let that = this;
    if (this.data.list) {
      this.setData({
        list: !this.data.list,
      });
      setTimeout(function() {
        that.setData({
          closeTop: -31
        })
      }, 500)
    } else {
      this.setData({
        list: !this.data.list,
        closeTop: a.info.statusBarHeight + 5.5
      });
    }
  },
  back() {
    wx.navigateBack({})
  },
  // update() {
  //   console.log('update')
  //   this.mapCtx.getScale({
  //     success: function(res) {
  //       console.log('get scale');
  //       console.log(res);
  //     }
  //   });
  //   this.mapCtx.getCenterLocation({
  //     success: function(res) {
  //       console.log('getCenterLocation');
  //       console.log(res);
  //     }
  //   });
  // },
  // regionChange(e) {
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
  // },
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
  regionChange(e) {},
  update(e) {},
})