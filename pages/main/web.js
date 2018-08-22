Page({
  data: {
    src: 'https://mp.weixin.qq.com/s/DkDKvGvTy2n4aNxm4gGXRw'
  },
  onLoad(e) {
    this.setData({
      src: e.src
    });
    let title = e.title ? e.title : '东师青年';
    wx.setNavigationBarTitle({
      title: title
    })
  }
})