var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [{
      name: 'head', title: '测试成绩说明' },
    { name: 'h3', text: ' 体重指数' },
    { name: 'p', text: '体重指数小于、等于28者，其体质测试及格分为60分；体重指数大于28者，体重指数每增加1其及格标准降低2分（如：体重指数为29的学生，其体质测试及格分为58分）。' }, 
    { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/D5/wKjmqll-A6iANaUVAABOGXLuVlI3814233/imageView/v1/thumbnail/640x0' },
    {
      name: 'h3', text: ' 毕业时成绩的评定' },
    { name: 'p', text: '学生毕业时的成绩和等级，按毕业当年学年总分的50%与其他学年总分平均得分的50%之和进行评定。' }, 
    {
      name: 'h3', text: ' 体测未通过的后果' },
    {
      name: 'p', text: '如果你体测挂了：学生秋季学期体质测试不及格的，则秋季学期所修大学体育课程（体育1、体育2、体育3、体育4）不能获得及格分数。\n如果你体测补考也挂了：秋季学期体质测试不及格的学生春季学期再次进行体质测试仍不及格的，则春季学期所修大学体育课程（体育1、体育2、体育3、体育4）不能获得及格分数。\n    意思就是你那个学期的体测/补考不及格，那么无论你体育课的成绩多高，你的体育成绩还是挂的！！！' }, 

    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})