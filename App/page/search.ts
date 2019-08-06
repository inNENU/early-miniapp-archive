/*
 * @Author: Mr.Hope
 * @Date: 2019-08-06 20:59:46
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-06 22:45:59
 * @Description: 搜索页
 */

import $register from 'wxpage';
import $file from '../utils/file';
// import $component from '../utils/component';
// import $page from '../utils/page';
// const { globalData: a } = getApp();

interface Keywords {
  [jsonName: string]: string[];
}

interface SearchResult {
  [jsonName: string]: number;
}

$register('search', {
  data: {
    statusBarHeight: getApp().globalData.info.statusBarHeight,
    words: [],
    result: {}
  },
  onLoad() {
    this.keywords = $file.readJson('page/keywords') as Keywords;
  },
  search(event: WXEvent.Input) {
    wx.showLoading({ title: '搜索中...' });
    const keywords = this.keywords as Keywords;
    const searchWord = event.detail.value.split('');
    const result: SearchResult = {};

    Object.keys(keywords)
      .forEach(jsonName => {
        keywords[jsonName].forEach(keyword => {
          searchWord.forEach(word => {
            if (keyword.indexOf(word) !== -1) result[jsonName] = (result[jsonName] || 0) + 1;
          });
        });
      });
    console.log(result);

    this.setData({ result });

    wx.hideLoading();
  },
  searching(event: WXEvent.Input) {
    const keywords = this.keywords as Keywords;
    const searchWord = event.detail.value.split('');
    const words: string[] = [];

    Object.keys(keywords)
      .forEach(jsonName => {
        keywords[jsonName].forEach(keyword => {
          searchWord.forEach(word => {
            if (keyword.indexOf(word) !== -1 && words.indexOf(keyword) === -1) words.push(keyword);
          });
        });
      });
    console.log(words);

    this.setData({ words });
  }
});
