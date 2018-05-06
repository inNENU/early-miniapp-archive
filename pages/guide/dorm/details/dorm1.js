var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '本部校区', desc: '本部校区寝室介绍' },
      { tag: 'h3', text: '本部校区寝室分布' },
      { tag: 'img', src: 'https://pic.kuaizhan.com/g1/M00/91/36/wKjmqVl9VlKAfnRcAAN9jZomx1o9263272/imageView/v1/thumbnail/640x0' },
      { tag: 'p', head: false, text: '图片右上角从右往左依次为三舍A、B、C、D座，ABC住本科生，D为留学生公寓。作为高层建筑，三舍有电梯。' },
      { tag: 'p', head: '三舍A座', text: '楼高15层，为女生宿舍楼。入住物理、文学、化学学院，环境学院(大一)学生，外语学院英语系(包括公费师范生)。' },
      { tag: 'p', head: '三舍B座', text: '楼高14层，本部唯一的本科生男生寝室楼。入住、物理、文学、化学、地理、生科、数学、教育、马部、历史、心理学院学生，环境学院大一学生、外语学院英语系(包括公费师范生)。' },
      { tag: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/6D/CgpQVFl9VwaACA9TAAMuiVK7duU4760298/imageView/v1/thumbnail/640x0', text: '图为三舍B座' },
      { tag: 'p', head: '三舍C座', text: '楼高21层，为女生寝室楼，本部校区最高建筑。入住地理、生科、数学、环境、教育、心理、历史学院学生，马克思主义学部学生。' },
      { tag: 'p', head: '体育公寓', text: '共6层，中间分隔，北半侧为男生宿舍，南半侧为女生宿舍，入住体育学院学生。' },
      { tag: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6D/F8/CgpQU1l9V5aAf12uAADLwh0Vmu05345136/imageView/v1/thumbnail/640x0', text: '图为体育公寓' },
      { tag: 'p', text: '宿舍分布就能代表男女比例了，萌新们感受一下~' },
      { tag: 'foot' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})