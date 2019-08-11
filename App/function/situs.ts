/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:30:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-11 14:54:34
 * @Description: 地点详情
 */
import $register, { WXPage } from 'wxpage';
import $file from '../utils/file';
import $page from '../utils/page';
import $wx from '../utils/wx';
const { globalData: a } = getApp();

$register('situs', {
  data: {},
  onPreload(res: WXPage.PageLifeTimeOptions) {
    $page.resolve(res, $file.readJson(`function/${res.query.xiaoqu}/${res.query.aim}`));
  },
  onLoad(option: any) {
    if (a.page.aim === option.aim) $page.Set({ option, ctx: this });
    else {
      const pageData = $file.readJson(`function/${option.xiaoqu}/${option.aim}`);

      if (pageData) $page.Set({ option, ctx: this }, pageData);
      else // 向服务器请求json
        $wx.request(`function/${option.xiaoqu}/${option.aim}`, (data: object) => {
          $page.Set({ option, ctx: this }, data as PageData);

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
    const { nc, bc } = $page.color(this.data.page[0].grey);

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
  onPageScroll(event) {
    $page.nav(event, this);
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
