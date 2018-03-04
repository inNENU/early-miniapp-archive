var u = require('../../../../utils/util.js');
const a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'nav', navtitle: '本部校区', navtext: '寝室' },
      { name: 'head', text: '本部校区' },
      { name: 'h3', text: '寝室分布' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/91/36/wKjmqVl9VlKAfnRcAAN9jZomx1o9263272/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '图片右上角从右往左依次为三舍A、B、C、D座，ABC住本科生，D为留学生公寓。作为高层建筑，三舍有电梯。' },
      { name: 'h3', text: '三舍A座' },
      { name: 'p', text: '楼高15层，为女生宿舍楼。入住物理、文学、化学学院，环境学院(大一)学生，外语学院英语系(包括公费师范生)。' },
      { name: 'h3', text: '三舍B座' },
      { name: 'p', text: '楼高14层，本部唯一的本科生男生寝室楼。入住、物理、文学、化学、地理、生科、数学、教育、马部、历史、心理学院学生，环境学院大一学生、外语学院英语系(包括公费师范生)。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/6D/CgpQVFl9VwaACA9TAAMuiVK7duU4760298/imageView/v1/thumbnail/640x0' },
      { name: 'n', text: '▲图为三舍B座' },
      { name: 'h3', text: '三舍C座' },
      { name: 'p', text: '楼高21层，为女生寝室楼，本部校区最高建筑。入住地理、生科、数学、环境、教育、心理、历史学院学生，马克思主义学部学生。' },
      { name: 'h3', text: '体育公寓' },
      { name: 'p', text: '共6层，中间分隔，北半侧为男生宿舍，南半侧为女生宿舍，入住体育学院学生。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6D/F8/CgpQU1l9V5aAf12uAADLwh0Vmu05345136/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '宿舍分布就能代表男女比例了，萌新们感受一下~' },
      { name: 'h3', text: '' },
    ],
  },
  onLoad() { let page = u.sP(this.data.page, a); this.setData({ T: a.T, nm: a.nm, page: page }) },
  onPageScroll(e) {
    console.log('onPageScroll' + e.scrollTop)
    let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) }
  },
  // a(e) {
  //   let pos = e.changedTouches[0].pageY - e.changedTouches[0].clientY
  //   console.log(pos)
  //   if (pos < 52) {
  //     if (pos < 30) { wx.pageScrollTo({ scrollTop: 0, duration: 200 }) }
  //     else { wx.pageScrollTo({ scrollTop: 52, duration: 200 }) }
  //   }
  // },
  back() { u.back() },
})
// Page({

//   data: {
//     imagemode: app.globalData.imagemode,
//     dorm4: "https://pic.kuaizhan.com/g2/M01/82/B2/wKjmqll93pWAaqvCAAQbHyLV_ko9159655/imageView/v1/thumbnail/640x0",
//     dorm5: "https://pic.kuaizhan.com/g2/M00/82/46/wKjmqll9eqOABFZDAAEMTXxnJU81957452/imageView/v1/thumbnail/640x0",
//     dorm6: "https://pic.kuaizhan.com/g2/M00/82/46/wKjmqll9epWAPec_AACsw24QesA6899428/imageView/v1/thumbnail/640x0",
//   },

// })
