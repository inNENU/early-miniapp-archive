/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: tab函数
 * @Date: 2019-02-12 16:45:44
 * @LastEditTime: 2019-04-08 11:34:39
 */
/* global wx */

const $act = require('./interface'),
  $file = require('./file');

// 初始化文件管理器、日志管理器
const logger = wx.getLogManager({ level: 1 }),

  /**
   * 资源下载 from fuction.js & guide.js 被checkResUpdate调用
   *
   * @param {string} name 下载资源名称
   * @returns {void}
   */
  resDownload = name => {
    wx.showLoading({ title: '更新中...', mask: true });
    wx.setStorageSync(`${name}Download`, false);
    const downLoadTask = wx.downloadFile({
      url: `https://mp.nenuyouth.com/${name}.zip`,
      success: res => {
        console.log(`${name} statusCode is ${res.statusCode}`);// 调试
        if (res.statusCode === 200) {
          wx.showLoading({ title: '保存中...', mask: true });

          // 保存压缩文件到压缩目录
          $file.saveFile(res.tempFilePath, `${name}Zip`);
          console.log(`save ${name} success`);// 调试

          wx.showLoading({ title: '解压中...', mask: true });

          // 解压文件到根目录
          $file.unzip(`${name}Zip`, '', () => {
            console.log(`unzip ${name} sucess`);// 调试

            // 删除压缩目录，并将下载成功信息写入存储、判断取消提示
            $file.Delete(`${name}Zip`, false);
            wx.setStorageSync(`${name}Download`, true);

            console.log(`delete ${name} sucess`);// 调试
            wx.hideLoading();
          });
        }
      },

      // 下载失败
      fail: failMsg => console.error(`download ${name} fail:`, failMsg)
    });

    downLoadTask.onProgressUpdate(res => {
      wx.showLoading({ title: `下载中...${res.progress}%`, mask: true });
    });
  },

  /**
   * 检查资源更新
   *
   * @param {string} name 检查资源的名称
   * @param {string} dataUsage 消耗的数据流量
   * @returns {void}
   */
  checkResUpdate = (name, dataUsage) => {
    const notify = wx.getStorageSync(`${name}ResNotify`), // 资源提醒
      localVersion = $file.readJson(`${name}Version`), // 读取本地Version文件
      localTime = wx.getStorageSync(`${name}UpdateTime`),
      currentTime = Math.round(new Date() / 1000);// 读取当前和上次更新时间

    // 调试
    console.log(`${name}通知状态为${notify}`, '本地版本文件为：', localVersion);
    console.log(`${name}更新于${localTime}, 现在时间是${currentTime}`);

    if (notify || currentTime > localTime + 1000000)// 如果需要更新
      $act.request(`${name}Version`, data => {

        // 资源为最新
        if (Number(localVersion) === Number(data)) console.info(`${name}Version match`);// 调试

        // 需要更新
        else {
          console.info(`${name}not match`); // 调试

          // 如果需要提醒，则弹窗
          if (notify) wx.showModal({
            title: '发现资源更新', content: `是否立即更新资源？\n(会消耗${dataUsage}流量)`,
            cancelText: '否', cancelColor: '#ff0000', confirmText: '是',
            success: choice => {

              // 用户确认，下载更新
              if (choice.confirm) resDownload(name);

              // 用户取消，询问是否关闭更新提示
              else if (choice.cancal) wx.showModal({
                title: '开启资源更新提示？', content: '在资源有更新时会提示您更新资源文件。',
                cancelText: '残忍关闭', cancelColor: '#ff0000', confirmText: '保持开启',
                success: choice2 => {

                  // 用户选择关闭
                  if (choice2.cancel) wx.showModal({
                    title: '更新提示已关闭', showCancel: false,
                    content: '您可以在设置中重新打开提示。请注意：小程序会每半个月对界面文件进行强制更新。',
                    success: () => {
                      wx.setStorageSync(`${name}ResNotify`, false);// 关闭更新提示
                    }
                  });
                }
              });
            }
          });

          // 距上次更新已经半个月了，强制更新
          else resDownload(name);
        }
      });
  },

  /**
   * 动态根据夜间模式改变导航栏 from main.js & me.js
   *
   * @param {boolean} nightmode 夜间模式开启状态
   * @returns {void}
   */
  tabBarChanger = nightmode => {
    const color = nightmode ? ['#000000', 'white'] : ['#ffffff', 'black'];

    wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
  },

  /**
   * 初始化marker，被setMarker调用
   *
   * @param {array} markers 待处理的Marker数组
   * @returns {*} 处理后的marker
   */
  initMarker = markers => {
    markers.forEach(marker => {
      const markerOrigin = {
        iconPath: '/function/icon/marker.png', width: 25, height: 25, alpha: 0.8,
        label: {
          content: marker.name, color: '#1A9D5E', fontSize: '10', anchorX: -4 - 5 * marker.name.length, anchorY: 0,
          bgColor: '#ffffff', borderWidth: 1, borderColor: '#efeef4', borderRadius: 2, padding: '3'
        },
        callout: {
          content: marker.detail, color: '#ffffff', fontSize: '16',
          borderRadius: '10', bgColor: '#1A9D5E', padding: '10', display: 'BYCLICK'
        }
      };

      if (!('title' in marker)) marker.title = marker.detail;
      delete marker.name;
      delete marker.detail;
      Object.assign(marker, markerOrigin);
    });

    return markers;
  },

  /**
   * 设置Marker
   *
   * @param {*} data marker数据
   * @param {string} name marker名称
   * @returns {boolean} 成功后返回
   */
  setMarker = (data, name) => {
    const marker = initMarker(data.points),
      { category } = data;

    wx.setStorageSync(`${name}-all`, marker);
    Object.keys(category).forEach(i => {
      const markerDetail = [];

      for (let j = category[i][0]; j <= category[i][1]; j++) markerDetail.push(marker[j]);
      wx.setStorageSync(`${name}-${i}`, markerDetail);
    });

    return true;
  },

  /**
   * 设置marker
   *
   * @returns {void}
   */
  markerSet = () => {
    const markerVersion = wx.getStorageSync('markerVersion'),
      functionVersion = $file.readJson('functionVersion');

    if (markerVersion === functionVersion)// Marker已经设置完毕
      console.log('Marker 已设置就绪');

    // 需要设置Marker
    else {
      const markerData = $file.readJson('function/marker');

      // 找到MarkerData，直接设置Marker
      if (markerData)
        if (setMarker(markerData[0], 'benbu') && setMarker(markerData[1], 'jingyue'))
          wx.setStorageSync('markerVersion', markerVersion);
        else {
          console.warn('Marker set failure.');
          wx.reportMonitor('25', 1);
        }

      // 没有找到MarkerData，可能又初始化中断造成
      else {
        // 调试
        console.log('get Marker error');
        logger.warn('get Marker error');

        $act.request('function/marker', data => {
          // 将Marker数据保存文件
          $file.writeJson('function', 'marker', data);

          // 设置Marker
          if (setMarker(data[0], 'benbu') && setMarker(data[1], 'jingyue') && markerVersion)
            wx.setStorageSync('markerVersion', markerVersion);
          else {
            console.warn('Marker set failure.');
            wx.reportMonitor('25', 1);
          }
        });
      }
    }
  };

module.exports = { update: checkResUpdate, tabBarChanger, markerSet, resDownload };
