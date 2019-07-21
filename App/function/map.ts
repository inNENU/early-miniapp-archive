/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:12:13
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-21 15:08:44
 * @Description: 地图
 */
import $register from 'wxpage';
import $page from '../utils/page';
import $tab from '../utils/tab';
import $wx from '../utils/wx';
const { globalData: a } = getApp();

const includePoint1 = {
  padding: [30, 20, 30, 20],
  points: [
    { latitude: 43.8578480844, longitude: 125.3252720833 },
    { latitude: 43.8633404949, longitude: 125.3379964828 }
  ]
};
const includePoint2 = {
  padding: [30, 20, 30, 20],
  points: [
    { latitude: 43.8256570334, longitude: 125.4175829887 },
    { latitude: 43.8247281876, longitude: 125.4359936714 }
  ]
};

$register('map', {
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
    a.marker = this.getMarker();
  },
  onLoad() {
    // QQ小程序暂不支持地图的处理
    if (a.env === 'qq') $wx.modal(
      '无法查看',
      'QQ小程序暂不支持地图。Mr.Hope会在推出后第一时间适配，如有需求查看，请使用微信小程序“myNenu”。',
      () => {
        wx.navigateBack({ delta: 1 });
      });

    wx.showLoading({ title: '加载中...' });

    $tab.markerSet();

    const { mapSwitch, markers } = a.marker ? a.marker : this.getMarker();

    delete a.marker;

    this.setData!({
      mapSwitch,
      markers,
      info: a.info,
      mapStyle: a.nm ? '46NBZ-EJ6C4-4REUO-XR7ZR-CWLG5-T3BDA' : 'PZGBZ-74N6F-KVYJ5-NRJDH-Y3NUT-IKFLF',
      nm: a.nm
    });
    this.mapCtx = wx.createMapContext('schoolMap');
    this.mapCtx.includePoints(mapSwitch ? includePoint1 : includePoint2);
    setTimeout(() => {
      this.mapCtx.getScale({
        success: (r1: any) => {
          this.mapCtx.getCenterLocation({
            success: (r2: any) => {
              this.setData!({ map: { scale: r1.scale, latitude: r2.latitude, longitude: r2.longitude } });
            }
          });
        }
      });
      wx.hideLoading();
    }, 500);

    // 弹出通知
    $page.Notice('map');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(false);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onReady() {
    // 设置tab
    wx.createSelectorQuery().select('#mapTab')
      .boundingClientRect(rect => {
        this.setData!({ tabHeight: rect.height });
      })
      .exec();
  },
  getMarker() {
    const value = wx.getStorageSync('mapSwitch');
    const mapSwitch = value || value === false ? value : (wx.setStorageSync('mapSwitch', true), true);
    const markers = wx.getStorageSync(mapSwitch ? 'benbu-all' : 'jingyue-all');

    return { mapSwitch, markers };
  },
  Switch() {
    const temp = !this.data.mapSwitch;
    const markers = wx.getStorageSync(temp ? 'benbu-all' : 'jingyue-all');

    this.setData!({
      mapSwitch: temp,
      markers
    });
    this.mapCtx = wx.createMapContext('schoolMap');
    this.mapCtx.includePoints(temp ? includePoint1 : includePoint2);
    setTimeout(() => {
      this.mapCtx.getScale({
        success: (r1: any) => {
          this.mapCtx.getCenterLocation({
            success: (r2: any) => {
              this.setData!({ map: { scale: r1.scale, latitude: r2.latitude, longitude: r2.longitude } });
            }
          });
        }
      });
    }, 500);
    wx.setStorageSync('mapSwitch', temp);
  },
  scale(e: any) {
    this.mapCtx.getCenterLocation({
      success: (r2: any) => {
        this.setData!({
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
      this.setData!({ pointDisplay: !this.data.pointDisplay });
      setTimeout(() => {
        this.setData!({ selectBottom: a.info.screenHeight / a.info.screenWidth * 750 });
      }, 500);
    } else
      this.setData!({
        pointDisplay: !this.data.pointDisplay,
        selectBottom: 190
      });

  },
  select(e: NormalEvent) {
    const name = this.data.mapSwitch ? 'benbu' : 'jingyue';
    const current = e.target.dataset.category;
    const markers = wx.getStorageSync(`${name}-${current}`);

    this.setData!({ markers, selectItem: current });
    this.mapCtx.includePoints({ padding: [30, 20, 30, 20], points: markers });
  },
  markers(e: MarkerEvent) {
    const { mapSwitch } = this.data;
    const xiaoqu = mapSwitch ? 'benbu' : 'jingyue';

    if (e.type === 'markertap')
      this.$preload(`situs?xiaoqu=${xiaoqu}&aim=${xiaoqu + e.markerId}`);
    else if (e.type === 'callouttap')
      this.$route(`/function/situs?xiaoqu=${xiaoqu}&aim=${xiaoqu + e.markerId}`);
  },
  showList() {
    if (this.data.list) {
      this.setData!({ list: !this.data.list });
      setTimeout(() => {
        this.setData!({ closeTop: -31 });
      }, 500);
    } else
      this.setData!({
        list: !this.data.list,
        closeTop: a.info.statusBarHeight + 5.5
      });

  },
  back() {
    wx.navigateBack({ delta: 1 });
  },
  regionChange(e: any) {
    console.log('regionChange', e);
  },
  update(e: any) {
    console.log('update', e);
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
