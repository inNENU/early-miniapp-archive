var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData,
  manager;

P('music', {
  data: {
    canplay: false,
    currentTime: 0,
    songLength: 1,
    songList: [{
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl80MDI2NzgyODI=",
      cover: "https://mrhope.top/icon/nenuyouth.png",
      title: '东师姑娘',
      singer: '新媒体中心填词歌曲'
    }, {
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzUxMTg5NzIxOF8yMjQ3NDgzNzQ2",
      cover: "/image/logo.png",
      title: '远方有你',
      singer: '词改编：党委学生工作部'
    }, {
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl81MDQzODM1MjQ=",
      cover: "https://mrhope.top/icon/nenuyouth.png",
      title: '一生有你',
      singer: '东师青年520女生节礼物'
    }, {
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl81MDQzODEwODg=",
      cover: "https://mrhope.top/icon/nenuyouth.png",
      title: '微微一笑很东师',
      singer: '新媒体中心填词歌曲'
    }, {
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl8yNjUxODc1MzI3",
      cover: "https://mrhope.top/icon/nenuyouth.png",
      title: '师德公约',
      singer: '东北师范大学宣'
    }]
  },
  onLoad() {
    wx.loadFontFace({
      family: 'FZSSJW',
      source: 'url("https://mrhope.top/ttf/FZSSJW.ttf")',
      complete(res) {
        console.log('宋体字体' + res.status); //调试
      }
    });
    let that = this,
      mode = wx.getStorageSync('playMode'),
      currentSong = this.data.songList[a.music.index];
    this.setData({
      i: a.music.index,
      title: currentSong.title,
      singer: currentSong.singer,
      cover: currentSong.cover,
      info: a.info,
      nm: a.nm,
      play: a.music.play,
      mode: mode ? mode : (wx.setStorageSync('playMode', 0), 0)
    });
    manager = wx.getBackgroundAudioManager();
    if (a.music.played) {
      this.setData({
        canplay: true
      });
    } else {
      manager.src = currentSong.src, manager.title = currentSong.title, manager.epname = 'NenuYouth', manager.singer = currentSong.singer, manager.coverImgUrl = currentSong.cover;
    };
    manager.onCanplay(setTimeout(function() {
      console.log('Canplay') //调试
      that.setData({
        canplay: true
      });
    }), 100);
    manager.onPlay(function() {
      that.setData({
        play: true
      });
      a.music.play = true;
    });
    manager.onPause(function(e) {
      that.setData({
        play: false
      });
      a.music.play = false;
    });
    manager.onTimeUpdate(function(e) {
      console.log(`TimeUpdate,currentTime是${manager.currentTime},bufferedTime是${manager.buffered},duration是${manager.duration}`) //调试
      let presentSecond = (parseInt(manager.currentTime % 60)).toString();
      if (that.data.songLength == 1) {
        let totalSecond = (parseInt(manager.duration % 60)).toString();
        that.setData({
          songLength: parseInt(manager.duration * 100) / 100,
          total: [parseInt(manager.duration / 60).toString(), totalSecond.length == 1 ? '0' + totalSecond : totalSecond],
        });
      }
      that.setData({
        currentTime: parseInt(manager.currentTime * 100) / 100,
        present: [parseInt(manager.currentTime / 60).toString(), presentSecond.length == 1 ? '0' + presentSecond : presentSecond],
        bufferedTime: manager.buffered,
        canplay: true,
      });
      a.music.played = true;
    });
    manager.onWaiting(function() {
      console.warn('waiting');
      that.setData({
        canplay: false
      })
    });
    manager.onEnded(function() {
      that.next();
    });
    manager.onPrev(function() {
      that.previous()
    });
    manager.onNext(function() {
      that.next()
    });
    manager.onError(function() {
      wx.showToast({
        title: '获取音乐出错，请稍后重试',
        icon: 'none'
      });
    });
  },
  loadCover(e) {
    if (e.type == 'load') {
      this.setData({
        coverLoad: true
      })
    }
  },
  play() {
    this.data.play ? manager.pause() : manager.play();
  },
  drag(e) {
    manager.seek(e.detail.value / 100);
    if (e.type == 'change') {
      console.log(e.detail.value); //调试
      this.setData({
        currentTime: e.detail.value / 100,
      });
    }
  },
  next() {
    let i = this.data.i,
      total = this.data.songList.length;
    switch (this.data.mode) {
      case 3:
        let j;
        do {
          j = Math.round(Math.random() * total - 0.5)
        } while (i == j);
        i = j;
        break;
      default:
        i = i + 1 == total ? 0 : i + 1;
    };
    this.Switch(i);
  },
  previous() {
    let i = this.data.i,
      total = this.data.songList.length;
    switch (this.data.mode) {
      case 3:
        let j;
        do {
          j = Math.round(Math.random() * total - 0.5)
        } while (i == j);
        i = j;
        break;
      default:
        i = i - 1 == 0 ? total : i - 1;
    };
    this.Switch(i);
  },
  Switch(i) {
    let currentSong = this.data.songList[i];
    this.setData({
      i: i,
      title: currentSong.title,
      singer: currentSong.singer,
      cover: currentSong.cover,
      play: false,
      canPlay: false
    });
    manager.src = currentSong.src, manager.title = currentSong.title, manager.singer = currentSong.singer, manager.coverImgUrl = currentSong.cover;
    a.music.index = i;
  },
  cA(e) {
    S.component(e, this)
  },
  modeSwitch() {
    let mode = this.data.mode == 3 ? 0 : this.data.mode + 1;
    this.setData({
      mode: mode
    });
    wx.setStorageSync('playMode', mode)
  },
})