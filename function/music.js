// var that;
// var isPlay;
// var audioContext;
// var animationContext;
// var n;
// var timer;
// var index;
// var obj = {
//   playMusic: function playMusic(animationContext) {
//     animationContext = wx.createAnimation({
//       duration: 100,
//       timingFunction: 'linear'
//     })
//     return animationContext
//   }
// }
// var arr = ['../../image/shunxu.png', '../../image/xunhuan.png', '../../image/suiji.png']
// var i = 0;

var c = getApp().common,
  a = getApp().globalData;
Page({
  data: {
    page: [{
      tag: 'head',
      grey: true,
      title: '东师之声'
    }, {
      tag: 'audio',
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl80MDI2NzgyODI=",
      poster: "https://mrhope.top/icon/nenuyouth.png",
      name: '东师姑娘',
      author: '新媒体中心填词歌曲'
    }, {
      tag: 'audio',
      src: "http://link.hhtjim.com/163/33035111.mp3",
      poster: "https://mrhope.top/icon/nenuyouth.png",
      name: '远方有你',
      author: '原创毕业季纪念歌曲'
    }, {
      tag: 'audio',
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl81MDQzODM1MjQ=",
      poster: "https://mrhope.top/icon/nenuyouth.png",
      name: '一生有你',
      author: '520女生节礼物'
    }, {
      tag: 'audio',
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl81MDQzODEwODg=",
      poster: "https://mrhope.top/icon/nenuyouth.png",
      name: '微微一笑很东师',
      author: '新媒体中心填词歌曲'
    }, {
      tag: 'audio',
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl8yNjUxODc1MzI3",
      poster: "https://mrhope.top/icon/nenuyouth.png",
      name: '师德公约',
      author: '2018东北师范大学原创'
    }, ],
    // percent: 0,
    // musicUrl: 0,
    // musicName: 0,
    // bgImage: 0,
    // playOrPause: '../../image/play.png',
    // animationData: {},
    // playTypeUrl: arr[i],
    // src2: '//m64.xiami.net/169/7169/2102961712/1798014441_1511775476092.m4a?auth_key=1533438000-0-0-7f0dc5028b1db5bff7b497864a14e1ca',
    // poster2: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532665435701&di=fd3825403a9d198f5e5d5ecc2e6b1edc&imgtype=0&src=http%3A%2F%2Fp1.ssl.qhmsg.com%2Ft0116d3339166e62210.jpg',
    // poster3: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=269975264,2870013977&fm=58&bpow=426&bpoh=365',
    // src3: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl80MDI2NzgyODI=",
    // src4: 'http://link.hhtjim.com/163/33035111.mp3',
    // poster4: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532665435701&di=fd3825403a9d198f5e5d5ecc2e6b1edc&imgtype=0&src=http%3A%2F%2Fp1.ssl.qhmsg.com%2Ft0116d3339166e62210.jpg',
    // src5: 'https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl81MDQzODM1MjQ=',
    // poster5: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=269975264,2870013977&fm=58&bpow=426&bpoh=365',
    // src6: 'https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl81MDQzODEwODg=',
    // poster6: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=269975264,2870013977&fm=58&bpow=426&bpoh=365',
    // src7: 'https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl8yNjUxODc1MzI3',
    // poster7: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532665435701&di=fd3825403a9d198f5e5d5ecc2e6b1edc&imgtype=0&src=http%3A%2F%2Fp1.ssl.qhmsg.com%2Ft0116d3339166e62210.jpg'
  },
  onLoad(e) {
    c.setPage(this.data.page, this, a, e);
    // isPlay = false;
    // n = 0;
    // that = this;
    // animationContext = obj.playMusic(animationContext)
    // audioContext = wx.createAudioContext('myMusic')
    // that.getSongFromNet();
    // clearInterval(timer);
  },
  onPageScroll(e) {
    c.nav(e, this)
  },
  cA(e) {
    c.componentAction(e, this)
  },
  onShareAppMessage() {
    return {
      title: this.data.page[0].title,
			path: '/function/music?From=主页&share=true'
    }
  },
  redirect() {
    wx.switchTab({
      url: '/pages/function'
    })
  },
  // play: function() {
  //   //暂停
  //   if (isPlay) {
  //     audioContext.pause();
  //     that.setData({
  //       playOrPause: '../../image/play.png'
  //     })
  //     isPlay = false;
  //     clearInterval(timer);
  //     timer = null;
  //   } else {
  //     //播放
  //     audioContext.play();
  //     that.setData({
  //       playOrPause: '../../image/pause.png'
  //     })
  //     timer = setInterval(function() {
  //       that.rotate();
  //     }, 50)
  //     isPlay = true;
  //   }
  // },
  // rotate: function() {
  //   animationContext.rotate(1 * n++);
  //   animationContext.step();
  //   that.setData({
  //     animationData: animationContext.export()
  //   })
  // },
  // last: function() {
  //   if (i == 0) {
  //     if (index > 0) {
  //       songId = songList[--index].song_id;
  //     } else {
  //       songId = songList[index].song_id;
  //     }
  //   } else if (i == 2) {
  //     index = parseInt(Math.random() * 20)
  //     songId = songList[index].song_id;
  //   } else if (i == 1) {
  //     songId = songList[index].song_id;
  //   }
  //   animationContext = obj.playMusic(animationContext)
  //   audioContext = wx.createAudioContext('myMusic')
  //   that.play();
  //   that.getSongFromNet();
  //   clearInterval(timer);
  // },
  // next: function() {
  //   if (i == 0) {
  //     if (index < songList.length - 1) {
  //       songId = songList[++index].song_id;
  //     } else {
  //       songId = songList[index].song_id;
  //     }
  //   } else if (i == 2) {
  //     console.log('这时候i=' + i);
  //     index = parseInt(Math.random() * 20);
  //     songId = songList[index].song_id;
  //   } else if (i == 1) {
  //     songId = songList[index].song_id;
  //   }
  //   animationContext = obj.playMusic(animationContext)
  //   audioContext = wx.createAudioContext('myMusic')
  //   that.play();
  //   that.getSongFromNet();
  //   clearInterval(timer);
  // },
  // timeUpdate: function(e) {
  //   if (e.detail.currentTime == e.detail.duration) {
  //     that.next();
  //   }
  //   var mypercent = e.detail.currentTime / e.detail.duration * 100;
  //   that.setData({
  //     percent: mypercent
  //   })
  // },
  // playType: function(e) {
  //   i++;
  //   if (i == 3) {
  //     i = 0;
  //   }
  //   this.setData({
  //     playTypeUrl: arr[i]
  //   })
  //   if (i == 0) {
  //     wx.showToast({
  //       title: '现在是循环播放',
  //     })
  //   } else if (i == 1) {
  //     wx.showToast({
  //       title: '现在是单曲循环',
  //     })
  //   } else {
  //     wx.showToast({
  //       title: '现在是随机播放',
  //     })
  //   }


  // },
  // getSongFromNet: function() {
  //   wx.request({
  //     url: "https://res.wx.qq.com/voice/getvoice?mediaid=MzA5MTQ4NjUzMl80MDI2NzgyODI=" + songId,
  //     success: function(e) {
  //       console.log(e)
  //       that.setData({
  //         musicUrl: e.data.bitrate.file_link,
  //         bgImage: e.data.songinfo.pic_big,
  //         percent: 0,
  //         musicName: e.data.songinfo.title
  //       })
  //       audioContext.setSrc(e.data.bitrate.file_link);
  //       that.play();
  //     }
  //   })
  // }

})