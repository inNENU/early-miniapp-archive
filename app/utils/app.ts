/* eslint-disable max-lines, max-lines-per-function */

/** 文件管理器与API封装 */
import { Delete, listFile, saveFile, unzip } from './file';
import { compareVersion, modal, netReport, requestJSON, tip } from './wx';
import { error, info, warn } from './log';
import { GlobalData } from '../app';
import { server } from './config';

/** App初始化选项 */
interface AppOption {
  [props: string]: string | boolean | number;
}

/** 小程序配置 */
const appOption: AppOption = {
  /** 主题设置 */
  theme: 'auto',
  /** 选择的主题序列号 */
  themeNum: 0,
  /** 是否开启夜间模式 */
  darkmode: false,
  /** 日间模式是否改变亮度 */
  darkmodeAutoChange: true,
  /** 日间模式是否改变亮度 */
  dayBrightnessChange: false,
  /** 夜间模式是否改变亮度 */
  nightBrightnessChange: false,
  /** 日间模式亮度(百分比) */
  dayBrightness: 70,
  /** 夜间模式亮度(百分比) */
  nightBrightness: 30,
  /** 夜间模式开始时间 */
  darkmodeStartTime: '0-0',
  /** 夜间模式结束时间 */
  darkmodeEndTime: '5-0',
  /** 功能更新提示 */
  functionResNotify: true,
  /** 页面更新提示 */
  pageResNotify: true,
  /** 开发者模式开启状态 */
  developMode: false
};

/**
 * 下载list中的对应资源
 *
 * @param list 需要下载的资源列表
 * @param callBack 下载完成的回调函数
 */
const resDownload = (list: string[], callBack: () => void): void => {
  /** 监听数 */
  let listenNumber = list.length;

  list.forEach((name) => {
    // 下载zip包
    wx.downloadFile({
      url: `${server}${name}.zip`,
      success: (res) => {
        console.log(`${name} statusCode is ${res.statusCode}`); // 调试
        if (res.statusCode === 200) {
          // 保存压缩文件到压缩目录
          saveFile(res.tempFilePath, `${name}Zip`);
          console.log(`save ${name} success`); // 调试

          // 解压文件到根目录
          unzip(`${name}Zip`, '', () => {
            console.log(`unzip ${name} sucess`); // 调试

            // 删除压缩目录，并将下载成功信息写入存储、判断取消提示
            Delete(`${name}Zip`, false);
            wx.setStorageSync(`${name}Download`, true);

            console.log(`delete ${name} sucess`); // 调试

            // 下载资源文件并写入更新时间
            const timeStamp = new Date().getTime();

            wx.setStorageSync(
              `${name}UpdateTime`,
              Math.round(timeStamp / 1000)
            );

            // 改变监听数
            listenNumber -= 1;
            if (!listenNumber) callBack();
          });
        }
      },

      // 下载失败
      fail: (failMsg) => {
        netReport();
        error(`初始化小程序时下载${name}失败:`, failMsg);
      }
    });
  });
};

/** 初始化小程序 */
export const appInit = (): void => {
  // 提示用户正在初始化
  wx.showLoading({ title: '初始化中...', mask: true });
  info('初次启动');

  // 设置主题
  if (appOption.theme === 'auto') {
    // 主题为auto
    let num;
    let theme;
    const { platform } = wx.getSystemInfoSync();

    // 根据平台设置主题
    switch (platform) {
      case 'ios':
      case 'windows':
        theme = 'iOS';
        num = 0;
        break;
      case 'android':
        theme = 'Android';
        num = 1;
        break;
      default:
        theme = 'iOS';
        num = 0;
    }

    wx.setStorageSync('theme', theme);
    wx.setStorageSync('themeNum', num);
  } else {
    wx.setStorageSync('theme', appOption.theme);
    wx.setStorageSync('themeNum', appOption.themeNum);
  }

  // 写入预设数据
  Object.keys(appOption).forEach((data) => {
    if (data !== 'theme') wx.setStorageSync(data, appOption[data]);
  });

  resDownload(['page', 'function'], () => {
    // 成功初始化
    wx.setStorageSync('inited', true);
    wx.hideLoading();
  });
};

/** 通知格式 */
export interface Notice {
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
  /** 是否每次都通知 */
  force?: boolean;
}

/**
 * 弹窗通知检查
 *
 * @param globalData 小程序的全局数据
 */
