var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '认准校区校门' },
      { name: 'p', text: '东师有两个校区，萌新们可以根据录取通知书上写的学院找到相应的校区（新生手册里有些各个学院对应的校区~），报到的时候千万别走错校区啊！！！' },
      { name: 'h3', text: '以下院系或专业位于本部校区' },
      { name: 'p', text: '教育学部、心理学院、文学院、历史文化学院、外国语学院、马克思主义学部、数学与统计学院、物理学院、化学学院、生命科学学院、地理科学学院、环境学院（大一）、体育学院' },
      { name: 'list', content: [{ text: '本部校区校门介绍', url: 'check15' }] },
      { name: 'h3', text: '' },
      { name: 'h3', text: '以下院系或专业位于净月校区' },
      { name: 'p', text: '政法学院、经济学院、商学院、外国语学院、音乐学院（研究生在本部）、美术学院、信息科学与技术学院、传媒科学学院、民族教育学院、东北师范大学罗格斯大学•纽瓦克学院' },
      { name: 'list', content: [{ text: '净月校区校门介绍', url: 'check16' }] },
      { name: 'h3', text: '' },
      { name: 'h3', text: '请注意' },
      { name: 'p', text: '涉及到以下提到的专业的萌新们注意啦，千万要分清自己入学后的校区哦：1.非公费师范师的思想政治教育专业在马克思主义学部，公费师范的思想政治教育专业在政法学院2.环境学院的学生在大一结束后会从本部校区搬到净月校区3.英语系的学生在本部的外国语学院，而日语系、俄语系、商务英语系的学生在净月的外国语学院4.音乐学院的研究生在本部' },
      { name: 'h3', text: '' },
      { name: 'h3', text: '两校区地址' },
      { name: 'p', text: '如果要邮寄东西到学校，或者在淘宝上买东西直接寄到学校的，可以按照下面的地址填写：' },
      { name: 'p', text: '本部校区：\n吉林省长春市南关区南岭街道人民大街5268号 邮编：130022。' },
      { name: 'p', text: '净月校区：\n吉林省长春市净月经济开发区净月大街2555号 邮编：130117' },
    ],
  },
  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },
  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } },
  back() { u.back() },
})