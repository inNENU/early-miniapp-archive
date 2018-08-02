var a = getApp().globalData,
  c = getApp().common,
  audioContext,
  aniData = wx.createAnimation({
    duration: 100,
    timingFunction: 'linear'
  });
Page({
  data: {
    cover: '/image/nenuyouth.png',
    play: false,
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
    let that = this;
    this.setData({
      info: a.info,
      nm: a.nm
    });
    audioContext = wx.createInnerAudioContext('myMusic');
    audioContext.src = this.data.songs[1].src;
    // audioContext.onCanplay(function(e) {
    //   console.log('Canplay')
    //   console.log(audioContext.duration)
    //   setTimeout(function() {
    //     that.setData({
    //       length: audioContext.duration
    //     });
    //   }, 50)
    // })
    // audioContext.onPlay(function(e) {
    //   console.log('play')
    //   console.log(audioContext.duration)
    //   that.setData({
    //     length: audioContext.duration
    //   });
    // })

  },
  play: function() {
    if (this.data.play) {
      audioContext.pause();
      // clearInterval(timer);
      // timer = null;
    } else {
      audioContext.play();
      // timer = setInterval(function() {
      //   that.rotate();
      // }, 50)
    }
    this.setData({
      play: !this.data.play,
      length: audioContext.duration
    })
    console.log('play Func')
    console.log(audioContext.duration)
  },
  cA(e) {
    c.componentAction(e, this)
  },
})