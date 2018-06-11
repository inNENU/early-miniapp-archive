var u = getApp().util,
  a = getApp().globalData;
Page({
  data: {
    page: [
			// {
      //   tag: 'head',
      //   title: '东青文创',
      //   top: true,
      //   aimStep: 1,
      // },
      {
        tag: 'swiper',
        Class: 'shopSwiper',
        imgClass: 'shopImg',
        url: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
      }
    ],
    swiper: {
      Class: 'shopSwiper',
      imgClass: 'shopImg',
      url: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
    },

  },
  onLoad() {
    u.sP(this.data.page, this, a);
  },
  onShow() {
    this.setData({
      nm: a.nm
    })
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
  swiperChange(e) {
    console.log(e);
  }
})