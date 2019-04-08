/* global wx getApp*/
const { globalData: a, lib: { $page, $set } } = getApp(),
  manager = wx.getBackgroundAudioManager();

$page('music', {
  data: {
    canplay: false,
    currentTime: 0,
    songLength: 1
  },
  onNavigate() {
    let currentSong;
    const { index } = a.music,
      songList = wx.getStorageSync('funcResList0'),
      mode = wx.getStorageSync('playMode');

    this.data.i = index;
    this.data.info = a.info;
    this.data.nm = a.nm;
    this.data.play = a.music.play;
    this.data.mode = mode ? mode : (wx.setStorageSync('playMode', 0), 0);
    if (songList) {
      currentSong = songList[index];
      this.data.songList = songList;
      this.data.title = currentSong.title;
      this.data.singer = currentSong.singer;
      this.data.cover = currentSong.cover;
      this.set = true;
    } else
      $set.request('funcResList/funcResList0', data => {
        currentSong = data[index];
        this.data.songList = data;
        this.data.title = currentSong.title;
        this.data.singer = currentSong.singer;
        this.data.cover = currentSong.cover;
        this.set = true;
        wx.setStorageSync('funcResList0', data);
      });

  },
  onLoad(e) {

    // 加载字体
    wx.loadFontFace({
      family: 'FZSSJW', source: 'url("https://mp.nenuyouth.com/fonts/FZSSJW.ttf")',
      complete: res => {
        console.log(`宋体字体${res.status}`); // 调试
      }
    });

    let currentSong;

    if (!this.set) {
      const index = e.index ? (a.music.index = e.index, e.index) : a.music.index,
        songList = wx.getStorageSync('funcResList0'),
        mode = wx.getStorageSync('playMode');

      this.setData({
        share: e.share ? e.share : false,
        i: index,
        info: a.info,
        nm: a.nm,
        play: a.music.play,
        mode: mode ? mode : (wx.setStorageSync('playMode', 0), 0)
      });
      if (songList) {
        currentSong = songList[index];
        this.setData({
          songList,
          title: currentSong.title,
          singer: currentSong.singer,
          cover: currentSong.cover
        });
        if (a.music.played) this.setData({ canplay: true });
        else {
          manager.src = currentSong.src;
          manager.title = currentSong.title;
          manager.epname = 'NenuYouth';
          manager.singer = currentSong.singer;
          manager.coverImgUrl = currentSong.cover;
        }
      } else
        $set.request('function/songList', data => {
          currentSong = data[index];
          this.setData({
            songList: data, title: currentSong.title,
            singer: currentSong.singer,
            cover: currentSong.cover
          });
          if (a.music.played) this.setData({ canplay: true });
          else {
            manager.src = currentSong.src;
            manager.title = currentSong.title;
            manager.epname = 'NenuYouth';
            manager.singer = currentSong.singer;
            manager.coverImgUrl = currentSong.cover;
          }
          // Wx.setStorageSync("funcResList0", data);
        }, this);

    }
    manager.onCanplay(setTimeout(() => {
      console.log('Canplay'); // 调试
      this.setData({ canplay: true });
    }), 100);
    manager.onPlay(() => {
      this.setData({ play: true });
      a.music.play = true;
    });
    manager.onPause(() => {
      this.setData({ play: false });
      a.music.play = false;
    });
    manager.onTimeUpdate(() => {
      console.log(`TimeUpdate,currentTime是${manager.currentTime},
      bufferedTime是${manager.buffered},duration是${manager.duration}`); // 调试
      const presentSecond = parseInt(manager.currentTime % 60).toString(),
        totalSecond = parseInt(manager.duration % 60).toString();

      this.setData({
        songLength: parseInt(manager.duration * 100) / 100,
        total: [parseInt(manager.duration / 60).toString(), totalSecond.length === 1 ? `0${totalSecond}` : totalSecond],
        currentTime: parseInt(manager.currentTime * 100) / 100,
        present: [
          parseInt(manager.currentTime / 60).toString(),
          presentSecond.length === 1 ? `0${presentSecond}` : presentSecond
        ],
        bufferedTime: manager.buffered,
        canplay: true
      });
      a.music.played = true;
    });
    manager.onWaiting(() => {
      console.warn('waiting');
      this.setData({ canplay: false });
    });
    manager.onEnded(() => {
      this.next();
    });
    manager.onPrev(() => {
      this.previous();
    });
    manager.onNext(() => {
      this.next();
    });
    manager.onError(() => {
      wx.showToast({ title: '获取音乐出错，请稍后重试', icon: 'none' });
    });
    $set.Notice('music');
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
  next() {
    let { i } = this.data,
      j;
    const { length: total } = this.data.songList;

    switch (this.data.mode) {
      case 3:
        do j = Math.round(Math.random() * total - 0.5); while (i === j);
        i = j;
        break;
      default: i = i + 1 === total ? 0 : i + 1;
    }
    this.Switch(i);
  },
  previous() {
    let { i } = this.data,
      j;
    const { length: total } = this.data.songList;

    switch (this.data.mode) {
      case 3:
        do j = Math.round(Math.random() * total - 0.5); while (i === j);
        i = j;
        break;
      default: i = i === 0 ? total - 1 : i - 1;
    }
    console.log(i);
    this.Switch(i);
  },
  Switch(i) {
    const currentSong = this.data.songList[i];

    this.setData({
      i,
      title: currentSong.title,
      singer: currentSong.singer,
      cover: currentSong.cover,
      play: false,
      canPlay: false
    });
    manager.src = currentSong.src;
    manager.title = currentSong.title;
    manager.singer = currentSong.singer;
    manager.coverImgUrl = currentSong.cover;
    a.music.index = i;
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
    wx.showToast({ title: `${modeName}模式`, icon: 'none' });
  },
  list() {
    wx.showToast({ title: '开发中', 'icon': 'none' });// 待完善
  },
  onShareAppMessage() {
    return {
      title: this.data.title,
      path: `/function/player?index=${this.data.i}&share=true`
    };
  },
  redirect() {
    wx.switchTab({ url: '/page/main' });
  }
});
