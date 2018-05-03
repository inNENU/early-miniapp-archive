var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '绩点计算方法' },
      { name: 'p', text: '什么是绩点？\n这是个让学霸爱，学渣恨的一个东西。大学独有的事物，是从外国引进的。外国把这东西叫GPA，国内有些学校把这东西叫学分绩，实质上是一回事（就叫绩点得了.....）。不同学校绩点算法是不同的，例如说4.0算法啦，改进4.0算法啦，北大算法啦等等等等。当然东师也有自己的算法。' },
      { name: 'h3', text: '课程学分绩点算法（来源-图书馆打印成绩单系统）' },
      { name: 'p', text: '\n课程学分绩点＝学分×(（考核成绩－60) ÷10＋1）)×难度系数其中难度系数依据课程编码，课程编码200 - 399为较易的课程，难度系数为1，400 - 599为较难的课程，难度系数为1.2。\n课程编码在你登陆教务系统查成绩的时候有。这么一长串，可以看出，一门课的绩点和你的成绩，这门课对应的学分以及这门课的难度系数相关。有人说了，那60分一下算出来不是负值了吗。校会君告诉你没有负值，挂科没有学分也没有绩点。而补考之后无论你打60还是60分以上，都只给你算60（而且成绩系统会有备注：补考）,60以下依旧算挂科。经常在后台看到一些人问校会君打60 +、70 + 还有绩点吗？坊间也流传着75分以下没有绩点这个说法。实质上这都是错误的。只要过60分（包括60分）就有绩点。' },
      { name: 'h3', text: '平均学分绩点（来源 - 图书馆打印成绩单系统）：' },
      { name: 'p', text: 'Σ绩点（所有科目绩点之和）/Σ学分（所有科目学分之和）\n通俗点说就是所修课程绩点之和除以所修课程学分之和（有的学院会不算选修课）得出的一个数字，这个数字叫平均学分绩。这个数字作用非常之大，期末的排名依据就是它，评奖学金依旧也是它甚至有些学院保研依据更是它（有些院系不算选修课）。这东西在哪里能查呢？两个途径：第一，开学到辅导员那里查；第二，到图书馆自助打印机那里打印成绩单，上面有。补充一下，我校绩点是5.0制。当然由于难度系数这个神奇的存在会有一些极少理科学院的人绩点超过5.....另外，平均学分绩点是和你的学位证挂钩的。学校规定平均学分绩点低于2.0者只有毕业证没有学位证。所以，60分万岁只是一个梦.....你要真都打60分你就呵呵了。所以大二、大三的同学们，如果截止到现在你的成绩还都是60多分的话.....你就要小心了......' },
      { name: 'h3', text: '与学分的区别：' },
      { name: 'p', text: '只要你期末及格（60分）就能获得，不存在说一门课获得多或者少的问题。如果一门课3学分，你打60分得3学分，你打100分也是得3学分。不过，一旦这门课挂科，你就没有这门课的学分了。补考过了，获得学分。补考还没过，那就要重修了.....究竟你学的专业需要多少学分课程计划上面有，建议你看看。每年选课的时候要特别注意，看看自己的课少不少。尤其那些师资课啥的涉及到专题类的很乱，一定一定要注意。每年毕业审核的时候都有些倒霉宝宝学分没够....所以......学分达到要求就可以获得毕业证了，但你不一定拿到学位证。' }
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})