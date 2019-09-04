/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:30:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-04 12:49:20
 * @Description: 地点详情
 */
import $register from 'wxpage';
import { readJson, makeDir, writeJson } from '../utils/file';
import $page from '../utils/page';
import { request } from '../utils/wx';
const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);

$register('situs', {
  onPreload(res) {
    $page.resolve(res, readJson(`function/${res.query.xiaoqu}/${res.query.aim}`));
  },

  onLoad(option: any) {
    if (a.page.aim === option.aim) $page.Set({ option, ctx: this });
    else {
      const pageData = readJson(`function/${option.xiaoqu}/${option.aim}`);

      if (pageData) $page.Set({ option, ctx: this }, pageData);
      else // 向服务器请求json
        request(`function/${option.xiaoqu}/${option.aim}`, (data: object) => {
          $page.Set({ option, ctx: this }, data as PageData);

          // 非分享界面下将页面数据写入存储
          if (!option.share) {
            makeDir(`function/${option.xiaoqu}`);
            writeJson(`function/${option.xiaoqu}`, option.aim, data);
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
    const { nc, bc } = $page.color();

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
      title: (this.data as any).page[0].title,
      path: `/function/situs?From=主页&depth=1&xiaoqu=${this.xiaoqu}&id=${this.id}&aim=${this.aim}`
    };
  },

  /** 返回按钮功能 */
  back() {
    if (this.$state.firstOpen) this.$launch('main');
    else this.$back();
  }
});
