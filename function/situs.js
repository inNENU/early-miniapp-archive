var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData;

P('situs', {
  data: {
    page: [{
      tag: 'head',
      title: '加载中',
      display: false,
    }, {
      tag: 'swiper',
      url: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
    }, {
      tag: 'h3',
      text: '加载中',
      style: 'font-size:28px;'
    }, ],
  },
  onPreload(res) {
    this.xiaoqu = res.query.xiaoqu, this.id = res.query.id;
    if (!S.preSet(wx.getStorageSync(this.xiaoqu + this.id), a, null, this, false)) {
      this.set = true;
    };
    console.log('Situs preload');
  },
  onLoad(res) {
    if (!this.set) {
      console.log(res)
      this.aim = S.Online(a, {
        aim: res.xiaoqu + res.id
      }, this);
      console.log('onLoad 成功')
    }
    S.Notice(this.aim);
  },
  onReady() {
    this.marker = wx.getStorageSync(this.xiaoqu + '-all')[this.id];
  },
  detail() {
    let marker = this.marker;
    wx.openLocation({
      latitude: marker.latitude,
      longitude: markers.longitude,
      name: markers.title,
    })
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  }
})