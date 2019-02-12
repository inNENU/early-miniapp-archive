/* global wx */

// 初始化文件管理器和用户路径
const fileManager = wx.getFileSystemManager(), userPath = wx.env.USER_DATA_PATH;

// 文件管理器读取文件包装
const readFile = (path, encoding = "utf-8") => {
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
};

// 写入文件包装
const writeFile = (path, data, encoding = "utf-8") => {
  try {
    fileManager.mkdirSync(`${userPath}/${path}`, true);
  } catch (err) {
    console.log(`${path}目录已存在`);
  }

  fileManager.writeFileSync(`${userPath}/${path}`, data, encoding);
};

const saveOnlineFile = (onlinePath, savePath, successFunc, failFunc = () => null) => {
  try {
    fileManager.mkdirSync(`${userPath}/${savePath}`, true);
  } catch (err) {
    console.log(`${savePath}目录已存在`);
  }
  wx.downloadFile({
    url: `https://nenuyouth.com/${onlinePath}`,
    filePath: `${userPath}/${savePath}`,
    success: res => {
      if (res.statusCode == 200) console.log(`save ${onlinePath} success`), successFunc();
      else {
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

module.exports = { readFile, writeFile, saveOnlineFile };