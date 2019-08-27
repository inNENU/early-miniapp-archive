/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:30:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-14 23:08:13
 * @Description: 视频页面
 */

import $register from 'wxpage';
import $file from '../utils/file';
import $page from '../utils/page';
import $wx from '../utils/wx';
const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);

$register('video', {
  onNavigate() {
    $file.getJson('function/video');
  },
  onLoad(options) {
    if (a.appID === 'wx9ce37d9662499df3') {


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
    } else
      $wx.modal(
        '禁止播放',
        '只有企业主体小程序才可以播放视频，请使用微信搜索小程序“东师青年+”。',
        () => this.$back()
      );
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
    this.$switch('/page/main');
  }
});
