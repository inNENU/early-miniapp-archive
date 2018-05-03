var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [{ name: 'head', title: '分级考试' },
      {
        name: 'p', text: ' 英语分级考试是我校大一新生（除外国语专业）需参加的一个考试，考试时间一般为2个小时，考完后按成绩分班。（开学注意辅导员的相关通知）普通类学生参加普通类大学英语分级测试，根据成绩分为A、B班（A班>B班）；音体美专业学生及少数民族学生参加术科类大学英语分级测试，按成绩分为C、D班。不过就A、B班来说，所用的教材是一样的，教学内容是差不多的。另外，纽瓦克学院的入学考试（Placement Test）的情况和这不大一样。每年考试时间不尽相同，考试难度适中，难度和四级差不多，可能稍微难一点点点点。题目形式也和四级考试形式相似，大致有听力（有填空题）、阅读理解（选择题）、选词填空、英译汉、汉译英、作文等。如果想考好一点的话，可以在假期刷一刷四级题。' }

    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})