var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [{ name: 'head', title: '选课内容' },
    { name: 'h3', text: ' 课程类型' },
    { name: 'p', text: '通识教育选修课、通识教育必修课、师资教育选修课、师资教育必修课、专业教育选修课、专业教育必修课。' },
    { name: 'h3', text: ' 关于选修课' },
    { name: 'p', text: '课程计划\n2015版课程计划（2015级、2016级使用）将通选课分为三大类：社会与行为科学、人文与艺术、自然科学。选课时课程名称旁边会有提示。不同专业对每个类别所选分数的要求是不同的，所以大家一定要仔细看年课程计划里对自己专业的选修课要求。但是，大一上是不能选选修课的！！！到大一下才能选~\n网络课程。\n学校普通的选修课以外还有一些网络课程。这种课算为通选课。分为两类。第一类是师范共享平台网络课程。这种课都是别的学校的，个人建议慎选。多为周六周日上课。给分捉摸不定还可能出问题。第二类是尔雅通识网络课。东师买的大多数都是艺术类课，这类课给分高，课程元资源来自其他高校，考试形式为在线考试。但是有些课课节很多，建议选择课程数少的课程。' },
    { name: 'h3', text: ' 选/注课原则' },
    { name: 'p', text: '1、学校实行每学年三学期制，即“两长一短”三个学期。长学期为19-21周，考试2周；短学期一般为3—4周。长学期修读的学分数不得低于10学分、不宜超过30学分。2、学校实行学分制学费。学生实际修读的学分不超过课程计划要求总学分的所交费用与学年学费相同。 学校另外免收15学分的学分学费，超过15学分的修读学分需要缴纳学分学费。计算公式为：（实际所修学分-专业毕业学分 - 15）*80。3、未办理注课或选课手续的学生，不能参加该课程的学习和考核，不能取得学分。4、注课或选课后未在规定时间内办理退选手续而无故不参加课程学习和考核者，该课程成绩记为“0”分，并作为不及格课程记入成绩单，不能取得相应的学分，且必须按相关规定缴纳相应的课程学分学费。5、原则上学生只能选择所在校区的课程。' },
    { name: 'h3', text: ' 选课参照' },
    { name: 'p', text: '课程表\n1.在这个阶段大家要选的有通识教育必修课（思想政治理论课以及体育、英语课）、专业必修课和选修课。每个学院会在选课的时候下发课程表，课程表上面对应所有的课程必须要选。自己学院开的通识选修课不能选，否则没有学分。2.建议尽量不要逞能选别的学院专业课，期末考试时间容易冲突。咱们学校课堂都是开放的，想听课的话可以蹭课。\n学长学姐的建议\n关于选课，大家可以去咨询一下自己的学长学姐。像思想政治理论课、体育课以及教师资格课等都有多个老师开课，不同的老师风格、要求不同，也就适合不同的同学。选修课有很多种，大家注意某一门课如果学长学姐说是好课，一定要问好课程名称以及任课老师。问的话主要是下面几个问题：①这个老师上课是否经常点名？ ②这课的结课方式是什么？是否好弄？是论文还是开卷还是没考试？ ③如果你的学长学姐告诉你某一门课比较好，你一定要问问是哪个老师教。老师最重要。\n\n' }
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})