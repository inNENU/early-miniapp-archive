var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [{ name: 'head', title: '选课流程' },
    { name: 'h3', text: ' 提示：新生选课为注课，不用抢课' },
    { name: 'img', src:"https://pic.kuaizhan.com/g2/M00/82/53/wKjmqll9h2SASNa9AAAcfTt2-485597655/imageView/v1/thumbnail/640x0"},
    { name: 'h3', text: '第一阶段：预选（系统抽签决定）' },
    {
      name: 'p', text: '本阶段选课不分时间先后，对所有课程实行不限人数选课。每个学生在同一时间段可以选择三门课程。对选课超过容量人数的进行抽签确定，学生必须在抽签结束后查看抽签结果，确定所选课程是否被抽中。预选结束后，系统对选课人数已超过选课容量限制的课程根据选课志愿及选中率进行计算机随机抽签。抽签优先级为：选课志愿（1、2、3），授课对象（在授课对象内优先），年级（高年级优先）；抽签课程顺序为：通识教育选修课，通识教育必修课，师资教育选修课，师资教育必修课，专业教育选修课，专业教育必修课。之后公布预选抽签结果。学生可登录选课系统，对预选抽签结果进行查看。届时将有学生被选出超过容量的课堂，此类学生须在正选阶段重新选课。' },
    { name: 'h3', text: ' 第二阶段：正选（先来先得，主要看运气吧）' },
    {
      name: 'p', text: '正选分校区分时段进行本部净月时间不同(注意不要看错），在预选未落实课程的学生须在本阶段重新选课。本阶段所有课程限定容量，按照先来先得的原则进行。本阶段结束后，学生需打印或记录选课课表，开学按课表上课。另外，除因专业特点需要小班教学的课程（外语类、体育类、艺术类课程以及实验课分组）外，凡不足20人的专业课、不足50人的非专业课程，原则上不能开课。取消课堂的学生，可在退补选阶段，再行选课。' },
    { name: 'h3', text: ' 第三阶段：退补选(先来先得，主要看运气吧)'
    },

    { name: 'p', text:'正式开课一周后进行。所有课程限定容量，按照先来先得的原则进行。正选后被取消课堂的同学须选择和本人上课时间一致的平行课堂。本阶段为最终课程的决定阶段，是学生们选择最适合自己的课程的阶段，本阶段选课结束后，学生需打印或记录选课课表，并严格按课表上课。任课教师须重新打印上课点名册。' }

    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})