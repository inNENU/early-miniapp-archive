Page({
  onLoad(res) {
    let timeoutFunc = setTimeout(function() {
        wx.navigateBack({});
      }, 3000),
			month = res.month ? res.month : 10;
    wx.showModal({
      title: "该功能尚未开放",
      content: `该功能将于${month}月份左右上线，敬请期待。`,
      showCancel: false,
      success(res) {
        if (res.confirm) {
          clearTimeout(timeoutFunc);
          wx.navigateBack({});
        }
      }
    });
  },
});