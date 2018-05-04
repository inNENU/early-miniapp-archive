var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '测试项目评分表' },
      { name: 'h3', text: ' 体重指数（BMI）评分表' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/83/82/wKjmqll-mTyAYJE2AAASKhWA_kU6623104/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: ' 男生评分表' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/92/A7/wKjmqVl-nYWAZ1CvAADCQ8wv5GI2741369/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: ' 女生评分表' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6F/68/CgpQU1l-nYiAWtT-AADFbb-Z8Fc0110985/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: ' 加分表' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/83/9E/wKjmqll-nmGACcohAAA4LQavD6o9023428/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '注：1.引体向上、一分钟仰卧起坐均为高优指标，学生成绩超过单项评分100分后，以超过的次数所对应的分数进行加分。2.1000米跑、800米跑均为低优指标，学生成绩低于单项评分100分后，以减少的秒数所对应的分数进行加分。' }
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})