/* eslint-disable max-params */
import { debug, error, info, warn } from './log';
import { server } from './config';

/** 文件编码 */
type FileEncoding =
  | 'utf-8'
  | 'ascii'
  | 'base64'
  | 'binary'
  | 'hex'
  | 'ucs2'
  | 'ucs-2'
  | 'utf16le'
  | 'utf-16le'
  | 'utf8'
  | 'latin1'
  | undefined;

/** 文件管理器 */
const fileManager = wx.getFileSystemManager();
/** 用户文件夹路径 */
const userPath = wx.env.USER_DATA_PATH;

/**
 * 删除文件或文件夹
 * @param path 要删除的文件或文件夹路径
 * @param isDir 要删除的是否是文件夹
 */
export const Delete = (path: string, isDir?: boolean | undefined): void => {
  if (isDir === undefined)
    try {
      // 判断路径是否是文件，并执行对应删除操作
      if (
        (fileManager.statSync(
          `${userPath}/${path}`
        ) as WechatMiniprogram.Stats).isFile()
      )
        fileManager.unlinkSync(`${userPath}/${path}`);
      else fileManager.rmdirSync(`${userPath}/${path}`, true);
    } catch (err) {
      // 调试
      error(`删除${path}出错,错误为:`, err);
    }
  // 是目录
  else if (isDir)
    try {
      fileManager.rmdirSync(`${userPath}/${path}`, true);
    } catch (err) {
      // 调试
      error(`删除${path}出错,错误为:`, err);
    }
  // 是文件
  else
    try {
      fileManager.unlinkSync(`${userPath}/${path}`);
    } catch (err) {
      // 调试
      error(`删除${path}出错,错误为:`, err);
    }
};

/**
 * 判断文件或文件夹是否存在
 *
 * @param path 要查看的文件/文件夹路径
 * @returns true
 */
const isFileExist = (path: string): boolean => {
  try {
    fileManager.statSync(`${userPath}/${path}`, false);

    return true;
  } catch (err) {
    // 调试
    error(`${path}不存在`, err);

    return false;
  }
};

export const exist = isFileExist;

/**
 * 列出目录下文件
 *
 * @param path 要查看的文件夹路径
 * @returns 指定目录下的文件名数组
 */
