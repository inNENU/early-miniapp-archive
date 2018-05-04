var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '特殊说明' },
      { name: 'h3', text: '特殊说明' },
      { name: 'p', head: false, text: '1．国家励志奖学金由资助中心评定，需为学校确定的资助对象中品学兼优的学生。其余奖学金由学生处评定。' },
      { name: 'p', text: '2．学年内学年奖学金不可兼得，社会奖学金不可兼得，学生可根据自身情况斟酌申报。(例如在社会奖学金中，评选上宝钢奖学金后则不可再参与明德奖学金与叶圣陶奖学金评选)。' },
      { name: 'p', text: '3．宝钢优秀学生奖每年人数不定，通过综合数据决定。2016年，宝钢优秀学生奖全校共评选5名，本科生评选4人(含宝钢优秀学生特等奖提名1人)，研究生评选1人，奖励金额为10000元／人。宝钢优秀学生特等奖提名评选出后需参与宝钢基金会评定，评定后可获得宝钢优秀学生特等奖奖金20000元。' },
      { name: 'p', text: '4．明德奖学金从在校免费师范本科学生中评选，(每年评选以每学年上学期成绩为参评成绩)。原则上，参评者成绩须在当年度专业排名前20%。获得明德奖学金的同学自动成为明德社成员，参与组织相关特色活动。明德社于2016年开始设立明德助学金，倡议每位成员捐赠20元用于资助学校贫困学生，以及为学习成绩在后20%的学生开展培训活动等。' },
      { name: 'p', text: '5．叶圣陶奖学金从我校在籍的全日制免费师范生(不含大一学生)中评选，当年度参评成绩在本专业排名前20%(每年评选以上一年成绩为参评成绩)。' },
      { name: 'p', text: '6．学年奖学金每年评选两次，在6月份针对毕业生评选。' },
      { name: 'p', text: '7．有以下情况者，原则上不能参加各项评奖评优:\n  (1)本学年受处分的学生；\n  (2)恶意欠交学费的学生；\n  (3)来我校学习的交流生；\n  (4)评奖学年出现挂科的学生(不含单项奖学金)' },
      { name: 'p', text: '8．优秀学生从获得国家奖学金、校长奖学金、一等奖学金的学生中产生。' },
      { name: 'p', text: '9．原则上单项奖学金(含少数民族齐飞奖)要求专业课成绩不挂科或挂科数不超过1门：每人每年获单项奖学金不得超过两项。' },
      { name: 'p', text: '10．具体情况见附件。 注意：附件不能在小程序中直接打开，请复制链接后在浏览器进行操作。\n附件下载网址：https://pan.baidu.com/s/1i5gOGeh' },
      { name: 'foot' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})
