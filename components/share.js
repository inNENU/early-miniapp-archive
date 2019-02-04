Component({

  behaviors: [],

  properties: {
    aim: { // 页面简称
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: "", // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如："_propertyChange"
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    }
  },
  data: {
    menuDisplay: false,
    left: null,
    top: null
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() { },
    moved() { },
    detached() { },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() { },
    hide() { },
    resize() { },
  },

  methods: {
    _share(e) {
      let touch = e.touches[0];
      switch (e.type) {
        case "touchstart"://计算点击点与按钮左上角的距离
          this.touchLeft = touch.pageX - e.currentTarget.offsetLeft,
            this.touchTop = touch.pageY - e.currentTarget.offsetTop,
            this.time = e.timeStamp;
          break;
        case "touchmove"://移动分享按钮
          this.setData({ top: touch.pageY - this.data.touchTop, left: touch.pageX - this.data.touchLeft })
          break;
        case "touchend":
          if (ctx.time > e.timeStamp - 200) this.setData({ menuDisplay: true });
          break;
        case "tap"://取消显示菜单
          this.setData({ menuDisplay: false });
          if (e.target.dataset.action == "download") {
            console.log("Start QRCode download.");//调试
            wx.downloadFile({
              url: `https://nenuyouth.com/mpImage/share/${this.properties.aim}.jpg`,
              success: res => {
                if (res.statusCode == 200) wx.getSetting({
                  success: res => {
                    if (!res.authSetting["scope.writePhotosAlbum"]) wx.saveImageToPhotosAlbum({
                      filePath: res.tempFilePath,
                      success: msg => {
                        wx.showToast({ title: "二维码保存成功", icon: "none" });
                        console.log(msg), wx.reportMonitor("8", 1);
                      },
                      fail: msg => {
                        console.log(msg), console.warn("save fail"), wx.reportMonitor("6", 1);
                        wx.showToast({ title: "二维码保存失败", icon: "none" });
                      }
                    })
                    else wx.authorize({
                      scope: "scope.writePhotosAlbum",
                      success: () => {
                        wx.saveImageToPhotosAlbum({
                          filePath: res.tempFilePath,
                          success: msg => {
                            wx.showToast({ title: "二维码保存成功", icon: "none" });
                            console.log(msg), wx.reportMonitor("8", 1);
                          },
                          fail: msg => {
                            console.log(msg), console.warn("save fail"), wx.reportMonitor("6", 1);
                            wx.showToast({ title: "二维码保存失败", icon: "none" });
                          }
                        });
                      },
                      fail: () => {
                        wx.showModal({
                          title: "权限被拒", content: "您拒绝了相册写入权限，如果想要保存图片，请在小程序设置页允许权限",
                          showCancel: false, confirmText: "确定", confirmColor: "#3CC51F",
                          complete: () => {
                            wx.showToast({ title: "二维码保存失败", icon: 'none', duration: 1500, mask: false });
                          }
                        });
                      }
                    })
                  }
                })
                else console.warn(`QRCode statusCode error:${res.statusCode}`), wx.reportMonitor("7", 1);//二维码获取状态码异常
              },
              fail: () => {
                wx.showToast({ title: "二维码下载失败", icon: "none" });
                console.warn("download fail"), wx.reportMonitor("6", 1);//二维码下载失败
              }
            });
          }
      }
    },
    _propertyChange(newVal, oldVal) {

    }
  },
  options: {
    addGlobalClass: true,
  }
})