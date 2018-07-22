var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [{
        tag: 'head',
        title: '东青文创',
        action: true,
      },
      {
        tag: 'swiper',
        Class: 'shopSwiper',
        url: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
      }
    ],
    goods: [{
        id: 1,
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '搪瓷杯',
        desc: '浓郁老干部气息，又说了废话看显示效果',
        price: 100,
        url: '/shop/good?from=东青文创',
        tag: ['儒雅', '高逼格', '古朴', '怀旧', '质感']
      },
      {
        id: 2,
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '搪瓷杯',
        desc: '浓郁老干部气息',
        url: '/shop/good?from=东青文创',
        tag: ['儒雅', '高逼格']
      },
      {
        id: 3,
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '搪瓷杯',
        desc: '浓郁老干部气息',
        url: '/shop/good?from=东青文创',
        tag: ['儒雅', '高逼格']
      },
      {
        id: 4,
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '搪瓷杯',
        desc: '浓郁老干部气息',
        url: '/shop/good?from=东青文创',
        tag: ['儒雅', '高逼格']
      },
      {
        id: 5,
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '搪瓷杯',
        desc: '浓郁老干部气息',
        url: '/shop/good?from=东青文创',
        tag: ['儒雅', '高逼格']
      },
      {
        id: 6,
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '搪瓷杯',
        desc: '浓郁老干部气息',
        url: '/shop/good?from=东青文创',
        tag: ['儒雅', '高逼格']
      },
    ],
  },
  onLoad() {
    u.on('theme', this, function(data) {
      this.setData({
        T: data
      });
    });
  },
  onShow() {
    u.sP(this.data.page, this, a);
    this.setData({
      nm: a.nm
    })
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
  cA(e) {
    u.cA(e, this)
  },
  swiperChange(e) {
    console.log(e);
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  sN(e) {
    u.sN(e)
  }
})