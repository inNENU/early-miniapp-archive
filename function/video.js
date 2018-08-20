var P = require('../utils/wxpage'),
  S = require('../utils/setPage'),
  a = getApp().globalData;

P('video', {
  data: {},
  onNavigate(res) {
    wx.loadFontFace({
      family: 'FZSSJW',
      source: 'url("https://mrhope.top/ttf/FZSSJW.ttf")',
      complete(res) {
        console.log('宋体字体' + res.status); //调试
      }
    });
    let id = res.query.id ? res.id : 0,
      videoList = wx.getStorageSync('funcResList1');
    this.data.info = a.info, this.data.nm = a.nm, this.data.id = id;
    if (videoList) {
      this.data.videoList = videoList, this.data.videoName = videoList[id].name, this.data.videoAuthor = videoList[id].author, this.data.src = videoList[id].src, this.set = true;
    } else {
      S.request('funcResList/funcResList1', function(data, indicator) {
        indicator.data.videoList = data, indicator.data.videoName = data[id].name, indicator.data.videoAuthor = data[id].author, indicator.data.src = data[id].src, indicator.set = true;
      }, this)
    }
  },
  onLoad(e) {
    if (!this.set) {
      let id = e.id ? e.id : 0,
        videoList = wx.getStorageSync('funcResList1');
      this.setData({
        info: a.info,
        nm: a.nm,
        id: id
      })
      if (videoList) {
        this.setData({
          videoList: videoList,
          videoName: videoList[id].name,
          videoAuthor: videoList[id].author,
          src: videoList[id].src,
        });
      } else {
        S.request('funcResList/funcResList1', function(data, indicator) {
          indicator.setData({
            videoList: data,
            videoName: data[id].name,
            videoAuthor: data[id].author,
            src: data[id].src,
          });
        }, this)
      }
    }
  },
  play(e) {
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