/*
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: 文件管理模块
 * @Date: 2019-02-12 16:45:44
 * @LastEditTime: 2019-04-10 18:26:40
 */

/* global wx */

// 初始化文件管理器和用户路径
const fileManager = wx.getFileSystemManager(),
  userPath = wx.env.USER_DATA_PATH,

  /**
   * @description: 删除文件或文件夹
   * @param {string} path 要删除的文件或文件夹路径
   * @param {string} [isDir = null] 要删除的是否是文件夹
   * @return {void}
   */
  Delete = (path, isDir = null) => {
    if (isDir === null)
      try {
        // 判断路径是否是文件，并执行对应删除操作
        if (fileManager.statSync(`${userPath}/${path}`).isFile())
          fileManager.unlinkSync(`${userPath}/${path}`);
        else fileManager.rmdirSync(`${userPath}/${path}`, true);
      } catch (err) {
        console.error(`删除${path}出错,错误为:`, err);
      }
    // 是目录
    else if (isDir) try {

      fileManager.rmdirSync(`${userPath}/${path}`, true);

    } catch (err) { console.error(`删除${path}出错,错误为:`, err); }
    // 是文件
    else try {

      fileManager.unlinkSync(`${userPath}/${path}`);

    } catch (err) { console.error(`删除${path}出错,错误为:`, err); }
  },

  /**
   * @description: 列出目录下文件
   * @param {string} path 要查看的文件夹路径
   * @return {string[]} 指定目录下的文件名数组
   */
  listFile = path => {
    try {
      const fileList = fileManager.readdirSync(`${userPath}/${path}`);

      console.info(`${path}文件夹下文件为：`, fileList);

      return fileList;
    } catch (err) {
      console.error(`列出${path}文件夹下文件错误：`, err);

      return null;
    }
  },

  /**
   * @description: - 文件管理器读取文件包装
   * @param {string} path - 待读取文件相对用户文件夹的路径
   * @param {string} [encoding='utf-8'] - 文件的编码格式
   * @return {string} - 文件内容
   */
  readFile = (path, encoding = 'utf-8') => {
    try {
      return fileManager.readFileSync(`${userPath}/${path}`, encoding);
    } catch (err) {
      console.warn(`${path}不存在`);

      return null;
    }
  },

  /**
   * @description: 读取并解析Json文件
   * @param {string} path Json文件相对用户文件夹的路径
   * @param {string} [encoding='utf-8'] 文件的编码格式
   * @return {object} 解析后的json
   */
  readJson = (path, encoding = 'utf-8') => {
    let fileContent, data;

    try {
      fileContent = fileManager.readFileSync(`${userPath}/${path}.json`, encoding);
      try {
        data = JSON.parse(fileContent);

        console.log(`read ${path}.json成功：`, data);
      } catch (err) {
        console.log(`${path}解析失败`);
        data = null;
      }
    } catch (err) {
      console.log(`${path}不存在`);
      data = null;
    }

    return data;
  },

  /**
   * @description: 创建目录
   * @param {string} path 要创建的目录路径
   * @param {string} [recursive=true] 是否递归创建目录
   * @return {void}
   */
  makeDir = (path, recursive = true) => {
    try {
      fileManager.mkdirSync(`${userPath}/${path}`, recursive);
    } catch (err) {
      console.info(`${path}目录已存在`, err);
    }

  },

  /**
   * @description: 保存文件
   * @param {string} tempFilePath 缓存文件路径
   * @param {string} path 保存文件路径
   * @return {void}
   */
  saveFile = (tempFilePath, path) => {
    try {
      fileManager.saveFileSync(tempFilePath, `${userPath}/${path}`);
    } catch (err) {
      console.error(`保存文件到${path}失败：`, err);
    }
  },

  /**
   * @description: 保存在线文件
   * @param {string} onlinePath 在线文件路径
   * @param {string} savePath 本地保存路径
   * @param {string} fileName 本地保存文件名
   * @param {callback} successFunc 成功回调函数
   * @param {callback} [failFunc = () => null] 失败回调函数
   * @return {void}
   */
  saveOnlineFile = ([onlinePath, savePath, fileName], successFunc, failFunc = () => null, ...args) => {
    makeDir(savePath);
    wx.downloadFile({
      url: `https://mp.nenuyouth.com/${onlinePath}`,
      filePath: `${userPath}/${savePath}/${fileName}`,
      success: res => {
        if (res.statusCode === 200) {
          console.info(`save ${onlinePath} success`);
          successFunc(...args);
        } else {
          failFunc();
          console.warn(`下载${onlinePath}失败，状态码为${res.statusCode}`);
        }
      },
      fail: res => {
        failFunc();
        console.warn(`下载${onlinePath}失败，错误为`, res);
      }
    });
  },

  /**
   * @description: 写入文件
   * @param {string} path 写入文件的路径
   * @param {string} fileName 写入文件的文件名
   * @param {string} data 写入文件的数据
   * @param {string} [encoding = 'utf-8'] 文件编码选项
   * @return {void}
   */
  writeFile = (path, fileName, data, encoding = 'utf-8') => {
    const jsonString = JSON.stringify(data);

    makeDir(path);
    fileManager.writeFileSync(`${userPath}/${path}/${fileName}`, jsonString, encoding);
  },

  /**
   * @description: 写入Json文件
   * @param {string} path 写入文件的路径
   * @param {string} fileName 写入文件的文件名
   * @param {object} data 写入文件的数据
   * @param {string} [encoding = 'utf-8'] 文件编码选项
   * @return {void}
   */
  writeJson = (path, fileName, data, encoding = 'utf-8') => {
    const jsonString = JSON.stringify(data);

    makeDir(path);
    fileManager.writeFileSync(`${userPath}/${path}/${fileName}.json`, jsonString, encoding);
  },

  /**
   * @description: 解压文件
   * @param {string} path 压缩文件路径
   * @param {string} unzipPath 解压路径
   * @param {callback} callback 回调函数
   * @param {any[]} [args] 回调函数的参数
   * @return {void}
   */
  unzip = (path, unzipPath, callback = () => null, ...args) => {
    fileManager.unzip({
      zipFilePath: `${userPath}/${path}`, targetPath: `${userPath}/${unzipPath}`,
      success: () => { callback(...args); },
      fail: failMsg => console.error(`unzip ${path} fail:`, failMsg)
    });
  };

module.exports = {
  Delete, Manager: fileManager, listFile, readFile, readJson,
  makeDir, saveFile, saveOnlineFile, writeFile, writeJson, unzip
};
