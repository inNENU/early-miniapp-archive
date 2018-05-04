var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '学生资助机构' },
      { name: 'h3', text: '学生资助管理中心' },
      { name: 'p', text: '负责全校家庭经济困难学生资助工作的专门机构，为家庭经济困难学生提供全面的财力支持和素质支持。下设资助办公室、贷款办公室、综合办公室三个科室' },
      { name: 'p', text: '（1）资助办公室\n负责全校本科学生资助对象评定、资助项目评审及勤工助学等工作\n办公地点：本部校区北苑餐厅三楼C06室\n电话：0431-85098370 / 0431 - 85098307' },
      { name: 'p', text: '（2）贷款办公室\n负责全校学生国家助学贷款审批、贷后催款、代偿资助、生源地贷款等工作\n办公地点：本部校区北苑餐厅三楼C05室\n电话：0431-85098302 / 0431 - 85098619' },
      { name: 'p', text: '（3）综合办公室\n负责本科生学费减免、困难生教育及学费催缴等工作\n办公地点：本部校区综合办公室703室\n电话：0431-85098085' },
      { name: 'p', text: '（4）净月校区办公地点\n学生活动中心208室\n电话：0431-84536707' },
      { name: 'p', text: '（5）其他联系方式\n传真：0431-85099370；0431-85098302\n邮箱：zzzx@nenu.edu.cn\n网址：http://clzc.nenu.edu.cn' },
      { name: 'h3', text: '学生资助工作组' },
      { name: 'p', text: '学院设有学生资助工作组，由学院党委副书记（副院长）任组长，院团委书记、辅导员任成员。\n学院学生资助工作组负责资助对象评定、国家助学贷款及各类资助项目的初审。' },
      { name: 'h3', text: '' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})