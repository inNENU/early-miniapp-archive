var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '四六级' },
      { tag: 'p', text: '笔试在每年每年6月和12月各一次；口试在笔试前进行。每年5月和11月各一次。        【英语四级】每年6月和12月第三个星期六09：00-11：20.全体在籍本科生和在籍研究生。（即大一学生可以参加12月份的考试）【英语六级】每年6月和12月第三个星期六15：00-17：25.具有全国大学英语四级证书或全国大学英语四级考试成绩425分以上（含425分）的在籍本科生和在籍研究生。' },
      { tag: 'h3', text: ' 考试内容' },
      { tag: 'img', src: 'https://pic.kuaizhan.com/g1/M00/E7/C4/CgpQU1mUa7qAMOeXAAB31HZnEVY6156619/imageView/v1/thumbnail/640x0' },
      { tag: 'h3', text: ' 评分标准' },
      { tag: 'p', text: 'CET-SET 主考在评分时使用以下标准：a. 准确性 指考生的语音、语调以及所使用的语法和词汇的准确程度b.语言范围 指考生使用的词汇和语法结构的复杂程度和范围c.话语的长短 指考生对整个考试中的交际所作的贡献、讲话的多少d.连贯性 指考生有能力进行较长时间的、语言连贯的发言e.灵活性 指考生应付不同情景和话题的能力f.适切性 指考生根据不同场合选用适当确切的语言的能力' },
      { tag: 'h3', text: ' 报名' },
      { tag: 'p', text: ' 东北师范大学考点只接收本校在籍学生的报名。' },
      { tag: 'h3', text: ' 相关查询' },
      { tag: 'p', text: ' 可以通过在“东师青年”微信公众号回复“四六级”可以查到相应的考试时间、报名入口、准考证号，以及成绩哦！！！' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})