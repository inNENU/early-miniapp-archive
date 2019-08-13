/*
 * @Author: Mr.Hope
 * @Date: 2019-08-09 16:43:03
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-13 19:40:24
 * @Description: 通用模块
 */

/**
 * 字符串参数解析
 *
 * @param queryString 需要解析的字符串
 * @param [spliter='&'] 分隔符
 *
 * @returns 参数对象
 */
const queryParse = (queryString: string, spliter = '&') => {
  // QueryString为空
  if (!queryString) return {};

  /** 参数对象 */
  const queries: IAnyObject = {};
  const splits = queryString ? queryString.split(spliter) : undefined;

  if (splits && splits.length > 0)
    splits.forEach(item => {
      const [key, value] = item.split('=');

      queries[key] = value;
    });

  return queries;
};

/**
 * Query 对象转换字符串
 *
 * @param options query对象
 * @param [spliter='&'] 分隔符
 * @param [unencoded=false] 是否已经解码
 *
 * @returns 解析的字符串
 */
const queryStringify = (options: IAnyObject, spliter = '&', unencoded = false) => {
  if (!options) return '';

  return Object.keys(options)
    .map(key => {
      const value = options[key];

      return `${key}=${unencoded ? value : encodeURIComponent(value)}`;
    })
    .join(spliter);
};

/**
 * URL添加query
 *
 * @param path 前部分路径
 * @param queries query对象
 * @param unencoded 是否已经解码
 *
 * @returns 处理过的url
 */
const queryJoin = (path: any, queries: any, unencoded: boolean) => {
  const qs = queryStringify(queries, '&', unencoded);

  if (!qs) return path;

  let sep;

  if ((/[\?&]$/u).test(path)) sep = '';
  else if (path.indexOf('?')) sep = '&';
  else sep = '?';

  return `${path}${sep}${qs}`;
};

export default { queryParse, queryJoin, queryStringify };
