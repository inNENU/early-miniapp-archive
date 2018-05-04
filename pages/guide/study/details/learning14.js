var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [{ name: 'head', title: '体测时间' }, { name: 'p', text: '每人每年秋季学期都要进行一次体质测试，体质测试不达标（大一大二60分，之后只要求50分）的，不能取得评优、评奖及毕业资格。萌新们，你们九月是有体测的，加油啊！！！' },
    { name: 'h3', text: '大一、大二、大三学生' },
    { name: 'p', text: '大一、大二、大三的学生每年秋季学期（一般安排在9月份）参加测试。秋季测试不合格的，可在每年的春季学期（一般安排在4月末5月初）再测试一次。' },
    { name: 'h3', text: ' 大四学年' },
    { name: 'p', text: '大四学年的测试安排在大三学年的春季学期（一般安排在4月末5月初）进行，测试不合格的，可在大四学年的春季学期（一般安排在4月末5月初）再测试一次。' },
    { name: 'h3', text: ' 相关要求' },
    { name: 'p', text: '穿运动服、运动鞋，带学生证、一卡通或身份证；申请免予执行《标准》的学生的诊断结果须存入学生个人体检档案, 体育课只能选修体育保健班的课程' }
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})