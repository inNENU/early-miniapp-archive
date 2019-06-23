/* global wx getApp*/
const { globalData: a, lib: { $component, $file, $page, $register } } = getApp();

$register('situs', {
  data: {},
  onPreload(res) {
    $page.resolve(res, $file.readJson(`function/${res.query.xiaoqu}/${res.query.aim}`));
  },
  onLoad(option) {
    if (a.page.aim === option.aim) $page.Set({ option, ctx: this });
    else {
      const pageData = $file.readJson(`function/${option.xiaoqu}/${option.aim}`);

      if (pageData) $page.Set({ option, ctx: this }, pageData);
      else // 向服务器请求json
        $wx.request(`function/${option.xiaoqu}/${option.aim}`, data => {
          $page.Set({ option, ctx: this }, data);

          // 非分享界面下将页面数据写入存储
          if (!option.share) {
            $file.makeDir(`function/${option.xiaoqu}`);
            $file.writeJson(`function/${option.xiaoqu}`, option.aim, data);
          }
        }, () => {
          $page.Set({ option, ctx: this }, [{ tag: 'error', statusBarHeight: a.info.statusBarHeight }]);
        }, () => {
          $page.Set({ option, ctx: this }, [{ tag: 'error', statusBarHeight: a.info.statusBarHeight }]);
        });
    }
  },
  onShow() {
    // 设置胶囊和背景颜色
    const [nc, bc] = $page.color(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
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
    $component.nav(e, this);
  },
  cA(e) {
    $component.trigger(e, this);
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
