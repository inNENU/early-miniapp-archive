/* global wx getApp*/
const { globalData: a, lib: { $file, $page, $set } } = getApp();

$page('situs', {
  data: {},
  onPreload(res) {
    this.xiaoqu = res.query.xiaoqu;
    this.id = res.query.id;
    $set.preSet($file.readJson(`function/${this.xiaoqu}/${res.query.aim}`), a, res, this, false);
  },
  onLoad(option) {
    if (this.aim === option.aim) {
      console.log(`${this.aim}已加载`);
      $set.preLoad(this, a);
      console.info(`preload ${this.aim} finish`);

      // 需要重新载入界面
    } else {
      console.info(`${option.aim}onLoad开始，参数为：`, option);
      this.aim = option.aim;

      // 获取文件夹名称
      let { length } = option.aim;

      while (!isNaN(option.aim.charAt(length))) length--;
      const aimName = option.aim.substring(0, length + 1),
        page = $file.readJson(`function/${aimName}/${option.aim}`);

      // 如果本地存储中含有page直接处理
      if (page) {
        $set.Set(page, a, option, this);
        $set.Notice(option.aim);
        console.info(`${option.aim}onLoad成功：`, this.data);
        wx.reportMonitor('0', 1);

        // 执行预加载
        $set.preLoad(this, a);
        console.log(`${option.aim}界面预加载完成`);
      } else

        // 向服务器请求json
        wx.request({
          url: `https://mp.nenuyouth.com/function/${aimName}/${option.aim}.json`,
          success: res => {
            console.log(res);
            if (res.statusCode === 200) {

              // 设置界面
              $set.Set(res.data, a, option, this);

              // 非分享界面下将页面数据写入存储
              if (!option.share) {
                $file.makeDir(`function/${aimName}`);
                $file.writeJson(`function/${aimName}`, `${option.aim}`, res.data);
              }

              // 执行预加载
              $set.preLoad(this, a);
              console.log(`${option.aim}界面预加载完成`);

            } else {

              // 设置error界面
              $set.Set([{ tag: 'error', statusBarHeight: a.info.statusBarHeight }], a, option, this);
              console.warn(`${option.aim}资源错误`);
              wx.reportMonitor('12', 1);// 调试
            }
            console.info(`${option.aim}onLoad成功`);
            wx.reportMonitor('0', 1);// 调试
          },
          fail: res => {
            // 设置error页面
            $set.Set([{ tag: 'error', statusBarHeight: a.info.statusBarHeight }], a, option, this);
            console.warn(`${option.aim}onLoad失败，错误为`, res);
            wx.reportMonitor('13', 1);// 调试
          },

          // 加载完成时弹出通知
          complete: () => {
            $set.Notice(option.aim);
          }
        });
    }
  },
  /*
   * OnReady() {
   *   This.marker = wx.getStorageSync(`${this.xiaoqu}-all`)[this.id];
   * },
   */

  /*
   * Detail() {
   *   let markers = this.marker;
   *   wx.openLocation({
   *     latitude: marker.latitude,
   *     longitude: markers.longitude,
   *     name: markers.title,
   *   });
   * },
   */
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  },
  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
      path: `/function/situs?From=主页&depth=1&share=true&xiaoqu=${this.xiaoqu}&id=${this.id}&aim=${this.aim}`
    };
  },

  // 覆写重定向到主页
  redirect() {
    this.$switch('/page/main');
  }
});
