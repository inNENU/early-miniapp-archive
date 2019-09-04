/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 文件管理模块
 * @Date: 2019-02-12 16:45:44
 * @LastEditTime: 2019-09-04 12:44:57
 */

import $log from './log';

/** 文件管理器 */
const fileManager = wx.getFileSystemManager();
/** 用户文件夹路径 */
const userPath = wx.env.USER_DATA_PATH;
/** 请求网址 */
const url = 'mp.nenuyouth.com';

/**
 * 删除文件或文件夹
 * @param path 要删除的文件或文件夹路径
 * @param isDir 要删除的是否是文件夹
 */
export const Delete = (path: string, isDir?: boolean | undefined) => {
  if (isDir === undefined)
    try {
      // 判断路径是否是文件，并执行对应删除操作
      if (
        (fileManager.statSync(`${userPath}/${path}`) as WechatMiniprogram.Stats)
          .isFile()
      )
        fileManager.unlinkSync(`${userPath}/${path}`);
      else fileManager.rmdirSync(`${userPath}/${path}`, true);

    } catch (err) { // 调试
      $log.error(`删除${path}出错,错误为:`, err);
    }
  // 是目录
  else if (isDir)
    try {
      fileManager.rmdirSync(`${userPath}/${path}`, true);
    } catch (err) { // 调试
      $log.error(`删除${path}出错,错误为:`, err);
    }
  // 是文件
  else
    try {
      fileManager.unlinkSync(`${userPath}/${path}`);
    } catch (err) { // 调试
      $log.error(`删除${path}出错,错误为:`, err);
    }
};

/**
 * 判断文件或文件夹是否存在
 *
 * @param path 要查看的文件/文件夹路径
 * @returns true
 */
const isFileExist = (path: string) => {
  try {
    fileManager.statSync(`${userPath}/${path}`, false);

    return true;
  } catch (err) { // 调试
    $log.error(`${path}不存在`, err);

    return false;
  }
};

/**
 * 列出目录下文件
 *
 * @param path 要查看的文件夹路径
 * @returns 指定目录下的文件名数组
 */
export const listFile = (path: string) => {
  try {
    const fileList = fileManager.readdirSync(`${userPath}/${path}`);

    $log.info(`${path}文件夹下文件为：`, fileList);// 调试

    return fileList;
  } catch (err) { // 调试
    $log.error(`列出${path}文件夹下文件错误：`, err);

    return [];
  }
};

/**
 * 文件管理器读取文件包装
 *
 * @param path 待读取文件相对用户文件夹的路径
 * @param encoding 文件的编码格式
 * @returns 文件内容
 */
const readFile = (path: string, encoding = 'utf-8') => {
  try {
    return fileManager.readFileSync(`${userPath}/${path}`, encoding);
  } catch (err) {
    $log.warn(`${path}不存在`);

    return undefined;
  }
};

/**
 * 读取并解析Json文件
 *
 * @param path Json文件相对用户文件夹的路径
 * @param encoding 文件的编码格式
 * @returns  解析后的json
 */
export const readJson = (path: string, encoding = 'utf-8') => {
  let fileContent;
  let data;

  try {
    fileContent = fileManager.readFileSync(`${userPath}/${path}.json`, encoding);
    try {
      data = JSON.parse(fileContent as string);

      $log.debug(`读取 ${path}.json成功：`, data);

    } catch (err) {
      data = undefined;

      // 调试
      $log.warn(`${path}解析失败`);
    }

  } catch (err) {
    data = undefined;

    // 调试
    $log.warn(`${path}不存在`);
  }

  return data;
};

/**
 * 创建目录
 * @param path 要创建的目录路径
 * @param recursive 是否递归创建目录
 */
export const makeDir = (path: string, recursive = true) => {
  try {
    fileManager.mkdirSync(`${userPath}/${path}`, recursive);

  } catch (err) { // 调试
    $log.info(`${path}目录已存在`, err);
  }

};

/**
 * 保存文件
 * @param tempFilePath 缓存文件路径
 * @param path 保存文件路径
 */
const saveFile = (tempFilePath: string, path: string) => {
  try {
    fileManager.saveFileSync(tempFilePath, `${userPath}/${path}`);

  } catch (err) { // 调试
    $log.error(`保存文件到${path}失败：`, err);
  }
};

/**
 * 保存在线文件
 *
 * @param options 参数数组
 *  - onlinePath 在线文件路径
 *  - savePath 本地保存路径
 *  - fileName 本地保存文件名
 *
 * @param successFunc 成功回调函数
 * @param failFunc  失败回调函数
 * @param errorFunc 失败回调函数
 */
