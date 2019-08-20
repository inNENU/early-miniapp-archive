/**
 * @Author: Mr.Hope
 * @LastEditors: Mr.Hope
 * @Description: tab函数
 * @Date: 2019-02-12 16:45:44
 * @LastEditTime: 2019-04-08 11:34:39
 */

import $file from './file';
import $log from './log';
import $page from './page';
import $wx from './wx';

/**
 * 资源下载 from fuction.js & guide.js 被checkResUpdate调用
 *
 * @param name 下载资源名称
 */
const resDownload = (name: string) => {
  wx.showLoading({ title: '更新中...', mask: true });
  wx.setStorageSync(`${name}Download`, false);
  const downLoadTask = wx.downloadFile({
    url: `https://mp.nenuyouth.com/${name}.zip`,
    success: res => {
      if (res.statusCode === 200) {
        wx.showLoading({ title: '保存中...', mask: true });

        // 保存压缩文件到压缩目录
        $file.saveFile(res.tempFilePath, `${name}Zip`);

        wx.showLoading({ title: '解压中...', mask: true });

        // 解压文件到根目录
        $file.unzip(`${name}Zip`, '', () => {

          // 删除压缩目录，并将下载成功信息写入存储、判断取消提示
          $file.Delete(`${name}Zip`, false);
          wx.setStorageSync(`${name}Download`, true);

          wx.hideLoading();
        });
      }
    },

    // 下载失败
    fail: failMsg => $log.error(`download ${name} fail:`, failMsg)
  });

  downLoadTask.onProgressUpdate(res => {
    wx.showLoading({ title: `下载中...${res.progress}%`, mask: true });
  });
};

/**
 * 检查资源更新
 *
 * @param name 检查资源的名称
 * @param dataUsage 消耗的数据流量
 */
const checkResUpdate = (name: string, dataUsage: string) => {
  const notify = wx.getStorageSync(`${name}ResNotify`); // 资源提醒
  const localVersion = $file.readJson(`${name}Version`); // 读取本地Version文件
  const localTime = wx.getStorageSync(`${name}UpdateTime`);
  const currentTime = Math.round(new Date().getTime() / 1000);// 读取当前和上次更新时间

  // 调试
  $log.debug(`${name}通知状态为${notify}`, `本地版本文件为：${localVersion}`);
  $log.debug(`${name}更新于${localTime}, 现在时间是${currentTime}`);

  if (notify || currentTime > Number(localTime) + 604800)// 如果需要更新
    $wx.request(`${name}Version`, data => {

      // 资源为最新
      if (Number(localVersion) === Number(data)) $log.debug(`${name}资源已是最新版`);// 调试

      // 需要更新
      else {
        $log.info(`${name}资源有更新`); // 调试

        // 如果需要提醒，则弹窗
        if (notify) wx.showModal({
          title: '资源有更新', content: `请更新资源以获得最新功能与内容。(会消耗${dataUsage}流量)`,
          cancelText: '取消', cancelColor: '#ff0000', confirmText: '更新',
          success: choice => {

            // 用户确认，下载更新
            if (choice.confirm) resDownload(name);

            // 用户取消，询问是否关闭更新提示
            else if (choice.cancel) wx.showModal({
              title: '开启资源更新提示？', content: '开启后在资源有更新时会提示您更新资源文件。',
              cancelText: '关闭', cancelColor: '#ff0000', confirmText: '保持开启',
              success: choice2 => {

                // 用户选择关闭
                if (choice2.cancel)
                  $wx.modal(
                    '更新提示已关闭', '您可以在设置中重新打开提示。请注意：为保障正常运行，小程序会每周对资源进行强制更新。',
                    // 关闭更新提示
                    () => {
                      wx.setStorageSync(`${name}ResNotify`, false);
                    }
                  );
              }
            });
          }
        });

        // 距上次更新已经半个月了，强制更新
        else resDownload(name);
      }
    });
};

/**
 * 动态根据夜间模式改变导航栏 from main.js & me.js
 *
 * @param nightmode 夜间模式开启状态
 */
