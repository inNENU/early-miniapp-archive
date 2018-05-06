var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '测试项目及权重' },
      { tag: 'p', text: ' 体测成绩+标准分（100分）+附加分（20分），满分为120分。标准分由各单项指标得分与权重乘积之和组成，满分为100分。附加分根据实测成绩确定，即对成绩超过100分的加分指标进行加分，满分为20分；加分指标为男生引体向上和1000米跑，女生1分钟仰卧起坐和800米跑，各指标加分幅度均为10分。注：体重指数（BMI）=体重（千克）/身高的平方（平方米）。具体如下：' },
      { tag: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/D2/wKjmqll-AJ-AQjIiAABs3svCDqo6922899/imageView/v1/thumbnail/640x0' }
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})