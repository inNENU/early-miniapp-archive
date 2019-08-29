/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:20:57
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-29 10:54:55
 * @Description: 音乐播放器
 */
import $register from 'wxpage';
import $file from '../utils/file';
import $page from '../utils/page';
import $wx from '../utils/wx';
const { globalData: a } = (getApp() as WechatMiniprogram.App.MPInstance<{}>);
const manager = wx.getBackgroundAudioManager();

interface SongDetail {
  src: string;
  cover: string;
  title: string;
  singer: string;
}


$register('music', {
  data: {
    canplay: false,
    play: false,
    index: 0,
    currentTime: 0,
    songLength: 1,
    currentSong: {} as any,
    songListDisplay: false,
    songList: [] as any[],
    mode: 0
  },
  onNavigate() {
    $file.getJson('function/song');
  },
  onLoad(option = {}) {
    // 加载字体
    wx.loadFontFace({
      family: 'FZSSJW', source: 'url("https://mp.nenuyouth.com/fonts/FZSSJW.ttf")',
      complete: res => {
        console.log('宋体字体', res); // 调试
      }
    });

    let currentSong;

    if (option.index) a.music.index = Number(option.index);

    const { index } = a.music;
    const songList = $file.readJson('function/song') as SongDetail[];
    const mode = wx.getStorageSync('playMode');

    if (!mode) wx.setStorageSync('playMode', 0);

    // 写入基本信息
    this.setData({
      index,
      share: this.$state.firstOpen,
      info: a.info,
      nm: a.nm,
      play: a.music.play,
      mode: mode || 0
    });


    if (songList) {
      // 写入歌曲列表与当前歌曲信息
      currentSong = songList[index];
      this.setData({ songList, currentSong });

      // 如果正在播放，设置能够播放
      if (a.music.played) this.setData({ canplay: true });

      // 对音频管理器进行设置
      else {
        manager.epname = 'NenuYouth';
        manager.src = currentSong.src;
        manager.title = currentSong.title;
        manager.singer = currentSong.singer;
        manager.coverImgUrl = currentSong.cover;
      }

      // 在线获取歌曲列表
    } else $wx.request('function/song', data => {
      currentSong = data[index] as SongDetail;
      this.setData({ currentSong, songList: data as any[] });

      // 如果正在播放，设置能够播放
      if (a.music.played) this.setData({ canplay: true });

      // 对音频管理器进行设置
      else {
        manager.epname = 'NenuYouth';
        manager.src = currentSong.src;
        manager.title = currentSong.title;
        manager.singer = currentSong.singer;
        manager.coverImgUrl = currentSong.cover;
      }

      // 写入JSON文件
      $file.writeJson('function', 'song', data);
    });

    // 能够播放100ms后设置可以播放
    manager.onCanplay(() => {
      setTimeout(() => {
        console.log('Canplay'); // 调试
        this.setData({ canplay: true });
      }, 200);
    });

    // 在相应动作时改变状态
    manager.onPlay(() => {
      this.setData({ play: true });
      a.music.play = true;
    });

    manager.onPause(() => {
      this.setData({ play: false });
      a.music.play = false;
    });

    manager.onTimeUpdate(() => {

      /*
       * 调试
       * console.log(`TimeUpdate,currentTime是${manager.currentTime}`);
       * console.log(`bufferedTime是${manager.buffered},duration是${manager.duration}`);
       */

      const presentSecond = Math.round(manager.currentTime % 60)
        .toString();
      const totalSecond = Math.round(manager.duration % 60)
        .toString();

      // 更新歌曲信息
      this.setData({
        songLength: Math.round(manager.duration * 100) / 100,
        total: [
          Math.round(manager.duration / 60)
            .toString(),
          totalSecond.length === 1 ? `0${totalSecond}` : totalSecond
        ],
        currentTime: Math.round(manager.currentTime * 100) / 100,
        present: [
          Math.round(manager.currentTime / 60)
            .toString(),
          presentSecond.length === 1 ? `0${presentSecond}` : presentSecond
        ],
        bufferedTime: manager.buffered,
        canplay: true
      });

      // 设置播放状态
      a.music.played = true;
    });

    // 缓冲中
    manager.onWaiting(() => {
      console.warn('waiting');
      this.setData({ canplay: false });
    });

    manager.onPrev(() => {
      this.previous();
    });

    // 歌曲播放结束
    manager.onEnded(() => {
      this.end();
    });

    manager.onNext(() => {
      this.next();
    });

    manager.onError(() => {
      $wx.tip('获取音乐出错，请稍后重试');
    });

    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(false);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);

    $page.Notice('music');
  },
  loadCover(event: MiniprogramEvent) { // 加载封面
    if (event.type === 'load') this.setData({ coverLoad: true });
  },
  play() { // 播放
    if (this.data.play) manager.pause();
    else manager.play();
  },
  drag(event: MiniprogramEvent) { // 拖拽进度
    manager.seek(event.detail.value / 100);
    if (event.type === 'change') {
      this.setData({ currentTime: event.detail.value / 100 });
      console.log(event.detail.value); // 调试
    }
  },
  end() { // 结束动作
    let index = this.data.index as number | string;
    const total = this.data.songList.length;
    let temp;

    switch (this.data.mode) {
      case 3:
        do temp = Math.round(Math.random() * total - 0.5); while (index === temp);
        index = temp;
        break;
      case 2:
        index = index as number + 1 === total ? 'stop' : index as number + 1;
        $wx.tip('播放完毕');
        break;
      case 1:
        break;
      case 0:
      default: index = index as number + 1 === total ? 0 : index as number + 1;
    }
    this.switchSong(index);
  },
  next() { // 下一曲动作
    let index = this.data.index as number | string;
    const total = this.data.songList.length;
    let temp;

    switch (this.data.mode) {
      case 3:
        do temp = Math.round(Math.random() * total - 0.5); while (index === temp);
        index = temp;
        break;
      case 2:
        if (index as number + 1 === total) {
          index = 'nothing';
          $wx.tip('已是最后一曲');
        } else index = index as number + 1;
        break;
      case 1:
      case 0:
      default: index = index as number + 1 === total ? 0 : index as number + 1;
    }
    this.switchSong(index);
  },
  previous() { // 上一曲动作
    let index = this.data.index as number | string;
    const { length: total } = this.data.songList;
    let temp;

    switch (this.data.mode) {
      case 3:
        do temp = Math.round(Math.random() * total - 0.5); while (index === temp);
        index = temp;
        break;
      case 2:
        if (index === 0) {
          index = 'nothing';
          $wx.tip('已是第一曲');
        } else index = index as number - 1;
        break;
      case 1:
      case 0:
      default: index = index === 0 ? total - 1 : index as number - 1;
    }
    this.switchSong(index);
  },
  switchSong(index: string | number) { // 切换歌曲
    if (index === 'stop') {

      this.setData({
        play: false,
        canPlay: false
      });

      manager.stop();

    } else if (index !== 'nothing') { // 正常赋值

      const currentSong = this.data.songList[index as number];

      this.setData({
        index: index as number,
        currentSong,
        play: false,
        canPlay: false
      });

      manager.src = currentSong.src;
      manager.title = currentSong.title;
      manager.singer = currentSong.singer;
      manager.coverImgUrl = currentSong.cover;
      a.music.index = Number(index);
    }
  },
  modeSwitch() { // 切换播放模式
    let modeName;
    const mode = this.data.mode === 3 ? 0 : this.data.mode as number + 1;

    this.setData({ mode });
    switch (mode) {
      case 1:
        modeName = '单曲循环';
        break;
      case 2:
        modeName = '顺序播放';
        break;
      case 3:
        modeName = '随机播放';
        break;
      case 0:
      default:
        modeName = '列表循环';
    }
    wx.setStorageSync('playMode', mode);
    $wx.tip(`${modeName}模式`);
  },
  list() { // 切换列表显隐
    this.setData({ songListDisplay: !this.data.songListDisplay });
  },
  change(res: MiniprogramEvent) { // 点击列表具体歌曲项时触发
    this.list();
    this.switchSong(res.currentTarget.dataset.index);
  },
  onShareAppMessage() {
    return {
      title: this.data.currentSong.title,
      path: `/function/player?index=${this.data.index}`
    };
  },
  redirect() {
    wx.switchTab({ url: '/page/main' });
  }
});
