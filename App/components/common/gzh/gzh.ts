/*
 * @Author: Mr.Hope
 * @Date: 2019-07-23 18:34:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-21 22:30:36
 * @Description: 公众号组件
 */

import $register from 'wxpage';
import { modal } from '../../../utils/wx';

$register.C({
  properties: {
    /** 公众号组件配置 */
    config: { type: Object as any }
  },

  methods: {
    /** 点击公众号组件触发的操作 */
    gzh() {
      const {
        globalData: { appID }
      } = getApp() as WechatMiniprogram.App.MPInstance<{}>; // 获得当前小程序ID

      // 为企业主体微信小程序
      if (appID === 'wx9ce37d9662499df3')
        this.$route(
          `/module/web?url=${this.data.config.url}&title=${this.data.config.title}`
        );
      // 无法跳转，复制链接到剪切板
      else
        wx.setClipboardData({
          data: this.data.config.url,
          success: () => {
            modal(
              '无法跳转',
              '该小程序无法跳转微信公众号文章，链接地址已复制至剪切板。请打开浏览器粘贴查看'
            );
          }
        });
    }
  },

  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