export const noticeCheck = (globalData: GlobalData): void => {
  requestJSON(
    `config/${globalData.appID}/${globalData.version}/notice`,
    (noticeList: Record<string, Notice>) => {
      for (const pageName in noticeList) {
        const notice = noticeList[pageName];
        const oldNotice = wx.getStorageSync(`${pageName}-notice`);

        // 如果通知内容不同或为强制通知，写入通知信息，并重置通知状态
        if (
          oldNotice.title !== notice.title ||
          oldNotice.content !== notice.content ||
          notice.force
        ) {
          wx.setStorageSync(`${pageName}-notice`, notice);
          wx.removeStorageSync(`${pageName}-notifyed`);
        }

        // 如果找到APP级通知，进行判断
        if (pageName === 'app')
          if (!wx.getStorageSync('app-notifyed') || notice.force)
            modal(notice.title, notice.content, () =>
              wx.setStorageSync('app-notifyed', true)
            );
      }
    },
    () => {
      // 调试信息
      warn('noticeList error', 'Net Error');
    },
    () => {
      // 调试信息
      error('noticeList error', 'Address Error');
    }
  );
};

/**
 * 根据用户设置，判断当前小程序是否应启用夜间模式
 *
 * @returns 夜间模式状态
 */
export const darkmode = (): boolean => {
  const date = new Date();
  /** 当前时间 */
  const time = date.getHours() * 100 + date.getMinutes();
  /** 夜间模式开关设置 */
  const nightModeCondition = wx.getStorageSync('darkmode');
  /** 自动夜间模式开关设置 */
  const darkmodeAutoChange = wx.getStorageSync('darkmodeAutoChange');
  /** 夜间模式亮度 */
  const nightBrightness = wx.getStorageSync('nightBrightness');
  /** 日间模式亮度 */
  const dayBrightness = wx.getStorageSync('dayBrightness');
  /** 夜间模式亮度改变状态 */
  const nightBrightnessChange = wx.getStorageSync('nightBrightnessChange');
  /** 日间模式亮度改变状态 */
  const dayBrightnessChange = wx.getStorageSync('dayBrightnessChange');
  /** 夜间模式开始时间 */
  const darkmodeStart = wx.getStorageSync('darkmodeStartTime').split('-');
  /** 夜间模式结束时间 */
  const darkmodeEnd = wx.getStorageSync('darkmodeEndTime').split('-');
  const darkmodeStartTime =
    Number(darkmodeStart[0]) * 100 + Number(darkmodeStart[1]);
  const darkmodeEndTime = Number(darkmodeEnd[0]) * 100 + Number(darkmodeEnd[1]);
  /** 当前夜间模式状态 */
  let currentNightModeStatus: boolean;

  // 如果开启了自动夜间模式，判断是否启用夜间模式及应用亮度
  if (darkmodeAutoChange) {
    currentNightModeStatus =
      darkmodeStartTime <= darkmodeEndTime
        ? time >= darkmodeStartTime && time <= darkmodeEndTime
        : !(time <= darkmodeStartTime && time >= darkmodeEndTime);

    if (currentNightModeStatus && nightBrightnessChange)
      wx.setScreenBrightness({ value: nightBrightness / 100 });
    else if (!currentNightModeStatus && dayBrightnessChange)
      wx.setScreenBrightness({ value: dayBrightness / 100 });

    wx.setStorageSync('darkmode', currentNightModeStatus);

    // 否则查看夜间模式开启状态，并根据状态应用决定是否应用亮度
  } else {
    if (nightModeCondition && nightBrightnessChange)
      wx.setScreenBrightness({ value: nightBrightness / 100 });
    else if (!nightModeCondition && dayBrightnessChange)
      wx.setScreenBrightness({ value: dayBrightness / 100 });

    currentNightModeStatus = nightModeCondition;
  }

  return currentNightModeStatus; // 返回夜间模式状态
};

interface UpdateInfo {
  /** 是否进行强制更新 */
  forceUpdate: boolean;
  /** 是否进行强制初始化 */
  reset: boolean;
}

/**
 * 检查小程序更新
 *
 * 如果检测到小程序更新，获取升级状态（新版本号，是否立即更新、是否重置小程序）并做相应处理
 *
 * @param globalData 小程序的全局数据
 */
