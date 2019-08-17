/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 11:59:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-17 10:50:55
 * @Description: APP函数库
 */

/** 文件管理器与API封装 */
import $file from './file';
import $wx from './wx';
import $log from './log';

interface AppOption {
  [props: string]: string | boolean | number;
}

// 小程序配置
const appOption: AppOption = {
  /** 主题设置 */
  theme: 'auto',
  /** 选择的主题序列号 */
  themeNum: 0,
  /** 是否开启夜间模式 */
  nightmode: false,
  /** 日间模式是否改变亮度 */
  nightmodeAutoChange: true,
  /** 日间模式是否改变亮度 */
  dayBrightnessChange: false,
  /** 夜间模式是否改变亮度 */
  nightBrightnessChange: false,
  /** 日间模式亮度(百分比) */
  dayBrightness: 70,
  /** 夜间模式亮度(百分比) */
  nightBrightness: 30,
  /** 夜间模式开始时间 */
  nightmodeStartTime: '0-0',
  /** 夜间模式结束时间 */
  nightmodeEndTime: '5-0',
  /** 功能更新提示 */
  functionResNotify: true,
  /** 页面更新提示 */
  pageResNotify: true
};

/**
 * 下载list中的对应资源
 *
 * @param list 需要下载的资源列表
 * @param callBack 下载完成的回调函数
 */
const resDownload = (list: string[], callBack: () => void) => {
  /** 监听数 */
  let listenNumber = list.length;

  list.forEach(name => {
    // 下载zip包
    wx.downloadFile({
      url: `https://mp.nenuyouth.com/${name}.zip`,
      success: res => {
        console.log(`${name} statusCode is ${res.statusCode}`);// 调试
        if (res.statusCode === 200) {

          // 保存压缩文件到压缩目录
          $file.saveFile(res.tempFilePath, `${name}Zip`);
          console.log(`save ${name} success`);// 调试

          // 解压文件到根目录
          $file.unzip(`${name}Zip`, '', () => {
            console.log(`unzip ${name} sucess`);// 调试

            // 删除压缩目录，并将下载成功信息写入存储、判断取消提示
            $file.Delete(`${name}Zip`, false);
            wx.setStorageSync(`${name}Download`, true);

            console.log(`delete ${name} sucess`);// 调试

            // 下载资源文件并写入更新时间
            const timeStamp = new Date().getTime();

            wx.setStorageSync(`${name}UpdateTime`, Math.round(timeStamp / 1000));

            // 改变监听数
            listenNumber -= 1;
            if (!listenNumber) callBack();
          });
        }
      },

      // 下载失败
      fail: failMsg => {
        $wx.netReport();
        $log.error(`初始化小程序时下载${name}失败:`, failMsg);
      }
    });
  });
};

