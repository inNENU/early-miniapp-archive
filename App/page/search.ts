/*
 * @Author: Mr.Hope
 * @Date: 2019-08-06 20:59:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-01 01:51:03
 * @Description: 搜索页
 */

import $register from 'wxpage';
import $page from '../utils/page';
import $search from '../utils/search';
const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);

/** 关键词 */
export interface Keywords {
  [jsonName: string]: {
    /** 页面标题 */
    title: string;
    /** 预设关键词 */
    keywords: string[];
    /** 页面间标题 */
    desc: string[];
  };
}

$register('search', {
  data: {
    T: a.T,
    nm: a.nm,

    /** 状态栏高度 */
    statusBarHeight: getApp().globalData.info.statusBarHeight,

    /** 候选词 */
    words: [] as string[],

    /** 搜索结果 */
    result: {
      head: false,
      content: [] as any[]
    },

    /** 搜索词 */
    searchword: '',

    /** 自定义盗汗蓝配置 */
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

  /**
   * 在搜索框中输入时触发的函数
   *
   * @param value 输入的搜索词
   */
  searching({ detail: { value } }: any) {
    this.setData({ words: $search.searching(value) });
  },

  /**
   * 进行完整搜索
   *
   * @param value 搜索词
   */
  search({ detail: { value } }: any) {
    wx.showLoading({ title: '搜索中...' });

    this.setData({
      result: {
        head: false,
        content: $search.search(value)
      }
    });

    wx.hideLoading();
  }
});