const saveOnlineFile = (
  [onlinePath, savePath, fileName]: string[],
  successFunc: (path: string) => void,
  failFunc?: (errMsg: WechatMiniprogram.GeneralCallbackResult) => void,
  errorFunc?: (statusCode: number) => void
) => {
  makeDir(savePath);
  wx.downloadFile({
    url: `https://${url}/${onlinePath}`,
    filePath: `${userPath}/${savePath}/${fileName}`,
    success: res => {
      if (res.statusCode === 200) {
        $log.info(`保存 ${onlinePath} 成功`);
        successFunc(res.tempFilePath);
      } else {
        if (errorFunc) errorFunc(res.statusCode);
        $log.warn(`下载${onlinePath}失败，状态码为${res.statusCode}`);
      }
    },
    fail: failMsg => {
      if (failFunc) failFunc(failMsg);
      $log.warn(`下载${onlinePath}失败，错误为`, failMsg);
    }
  });
};

/**
 * 写入文件
 *
 * @param path 写入文件的路径
 * @param fileName 写入文件的文件名
 * @param data 写入文件的数据
 * @param encoding 文件编码选项
 */
const writeFile = (path: string, fileName: string, data: object | ArrayBuffer | string, encoding = 'utf-8') => {
  const jsonString = JSON.stringify(data);

  makeDir(path);
  fileManager.writeFileSync(`${userPath}/${path}/${fileName}`, jsonString, encoding);
};

/**
 * 写入Json文件
 *
 * @param path 写入文件的路径
 * @param fileName 写入文件的文件名
 * @param data 写入文件的数据
 * @param encoding 文件编码选项
 */
export const writeJson = (path: string, fileName: string, data: object, encoding = 'utf-8') => {
  const jsonString = JSON.stringify(data);

  makeDir(path);
  fileManager.writeFileSync(`${userPath}/${path}/${fileName}.json`, jsonString, encoding);
};

/**
 * 获取Json
 *
 * @param path JSON文件路径
 * @param successFunc Json获取成功后的回调
 * @param failFunc Json获取失败后的回调
 */
export const getJson = (path: string, successFunc?: (data: object | string) => void, failFunc?: () => void) => {
  if (successFunc) {
    let data = readJson(path);

    if (data) successFunc(data);
    else {

      const temp = path.split('/');
      const fileName = temp.pop();
      const folder = temp.join('/');

      makeDir(folder);

      wx.downloadFile({
        url: `https://${url}/${path}.json`,
        filePath: `${userPath}/${folder}/${fileName}.json`,
        success: res => {
          if (res.statusCode === 200) {
            $log.info(`保存 ${path}.json 成功`);

            data = readJson(path);

            successFunc(data);
          } else {
            $log.warn(`获取${path}.json失败，状态码为${res.statusCode}`);
            if (failFunc) failFunc();
          }
        },
        fail: failMsg => {
          $log.warn(`下载${path}.json失败，错误为`, failMsg);
          if (failFunc) failFunc();
        }
      });
    }
  } else if (!isFileExist(`${path}.json`)) {

    const temp = path.split('/');
    const fileName = temp.pop();
    const folder = temp.join('/');

    makeDir(folder);

    wx.downloadFile({
      url: `https://${url}/${path}.json`,
      filePath: `${userPath}/${folder}/${fileName}.json`,
      success: res => {
        if (res.statusCode === 200) $log.info(`保存 ${path}.json 成功`);
        else $log.error(`获取${path}.json失败，状态码为${res.statusCode}`);
      },
      fail: failMsg => {
        $log.error(`下载${path}.json失败，错误为`, failMsg);
      }
    });
  }
};

/**
 * 解压文件
 *
 * @param path 压缩文件路径
 * @param unzipPath 解压路径
 * @param successFunc 回调函数
 */
const unzip = (path: string, unzipPath: string, successFunc?: () => void) => {
  fileManager.unzip({
    zipFilePath: `${userPath}/${path}`, targetPath: `${userPath}/${unzipPath}`,
    success: () => {
      if (successFunc) successFunc();
    },
    fail: failMsg => {
      $log.error(`解压 ${path} 失败:`, failMsg);
    }
  });
};

export default {
  Delete, getJson, listFile, readFile, readJson,
  makeDir, saveFile, saveOnlineFile, writeFile, writeJson,
  unzip, exist: isFileExist, Manager: fileManager
};
