/*
 * @Author: Mr.Hope
 * @Date: 2019-11-17 15:37:05
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-17 15:37:55
 * @Description: 地图相关
 */

import { debug, warn } from './log';
import { readJson, writeJson } from './file';
import { request } from './wx';

/** 标记点 */
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
 *
 * @returns 处理后的marker
 */
const initMarker = (markers: Marker[]) => {
  markers.forEach(marker => {
    const markerOrigin = {
      iconPath: '/function/icon/marker.png',
      width: 25,
      height: 25,
      alpha: 0.8,
      label: {
        content: marker.name,
        color: '#1A9D5E',
        fontSize: '10',
        anchorX: marker.name.length * -5 - 4,
        anchorY: 0,
        bgColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#efeef4',
        borderRadius: 2,
        padding: '3'
      },
      callout: {
        content: marker.detail,
        color: '#ffffff',
        fontSize: '16',
        borderRadius: '10',
        bgColor: '#1A9D5E',
        padding: '10',
        display: 'BYCLICK'
      }
    };

    if (!('title' in marker)) marker.title = marker.detail;
    delete marker.name;
    delete marker.detail;
    Object.assign(marker, markerOrigin);
  });

  return markers;
};

/** 标记点数据 */
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
 */
const setMarker = (data: MarkerConfig, name: string) => {
  const marker = initMarker(data.points);
  const { category } = data;

  wx.setStorageSync(`${name}-all`, marker);
  Object.keys(category).forEach(i => {
    const markerDetail = [];

    for (let j = category[i][0]; j <= category[i][1]; j += 1)
      markerDetail.push(marker[j]);

    wx.setStorageSync(`${name}-${i}`, markerDetail);
  });
};

/** 设置marker */
export const markerSet = () => {
  const markerVersion = wx.getStorageSync('markerVersion');
  const functionVersion = readJson('functionVersion');

  // Marker已经设置完毕
  if (markerVersion === functionVersion) debug('Marker 已设置就绪');
  // 需要设置Marker
  else {
    const markerData = readJson('function/marker');

    // 找到MarkerData，直接设置Marker
    if (Array.isArray(markerData)) {
      setMarker(markerData[0], 'benbu');
      setMarker(markerData[1], 'jingyue');
      wx.setStorageSync('markerVersion', markerVersion);
    } else {
      // 没有找到MarkerData，可能因为初始化中断造成
      warn('获取Marker失败'); // 调试

      request('function/marker', data => {
        // 将Marker数据保存文件
        writeJson('function', 'marker', data);

        // 设置Marker
        setMarker((data as MarkerConfig[])[0], 'benbu');
        setMarker((data as MarkerConfig[])[1], 'jingyue');

        // 写入线上版本
        request('functionVersion', data2 => {
          wx.setStorageSync('markerVersion', data2);
        });
      });
    }
  }
};
