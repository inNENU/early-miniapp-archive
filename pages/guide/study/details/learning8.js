var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { tag: 'head', title: '发展方向课程' },
      { tag: 'h3', text: ' 发展方向课程（不低于15学分）' },
      { tag: 'p', text: '发展方向课程是为尊重学生的个人选择、支持学生的个性化发展，并体现分类培养目标的任意选修课程模块。发展方向课程原则上由学生根据个人兴趣和未来发展需要，在全校开设的所有课程中自主选择。各专业可以根据本专业的分类培养目标与要求对学生选择发展方向课程提供指导与建议。' },
      { tag: 'p', text: '有意从事教师职业的各专业学生可选择教师教育课程作为发展方向课。公费师范专业学生须选择教师教育课程作为发展方向课。' }
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})