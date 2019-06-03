/* global wx getApp */
const $tab = require('../lib/tab');

const { globalData: a, lib: { $page, $set } } = getApp(),

  includePoint1 = {
    padding: [30, 20, 30, 20],
    points: [
      { latitude: 43.8578480844, longitude: 125.3252720833 },
      { latitude: 43.8633404949, longitude: 125.3379964828 }
    ]
  },
  includePoint2 = {
    padding: [30, 20, 30, 20],
    points: [
      { latitude: 43.8256570334, longitude: 125.4175829887 },
      { latitude: 43.8247281876, longitude: 125.4359936714 }
    ]
  };

$page('map', {
  data: {
    nm: a.nm,
    map: {
      latitude: 43.862007982140646,
      longitude: 125.33405307523934,
      scale: 17
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
      ['风景', 'scenery']
    ]
  },
  onNavigate() {
    console.log('将要跳转Map');
    $tab.markerSet();
    const value = wx.getStorageSync('mapSwitch'),
      mapSwitch = value || value === false ? value : (wx.setStorageSync('mapSwitch', true), true);

    this.data.mapSwitch = mapSwitch;
    this.data.nm = a.nm;
    this.data.info = a.info;
    this.data.markers = wx.getStorageSync(mapSwitch ? 'benbu-all' : 'jingyue-all');
    this.set = true;
    console.log('Map navigate finish');
  },
  onLoad() {
    wx.showLoading({ title: '加载中...' });
    if (this.set) {
      this.mapCtx = wx.createMapContext('schoolMap');
      this.mapCtx.includePoints(this.data.mapSwitch ? includePoint1 : includePoint2);
      setTimeout(() => {
        this.mapCtx.getScale({
          success: r1 => {
            this.mapCtx.getCenterLocation({
              success: r2 => {
                this.setData({ map: { scale: r1.scale, latitude: r2.latitude, longitude: r2.longitude } });
              }
            });
          }
        });
      }, 500);
      wx.hideLoading();
    } else {
      $tab.markerSet();
      const value = wx.getStorageSync('mapSwitch'),
        mapSwitch = value || value === false ? value : (wx.setStorageSync('mapSwitch', true), true);

      this.setData({
        mapSwitch,
        markers: wx.getStorageSync(mapSwitch ? 'benbu-all' : 'jingyue-all'),
        info: a.info,
        mapStyle: a.nm ? '46NBZ-EJ6C4-4REUO-XR7ZR-CWLG5-T3BDA' : 'PZGBZ-74N6F-KVYJ5-NRJDH-Y3NUT-IKFLF',
        nm: a.nm
      });
      this.mapCtx = wx.createMapContext('schoolMap');
      this.mapCtx.includePoints(mapSwitch ? includePoint1 : includePoint2);
      setTimeout(() => {
        this.mapCtx.getScale({
          success: r1 => {
            this.mapCtx.getCenterLocation({
              success: r2 => {
                this.setData({ map: { scale: r1.scale, latitude: r2.latitude, longitude: r2.longitude } });
              }
            });
          }
        });
        wx.hideLoading();
      }, 500);
    }

    // 设置胶囊和背景颜色
    const [nc, bc] = $set.color(a, false);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);

    // 弹出通知
    $set.Notice('map');
  },
  onReady() {
    // 设置tab
    wx.createSelectorQuery().select('#mapTab')
      .boundingClientRect(rect => {
        this.setData({ tabHeight: rect.height });
      })
      .exec();

    // 设置胶囊颜色
    const [frontColor, backgroundColor] = a.nm ? ['#ffffff', '#000000'] : ['#000000', '#ffffff'];

    wx.setNavigationBarColor({ frontColor, backgroundColor });
  },
  Switch() {
    const temp = !this.data.mapSwitch,
      markers = wx.getStorageSync(temp ? 'benbu-all' : 'jingyue-all');

    this.setData({
      mapSwitch: temp,
      markers
    });
    this.mapCtx = wx.createMapContext('schoolMap');
    this.mapCtx.includePoints(temp ? includePoint1 : includePoint2);
    setTimeout(() => {
      this.mapCtx.getScale({
        success: r1 => {
          this.mapCtx.getCenterLocation({
            success: r2 => {
              this.setData({ map: { scale: r1.scale, latitude: r2.latitude, longitude: r2.longitude } });
            }
          });
        }
      });
    }, 500);
    wx.setStorageSync('mapSwitch', temp);
  },
  scale(e) {
    this.mapCtx.getCenterLocation({
      success: r2 => {
        this.setData({
          map: {
            scale: this.data.map.scale + (e.currentTarget.dataset.action === 'enlarge' ? 1 : -1),
            latitude: r2.latitude, longitude: r2.longitude
          }
        });
      }
    });

    /*
     * This.mapCtx.getScale({
     *   success(r1) {
     *     that.mapCtx.getCenterLocation({
     *       success(r2) {
     *         that.setData({
     *           map: {
     *             scale: r1.scale + (e.currentTarget.dataset.action == 'enlarge' ? 1 : -1),
     *             latitude: r2.latitude,
     *             longitude: r2.longitude
     *           }
     *         });
     *       }
     *     });
     *   }
     * });
     */
  },
  moveToLocation() {
    this.mapCtx.moveToLocation();
  },
  point() {
    if (this.data.pointDisplay) {
      this.setData({ pointDisplay: !this.data.pointDisplay });
      setTimeout(() => {
        this.setData({ selectBottom: a.info.screenHeight / a.info.screenWidth * 750 });
      }, 500);
    } else
      this.setData({
        pointDisplay: !this.data.pointDisplay,
        selectBottom: 190
      });

  },
  select(e) {
    const name = this.data.mapSwitch ? 'benbu' : 'jingyue',
      current = e.target.dataset.category,
      markers = wx.getStorageSync(`${name}-${current}`);

    this.setData({ markers, selectItem: current });
    this.mapCtx.includePoints({ padding: [30, 20, 30, 20], points: markers });
  },
  markers(e) {
    const { mapSwitch } = this.data,
      xiaoqu = mapSwitch ? 'benbu' : 'jingyue';

    if (e.type === 'markertap')
      this.$preload(`situs?xiaoqu=${xiaoqu}&id=${e.markerId}&aim=${xiaoqu + e.markerId}`);
    else if (e.type === 'callouttap')
      this.$route(`/function/situs?xiaoqu=${xiaoqu}&id=${e.markerId}&aim=${xiaoqu + e.markerId}`);

  },
  showList() {
    if (this.data.list) {
      this.setData({ list: !this.data.list });
      setTimeout(() => {
        this.setData({ closeTop: -31 });
      }, 500);
    } else
      this.setData({
        list: !this.data.list,
        closeTop: a.info.statusBarHeight + 5.5
      });

  },
  back() {
    wx.navigateBack({});
  },
  regionChange(e) {
    console.log('regionChange', e);
  }

  /*
   * Update() {
   *   console.log('update')
   *   this.mapCtx.getScale({
   *     success: function(res) {
   *       console.log('get scale');
   *       console.log(res);
   *     }
   *   });
   *   this.mapCtx.getCenterLocation({
   *     success: function(res) {
   *       console.log('getCenterLocation');
   *       console.log(res);
   *     }
   *   });
   * },
   * regionChange(e) {
   * console.log('regionChange');
   * console.log(trigger)
   * if (e.type == 'end' && trigger) {
   *   console.log('fuctioning');
   *   trigger = false;
   *   console.log(trigger);
   *   let that = this,
   *     map = this.data.map;
   *   setTimeout(function() {
   *     trigger = true;
   *     console.log("true")
   *     console.log(trigger)
   *   }, 500)
   *   var regionChange;
   *   this.mapCtx.getScale({
   *     success: function(res) {
   *       map.scale = res.scale;
   *       console.log('scale' + res.scale);
   *       regionChange = true;
   *     }
   *   });
   *   this.mapCtx.getCenterLocation({
   *     success: function(res) {
   *       console.log(res);
   *       console.log('distance is' + u.gD(map.latitude, map.longitude, res.latitude, res.longitude))
   *       if (regionChange && (u.gD(map.latitude, map.longitude, res.latitude, res.longitude) > 1)) {
   *         map.latitude = res.latitude;
   *         map.longitude = res.longitude;
   *         that.setData({
   *           map: map
   *         });
   *       };
   *       regionChange = false;
   *     }
   *   });
   * }
   * },
   * translateMarker: function() {
   *   this.mapCtx.translateMarker({
   *     markerId: 0,
   *     autoRotate: true,
   *     duration: 1000,
   *     destination: {
   *       latitude: 23.10229,
   *       longitude: 113.3345211,
   *     },
   *     animationEnd() {
   *       console.log('animation end')
   *     }
   *   })
   * },
   */
  /*
   * RegionChange() { },
   * update() { }
   */
});
