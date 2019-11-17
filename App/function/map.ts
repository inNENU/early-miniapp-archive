/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:12:13
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-17 15:48:00
 * @Description: 地图
 */
import * as $register from 'wxpage';
import { popNotice, setColor } from '../utils/page';
import { markerSet } from '../utils/map';
import { modal } from '../utils/wx';
const { globalData: a } = getApp<{}, GlobalData>();

/** 本部栅格 */
const benbuPoint = {
  padding: [30, 20, 30, 20],
  points: [
    { latitude: 43.8578480844, longitude: 125.3252720833 },
    { latitude: 43.8633404949, longitude: 125.3379964828 }
  ]
};

/** 本部栅格 */
const jingyuePoint = {
  padding: [30, 20, 30, 20],
  points: [
    { latitude: 43.8256570334, longitude: 125.4175829887 },
    { latitude: 43.8247281876, longitude: 125.4359936714 }
  ]
};

$register('map', {
  data: {
    /** 夜间模式状态 */
    nm: a.nm,

    /** 地图数据 */
    map: {
      latitude: 43.862007982140646,
      longitude: 125.33405307523934,
      scale: 17
    },

    /** 右下角列表显示状态 */
    list: false,

    /** 点分类显示状态 */
    pointDisplay: false,
    closeTop: -31,

    /** 点位选择 */
    selectItem: 'all',

    /** 地图开关，是否是本部 */
    isBenbu: true,

    /** 点位分类 */
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
    markerSet();
    a.marker = this.getMarker();
  },

  onLoad() {
    // QQ小程序暂不支持地图的处理
    if (a.env === 'qq')
      modal(
        '暂不支持',
        'QQ小程序暂未推出地图功能，Mr.Hope会在第一时间适配，如需查看地图请使用微信小程序。',
        () => {
          this.$back();
        }
      );

    wx.showLoading({ title: '加载中...' });

    /** 当前校区是否是本部 */
    let isBenbu;
    /** 地图标记点 */
    let markers;

    if (a.marker) {
      ({ isBenbu, markers } = a.marker);
      delete a.marker;
    } else {
      markerSet();
      ({ isBenbu, markers } = this.getMarker());
    }

    this.setData({
      isBenbu,
      markers,
      /** 设备信息 */
      info: a.info,
      /** 地图风格 */
      mapStyle: a.nm
        ? '46NBZ-EJ6C4-4REUO-XR7ZR-CWLG5-T3BDA'
        : 'PZGBZ-74N6F-KVYJ5-NRJDH-Y3NUT-IKFLF',
      nm: a.nm
    });

    // 创建地图对象
    const mapCtx = wx.createMapContext('schoolMap');

    // 将地图缩放到对应的校区
    mapCtx.includePoints(isBenbu ? benbuPoint : jingyuePoint);

    // 500ms之后拿到缩放值和地图中心点坐标，写入地图组件配置
    setTimeout(() => {
      mapCtx.getScale({
        success: r1 => {
          mapCtx.getCenterLocation({
            success: r2 => {
              this.setData({
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

    // 将地图写入options实例中
    this.mapCtx = mapCtx;

    popNotice('map');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(false);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onReady() {
    // 读取tab高度
    wx.createSelectorQuery()
      .select('#mapTab')
      .boundingClientRect(rect => {
        this.setData({ tabHeight: rect.height });
      })
      .exec();
  },

  getMarker() {
    const value: boolean = wx.getStorageSync('isBenbu');
    let isBenbu: boolean;

    if (value === false) isBenbu = false;
    else {
      wx.setStorageSync('isBenbu', true);
      isBenbu = true;
    }

    const markers = wx.getStorageSync(isBenbu ? 'benbu-all' : 'jingyue-all');

    return { isBenbu, markers };
  },
  xiaoquSwitch() {
    const temp = !this.data.isBenbu;
    const markers = wx.getStorageSync(temp ? 'benbu-all' : 'jingyue-all');

    this.setData({
      markers,
      isBenbu: temp
    });

    const { mapCtx } = this;

    // 重新缩放校区
    mapCtx.includePoints(temp ? benbuPoint : jingyuePoint);

    // 重新获取缩放值与中心点坐标写入地图组件
    setTimeout(() => {
      mapCtx.getScale({
        success: r1 => {
          mapCtx.getCenterLocation({
            success: r2 => {
              this.setData({
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

    wx.setStorageSync('isBenbu', temp);
  },

  /**
   * 获取缩放值
   *
   * @param event 触摸事件
   */
  scale(event: WXEvent.Touch) {
    this.mapCtx.getCenterLocation({
      success: r2 => {
        this.setData({
          map: {
            scale:
              this.data.map.scale +
              (event.currentTarget.dataset.action === 'enlarge' ? 1 : -1),
            latitude: r2.latitude,
            longitude: r2.longitude
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

  /** 移动到当前坐标 */
  moveToLocation() {
    this.mapCtx.moveToLocation({});
  },
  point() {
    this.setData({ pointDisplay: !this.data.pointDisplay });
  },
  select(event: WXEvent.Touch) {
    const name = this.data.isBenbu ? 'benbu' : 'jingyue';
    const current = event.target.dataset.category;
    const markers = wx.getStorageSync(`${name}-${current}`);

    this.setData({ markers, selectItem: current });
    this.mapCtx.includePoints({ padding: [30, 20, 30, 20], points: markers });
  },
  markers(event: WXEvent.MarkerTap) {
    const { isBenbu } = this.data;
    const xiaoqu = isBenbu ? 'benbu' : 'jingyue';

    if (event.type === 'markertap')
      this.$preload(
        `situs?xiaoqu=${xiaoqu}&aim=${xiaoqu + event.markerId.toString()}`
      );
    else if (event.type === 'callouttap')
      this.$route(
        `/function/situs?xiaoqu=${xiaoqu}&aim=${xiaoqu +
          event.markerId.toString()}`
      );
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
  regionChange(event: any) {
    console.log('regionChange', event);
  },
  update(event: any) {
    console.log('update', event);
  },
  mapCtx: {} as WechatMiniprogram.MapContext

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
