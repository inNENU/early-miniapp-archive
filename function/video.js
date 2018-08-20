var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData;

P('video', {
  data: {
    videoList: [{
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
  onNavigate(res) {
    wx.loadFontFace({
      family: 'FZSSJW',
      source: 'url("https://mrhope.top/ttf/FZSSJW.ttf")',
      complete(res) {
        console.log('宋体字体' + res.status); //调试
      }
    });
    let id = e.query.id ? e.id : 0,
      videoList = wx.getStorageSync('funcResList1');
    if (videoList) {
      this.data({
        info: a.info,
        nm: a.nm,
        id: id,
        videoList: videoList,
        videoName: videoList[id].name,
        videoAuthor: videoList[id].author,
        src: videoList[id].src,
      });
      this.set = true;
    } else {
      S.request('funcResList/funcResList1', function(data, indicator) {
        indicator.data({
          videoList: data,
          videoName: data[id].name,
          videoAuthor: data[id].author,
          src: data[id].src,
        });
        indicator.set = true;
      }, this)
    }
  },
  onLoad(e) {
    if (!this.set) {
      let id = e.id ? e.id : 0,
        videoList = this.data.videoList;
      this.setData({
        info: a.info,
        nm: a.nm,
        id: id,
        videoName: videoList[id].name,
        videoAuthor: videoList[id].author,
        src: videoList[id].src,
      });
      let videoList = wx.getStorageSync('funcResList1');
      if (videoList) {
        this.setData({
          videoList: videoList
        })
      } else {
        S.request('funcResList/funcResList1', function(data, indicator) {
          indicator.setData({
            videoList: data
          })
        }, this)
      }
    }
  },
  play(e) {
    console.log(e)
    let id = e.currentTarget.id,
      videoList = this.data.videoList;
    this.setData({
      videoName: videoList[id].name,
      videoAuthor: videoList[id].author,
      src: videoList[id].src,
      id: id
    });
  },
  cA(e) {
    S.component(e, this)
  },
})