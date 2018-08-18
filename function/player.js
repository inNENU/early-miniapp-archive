var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData,
  audioContext = a.music.audioContext;

P('music', {
  data: {
    cover: '/image/nenuyouth.png',
    musicPlay: false,
    canplay: false,
    currentTime: 0,
    songLength: 1,
    presentMinute: '0',
    presentSecond: '00',
    totalMinute: '0',
    totalSecond: '00',
    i: 0,
    songList: [{
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl80MDI2NzgyODI=",
      poster: "https://mrhope.top/icon/nenuyouth.png",
      name: '东师姑娘',
      author: '新媒体中心填词歌曲'
    }, {
      src: "http://link.hhtjim.com/163/33035111.mp3",
      poster: "https://mrhope.top/icon/nenuyouth.png",
      name: '远方有你',
      author: '原创毕业季纪念歌曲'
    }, {
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl81MDQzODM1MjQ=",
      poster: "https://mrhope.top/icon/nenuyouth.png",
      name: '一生有你',
      author: '520女生节礼物'
    }, {
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl81MDQzODEwODg=",
      poster: "https://mrhope.top/icon/nenuyouth.png",
      name: '微微一笑很东师',
      author: '新媒体中心填词歌曲'
    }, {
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl8yNjUxODc1MzI3",
      poster: "https://mrhope.top/icon/nenuyouth.png",
      name: '师德公约',
      author: '2018东北师范大学原创'
    }, ]
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
      i = this.data.i,
      currentSong = this.data.songList[i];
    this.setData({
      songName: currentSong.name,
      songAuthor: currentSong.author,
      cover: currentSong.poster,
      info: a.info,
      nm: a.nm,
      musicPlay: a.music.play,
      mode: mode ? mode : (wx.setStorageSync('playMode', 0), 0)
    });
    if (!a.musicPlay) {
      audioContext = wx.createInnerAudioContext('myMusic');
      audioContext.src = this.data.songList[i].src;
      audioContext.onCanplay(function(e) {
        console.log('Canplay') //调试
        that.setData({
          canplay: true
        });
      });
      audioContext.onPlay(function(e) {
        console.log('duration是' + audioContext.duration); //调试
        let totalSecond = (parseInt(audioContext.duration % 60)).toString();
        that.setData({
          songLength: parseInt(audioContext.duration * 100) / 100,
          totalMinute: parseInt(audioContext.duration / 60).toString(),
          totalSecond: totalSecond.length == 1 ? '0' + totalSecond : totalSecond,
          musicPlay: true
        });
      });
      audioContext.onPause(function(e) {
        that.setData({
          musicPlay: false
        })
      });
      audioContext.onTimeUpdate(function(e) {
        console.log('TimeUpdate,currentTime是' + audioContext.currentTime) //调试
        console.log('TimeUpdate,bufferedTime是' + audioContext.buffered) //调试
        let presentSecond = (parseInt(audioContext.currentTime % 60)).toString();
        that.setData({
          currentTime: parseInt(audioContext.currentTime * 100) / 100,
          presentMinute: parseInt(audioContext.currentTime / 60).toString(),
          presentSecond: presentSecond.length == 1 ? '0' + presentSecond : presentSecond,
          bufferedTime: audioContext.buffered
        });
      });
    } else {
      this.setData({
        canplay: true
      });
    }
  },
  loadCover(e) {
    console.log(e)
    if (e.type == 'load') {
      this.setData({
        coverLoad: true
      })
    }
  },
  play: function() {
    let isPlay = this.data.musicPlay
    if (isPlay) {
      audioContext.pause();
    } else {
      audioContext.play();
    }
    this.setData({
      musicPlay: !isPlay,
    });
    a.music.play = !isPlay;
    console.log('play Func获得duration为' + audioContext.duration) //调试
  },
  drag(e) {
    console.log(e)
    if (e.type == 'changing') {
      audioContext.seek(e.detail.value / 100);
      // audioContext.pause();
      this.setData({
        // musicPlay: false
      })
    } else if (e.type == 'change') {
      console.log(e.detail.value); //调试
      this.setData({
        currentTime: e.detail.value / 100,
        // musicPlay: true
      });
      audioContext.seek(e.detail.value / 100);
      // audioContext.play()
    }
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
  next() {
    let i = this.data.i
    switch (this.data.mode) {
      case 0:
    }
  }
})