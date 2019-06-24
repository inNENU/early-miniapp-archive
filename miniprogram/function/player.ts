/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:20:57
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-06-24 23:45:45
 * @Description: 音乐播放器
 */
import $register from 'wxpage';
import $component from '../utils/component';
import $file from '../utils/file';
import $page from '../utils/setpage';
import $my from '../utils/wx';
const { globalData: a } = getApp();
const manager = wx.getBackgroundAudioManager();

$register('music', {
  data: {
    canplay: false,
    currentTime: 0,
    songLength: 1,
    currentSong: {},
    songListDisplay: false
  },
  onNavigate() {
    const songList = $file.readJson('function/song');

    if (!songList) $my.request('function/song', (data: any) => {
      // 写入JSON文件
      $file.writeJson('function', 'song', data);
    });
  },
  onLoad(option: any) {
    // 加载字体
    wx.loadFontFace({
      family: 'FZSSJW', source: 'url("https://mp.nenuyouth.com/fonts/FZSSJW.ttf")',
      complete: res => {
        console.log('宋体字体', res); // 调试
      }
    });

    let currentSong;

    if (option.index) a.music.index = option.index;

    const { index } = a.music;
    const songList = $file.readJson('function/song');
    const mode = wx.getStorageSync('playMode');

    // 写入基本信息
    this.setData!({
      share: option.share ? option.share : false,
      index,
      info: a.info,
      nm: a.nm,
      play: a.music.play,
      mode: mode ? mode : (wx.setStorageSync('playMode', 0), 0)
    });


    if (songList) {
      // 写入歌曲列表与当前歌曲信息
      currentSong = songList[index];
      this.setData!({ songList, currentSong });

      // 如果正在播放，设置能够播放
      if (a.music.played) this.setData!({ canplay: true });

      // 对音频管理器进行设置
      else {
        manager.epname = 'NenuYouth';
        manager.src = currentSong.src;
        manager.title = currentSong.title;
        manager.singer = currentSong.singer;
        manager.coverImgUrl = currentSong.cover;
      }

      // 在线获取歌曲列表
    } else $my.request('function/song', (data: any) => {
      currentSong = data[index];
      this.setData!({ songList: data, currentSong });

      // 如果正在播放，设置能够播放
      if (a.music.played) this.setData!({ canplay: true });

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

    //　能够播放100ms后设置可以播放
    manager.onCanplay(() => {
      setTimeout(() => {
        console.log('Canplay'); // 调试
        this.setData!({ canplay: true });
      }, 100)
    });

    // 在相应动作时改变状态
    manager.onPlay(() => {
      this.setData!({ play: true });
      a.music.play = true;
    });

    manager.onPause(() => {
      this.setData!({ play: false });
      a.music.play = false;
    });

    manager.onTimeUpdate(() => {

      /*
       * 调试
       * console.log(`TimeUpdate,currentTime是${manager.currentTime}`);
       * console.log(`bufferedTime是${manager.buffered},duration是${manager.duration}`);
       */

      const presentSecond = Math.round(manager.currentTime % 60).toString();
      const totalSecond = Math.round(manager.duration % 60).toString();

      // 更新歌曲信息
      this.setData!({
        songLength: Math.round(manager.duration * 100) / 100,
        total: [
          Math.round(manager.duration / 60).toString(),
          totalSecond.length === 1 ? `0${totalSecond}` : totalSecond
        ],
        currentTime: Math.round(manager.currentTime * 100) / 100,
        present: [
          Math.round(manager.currentTime / 60).toString(),
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
      this.setData!({ canplay: false });
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
      $my.tip('获取音乐出错，请稍后重试');
    });

    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(false);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);

    $page.Notice('music');
  },
  loadCover(event: any) { // 加载封面
    if (event.type === 'load') this.setData!({ coverLoad: true });
  },
  play() { // 播放
    if (this.data.play) manager.pause();
    else manager.play();
  },
  drag(event: any) { // 拖拽进度
    manager.seek(event.detail.value / 100);
    if (event.type === 'change') {
      this.setData!({ currentTime: event.detail.value / 100 });
      console.log(event.detail.value); // 调试
    }
  },
  end() { // 结束动作
    let { index } = this.data;
    const total = this.data.songList.length;

    switch (this.data.mode) {
      case 3:
        let temp;

        do temp = Math.round(Math.random() * total - 0.5); while (index === temp);
        index = temp;
        break;
      case 2:
        index = index + 1 === total ? 'stop' : index + 1;
        $my.tip('播放完毕');
      case 1:
        break;
      case 0:
      default: index = index + 1 === total ? 0 : index + 1;
    }
    this.Switch(index);
  },
  next() { // 下一曲动作
    let { index } = this.data;
    const total = this.data.songList.length;

    switch (this.data.mode) {
      case 3:
        let temp;

        do temp = Math.round(Math.random() * total - 0.5); while (index === temp);
        index = temp;
        break;
      case 2:
        if (index + 1 === total) {
          index = 'nothing';
          $my.tip('已是最后一曲');
        } else index += 1;
        break;
      case 1:
      case 0:
      default: index = index + 1 === total ? 0 : index + 1;
    }
    this.Switch(index);
  },
  previous() { // 上一曲动作
    let { index } = this.data;
    const { length: total } = this.data.songList;

    switch (this.data.mode) {
      case 3:
        let temp;

        do temp = Math.round(Math.random() * total - 0.5); while (index === temp);
        index = temp;
        break;
      case 2:
        if (index === 0) {
          index = 'nothing';
          $my.tip('已是第一曲');
        } else index -= 1;
        break;
      case 1:
      case 0:
      default: index = index === 0 ? total - 1 : index - 1;
    }
    this.Switch(index);
  },
  Switch(index: any) { // 切换歌曲
    if (index === 'stop') {

      this.setData!({
        play: false,
        canPlay: false
      });

      manager.stop();

    } else if (index !== 'nothing') {　// 正常赋值

      const currentSong = this.data.songList[index];

      this.setData!({
        index,
        currentSong,
        play: false,
        canPlay: false
      });

      manager.src = currentSong.src;
      manager.title = currentSong.title;
      manager.singer = currentSong.singer;
      manager.coverImgUrl = currentSong.cover;
      a.music.index = index;
    }
  },
  modeSwitch() { // 切换播放模式
    let modeName;
    const mode = this.data.mode === 3 ? 0 : this.data.mode + 1;

    this.setData!({ mode });
    switch (mode) {
      case 1: modeName = '单曲循环';
        break;
      case 2: modeName = '顺序播放';
        break;
      case 3: modeName = '随机播放';
        break;
      case 0:
      default:
        modeName = '列表循环';
    }
    wx.setStorageSync('playMode', mode);
    $my.tip(`${modeName}模式`);
  },
  list() { // 切换列表显隐
    this.setData!({ songListDisplay: !this.data.songListDisplay });
  },
  change(res: any) { // 点击列表具体歌曲项时触发
    this.list();
    this.Switch(res.currentTarget.dataset.index);
  },
  cA(e: any) {
    $component.trigger(e, this);
  },
  onShareAppMessage() {
    return {
      title: this.data.title,
      path: `/function/player?index=${this.data.index}&share=true`
    };
  },
  redirect() {
    wx.switchTab({ url: '/page/main' });
  }
});
