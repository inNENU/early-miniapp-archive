var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '申请免测/缓测的条件及程序' },
      { name: 'h3', text: ' 免测' },
      { name: 'p', text: '申请免测的条件及所需材料\n1.残疾学生。残疾证原件及复印件。\n2.因病长期不能从事剧烈运动的。学校指定的三甲医院（吉林大学第一、二、三附属医院，吉林省人民医院、吉林省中医药大学附属医院、吉林省肿瘤医院、长春市中心医院、长春市中医院）提供的相关诊断材料。（1）门诊病历（2）诊断书（3）相关疾病检查结果报告单（理化检验报告单、X线报告单、CT报告单、核磁报告单等）3.校外交流一年及以上的学生可申请交流当年度免测。公派校外交流学习证明\n申请免测的程序\n学生填写免测申请表并附相关材料交到体育学院大学公共体育教研室地点：大学公共体育教研室（北苑体育馆3楼）。联系电话：85099523。' },
      { name: 'h3', text: ' 缓测' },
      { name: 'p', text: '1、测试期间因病不能参加测试的。学校指定的三甲医院（吉林大学第一、二、三附属医院，吉林省人民医院、吉林省中医药大学附属医院、吉林省肿瘤医院、长春市中心医院、长春市中医院）提供的相关诊断材料。（1）门诊病历。（2）诊断书（3）相关疾病检查结果报告单（理化检验报告单、X线报告单、CT报告单、核磁报告单等）。2、测试期间在校外交流或参加教学实践活动的。公派校外交流或参加教学实践活动证明材料。\n申请缓测的程序\n学生填写缓测申请表并附相关材料交到体育学院大学公共体育教研室。地点：大学公共体育教研室（北苑体育馆3楼）。联系电话：85099523。' }
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})