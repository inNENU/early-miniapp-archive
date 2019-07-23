/*
 * @Author: Mr.Hope
 * @Date: 2019-07-23 18:34:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-23 22:26:35
 * @Description: 公众号组件
 */

import $register from 'wxpage';
import $wx from '../../../utils/wx';

const { globalData: { appID } } = getApp();// 获得日志管理器

$register.C({
  properties: { config: Object },
  methods: {
    _gzh() {
      // 为企业主体微信小程序
      if (appID === 'wx9ce37d9662499df3')
        this.$route(`/module/web?url=${this.data.config.url}&title=${this.data.config.title}`);

      // 无法跳转，复制链接到剪切板
      else wx.setClipboardData({
        data: this.data.config.url,
        success: () => {
          $wx.modal('无法跳转', '小程序无法跳转微信公众号文章，链接地址已复制至剪切板。请打开浏览器粘贴查看');
        }
      });
    }
  }
});