/** 初始化小程序 */
const appInit = () => {
  // 提示用户正在初始化
  wx.showLoading({ title: '初始化中...', mask: true });
  $log.info('初次启动');

  // 设置主题
  if (appOption.theme === 'auto') { // 主题为auto
    let num;
    let theme;
    const { platform } = wx.getSystemInfoSync();

    // 根据平台设置主题
    switch (platform) {
      case 'ios':
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
  Object.keys(appOption)
    .forEach(data => {
      if (data !== 'theme') wx.setStorageSync(data, appOption[data]);
    });

  resDownload(['page', 'function'], () => {
    // 成功初始化
    wx.setStorageSync('inited', true);
    wx.hideLoading();
  });
};

/**
 * 弹窗通知检查
 *
 * @param globalData 小程序的全局数据
 */
const noticeCheck = (globalData: GlobalData) => {
  /** 通知列表格式 */
  interface NoticeList {
    [props: string]: {
      0: string;
      1: string;
      2: undefined | boolean;
    };
  }

  $wx.request(`config/${globalData.appID}/${globalData.version}/notice`, (noticeList: NoticeList) => {
    /** 通知页面名称 */
    const keys = Object.keys(noticeList);

    keys.forEach(page => {

      // 如果读取到强制通知设置，每次都要通知，直接写入通知信息
      if (noticeList[page][2]) {
        wx.setStorageSync(`${page}notice`, [noticeList[page][0], noticeList[page][1]]);
        wx.setStorageSync(`${page}Notify`, true);

        // 如果在线通知版本号更高，写入通知内容、通知提示与通知版本
      } else {
        const oldNotice = wx.getStorageSync(`${page}notice`);

        if (!oldNotice || oldNotice[0] !== noticeList[page][0] || oldNotice[1] !== noticeList[page][1]) {
          wx.setStorageSync(`${page}notice`, [noticeList[page][0], noticeList[page][1]]);
          wx.setStorageSync(`${page}Notify`, true);// 写入
        }
      }
    });

    // 如果找到APP级通知，立即提醒
    if ('app' in keys)
      $wx.modal(noticeList.app[0], noticeList.app[1], () => wx.removeStorageSync('appNotify'));
  }, () => { // 调试信息
    $log.warn('noticeList error', 'Net Error');
  }, () => { // 调试信息
    $log.error('noticeList error', 'Address Error');
  });
};

/**
 * 根据用户设置，判断当前小程序是否应启用夜间模式
 *
 * @returns 夜间模式状态
 */
export const nightmode = () => {
  const date = new Date();
  /** 当前时间 */
  const time = date.getHours() * 100 + date.getMinutes();
  /** 夜间模式开关设置 */
  const nightModeCondition = wx.getStorageSync('nightmode');
  /** 自动夜间模式开关设置 */
  const nightmodeAutoChange = wx.getStorageSync('nightmodeAutoChange');
  /** 夜间模式亮度 */
  const nightBrightness = wx.getStorageSync('nightBrightness');
  /** 日间模式亮度 */
  const dayBrightness = wx.getStorageSync('dayBrightness');
  /** 夜间模式亮度改变状态 */
  const nightBrightnessChange = wx.getStorageSync('nightBrightnessChange');
  /** 日间模式亮度改变状态 */
  const dayBrightnessChange = wx.getStorageSync('dayBrightnessChange');
  /** 夜间模式开始时间 */
  const nmStart = wx.getStorageSync('nightmodeStartTime')
    .split('-');
  /** 夜间模式结束时间 */
  const nmEnd = wx.getStorageSync('nightmodeEndTime')
    .split('-');
  const nightmodeStartTime = Number(nmStart[0]) * 100 + Number(nmStart[1]);
  const nightmodeEndTime = Number(nmEnd[0]) * 100 + Number(nmEnd[1]);
  /** 当前夜间模式状态 */
  let currentNightModeStatus: boolean;

  // 如果开启了自动夜间模式，判断是否启用夜间模式及应用亮度
  if (nightmodeAutoChange) {
    currentNightModeStatus =
      nightmodeStartTime <= nightmodeEndTime
        ? time >= nightmodeStartTime && time <= nightmodeEndTime
        : !(time <= nightmodeStartTime && time >= nightmodeEndTime);

    if (currentNightModeStatus && nightBrightnessChange) wx.setScreenBrightness({ value: nightBrightness / 100 });
    else if (!currentNightModeStatus && dayBrightnessChange) wx.setScreenBrightness({ value: dayBrightness / 100 });

    wx.setStorageSync('nightmode', currentNightModeStatus);

    // 否则查看夜间模式开启状态，并根据状态应用决定是否应用亮度
  } else {
    if (nightModeCondition && nightBrightnessChange) wx.setScreenBrightness({ value: nightBrightness / 100 });
    else if (!nightModeCondition && dayBrightnessChange) wx.setScreenBrightness({ value: dayBrightness / 100 });

    currentNightModeStatus = nightModeCondition;
  }

  return currentNightModeStatus;// 返回夜间模式状态
};

interface VersionInfo {
  /** 是否进行强制更新 */
  forceUpdate: boolean;
  /** 是否进行强制初始化 */
  reset: boolean;
  /** 小程序的最新版本号 */
  version: string;
}


/**
 * 检查小程序更新
 *
 * 如果检测到小程序更新，获取升级状态（新版本号，是否立即更新、是否重置小程序）并做相应处理
 *
 * @param globalData 小程序的全局数据
 */
const appUpdate = (globalData: GlobalData) => {
  const updateManager = wx.getUpdateManager();
  let version = '9.9.9';
  let forceUpdate = true;
  let reset = false;

  // 检查更新
  updateManager.onCheckForUpdate(status => {

    // 找到更新，提示用户获取到更新
    if (status.hasUpdate) $wx.tip('发现小程序更新，下载中...');
  });

  updateManager.onUpdateReady(() => {

    // 请求配置文件
    $wx.request(`config/${globalData.appID}/${globalData.version}/config`, data => {
      ({ forceUpdate, reset, version } = data as VersionInfo);

      // 更新下载就绪，提示用户重新启动
      wx.showModal({
        title: '已找到新版本',
        content: `新版本${version}已下载，请重启应用更新。${(reset ? '该版本会初始化小程序。' : '')}`,
        showCancel: !reset && !forceUpdate, confirmText: '应用', cancelText: '取消',
        success: res => {
          // 用户确认，应用更新
          if (res.confirm) {

            // 需要初始化
            if (reset) {
              // 显示提示
              wx.showLoading({ title: '初始化中', mask: true });

              // 清除文件系统文件与数据存储
              $file.listFile('')
                .forEach(filePath => {
                  $file.Delete(filePath);
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
  });

  // 更新下载失败
  updateManager.onUpdateFailed(() => {

    // 提示用户网络出现问题
    $wx.tip('小程序更新下载失败，请检查您的网络！');

    // 调试
    $log.warn('Upate App error because of Net Error');

  });
};

const login = (appID: string) => {
  const openid = wx.getStorageSync('openid');

  if (openid) console.log(`openid为：${openid}`);
  else wx.login({
    success: res => {
      if (res.code)
        wx.request({
          url: 'https://mp.nenuyouth.com/server/login.php',
          method: 'POST',
          data: { appID, code: res.code },
          success: res2 => {
            wx.setStorageSync('openid', (res2.data as any).openid);
            console.log(`openid为：${(res2.data as any).openid}`);
          }
        });
    },
    fail: errMsg => {
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
 * @param appID 小程序的APPID
 */
const startup = (globalData: InitGlobalData) => {

  // 获取设备与运行环境信息
  globalData.info = wx.getSystemInfoSync();

  // 写入运行环境
  if (globalData.info.AppPlatform === 'qq') globalData.env = 'qq';

  // 获取主题、夜间模式
  globalData.T = wx.getStorageSync('theme');
  globalData.nm = nightmode();

  globalData.appID = wx.getAccountInfoSync().miniProgram.appId;

  // 检测基础库版本
  if (
    (
      (globalData.env === 'qq' && Number(globalData.info.SDKVersion.split('.')[1]) < 6) ||
      (globalData.env === 'wx' && Number(globalData.info.SDKVersion.split('.')[1]) < 7)
    ) && wx.getStorageSync('SDKVersion') !== globalData.info.SDKVersion
  )
    $wx.modal(
      '版本偏低',
      '您的基础库版本偏低，可能导致部分内容无法正常显示，建议您更新至最新版客户端。',
      () => { // 避免重复提示
        wx.setStorageSync('SDKVersion', (globalData as GlobalData).info.SDKVersion);
      }
    );

  // 检查通知更新与小程序更新
  noticeCheck(globalData as GlobalData);
  appUpdate(globalData as GlobalData);

  // 设置内存不足警告
  wx.onMemoryWarning(res => {
    $wx.tip('内存不足');
    console.warn('onMemoryWarningReceive');
    wx.reportAnalytics('memory_warning', { 'memory_warning': res && res.level ? res.level : 0 });
  });

  // 获取网络信息
  wx.getNetworkType({
    success: res => {
      const { networkType } = res;

      if (networkType === 'none' || networkType === 'unknown') $wx.tip('您的网络状态不佳');
    }
  });

  // 监听网络状态
  wx.onNetworkStatusChange(res => {

    // 显示提示
    if (!res.isConnected) {
      $wx.tip('网络连接中断,部分小程序功能暂不可用');
      wx.setStorageSync('networkError', true);
    } else if (wx.getStorageSync('network')) {
      wx.setStorageSync('networkError', false);
      $wx.tip('网络链接恢复');
    }
  });

  // 监听用户截屏
  wx.onUserCaptureScreen(() => {
    $wx.tip('您可以点击右上角——转发或点击页面右下角——保存二维码分享小程序');
  });

  // 登录
  login(globalData.appID);
};

export default { appInit, appUpdate, nightmode, noticeCheck, startup };
