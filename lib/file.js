/* global wx */

// 初始化文件管理器和用户路径
const fileManager = wx.getFileSystemManager(),
  userPath = wx.env.USER_DATA_PATH,

  // 文件管理器读取文件包装
  readFile = (path, encoding = 'utf-8') => {
    let fileContent;

    try {
      fileContent = fileManager.readFileSync(`${userPath}/${path}`, encoding);
    } catch (err) {
      console.log(`${path}不存在`);
      fileContent = null;
    }

    return fileContent;
  },

  // 文件管理器读取Json文件并解析包装
  readJson = (path, encoding = 'utf-8') => {
    console.log('readJson', path);
    let fileContent, data;

    try {
      fileContent = fileManager.readFileSync(`${userPath}/${path}`, encoding);
      try {
        data = JSON.parse(fileContent);
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

  makeDir = (path, recursive = true) => {
    try {
      fileManager.mkdirSync(`${userPath}/${path}`, recursive);
    } catch (e) {
      console.info(`${path}目录已存在`);
    }

  },

  // 写入文件包装
  writeFile = (path, fileNme, data, encoding = 'utf-8') => {
    console.log('writeFile', path, fileNme);
    const jsonString = JSON.stringify(data);

    try {
      fileManager.mkdirSync(`${userPath}/${path}`, true);
    } catch (err) {
      console.log(`${path}目录已存在`);
    }

    fileManager.writeFileSync(`${userPath}/${path}/${fileName}`, jsonString, encoding);
  },

  // 写入文件包装
  writeJson = (path, fileName, data, encoding = 'utf-8') => {
    const jsonString = JSON.stringify(data);

    try {
      fileManager.mkdirSync(`${userPath}/${path}`, true);
    } catch (err) {
      console.log(`${path}目录已存在`);
    }

    fileManager.writeFileSync(`${userPath}/${path}/${fileName}`, jsonString, encoding);
  },

  saveOnlineFile = (onlinePath, savePath, fileName, successFunc, failFunc = () => null) => {
    try {
      fileManager.mkdirSync(`${userPath}/${savePath}`, true);
    } catch (err) {
      console.log(`${savePath}目录已存在`);
    }
    wx.downloadFile({
      url: `https://mp.nenuyouth.com/${onlinePath}`,
      filePath: `${userPath}/${savePath}/${fileName}`,
      success: res => {
        if (res.statusCode === 200) {
          console.log(`save ${onlinePath} success`);
          successFunc();
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
  };

module.exports = { readFile, readJson, makeDir, saveOnlineFile, writeFile, writeJson };
