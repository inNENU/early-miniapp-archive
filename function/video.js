var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData;

P('video', {
  data: {
    src: 'http://www.nenu.edu.cn/_upload/article/videos/ff/9a/daa2444c4b169d11c30408b8415f/088f791a-fbaa-4af4-a092-4734c584d3ae_B.mp4',
    videoName: '远方有你 不说再见',
    videoAuthor: '东北师范大学党委学生工作部',
    videoList: [{
      current: true,
      name: '远方有你 不说再见',
      author: '东北师范大学党委学生工作部',
      src: 'http://www.nenu.edu.cn/_upload/article/videos/ff/9a/daa2444c4b169d11c30408b8415f/088f791a-fbaa-4af4-a092-4734c584d3ae_B.mp4',
    }, {
      name: '师德公约',
      author: '东北师范大学党委学生工作部',
      src: 'http://www.nenu.edu.cn/_upload/article/videos/0c/1d/2708df2a430cb95d383b6a5a2a3c/c264ecf0-67ff-4342-85f3-eb90bb6e82db_B.mp4',
    }, {
      name: '东北师范大学校歌',
      author: '作词：公木 作曲：吕远',
      src: 'http://www.nenu.edu.cn/_upload/article/videos/2c/dd/21695d4f46f0842e759a0a6ed3f0/7f22016c-0da0-4ef0-9749-50d87bd00b6f.mp4',
    }]
  },
  onLoad(e) {
    wx.loadFontFace({
      family: 'FZSSJW',
      source: 'url("https://mrhope.top/ttf/FZSSJW.ttf")',
      complete(res) {
        console.log('宋体字体' + res.status); //调试
      }
    });
    this.setData({
      info: a.info,
      nm: a.nm,
    });
  },
  play(e) {
    console.log(e)
    let id = e.currentTarget.id,
      videoList = this.data.videoList;
    videoList.forEach((x, y) => {
      x.current = y == id ? true : false;
    })
    videoList[id].current = true;
    this.setData({
      videoName: videoList[id].name,
      videoAuthor: videoList[id].author,
      src: videoList[id].src,
      videoList: videoList
    });
  },
  cA(e) {
    S.component(e, this)
  },
})