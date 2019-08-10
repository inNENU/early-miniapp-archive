/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:30:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-10 23:54:32
 * @Description: 视频页面
 */

import $register from 'wxpage';
import $file from '../utils/file';
import $page from '../utils/page';
import $wx from '../utils/wx';
const { globalData: a } = getApp();

$register('video', {
  onNavigate() {
    const songList = $file.readJson('function/video');

    if (!songList) $wx.request('function/video', data => {
      // 写入JSON文件
      $file.writeJson('function', 'video', data);
    });
  },
  onLoad(options) {
    wx.loadFontFace({
      family: 'FZSSJW', source: 'url("https://mrhope.top/ttf/FZSSJW.ttf")',
      complete: res => {
        console.log(`宋体字体${res}`); // 调试
      }
    });

    const id = options.scene || options.id || 0;
    const videoList = $file.readJson('function/video');

    if (videoList) {
      const item = videoList[id];

      this.setData({
        id,
        videoList,
        share: options.share,
        statusBarHeight: a.info.statusBarHeight,
        nm: a.nm,
        videoName: item.name,
        videoAuthor: item.author,
        src: item.src || '',
        vid: item.vid || ''
      });
    } else $wx.request('function/video', data => {
      const item = data[id];

      this.setData({
        id,
        videoList: data,
        share: options.share,
        statusBarHeight: a.info.statusBarHeight,
        nm: a.nm,
        videoName: item.name,
        videoAuthor: item.author,
        src: item.src || '',
        vid: item.vid || ''
      });
    });

    $page.Notice('video');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color();

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  change(event: WXEvent.Touch) {
    const { id } = event.currentTarget;
    const item = this.data.videoList[id];

    this.setData({
      id,
      videoName: item.name,
      videoAuthor: item.author,
      src: item.src || '',
      vid: item.vid || ''
    });
  },
  wait() {
    $wx.tip('缓冲中..'); // 视频缓冲时提示用户等待
  },
  play() {
    wx.hideToast(); // 正常播放时隐藏提示
  },
  error() {
    $wx.tip('视频加载出错');
    wx.reportMonitor('5', 1); // 调试
  },
  onShareAppMessage() {
    return {
      title: this.data.videoName,
      path: `/function/video?id=${this.data.id}&share=true`
    };
  },
  redirect() {
    this.$switch('/pages/main');
  }
});
