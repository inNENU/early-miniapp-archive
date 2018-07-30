var app = getApp().app,
  a = getApp().globalData,
  includePoint1 = {
    padding: [10],
    points: [{
      latitude: 43.8578480844,
      longitude: 125.3252720833,
    }, {
      latitude: 43.8633404949,
      longitude: 125.3379964828,
    }]
  },
  includePoint2 = {
    padding: [10],
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
    // map: {
    //   latitude: 43.862007982140646,
    //   longitude: 125.33405307523934,
    //   scale: 17,
    // },
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
    let value = wx.getStorageSync('mapSwitch'),
      mapSwitch = (value || value === false) ? value : (wx.setStorageSync('mapSwitch', true), true),
      info = a.info,
      that = this,
      // map = this.data.map,
      map,
      markers = wx.getStorageSync(mapSwitch ? 'benbu-all' : 'jingyue-all');
    this.setData({
      mapSwitch: mapSwitch,
      markers: markers,
      info: {
        screenHeight: info.screenHeight,
        screenWidth: info.screenWidth,
        statusBarHeight: info.statusBarHeight,
      },
    });
    this.mapCtx = wx.createMapContext('schoolMap');
    this.mapCtx.includePoints(mapSwitch ? includePoint1 : includePoint2);
    setTimeout(function() {
      that.mapCtx.getScale({
        success: function(res) {
          map.scale = res.scale;
          console.log('scale') //调试
          that.mapCtx.getCenterLocation({
            success: function(res) {
              map.latitude = res.latitude;
              map.longitude = res.longitude;
              that.setData({
                map: map
              });
              console.log('set') //调试
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
  Switch() {
    let temp = !this.data.mapSwitch,
      that = this,
      map = this.data.map,
      markers = wx.getStorageSync(temp ? 'benbu' : 'jingyue');
    this.setData({
      mapSwitch: temp,
      markers: markers
    });
    this.mapCtx = wx.createMapContext('schoolMap');
    console.log('create') //调试
    this.mapCtx.includePoints(temp ? includePoint1 : includePoint2);
    console.log('includePoints') //调试
    setTimeout(function() {
      that.mapCtx.getScale({
        success: function(res) {
          map.scale = res.scale;
          console.log('scale') //调试
          that.mapCtx.getCenterLocation({
            success: function(res) {
              map.latitude = res.latitude;
              map.longitude = res.longitude;
              that.setData({
                map: map
              });
              console.log('set') //调试
            }
          });
        }
      });
    }, 500);
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
  point() {
    let that = this;
    if (this.data.pointDisplay) {
      that.setData({
        pointDisplay: !this.data.pointDisplay,
      });
      setTimeout(function() {
        that.setData({
          selectBottom: a.info.screenHeight / a.info.screenWidth * 750
        })
      }, 500)
    } else {
      that.setData({
        pointDisplay: !this.data.pointDisplay,
        selectBottom: 190
      });
    }
  },
  select(e) {
    console.log(e)
    let name = this.data.mapSwitch ? 'benbu' : 'jingyue',
      markers = wx.getStorageSync(name + '-' + current),
      current = e.target.dataset.category;
    this.setData({
      markers: markers,
      selectItem: current
    });
    this.mapCtx.includePoints({
      padding: [10],
      points: markers
    });
  },
  markers(e) {
    console.log(e);
    let mapSwitch = this.data.mapSwitch,
      xiaoqu = mapSwitch ? 'benbu' : 'jingyue';
    if (e.type == 'markertap') {
      wx.setStorageSync(xiaoqu + e.markerId + 'temp', setPageData(wx.getStorageSync(xiaoqu + e.markerId), a, null))
    }
    if (e.type == 'callouttap') {
      let title = wx.getStorageSync(xiaoqu + '-all')[e.markerId].title;
      wx.navigateTo({
        url: 'situs?id=' + e.markerId + '&xiaoqu=' + xiaoqu + '&title=' + title,
      })
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
})