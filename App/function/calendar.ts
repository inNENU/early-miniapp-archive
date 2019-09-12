/*
 * @Author: Mr.Hope
 * @Date: 2019-09-04 19:55:00
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-08 17:07:02
 * @Description: 校历页面
 */

import $register from 'wxpage';
import $page from '../utils/page';
import { getJson, readJson, writeJson } from '../utils/file';
import { request } from '../utils/wx';
const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);

$register('calendar', {
  data: {
    /** 头部配置 */
    head: { title: '东师校历', statusBarHeight: a.info.statusBarHeight },
    calendar: [
      {
        'title': '8月',
        'icon': '/icon/tabPage/about.svg',
        'color': 'green',
        'text': '新生报到时间：2019年8月16日\n其他年级报到时间：8月26日'
      },
      {
        'title': '1月',
        'icon': '/icon/tabPage/about.svg',
        'color': 'green',
        'text': '放假日期：1月11日'
      }
    ]
  },

  onNavigate() {
    getJson('function/calendar/all');
  },

  onLoad() {
    const calendar = readJson('function/calendar/all');


    if (calendar)
      this.setData({ T: a.T, nm: a.nm, calendar });
    else request('function/calendar/all', data => {
      this.setData({ T: a.T, nm: a.nm, calendar: data as any });

      // 写入JSON文件
      writeJson('function/calendar', 'all', data);
    });

    $page.Notice('calendar');
  },

  onPageScroll(event) {
    $page.nav(event, this, 'head');
  },

  onShareAppMessage: () => ({ title: '东师校历', path: '/function/calendar' })
});