export const listFile = (path: string): string[] => {
  try {
    const fileList = fileManager.readdirSync(`${userPath}/${path}`);

    info(`${path}文件夹下文件为：`, fileList); // 调试

    return fileList;
  } catch (err) {
    // 调试
    error(`列出${path}文件夹下文件错误：`, err);

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
export const readFile = (
  path: string,
  encoding: FileEncoding = 'utf-8'
): string | ArrayBuffer | undefined => {
  try {
    return fileManager.readFileSync(`${userPath}/${path}`, encoding);
  } catch (err) {
    warn(`${path}不存在`);

    return undefined;
  }
};

/**
 * 读取并解析 JSON 文件
 *
 * @param path JSON 文件相对用户文件夹的路径
 * @param encoding 文件的编码格式
 * @returns JSON 文件内容
 */
export const readJSON = (
  path: string,
  encoding: FileEncoding = 'utf-8'
): any => {
  let data;

  try {
    const fileContent = fileManager.readFileSync(
      `${userPath}/${path}.json`,
      encoding
    );
    try {
      data = JSON.parse(fileContent as string);

      debug(`读取 ${path}.json成功：`, data);
    } catch (err) {
      data = undefined;

      // 调试
      warn(`${path}解析失败`);
    }
  } catch (err) {
    data = undefined;

    // 调试
    warn(`${path}不存在`);
  }

  return data;
};

/**
 * 创建目录
 * @param path 要创建的目录路径
 * @param recursive 是否递归创建目录
 */
export const makeDir = (path: string, recursive = true): void => {
  try {
    fileManager.mkdirSync(`${userPath}/${path}`, recursive);
  } catch (err) {
    // 调试
    info(`${path}目录已存在`, err);
  }
};

/**
 * 保存文件
 * @param tempFilePath 缓存文件路径
 * @param path 保存文件路径
 */
export const saveFile = (tempFilePath: string, path: string): void => {
  try {
    fileManager.saveFileSync(tempFilePath, `${userPath}/${path}`);
  } catch (err) {
    // 调试
    error(`保存文件到${path}失败：`, err);
  }
};

/** 保存在线文件选项接口 */
interface SaveOnlineFileOption {
  /** 在线文件路径 */
  onlinePath: string;
  /** 本地保存路径 */
  savePath: string;
  /** 本地保存文件名 */
  saveName: string;
  /** 成功回调函数 */
  success?: (path: string) => void;
  /** 失败回调函数 */
  fail?: (errMsg: WechatMiniprogram.GeneralCallbackResult) => void;
  /** 状态码错误回调函数 */
  error?: (statusCode: number) => void;
}

/**
 * 保存在线文件
 *
 * @param options 配置
 */
export const saveOnlineFile = ({
  onlinePath,
  savePath,
  saveName,
  success,
  fail,
  error: errorFunc
}: SaveOnlineFileOption): void => {
  makeDir(savePath);
  wx.downloadFile({
    url: `https://${server}${onlinePath}`,
    filePath: `${userPath}/${savePath}/${saveName}`,
    success: (res) => {
      if (res.statusCode === 200) {
        info(`保存 ${onlinePath} 成功`);
        if (success) success(res.tempFilePath);
      } else {
        if (errorFunc) errorFunc(res.statusCode);
        warn(`下载${onlinePath}失败，状态码为${res.statusCode}`);
      }
    },
    fail: (failMsg) => {
      if (fail) fail(failMsg);
      warn(`下载${onlinePath}失败，错误为`, failMsg);
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
export const writeFile = (
  path: string,
  fileName: string,
  data: object | ArrayBuffer | string,
  encoding: FileEncoding = 'utf-8'
): void => {
  const jsonString = JSON.stringify(data);

  makeDir(path);
  fileManager.writeFileSync(
    `${userPath}/${path}/${fileName}`,
    jsonString,
    encoding
  );
};

/**
 * 写入 JSON 文件
 *
 * @param path 写入文件的路径
 * @param fileName 写入文件的文件名
 * @param data 写入文件的数据
 * @param encoding 文件编码选项
 */
export const writeJSON = (
  path: string,
  fileName: string,
  data: object,
  encoding: FileEncoding = 'utf-8'
): void => {
  const jsonString = JSON.stringify(data);

  makeDir(path);
  fileManager.writeFileSync(
    `${userPath}/${path}/${fileName}.json`,
    jsonString,
    encoding
  );
};

/**
 * 获取 JSON
 *
 * @param path JSON 文件路径
 * @param successFunc JSON 获取成功后的回调
 * @param failFunc JSON 获取失败后的回调
 */
export const getJSON = (
  path: string,
  successFunc?: (data: object | string) => void,
  failFunc?: () => void
): void => {
  const temp = path.split('/');
  const fileName = temp.pop();
  const folder = temp.join('/');

  if (successFunc) {
    let data = readJSON(path);

    if (data) successFunc(data);
    else {
      makeDir(folder);

      wx.downloadFile({
        url: `https://${server}${path}.json`,
        filePath: `${userPath}/${folder}/${fileName}.json`,
        success: (res) => {
          if (res.statusCode === 200) {
            info(`保存 ${path}.json 成功`);

            data = readJSON(path);

            successFunc(data);
          } else {
            warn(`获取${path}.json失败，状态码为${res.statusCode}`);
            if (failFunc) failFunc();
          }
        },
        fail: (failMsg) => {
          warn(`下载${path}.json失败，错误为`, failMsg);
          if (failFunc) failFunc();
        }
      });
    }
  } else if (!isFileExist(`${path}.json`)) {
    makeDir(folder);

    wx.downloadFile({
      url: `https://${server}${path}.json`,
      filePath: `${userPath}/${folder}/${fileName}.json`,
      success: (res) => {
        if (res.statusCode === 200) info(`保存 ${path}.json 成功`);
        else error(`获取${path}.json失败，状态码为${res.statusCode}`);
      },
      fail: (failMsg) => {
        error(`下载${path}.json失败，错误为`, failMsg);
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
export const unzip = (
  path: string,
  unzipPath: string,
  successFunc?: () => void
): void => {
  fileManager.unzip({
    zipFilePath: `${userPath}/${path}`,
    targetPath: `${userPath}/${unzipPath}`,
    success: () => {
      if (successFunc) successFunc();
    },
    fail: (failMsg) => {
      error(`解压 ${path} 失败:`, failMsg);
    }
  });
};
