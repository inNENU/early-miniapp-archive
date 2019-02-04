Component({

  behaviors: [],

  properties: {
    myProperty: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    title: { type: String, value: "加载中" },
    desc: String,
    action: String,//注意未完成！！！！！！！
    top: Boolean,
  },
  data: {}, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() { },
    moved() { },
    detached() { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached() { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready() { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() { },
    hide() { },
    resize() { },
  },

  methods: {
    onMyButtonTap() {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    share: (e, ctx) => {
      let touch = e.touches[0];
      if (e.type == "touchstart") {
        ctx.left = touch.pageX - e.currentTarget.offsetLeft, ctx.top = touch.pageY - e.currentTarget.offsetTop;
        ctx.time = e.timeStamp;
      } else if (e.type == "touchmove") ctx.setData({ "page[0].top": touch.pageY - ctx.top, "page[0].left": touch.pageX - ctx.left, })//移动分享按钮
      else if (e.type == "touchend" && ctx.time > e.timeStamp - 200) ctx.setData({ "page[0].menuDisplay": true });//视为点击操作，展示菜单
      else if (e.type == "tap") {
        ctx.setData({ "page[0].menuDisplay": false });//取消显示菜单
        if (e.target.dataset.object == "download") {
          console.log("Start QRCode download.");
          wx.downloadFile({
            url: `https://nenuyouth.com/mpImage/share/${ctx.data.page[0].aim}.jpg`,
            success: res => {
              if (res.statusCode == 200) wx.getSetting({
                success: res => {
                  if (!res.authSetting['scope.writePhotosAlbum']) wx.authorize({
                    scope: 'scope.writePhotosAlbum',
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
                    }
                  })
                }
              })
              else console.warn(`QRCode statusCode error:${res.statusCode}`), wx.reportMonitor("7", 1);//二维码获取状态码异常
            },
            fail: () => {
              console.warn("download fail"), wx.reportMonitor("6", 1);//二维码下载失败
              wx.showToast({ title: "二维码下载失败", icon: "none" });
            }
          });
        }
      }
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod() {
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange(newVal, oldVal) {

    }
  }

})