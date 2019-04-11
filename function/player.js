/* global wx getApp*/
const { globalData: a, lib: { $act, $file, $page, $set } } = getApp(),
  manager = wx.getBackgroundAudioManager();

$page('music', {
  data: {
    canplay: false,
    currentTime: 0,
    songLength: 1,
    currentSong: {},
    songListDisplay: false
  },
  onNavigate() {
    let currentSong;
    const { index } = a.music,
      songList = $file.readJson('function/song'),
      mode = wx.getStorageSync('playMode');

    // 写入基本信息
    this.data.index = index;
    this.data.info = a.info;
    this.data.nm = a.nm;
    this.data.play = a.music.play;
    this.data.mode = mode ? mode : (wx.setStorageSync('playMode', 0), 0);
    this.share = false;

    if (songList) {

      // 写入歌曲列表与当前歌曲信息
      currentSong = songList[index];
      this.data.songList = songList;
      this.data.currentSong = currentSong;

      this.set = true;
    } else
      $act.request('function/song', data => {

        // 写入歌曲列表与当前歌曲信息
        currentSong = data[index];
        this.data.songList = data;
        this.data.currentSong = currentSong;

        this.set = true;

        // 写入JSON文件
        $file.writeJson('function', 'song', data);
      });

  },
  onLoad(option) {

    // 加载字体
    wx.loadFontFace({
      family: 'FZSSJW', source: 'url("https://mp.nenuyouth.com/fonts/FZSSJW.ttf")',
      complete: res => {
        console.log(`宋体字体${res.status}`); // 调试
      }
    });

    let currentSong;

    if (!this.set) {
      if (option.index) a.music.index = option.index;

      const { index } = a.music,
        songList = $file.readJson('function/song'),
        mode = wx.getStorageSync('playMode');

      // 写入基本信息
      this.setData({
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
      } else $act.request('function/song', data => {
        currentSong = data[index];
        this.setData({ songList: data, currentSong });

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

    }

    //　能够播放100ms后设置可以播放
    manager.onCanplay(setTimeout(() => {
      console.log('Canplay'); // 调试
      this.setData({ canplay: true });
    }), 100);

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

      const presentSecond = parseInt(manager.currentTime % 60).toString(),
        totalSecond = parseInt(manager.duration % 60).toString();

      // 更新歌曲信息
      this.setData({
        songLength: parseInt(manager.duration * 100) / 100,
        total: [
          parseInt(manager.duration / 60).toString(),
          totalSecond.length === 1 ? `0${totalSecond}` : totalSecond
        ],
        currentTime: parseInt(manager.currentTime * 100) / 100,
        present: [
          parseInt(manager.currentTime / 60).toString(),
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
      $act.tip('获取音乐出错，请稍后重试');
    });

    // 设置胶囊颜色
    const [frontColor, backgroundColor] = a.nm ? ['#ffffff', '#000000'] : ['#000000', '#ffffff'];

    wx.setNavigationBarColor({ frontColor, backgroundColor });

    $set.Notice('music');
  },
  onShow() {
    // 设置胶囊颜色
    const [frontColor, backgroundColor] = a.nm ? ['#ffffff', '#000000'] : ['#000000', '#ffffff'];

    wx.setNavigationBarColor({ frontColor, backgroundColor });
  },
  loadCover(e) {
    if (e.type === 'load') this.setData({ coverLoad: true });
  },
  play() {
    if (this.data.play) manager.pause();
    else manager.play();
  },
  drag(e) {
    manager.seek(e.detail.value / 100);
    if (e.type === 'change') {
      this.setData({ currentTime: e.detail.value / 100 });
      console.log(e.detail.value); // 调试
    }
  },
  end() {
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
        $act.tip('播放完毕');
      case 1:
        break;
      case 0:
      default: index = index + 1 === total ? 0 : index + 1;
    }
    this.Switch(index);
  },
  next() {
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
          $act.tip('已是最后一曲');
        } else index += 1;
        break;
      case 1:
      case 0:
      default: index = index + 1 === total ? 0 : index + 1;
    }
    this.Switch(index);
  },
  previous() {
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
          $act.tip('已是第一曲');
        } else index -= 1;
        break;
      case 1:
      case 0:
      default: index = index === 0 ? total - 1 : index - 1;
    }
    this.Switch(index);
  },
  Switch(index) {
    if (index === 'stop') {

      this.setData({
        play: false,
        canPlay: false
      });

      manager.stop();

    } else if (index !== 'nothing') {　// 正常赋值

      const currentSong = this.data.songList[index];

      this.setData({
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
  cA(e) {
    $set.component(e, this);
  },
  modeSwitch() {
    let modeName;
    const mode = this.data.mode === 3 ? 0 : this.data.mode + 1;

    this.setData({ mode });
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
    $act.tip(`${modeName}模式`);
  },
  list() {
    this.setData({ songListDisplay: !this.data.songListDisplay });
    /*
     * Comment
     * if (this.data.songListDisplay) {
     *   this.setData({ hide: true });
     *   setTimeout(() => {
     *     this.setData({ songListDisplay: false });
     *   }, 500);
     * } else this.setData({
     *   songListDisplay: true,
     *   hide: false
     * });
     */
  },
  change(res) {
    this.list();
    this.Switch(res.currentTarget.dataset.index);
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
