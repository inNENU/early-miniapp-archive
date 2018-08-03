var a = getApp().globalData,
  w = getApp().watcher,
  c = getApp().common,
  tab = require("../utils/tab");
Page({
  data: {
    T: a.T,
    nm: a.nm,

    page: [{
        tag: "head",
        title: "东青文创",
        action: true
      },
      {
        tag: "swiper",
        Class: "shopSwiper",
        url: [
          "http://mrhope.top/mp/wenchuang/wenchuang1.jpg",
          "http://mrhope.top/mp/wenchuang/wenchuang8.jpg",
          "http://mrhope.top/mp/wenchuang/wenchuang10.jpg",
          "http://mrhope.top/mp/wenchuang/wenchuang11.jpg"
        ]
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
    c.setPage(this.data.page, this, a);
    w.on('theme', this, function(data) {
      this.setData({
        T: data
      });
    });
    w.on('nightmode', this, function(data) {
      console.log(data)
      this.setData({
        nm: data
      });
    });
  },
  onReady() {
    let that = this;
    wx.request({
      url: 'https://mrhope.top/mp/main/shop.json',
      success(res) {
        if (res.statusCode == 200) {
          c.setPage(res.data, that, a);
        }
      }
    })
    wx.request({
      url: 'https://mrhope.top/mp/main/goods.json',
      success(res) {
        if (res.statusCode == 200) {
          that.setData({
            goods: res.data
          })
        }
      }
    })
  },
  onPageScroll(e) {
    c.nav(e, this)
  },
  cA(e) {
    c.componentAction(e, this)
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
  }
})