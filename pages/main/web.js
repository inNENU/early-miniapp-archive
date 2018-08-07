Page({
  data: {
    src: 'https://mp.weixin.qq.com/s/DkDKvGvTy2n4aNxm4gGXRw'
  },
  onLoad(options) {
    this.setData({
      src: e.src
    })
  },
  onPullDownRefresh() {
    wx.navigateBack({})
  },
})