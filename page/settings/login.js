/*global wx Page*/
Page({

  data: {
    loginAnimation: undefined
  },
  input(e) {
    console.log(e);
  },
  onShow() {
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: "ease",
    });
    this.animation = animation;
    console.log(this);
    console.log(this.animation);
    animation.rotate(180).step();
    animation.rotate(-180).step();
    console.log(this.animation);
    this.setData({
      loginAnimation: animation.export()
    });
    // // for (let i = 0; i < 30; i++) {
    // setTimeout(function () {
    //   animation.rotate(180).step()
    //   this.setData({
    //     loginAnimation: animation.export()
    //   })
    // }.bind(this), 20505)
    // // }
  },
});