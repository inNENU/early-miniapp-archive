var a = getApp().globalData,
  c = getApp().common,
  audioContext;
Page({
  data: {
    cover: '/image/nenuyouth.png',
    musicPlay: false,
    canplay: false,
    currentTime: 0,
    songLength: 1,
    songs: [{
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
      i = 3,
      currentSong = this.data.songs[i];
    this.setData({
      songName: currentSong.name,
      songAuthor: currentSong.author,
      cover: currentSong.poster,
      info: a.info,
      nm: a.nm,
      musicPlay: a.musicPlay ? true : false
    });
    if (!a.musicPlay) {
      audioContext = wx.createInnerAudioContext('myMusic');
      audioContext.src = this.data.songs[i].src;
      audioContext.onCanplay(function(e) {
        console.log('Canplay') //调试
        that.setData({
          canplay: true
        });
      });
      audioContext.onTimeUpdate(function(e) {
        console.log()
        console.log('TimeUpdate,currentTime是' + audioContext.currentTime) //调试
        that.setData({
          currentTime: parseInt(audioContext.currentTime * 100) / 100
        });
      });
    } else {
      this.setData({
        canplay: true
      });
    }
    audioContext.onPlay(function(e) {
      console.log('duration是' + audioContext.duration) //调试
      that.setData({
        songLength: parseInt(audioContext.duration * 100) / 100
      });
    })

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
      // length: audioContext.duration
    });
    a.musicPlay = !isPlay;
    console.log('play Func获得duration为' + audioContext.duration) //调试
  },
  drag(e) {
    console.log(e)
    if (e.type == 'changing') {
      audioContext.pause();
      this.setData({
        musicPlay: false
      })
    } else if (e.type == 'change') {
      console.log(e.detail.value); //调试
      this.setData({
        currentTime: e.detail.value / 100,
        musicPlay: true
      });
      audioContext.seek(e.detail.value / 100);
      audioContext.play()
    }
  },
  cA(e) {
    c.componentAction(e, this)
  },
})