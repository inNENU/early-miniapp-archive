/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 21:20:57
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-21 17:00:36
 * @Description: 音乐播放器
 */
import * as $register from 'wxpage';
import { getJson, readJson, writeJson } from '../../utils/file';
import { popNotice, setColor } from '../../utils/page';
import { request, tip } from '../../utils/wx';
const { globalData: a } = getApp<{}, GlobalData>();
const manager = wx.getBackgroundAudioManager();

interface SongDetail {
  src: string;
  cover: string;
  title: string;
  singer: string;
}

/** 歌词 */
interface Lyric {
  /** 歌词的开始时间 */
  time: number;
  /** 歌词的内容 */
  stuff: string;
}

$register('music', {
  data: {
    activeIndex: -1,
    lyrics: [
      { time: 1, stuff: '月光把天空照亮' },
      { time: 2, stuff: '洒下一片光芒点缀海洋' },
      { time: 3.886, stuff: '每当流星从天而降' },
      { time: 4.576, stuff: '心中的梦想都随风飘扬' },
      { time: 5.466, stuff: '展开透明翅膀越出天窗' },
      { time: 6.209, stuff: '找寻一个最美丽的希望' },
      { time: 7, stuff: '每当天空泛起彩色霞光' }
    ] as Lyric[],
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
    getJson('function/song');
  },
  onLoad(option = {}) {
    // 加载字体
    wx.loadFontFace({
      family: 'FZSSJW',
      source: 'url("https://mp.innenu.com/fonts/FZSSJW.ttf")',
      complete: res => {
        console.log('宋体字体', res); // 调试
      }
    });

    let currentSong;

    if (option.index) a.music.index = Number(option.index);

    const { index } = a.music;
    const songList = readJson('function/song') as SongDetail[];
    const mode = wx.getStorageSync('playMode');

    if (!mode) wx.setStorageSync('playMode', 0);

    // 写入基本信息
    this.setData({
      index,
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
        manager.epname = 'in东师';
        manager.src = currentSong.src;
        manager.title = currentSong.title;
        manager.singer = currentSong.singer;
        manager.coverImgUrl = currentSong.cover;
      }

      // 在线获取歌曲列表
    } else
      request('function/song', data => {
        currentSong = data[index] as SongDetail;
        this.setData({ currentSong, songList: data as any[] });

        // 如果正在播放，设置能够播放
        if (a.music.played) this.setData({ canplay: true });
        // 对音频管理器进行设置
        else {
          manager.epname = 'in东师';
          manager.src = currentSong.src;
          manager.title = currentSong.title;
          manager.singer = currentSong.singer;
          manager.coverImgUrl = currentSong.cover;
        }

        // 写入JSON文件
        writeJson('function', 'song', data);
      });

    // 注册播放器动作
    this.managerRegister();

    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(false);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);

    popNotice('music');
  },
  /** 注册音乐播放器 */
  managerRegister() {
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

      const presentSecond = Math.round(manager.currentTime % 60).toString();
      const totalSecond = Math.round(manager.duration % 60).toString();

      // 更新歌曲信息
      this.setData({
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
        // bufferedTime: manager.buffered,
        canplay: true
      });

      // 设置播放状态this.lyric();
      a.music.played = true;

      this.lyric();
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
      tip('获取音乐出错，请稍后重试');
    });
  },
  /** 设置歌词 */
  lyric() {
    const { lyrics } = this.data;
    let { activeIndex } = this.data;

    /** 如果当前激活项不是最后一个且当前时间大于下一项 */
    while (
      activeIndex < lyrics.length - 1 &&
      this.data.currentTime > lyrics[activeIndex + 1].time
    ) {
      /** 如果当前激活项不是倒数第二个且向后第二项时间大于当前时间 */
      if (
        activeIndex === lyrics.length - 2 ||
        this.data.currentTime < lyrics[activeIndex + 2].time
      ) {
        this.setData({ activeIndex: activeIndex + 1 });
        break;
      }
      activeIndex += 1;
    }
  },
  loadCover(event: WXEvent.ImageLoad) {
    // 加载封面
    if (event.type === 'load') this.setData({ coverLoad: true });
  },
  /** 播放与暂停 */
  play() {
    if (this.data.play) manager.pause();
    else manager.play();
  },
  /** 拖拽进度 */
  drag(event: WXEvent.SliderChange) {
    manager.seek(event.detail.value / 100);
    if (event.type === 'change') {
      this.setData({ currentTime: event.detail.value / 100 });
      console.log(event.detail.value); // 调试
    }
  },
  end() {
    // 结束动作
    let index = this.data.index as number | string;
    const total = this.data.songList.length;
    let temp;

    switch (this.data.mode) {
      case 3:
        do temp = Math.round(Math.random() * total - 0.5);
        while (index === temp);
        index = temp;
        break;
      case 2:
        index =
          (index as number) + 1 === total ? 'stop' : (index as number) + 1;
        tip('播放完毕');
        break;
      case 1:
        break;
      case 0:
      default:
        index = (index as number) + 1 === total ? 0 : (index as number) + 1;
    }
    this.switchSong(index);
  },
  /** 下一曲动作 */
  next() {
    let index = this.data.index as number | string;
    const total = this.data.songList.length;
    let temp;

    switch (this.data.mode) {
      case 3:
        do temp = Math.round(Math.random() * total - 0.5);
        while (index === temp);
        index = temp;
        break;
      case 2:
        if ((index as number) + 1 === total) {
          index = 'nothing';
          tip('已是最后一曲');
        } else index = (index as number) + 1;
        break;
      case 1:
      case 0:
      default:
        index = (index as number) + 1 === total ? 0 : (index as number) + 1;
    }
    this.switchSong(index);
  },
  /** 上一曲动作 */
  previous() {
    let index = this.data.index as number | string;
    const { length: total } = this.data.songList;
    let temp;

    switch (this.data.mode) {
      case 3:
        do temp = Math.round(Math.random() * total - 0.5);
        while (index === temp);
        index = temp;
        break;
      case 2:
        if (index === 0) {
          index = 'nothing';
          tip('已是第一曲');
        } else index = (index as number) - 1;
        break;
      case 1:
      case 0:
      default:
        index = index === 0 ? total - 1 : (index as number) - 1;
    }
    this.switchSong(index);
  },
  /** 切换歌曲 */
  switchSong(index: string | number) {
    if (index === 'stop') {
      this.setData({
        play: false,
        canPlay: false
      });

      manager.stop();
      // 正常赋值
    } else if (index !== 'nothing') {
      const currentSong = this.data.songList[index as number];

      this.setData({
        activeIndex: -1,
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
  /** 切换播放模式 */
  modeSwitch() {
    let modeName;
    const mode = this.data.mode === 3 ? 0 : this.data.mode + 1;

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
    tip(`${modeName}模式`);
  },
  /** 切换列表显隐 */
  list() {
    this.setData({ songListDisplay: !this.data.songListDisplay });
  },
  change(res: WXEvent.Touch) {
    // 点击列表具体歌曲项时触发
    this.list();
    this.switchSong(res.currentTarget.dataset.index);
  },
  onShareAppMessage() {
    return {
      title: this.data.currentSong.title,
      path: `/function/player/player?index=${this.data.index}`
    };
  },
  back() {
    if (this.$state.firstOpen) this.$switchTab('main');
    else this.$back();
  }
});
