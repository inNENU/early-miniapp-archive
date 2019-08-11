/*
 * @Author: Mr.Hope
 * @Date: 2019-08-12 01:14:51
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-12 01:32:35
 * @Description: 搜索模块
 */

import $file from './file';

/** 关键词 */
export interface Keywords {
  [jsonName: string]: {
    /** 页面标题 */
    title: string;
    /** 页面关键词 */
    keywords: string[];
    /** 页面内标题 */
    desc: string[];
  };
}

/** 搜索权重 */
interface SearchResultWeight {
  [jsonName: string]: number;
}

/** 搜索结果 */
interface SearchResult {
  /** 地址 */
  url: string;
  /** 文字 */
  text: string;
  /** 详情 */
  desc?: string;
}

// 关键词
let keywords: Keywords;

/** 初始化keywords */
const init = () => {
  $file.getJson('page/keywords', data => {
    keywords = data as Keywords;
  });
};

/**
 * 搜索词
 *
 * @param searchWord 输入的搜索词
 * 
 * @returns 匹配的候选词列表
 */
const searching = (searchWord: string) => {
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
  }

  return words;
};


/**
 * 普通搜索
 *
 * @param searchWord 输入的搜索词
 *
 * @returns 匹配的结果列表
 */
const search = (searchWord: string) => {
  const words = searchWord.split('');
  const weight: SearchResultWeight = {};
  const resultList: SearchResult[] = [];
  const desc: IAnyObject = {};

  Object.keys(keywords)
    .forEach(jsonName => {
      // 搜索页面标题
      words.forEach(word => {
        if (keywords[jsonName].title.indexOf(word) !== -1) weight[jsonName] = (weight[jsonName] || 0) + 4;
      });

      // 搜索关键词
      if (keywords[jsonName].keywords)
        keywords[jsonName].keywords.forEach(keyword => {
          words.forEach(word => {
            if (keyword.indexOf(word) !== -1) weight[jsonName] = (weight[jsonName] || 0) + 2;
          });
        });

      // 搜索标题
      keywords[jsonName].desc.forEach(descText => {
        words.forEach(word => {
          if (descText.indexOf(word) !== -1) {
            weight[jsonName] = (weight[jsonName] || 0) + 1;
            desc[jsonName] = descText;
          }
        });
      });
    });

  // 按权重排序
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

  return resultList;
};

export default { init, search, searching };
