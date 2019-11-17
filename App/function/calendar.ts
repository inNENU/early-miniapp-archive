/*
 * @Author: Mr.Hope
 * @Date: 2019-09-04 19:55:00
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-21 23:12:51
 * @Description: 校历页面
 */

import * as $register from 'wxpage';
import { changeNav, popNotice, setColor } from '../utils/page';
import { getJson, readJson, writeJson } from '../utils/file';
import { TimeLineItem } from '../components/timeline/timeline';
import { request } from '../utils/wx';
const { globalData: a } = getApp<{}, GlobalData>();

$register('calendar', {
  data: {
    T: a.T,
    /** 头部配置 */
    head: {
      title: '东师校历',
      statusBarHeight: a.info.statusBarHeight,
      leftText: '返回'
    },
    calendar: [] as TimeLineItem[]
  },

  onNavigate() {
    getJson('function/calendar/all');
  },

  onLoad() {
    const path = 'function/calendar/all';
    const calendar = readJson(path);

    if (calendar) this.setData({ T: a.T, nm: a.nm, calendar });
    else
      request(path, data => {
        this.setData({ T: a.T, nm: a.nm, calendar: data as any });

        // 写入JSON文件
        writeJson('function/calendar', 'all', data);
      });

    popNotice('calendar');
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(false);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onPageScroll(event) {
    changeNav(event, this, 'head');
  },

  /** 显示校历详情 */
  display(event: WXEvent.Touch) {
    console.log('display', event.detail);
    const path = `function/calendar/${event.detail.aim}`;
    const content = readJson(path);

    if (content)
      this.setData({
        calendarDetail: content[1],
        name: content[0],
        display: true
      });
    else
      request(path, data => {
        this.setData({ calendarDetail: data[1], name: data[0], display: true });

        // 写入JSON文件
        writeJson('function/calendar', 'all', data);
      });
  },

  /** 关闭校历详情 */
  close() {
    this.setData({ display: false });
  },

  onShareAppMessage: () => ({ title: '东师校历', path: '/function/calendar' })
});
