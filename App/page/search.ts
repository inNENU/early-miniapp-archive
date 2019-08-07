/*
 * @Author: Mr.Hope
 * @Date: 2019-08-06 20:59:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-07 21:18:50
 * @Description: 搜索页
 */

import $register from 'wxpage';

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
    statusBarHeight: getApp().globalData.info.statusBarHeight,
    words: [],
    result: {}
  },
  onLoad(options) {
    this.keywords = getApp()
      .keywords() as Keywords;

    if (options.words)
      this.search({
        detail: {
          value: options.words
        }
      });
  },
  searching(event: WXEvent.Input) {
    const keywords = this.keywords as Keywords;
    const searchWord = event.detail.value;
    const words: string[] = [];

    if (searchWord) {
      Object.keys(keywords)
        .forEach(jsonName => {
          // 判断每个关键词是否包含了searchWord，如果包含则推送。
          keywords[jsonName].keywords.forEach(keyword => {
            if (keyword.indexOf(searchWord) !== -1 && words.indexOf(keyword) === -1) words.push(keyword);
          });
        });

      console.log(words);

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

    console.log(keywords);

    Object.keys(keywords)
      .forEach(jsonName => {
        // 搜索关键词
        keywords[jsonName].keywords.forEach(keyword => {
          console.log(keyword);

          searchWord.forEach(word => {
            if (keyword.indexOf(word) !== -1) weight[jsonName] = (weight[jsonName] || 0) + 1;
          });
        });

        // 搜索标题
        keywords[jsonName].desc.forEach(descText => {
          console.log(descText);

          searchWord.forEach(word => {
            if (descText.indexOf(word) !== -1) {
              weight[jsonName] = (weight[jsonName] || 0) + 1;
              desc[jsonName] = descText;
            }
          });
        });
      });

    const keys = Object.keys(weight);

    keys.sort((a, b) => {
      return weight[b] - weight[a];
    });

    keys.forEach(key => {
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
