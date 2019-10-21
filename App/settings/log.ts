/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:52:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-21 22:45:02
 * @Description: 更新日志
 */

import {
  changeNav,
  popNotice,
  resolvePage,
  setColor,
  setPage
} from '../utils/page';
import $register from 'wxpage';
import { request } from '../utils/wx';
const { globalData: a } = getApp() as WechatMiniprogram.App.MPInstance<{}>;

$register('log', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      {
        tag: 'head',
        title: '更新日志',
        grey: true,
        feedback: true,
        contact: true
      },
      {
        tag: 'list',
        head: '近期更新',
        content: [
          {
            text:
              'V 2.3.0：\n重构我的东师tab页，联系客服、bug反馈更清晰。\n · 新增存储设置\n · 新增授权设置'
          },
          {
            text:
              'V 2.2.2：\n增加搜索功能，精彩指南内容，一搜即达。\n · 主页与东师攻略页面上方增加搜索栏，支持东师攻略页面的关键词搜索'
          },
          {
            text:
              'V 2.1.7：\n添加天气页面\n · 天气页面UI完全重做，支持更多天气详情。'
          },
          { text: '查看详细日志', aim: 'log0' }
        ]
      },
      { tag: 'foot', author: '', desc: `当前版本：${a.version}` }
    ]
  },

  onNavigate(res) {
    resolvePage(res, this.data.page);
  },

  onLoad(option: any) {
    if (a.page.aim === '更新日志') setPage({ option, ctx: this });
    else setPage({ option: { aim: 'log' }, ctx: this });

    popNotice('log');
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(this.data.page[0].grey);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onReady() {
    // 在线获取日志页面文件
    request(`config/${a.appID}/${a.version}/log`, (data: any) => {
      setPage(
        { option: { aim: '更新日志' }, ctx: this },
        this.data.page.slice(0, 1).concat(data, this.data.page.slice(-1))
      );
    });
  },

  onPageScroll(event) {
    changeNav(event, this);
  },

  onShareAppMessage: () => ({ title: '更新日志', path: '/settings/log' })
});
