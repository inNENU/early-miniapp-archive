// 初始化文件管理器、日志管理器
import $file from './file';
import $my from './wx';
const logger = wx.getLogManager({ level: 1 });

interface AppOption {
  [props: string]: any;
}

// 小程序配置
const appOption: AppOption = {
  theme: 'iOS',
  themeNum: 0,
  nightmode: false,
  nightmodeAutoChange: true,
  dayBrightnessChange: false,
  nightBrightnessChange: false,
  dayBrightness: 70,
  nightBrightness: 30,
  nightmodeStartTime: '0-0',
  nightmodeEndTime: '5-0',
  functionResNotify: true,
  pageResNotify: true
};

/**
 * 下载list中的对应资源
 *
 * @param list 需要下载的资源列表
 */
const resDownload = (list: string[]) => {
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

            // 改变监听数
            listenNumber--;
            if (!listenNumber) wx.hideLoading();
          });
        }
      },

      // 下载失败
      fail: failMsg => {
        $my.netReport();
        console.error(`download ${name} fail:`, failMsg);
        logger.warn(`初始化小程序时下载${name}失败`);
      }
    });
  });
};

/** 初始化小程序 */
const appInit = () => {
  wx.showLoading({ title: '初始化中...', mask: true });// 提示用户正在初始化
  console.info('初次启动');

  // 设置主题
  if (appOption.theme === 'auto') { // 主题为auto
    let num;
    let theme;
    const { platform } = wx.getSystemInfoSync();

    // 根据平台设置主题
    switch (platform) {
      case 'iOS':
        theme = 'iOS';
        num = 0;
        break;
      case 'Android':
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
  for (const data in appOption) if (data !== 'theme') wx.setStorageSync(data, appOption[data]);

  // 下载资源文件并写入更新时间
  const timeStamp = new Date().getTime();

  resDownload(['page', 'function']);
  wx.setStorageSync('pageUpdateTime', Math.round(timeStamp / 1000));
  wx.setStorageSync('functionUpdateTime', Math.round(timeStamp / 1000));

  // 成功初始化
  wx.setStorageSync('inited', true);
};
interface NoticeList {
  // app: Notice;
  [props: string]: {
    0: string;
    1: string;
    2: number;
    3: boolean
  };
}

/**
 * 弹窗通知检查
 *
 * @param version 小程序的版本
 */
const noticeCheck = (version: string) => {

  $my.request(`config/${version}/notice`, data => {
    const noticeList = data as NoticeList
    const category = Object.keys(noticeList);

    category.forEach(page => {

      // 如果读取到强制通知设置，每次都要通知，直接写入通知信息
      if (noticeList[page][3]) {
        wx.setStorageSync(`${page}notice`, [noticeList[page][0], noticeList[page][1]]);
        wx.setStorageSync(`${page}Notify`, true);

        // 如果在线通知版本号更高，写入通知内容、通知提示与通知版本
      } else if (noticeList[page][2] !== wx.getStorageSync(`${page}noticeVersion`)) {
        wx.setStorageSync(`${page}notice`, [noticeList[page][0], noticeList[page][1]]);
        wx.setStorageSync(`${page}noticeVersion`, noticeList[page][2]); // 写入
        wx.setStorageSync(`${page}Notify`, true);// 写入
      }
    });

    // 如果找到APP级通知，立即提醒
    if ('app' in category) wx.showModal({
      title: noticeList.app[0], content: noticeList.app[1], showCancel: false,
      success: () => wx.removeStorageSync('appNotify')
    });
  }, () => { // 调试
    console.error('Get noticeList fail');
    logger.warn('noticeList error', 'Net Error');
    wx.reportMonitor('24', 1);
  }, () => { // 调试
    console.error('NoticeList address error');
    logger.warn('noticeList error', 'Address Error');
    wx.reportMonitor('24', 1);
  });
};

/**
 * 夜间模式 for app.js & theme.js
 *
 * @returns {boolean} 夜间模式状态
 */
export const nightmode = () => {
  const date = new Date();
  const time = date.getHours() * 100 + date.getMinutes(); // 获得当前时间
  const nightModeCondition = wx.getStorageSync('nightmode');
  const nightmodeAutoChange = wx.getStorageSync('nightmodeAutoChange'); // 获得夜间模式、自动开启夜间模式设置
  const nightBrightness = wx.getStorageSync('nightBrightness');
  const dayBrightness = wx.getStorageSync('dayBrightness'); // 获得夜间模式亮度，日渐模式亮度
  const nightBrightnessChange = wx.getStorageSync('nightBrightnessChange');
  const dayBrightnessChange = wx.getStorageSync('dayBrightnessChange'); // 获得日夜间模式亮度改变状态
  const nmStart = wx.getStorageSync('nightmodeStartTime').split('-'); // 获得夜间模式开始时间
  const nmEnd = wx.getStorageSync('nightmodeEndTime').split('-'); // 获得夜间模式结束时间
  const nightmodeStartTime = Number(nmStart[0]) * 100 + Number(nmStart[1]);
  const nightmodeEndTime = Number(nmEnd[0]) * 100 + Number(nmEnd[1]);
  let currentNightModeStatus;

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
  forceUpdate: boolean;
  reset: boolean;
  version: string;
}


/**
 * 检查小程序更新并应用
 *
 * @param localVersion 小程序的本地版本
 */
const appUpdate = (localVersion: string) => {
  const updateManager = wx.getUpdateManager();
  let version;
  let forceUpdate = true;
  let reset = false;

  // 检查更新
  updateManager.onCheckForUpdate(status => {

    // 找到更新，提示用户获取到更新
    if (status.hasUpdate) $my.tip('发现小程序更新，下载中...');
  });

  updateManager.onUpdateReady(() => {

    // 请求配置文件
    $my.request(`config/${localVersion}/config`, data => {
      ({ forceUpdate, reset, version } = data as VersionInfo);

      // 更新下载就绪，提示用户重新启动
      if (forceUpdate)
        wx.showModal({
          title: '已找到新版本',
          content: `新版本${version}已下载，请重启应用更新。${(reset ? '该版本会初始化小程序。' : '')}`,
          showCancel: !reset, confirmText: '应用', cancelText: '取消',
          success: res => {
            // 用户确认，应用更新
            if (res.confirm) {

              // 需要初始化
              if (reset) {
                // 显示提示
                wx.showLoading({ title: '初始化中', mask: true });

                // 清除文件系统文件与数据存储
                $file.listFile('').forEach(filePath => {
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
    $my.tip('小程序更新下载失败，请检查您的网络！');

    // 调试
    console.warn('Update failure');
    wx.reportMonitor('23', 1);
    logger.warn('Upate App error because of Net Error');

  });
};

/**
 * 小程序启动时的运行函数
 *
 * @param version 小程序的版本
 */
const startup = (version: string) => {

  // 设置内存不足警告
  wx.onMemoryWarning(res => {
    $my.tip('内存不足');
    console.warn('onMemoryWarningReceive');
    wx.reportAnalytics('memory_warning', {
      memory_warning: res && res.level ? res.level : 0,
    });
  });

  // 获取网络信息
  wx.getNetworkType({
    success: res => {
      const { networkType } = res;

      if (networkType === 'none' || networkType === 'unknown') $my.tip('您的网络状态不佳');
    }
  });

  // 监听网络状态
  wx.onNetworkStatusChange(res => {

    // 显示提示
    if (!res.isConnected) {
      $my.tip('网络连接中断,部分小程序功能暂不可用');
      wx.setStorageSync('networkError', true);
    } else if (wx.getStorageSync('network')) {
      wx.setStorageSync('networkError', false);
      $my.tip('网络链接恢复');
    }
  });

  // 监听用户截屏
  wx.onUserCaptureScreen(() => {
    $my.tip('您可以点击右上角——转发或点击页面右下角——保存二维码分享小程序');
  });

  // 检查通知更新与小程序更新
  noticeCheck(version);
  appUpdate(version);
};

export default { appInit, appUpdate, nightmode, noticeCheck, startup };