export const appUpdate = (globalData: GlobalData): void => {
  const updateManager = wx.getUpdateManager();
  let version = '9.9.9';
  let forceUpdate = true;
  let reset = false;

  // 检查更新
  updateManager.onCheckForUpdate((status) => {
    // 找到更新，提示用户获取到更新
    if (status.hasUpdate) tip('发现小程序更新，下载中...');
  });

  updateManager.onUpdateReady(() => {
    // 请求配置文件
    requestJSON(
      `config/${globalData.appID}/${globalData.version}/config`,
      (data) => {
        ({ forceUpdate, reset } = data as UpdateInfo);

        // 请求配置文件
        requestJSON<string>(`config/${globalData.appID}/version`, (data2) => {
          version = data2;
          // 更新下载就绪，提示用户重新启动
          wx.showModal({
            title: '已找到新版本',
            content: `新版本${version}已下载，请重启应用更新。${
              reset ? '该版本会初始化小程序。' : ''
            }`,
            showCancel: !reset && !forceUpdate,
            confirmText: '应用',
            cancelText: '取消',
            success: (res) => {
              // 用户确认，应用更新
              if (res.confirm) {
                // 需要初始化
                if (reset) {
                  // 显示提示
                  wx.showLoading({ title: '初始化中', mask: true });

                  // 清除文件系统文件与数据存储
                  listFile('').forEach((filePath) => {
                    Delete(filePath);
                  });
                  wx.clearStorageSync();

                  // 隐藏提示
                  wx.hideLoading();
                }

                // 应用更新
                updateManager.applyUpdate();
              }
            }
          });
        });
      }
    );
  });

  // 更新下载失败
  updateManager.onUpdateFailed(() => {
    // 提示用户网络出现问题
    tip('小程序更新下载失败，请检查您的网络！');

    // 调试
    warn('Upate App error because of Net Error');
  });
};

/**
 * 登录
 *
 * @param appID 小程序的appID
 */
const login = (appID: string): void => {
  const openid = wx.getStorageSync('openid');

  if (openid) console.log(`openid为：${openid}`);
  else
    wx.login({
      success: (res) => {
        if (res.code)
          wx.request({
            url: `${server}server/login.php`,
            method: 'POST',
            data: { appID, code: res.code },
            success: (res2) => {
              wx.setStorageSync('openid', (res2.data as any).openid);
              console.log(`openid为：${(res2.data as any).openid}`);
            }
          });
      },
      fail: (errMsg) => {
        console.error(`登录失败！${errMsg}`);
      }
    });
};

/**
 * 小程序启动时的运行函数
 *
 * 负责检查通知与小程序更新，注册网络、内存、截屏的监听
 *
 * @param globalData 小程序的全局数据
 */
export const startup = (globalData: GlobalData): void => {
  // 获取设备与运行环境信息
  globalData.info = wx.getSystemInfoSync();
  if (globalData.info.AppPlatform === 'qq') globalData.env = 'qq';

  // 获取主题、夜间模式、appID
  globalData.T = wx.getStorageSync('theme');
  globalData.darkmode = darkmode();
  globalData.appID = wx.getAccountInfoSync().miniProgram.appId;

  // 检测基础库版本
  if (
    ((globalData.env === 'qq' &&
      compareVersion(globalData.info.SDKVersion, '1.9.0') < 0) ||
      (globalData.env === 'wx' &&
        compareVersion(globalData.info.SDKVersion, '2.8.0') < 0)) &&
    wx.getStorageSync('SDKVersion') !== globalData.info.SDKVersion
  )
    modal(
      '基础库版本偏低',
      `您的${
        globalData.env === 'qq' ? 'QQ' : '微信'
      }版本偏低，虽然不会影响小程序的功能，但会导致部分内容显示异常。为获得最佳体验，建议您更新至最新版本。`,
      () => {
        // 避免重复提示
        wx.setStorageSync('SDKVersion', globalData.info.SDKVersion);
      }
    );

  // 检查通知更新与小程序更新
  noticeCheck(globalData);
  appUpdate(globalData);

  // 设置内存不足警告
  wx.onMemoryWarning((res) => {
    tip('内存不足');
    console.warn('onMemoryWarningReceive');
    wx.reportAnalytics('memory_warning', {
      // eslint-disable-next-line
      memory_warning: res && res.level ? res.level : 0
    });
  });

  // 获取网络信息
  wx.getNetworkType({
    success: (res) => {
      const { networkType } = res;

      if (networkType === 'none' || networkType === 'unknown')
        tip('您的网络状态不佳');
    }
  });

  // 监听网络状态
  wx.onNetworkStatusChange((res) => {
    // 显示提示
    if (!res.isConnected) {
      tip('网络连接中断,部分小程序功能暂不可用');
      wx.setStorageSync('networkError', true);
    } else if (wx.getStorageSync('network')) {
      wx.setStorageSync('networkError', false);
      tip('网络链接恢复');
    }
  });

  // 监听用户截屏
  wx.onUserCaptureScreen(() => {
    tip('您可以点击右上角——转发或点击页面右下角——保存二维码分享小程序');
  });

  // 登录
  login(globalData.appID);
};
