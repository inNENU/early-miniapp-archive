var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '净月校区' },
      { name: 'h3', text: '净月校区公寓分布' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/82/B2/wKjmqll93pWAaqvCAAQbHyLV_ko9159655/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '净月的公寓大多集中在图书馆、食堂的后面。由于楼层不太高，没有电梯。' },
      { name: 'h4', text: '春华公寓' },
      { name: 'p', text: '女生宿舍楼，分A、B两栋共6层，入住信息技术、外国语（除英语系外其它专业）、传媒学院学生。' },
      { name: 'h4', text: '夏华公寓' },
      { name: 'p', text: '共6层。A栋为男生宿舍楼，B栋为女生宿舍楼，入住信息科学与技术、音乐、政法学院学生。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/46/wKjmqll9eqOABFZDAAEMTXxnJU81957452/imageView/v1/thumbnail/640x0', text: '▲图为'  },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/46/wKjmqll9epWAPec_AACsw24QesA6899428/imageView/v1/thumbnail/640x0', text: '▲图为' },
      { name: 'h4', text: '秋华公寓' },
      { name: 'p', text: '女生宿舍楼，分A、B两栋共6层，入住经济、音乐、商学院学生。' },
      { name: 'h4', text: '日华公寓' },
      { name: 'p', text: '女生宿舍楼，分A、B两栋共6层，A栋入住美术学院学生，B栋入住信息科学与技术学院、民族学院学生。' },
      { name: 'h4', text: '光华公寓' },
      { name: 'p', text: '男生宿舍楼，分A、B两栋共6层，A栋入住经济、传媒、信息科学与技术、外语学院（除英语系外其它专业学生）学生；B栋入住商学院、美术学院学生。另外还住有民族学院学生。' },
      { name: 'h4', text: '天华公寓 地华公寓' },
      { name: 'p', text: '5层，天华为男生宿舍，地华为女生宿舍，入住罗格斯纽瓦克学院学生。' },
      { name: 'h4', text: '' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})