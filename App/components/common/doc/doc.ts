/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 13:45:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-23 19:32:45
 * @Description: 分享组件
 */

import $register from 'wxpage';
import $wx from '../../../utils/wx';

$register.C({
  properties: { config: Object },
  methods: {
    _doc() {
      if (['doc', 'ppt', 'xls', 'pdf'].includes(this.data.config.doctype)) {
        // 检测到文档

        wx.showLoading({ title: '下载中...0%', mask: true });// 显示下载提示

        // 开始下载文件
        const docTask = wx.downloadFile({
          url: this.data.config.url,

          // 下载成功，隐藏下载提示并打开文档
          success: data => {
            wx.hideLoading();
            wx.openDocument({ filePath: data.tempFilePath });
          },

          // 下载失败，隐藏下载提示告知用户下载失败并上报
          fail: () => {
            wx.hideLoading();
            $wx.tip('文档下载失败');
            wx.reportMonitor('9', 1);
          }
        });

        // 监听下载进度，并更新弹窗显示
        docTask.onProgressUpdate(data => {
          wx.showLoading({ title: `下载中...${data.progress}%`, mask: true });
        });

        // 检测到图片，开始图片浏览
      } else if (['jpg', 'png', 'gif'].includes(this.data.config.doctype)) wx.previewImage({ urls: [this.data.config.url] });
    }
  }
});