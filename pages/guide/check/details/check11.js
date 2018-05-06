var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'head', title: '绿色通道' },
      { name: 'p', text: '家庭经济困难学生入学时，如果不能正常缴纳学费和住宿费，可以通过“绿色通道”，先入学、后交费。入学后，学校会通过各种资助措施帮助你解决经济困难。免师也可以申请；只在报名阶段受理，过期不候，要申请请注意时间！' },
      { name: 'h3', text: '申请流程' },
      { name: 'p', text: '1.学生在学院（部）报到处提出申请，出示《高等学校学生及家庭情况调查表》（在《高等学校学生资助政策简介》里）等证明材料。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/C9/EB/CgpQVFmSd3uAIKVUAACh_KZJNlM1972197/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '注：《高等学校学生及家庭情况调查表》是学生在申请家庭经济困难认定和申请校园地国家助学贷款时必须提交的证明材料。请学生如实填写该表，到家庭所在地的乡（镇）或街道民政部门核实、盖章。部分乡（镇）或街道民政部门如无专用公章，可由政府代章。' },
      {
        name: 'p', text: '2.新生辅导员全面了解学生困难情况，帮助其选择合适的“绿色通道”资助项目，指导学生填写申请表。资助项目种类：爱心礼包（书包、笔记本、笔、U盘、洗发水、励志书籍等各类学习生活用品）、爱心餐券（100元餐费补助）、行李卡（家庭经济特别困难的学生可凭卡到行李发放处领取行李一套）、健康护航补助（对家庭经济特别困难的学生发放保险卡，用于购买个人意外伤害保险）、临时困难补助（对于因突发情况出现的临时经济困难学生实施补助）、灾区专项补助（今年部分地区遭受地震、台风、水灾等严重自然灾害，特为家庭受灾严重学生发放灾区专项补助，补助金额200至1000元不等） 3.学院(部）党委副书记审核、签字4.学生持申请表到学校设立的“绿色通道”办理手续注：爱心超市本部：三舍C一楼； 净月：光华公寓一楼' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/93/16/wKjmqVl-wKKAQEpIAACn3jju4-s8901374/imageView/v1/thumbnail/640x0' },


],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})