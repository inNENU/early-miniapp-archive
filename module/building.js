/* global wx Page*/
Page({
  onLoad(res) {
    const timeoutFunc = setTimeout(() => {
      wx.navigateBack({});
    }, 3000);
    const month = res.month ? res.month : 12;

    wx.showModal({
      title: '该功能尚未开放', content: `该功能将于${month}月份左右上线，敬请期待。`, showCancel: false,
      success: res2 => {
        if (res2.confirm) {
          clearTimeout(timeoutFunc);
          wx.navigateBack({});
        }
      }
    });
  }
});
