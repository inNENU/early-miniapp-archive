var u = getApp().util,
  c = getApp().common,
  a = getApp().globalData;
Page({
  data: {
    page: [{
        tag: 'head',
        title: '商品详情',
        display: false,
      },
      {
        tag: 'swiper',
        Class: 'goodSwiper',
        autoplay: false,
        url: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
      }
    ],
    item: {
      price: 60,
      count: '件',
      name: '东青文创定制搪瓷杯',
      desc: '怀旧古典 充满老干部气息',
      preview: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',

    },
  },
  onLoad(e) {
    this.setData({
      bgLayerPos: true,
      show: false,
    });
    c.setPage(this.data.page, this, a, e);
    this.cartAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
  },
  onPageScroll(e) {
    c.nav(e, this)
  },
  cA(e) {
    c.componentAction(e, this)
  },
  popSelect(e) {
    this.cartAnimation.translateY(-a.info.screenHeight).step();
    this.setData({
      bgLayerPos: false,
      animationData: this.cartAnimation.export(),
      show: true,
    });
  },
  close(e) {
    let that = this;
    this.cartAnimation.translateY(a.info.screenHeight).step();
    this.setData({
      animationData: this.cartAnimation.export(),
      show: false,
    });
    setTimeout(function() {
      that.setData({
        bgLayerPos: true
      })
    }, 500)
  },
  goOrder(e) {
    wx.navigateTo({
      url: 'order',
      // success: function(res) {},
      // fail: function(res) {},
      // complete: function(res) {},
    })
  },
  popDarameterDetail(e) {

  },
})