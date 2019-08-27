/*
 * @Author: Mr.Hope
 * @Date: 2019-08-06 20:59:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-14 22:46:08
 * @Description: 搜索页
 */

import $register from 'wxpage';
import $page from '../utils/page';
import $search from '../utils/search';
const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);

export interface Keywords {
  [jsonName: string]: {
    title: string;
    keywords: string[];
    desc: string[];
  };
}

$register('search', {
  data: {
    T: a.T,
    nm: a.nm,
    statusBarHeight: getApp().globalData.info.statusBarHeight,
    words: [] as string[],
    result: {
      head: false,
      content: [] as any[]
    },
    searchword: '',
    head: { title: '搜索', statusBarHeight: a.info.statusBarHeight, leftText: '返回' }
  },
  onLoad(options) {
    if (options.words)
      this.search({ detail: { value: options.words } });

    this.setData({ searchword: options.words, T: a.T, nm: a.nm });
    $page.Notice('search');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color();

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPageScroll(event) {
    $page.nav(event, this, 'head');
  },
  searching({ detail }: any) {
    this.setData({ words: $search.searching(detail.value) });
  },
  search({ detail }: any) {
    wx.showLoading({ title: '搜索中...' });

    this.setData({
      result: {
        head: false,
        content: $search.search(detail.value)
      }
    });

    wx.hideLoading();
  }
});
