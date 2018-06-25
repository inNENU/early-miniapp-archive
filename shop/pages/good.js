var u = getApp().util,
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
        imgClass: 'itemImg',
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
      name: '怀旧古典 充满老干部气息的东青文创定制搪瓷杯',
      preview: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',

    },
    animationData: {

    }
  },
  onLoad(e) {
    this.setData({
      info: a.info
    });
    u.sP(this.data.page, this, a, e);
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
    });
    this.animation = animation;
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
  cA(e) {
    u.cA(e, this)
  },
  popDarameterDetail(e) {

  },
  popSelect(e) {
		this.animation.translateY(-a.info.screenHeight).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  close(e) {
		this.animation.translateY(a.info.screenHeight).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  goOrder(e) {
    wx.navigateTo({
      url: 'order',
      // success: function(res) {},
      // fail: function(res) {},
      // complete: function(res) {},
    })
	},
	sN(e) {
		u.sN(e)
	}
})