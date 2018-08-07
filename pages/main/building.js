Page({
  onLoad(options) {
    let timeoutFunc = setTimeout(function() {
      wx.navigateBack({})
    }, 5000);
    wx.showModal({
      title: '该功能尚未开放',
      content: '该功能将于十月份左右上线，敬请期待。',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          clearTimeout(timeoutFunc);
          wx.navigateBack({});
        }
      }
    });
  },
})