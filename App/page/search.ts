/*
 * @Author: Mr.Hope
 * @Date: 2019-08-06 20:59:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-11 14:59:17
 * @Description: 搜索页
 */

import $register from 'wxpage';
import $page from '../utils/page';
const { globalData: a } = getApp();

export interface Keywords {
  [jsonName: string]: {
    title: string;
    keywords: string[];
    desc: string[];
  };
}

interface SearchResultWeight {
  [jsonName: string]: number;
}

interface SearchResult {
  url: string;
  text: string;
  desc?: string;
}

$register('search', {
  data: {
    T: a.T,
    nm: a.nm,
    statusBarHeight: getApp().globalData.info.statusBarHeight,
    words: [],
    result: {
      head: false,
      content: []
    },
    searchword: '',
    head: { title: '搜索', statusBarHeight: a.info.statusBarHeight, leftText: '返回' }
  },
  onLoad(options) {
    this.keywords = getApp()
      .keywords() as Keywords;

    if (options.words)
      this.search({
        detail: { value: options.words }
      });

    this.setData({ searchword: options.words, T: a.T, nm: a.nm });
    $page.Notice('search');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color();

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onPageScroll(e) {
    $page.nav(e, this, 'head');
  },
  searching(event: WXEvent.Input) {
    const keywords = this.keywords as Keywords;
    const searchWord = event.detail.value;
    const words: string[] = [];

    if (searchWord) {
      Object.keys(keywords)
        .forEach(jsonName => {
          const { title } = keywords[jsonName];

          // 检查标题是否包含了searchWord
          if (title && title.indexOf(searchWord) !== -1 && words.indexOf(title) === -1) words.push(title);

          // 检查每个关键词是否包含了searchWord
          if (keywords[jsonName].keywords)
            keywords[jsonName].keywords.forEach(keyword => {
              if (keyword.indexOf(searchWord) !== -1 && words.indexOf(keyword) === -1) words.push(keyword);
            });

          // 检查描述是否包含了searchWord
          if (keywords[jsonName].desc)
            keywords[jsonName].desc.forEach(keyword => {
              if (keyword.indexOf(searchWord) !== -1 && words.indexOf(keyword) === -1) words.push(keyword);
            });
        });

      this.setData({ words });
    }
  },
  search(event: WXEvent.Input) {
    wx.showLoading({ title: '搜索中...' });
    const keywords = this.keywords as Keywords;
    const searchWord = event.detail.value.split('');
    const weight: SearchResultWeight = {};
    const resultList: SearchResult[] = [];
    const desc: IAnyObject = {};


    Object.keys(keywords)
      .forEach(jsonName => {
        // 搜索页面标题
        searchWord.forEach(word => {
          if (keywords[jsonName].title.indexOf(word) !== -1) weight[jsonName] = (weight[jsonName] || 0) + 4;
        });

        // 搜索关键词
        if (keywords[jsonName].keywords)
          keywords[jsonName].keywords.forEach(keyword => {
            searchWord.forEach(word => {
              if (keyword.indexOf(word) !== -1) weight[jsonName] = (weight[jsonName] || 0) + 2;
            });
          });

        // 搜索标题
        keywords[jsonName].desc.forEach(descText => {
          searchWord.forEach(word => {
            if (descText.indexOf(word) !== -1) {
              weight[jsonName] = (weight[jsonName] || 0) + 1;
              desc[jsonName] = descText;
            }
          });
        });
      });

    const keys = Object.keys(weight);

    keys.sort((x, y) => {
      return weight[y] - weight[x];
    });

    // 为权重大于2的匹配值生成最终结果
    keys.forEach(key => {
      if (weight[key] >= 2)
        resultList.push({
          url: `module1?aim=${key}&From=搜索`,
          text: keywords[key].title,
          desc: desc[key]
        });
    });

    console.log(resultList);

    this.setData({
      result: {
        head: false,
        content: resultList
      }
    });

    wx.hideLoading();
  }
});