const tabBarChanger = (nightmode: boolean) => {
  const color = nightmode ? ['#000000', 'white'] : ['#ffffff', 'black'];

  wx.setTabBarStyle({
    backgroundColor: color[0],
    borderStyle: color[1],
    color: '#8a8a8a',
    selectedColor: '#3cc51f'
  });
};

/**
 * 动态根据夜间模式改变导航栏 from main.js & me.js
 *
 * @param name 页面名称
 * @param ctx 页面指针
 * @param globalData 全局数据
 */
const refreshPage = (name: string, ctx: any, globalData: GlobalData) => {
  const test = wx.getStorageSync('test');

  // 开启测试后展示测试界面
  if (test) $wx.request(`config/${globalData.appID}/test/${name}`, data => {
    wx.setStorageSync(name, data);
    $page.Set({ ctx, option: { aim: name } }, data as PageData);
  });
  // 普通界面加载
  else $wx.request(`config/${globalData.appID}/${globalData.version}/${name}`, data => {
    $page.Set({ ctx, option: { aim: name } }, data as PageData);
  });
};

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  title?: string;
  name: string;
  detail: string;
}

/**
 * 初始化marker，被setMarker调用
 *
 * @param markers 待处理的Marker数组
 * @returns 处理后的marker
 */
const initMarker = (markers: Marker[]) => {
  markers.forEach(marker => {
    const markerOrigin = {
      iconPath: '/function/icon/marker.png', width: 25, height: 25, alpha: 0.8,
      label: {
        content: marker.name, color: '#1A9D5E', fontSize: '10', anchorX: marker.name.length * (-5) - 4, anchorY: 0,
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
};

interface MarkerData extends Marker {
  iconPath: string;
  width: number;
  height: number;
  alpha: number;
  label: {
    content: string;
    color: string;
    fontSize: string;
    anchorX: number;
    anchorY: number;
    bgColor: string;
    borderWidth: number;
    borderColor: string;
    borderRadius: number;
    padding: string;
  };
  callout: {
    content: string;
    color: string;
    fontSize: string;
    bgColor: string;
    borderRadius: number;
    padding: string;
    display: 'BYCLICK' | 'ALWAYS';
  };
}

interface MarkerConfig {
  points: MarkerData[];
  category: {
    [props: string]: number[];
  };
}

/**
 * 设置Marker
 *
 * @param data marker数据
 * @param name marker名称
 * @returns 成功后返回
 */
const setMarker = (data: MarkerConfig, name: string) => {
  const marker = initMarker(data.points);
  const { category } = data;

  wx.setStorageSync(`${name}-all`, marker);
  Object.keys(category)
    .forEach(i => {
      const markerDetail = [];

      for (let j = category[i][0]; j <= category[i][1]; j += 1) markerDetail.push(marker[j]);
      wx.setStorageSync(`${name}-${i}`, markerDetail);
    });
};

/** 设置marker */
const markerSet = () => {
  const markerVersion = wx.getStorageSync('markerVersion');
  const functionVersion = $file.readJson('functionVersion');

  if (markerVersion === functionVersion)// Marker已经设置完毕
    $log.debug('Marker 已设置就绪');

  // 需要设置Marker
  else {
    const markerData = $file.readJson('function/marker');

    // 找到MarkerData，直接设置Marker
    if (Array.isArray(markerData)) {
      setMarker(markerData[0], 'benbu');
      setMarker(markerData[1], 'jingyue');
      wx.setStorageSync('markerVersion', markerVersion);
    } else { // 没有找到MarkerData，可能因为初始化中断造成
      // 调试
      $log.warn('获取Marker失败');

      $wx.request('function/marker', data => {

        // 将Marker数据保存文件
        $file.writeJson('function', 'marker', data);

        // 设置Marker
        setMarker((data as MarkerConfig[])[0], 'benbu');
        setMarker((data as MarkerConfig[])[1], 'jingyue');

        // 写入线上版本
        $wx.request('functionVersion', data2 => {
          wx.setStorageSync('markerVersion', data2);
        });
      });
    }
  }
};

export default { markerSet, resDownload, tabBarChanger, update: checkResUpdate, refresh: refreshPage };
