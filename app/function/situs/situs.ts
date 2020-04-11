import * as $register from 'wxpage';
import { changeNav, resolvePage, setColor, setPage } from '../../utils/page';
import { makeDir, readJSON, writeJSON } from '../../utils/file';
import { requestJSON } from '../../utils/wx';
const { globalData: a } = getApp<{}, GlobalData>();

$register('situs', {
  onPreload(res) {
    resolvePage(res, readJSON(`function/${res.query.xiaoqu}/${res.query.aim}`));
  },

  onLoad(option: any) {
    if (a.page.aim === option.aim) setPage({ option, ctx: this });
    else {
      const pageData = readJSON(`function/${option.xiaoqu}/${option.aim}`);

      if (pageData) setPage({ option, ctx: this }, pageData);
      // 向服务器请求json
      else
        requestJSON(
          `function/${option.xiaoqu}/${option.aim}`,
          (data: object) => {
            setPage({ option, ctx: this }, data as PageData);

            // 非分享界面下将页面数据写入存储
            if (!option.share) {
              makeDir(`function/${option.xiaoqu}`);
              writeJSON(`function/${option.xiaoqu}`, option.aim, data);
            }
          },
          () => {
            setPage({ option, ctx: this }, [
              { tag: 'error', statusBarHeight: a.info.statusBarHeight }
            ]);
          },
          () => {
            setPage({ option, ctx: this }, [
              { tag: 'error', statusBarHeight: a.info.statusBarHeight }
            ]);
          }
        );
    }
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor();

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
    changeNav(event, this);
  },

  onShareAppMessage() {
    return {
      title: (this.data as any).page[0].title,
      path: `/function/situs/situs?From=主页&depth=1&xiaoqu=${this.xiaoqu}&id=${this.id}&aim=${this.aim}`
    };
  },

  /** 返回按钮功能 */
  back() {
    if (this.$state.firstOpen) this.$launch('main');
    else this.$back();
  }
});
