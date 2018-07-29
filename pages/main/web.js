Page({
  data: {
    src: 'https://mp.weixin.qq.com/s/DkDKvGvTy2n4aNxm4gGXRw'
  },
  onLoad: function(options) {
    this.setData({
      src: e.src
    })
  },
  onPullDownRefresh: function() {
    wx.navigateBack({})
  },
  onShareAppMessage: function() {
  }
})