var u = require('../../../utils/util.js');
const a = getApp().globalData;
Page({
  data: {
    page: [{
        tag: 'head',
        title: '绩点计算(beta)'
      },
      {
        tag: 'h3',
        text: '绩点计算器'
      },
    ],
    grade: [],
    // 在这里必须定义一个grade的空数组
    totalCredit: null,
    gradePointAverage: null,
    editText: '编辑',
    display: false,
  },
  addNew: function(e) {
    var length = this.data.grade.length;
    // 获取grade内包含的个数，以便生成新的id
    var gradeNew = this.data.grade.concat({
      id: length,
      course: null,
      courseFocus: false,
      grade: null,
      gradeFocus: false,
      credit: null,
      creditFocus: false,
    });
    // 向grade最后插入一个新元素
    this.setData({
      grade: gradeNew
    });
    // 对data赋值
  },
  input(e) {
    console.log(e);
    let grade = this.data.grade;
    // 获取grade
    // console.log(Number(e.detail.value));
    let id = e.currentTarget.dataset.id,
      target = e.currentTarget.dataset.class;
    // 获取正在输入的输入框id  获取正在输入对象
    grade[id][target + 'Focus'] = true;
    console.log(e.detail.value.length)
    // if (e.detail.value.length < e.currentTarget.dataset.maxLength) {
    //   grade[id][target + 'Focus'] = true;
    // } else {
    //   grade[id][target + 'Focus'] = false;
    // }
    if (Number(e.detail.value)) {
      grade[id][target] = Number(e.detail.value)
    }
    // 如果value可以转换为number，得到对应课程的grade数组并对其中的相应对象赋值数字
    else {
      grade[id][target] = e.detail.value
    };
    // 如果value无法转换为number，得到对应课程的grade数组并对其中的相应对象赋值字符
    console.log(grade);
    this.setData({
      grade: grade
    });
    // 将新值写回data中
  },
  next(e) {
    let grade = this.data.grade,
      id = e.currentTarget.dataset.id;
    grade[id].gradeFocus = true;
    this.setData({
      grade: grade
    });
  },
  edit() {
    if (this.data.display) {
      var editText = '编辑'
    } else {
      var editText = '完成'
    };
    this.setData({
      display: !this.data.display,
      editText: editText
    })
  },
  sort(e) {
    console.log(e);
  },
  remove(e) {
    console.log(e);
    let currentID = e.target.id[e.target.id.length - 1],
      grade = this.data.grade;
    console.log("currentID是" + currentID + ";grade是" + grade);
    grade.splice(currentID, 1);
    console.log("新grade是" + grade);
    for (let i = 0; i < grade.length; i++) {
      grade[i].id = i;
    }
    // 重新设定id
    this.setData({
      grade: grade
    });
  },
  calculate() {
    var that = this,
      courseNumber = this.data.grade.length;
    // 明确指针避免setData报错// 获得课程数
    console.log("课程数是" + courseNumber);
    var totalCredit = 0,
      totalGradeCal = 0,
      flunkingCredit = 0,
      flunkingGradeCal = 0;
    for (let i = 0; i < courseNumber; i++) {
      let grade = this.data.grade[i].grade,
        credit = this.data.grade[i].credit;
      if (grade != 0 && grade && credit && credit != 0) {
        // 判断grade和credit是否均有值
        if (grade < 60) {
          flunkingCredit = credit + flunkingCredit;
          if (grade > 50) {
            flunkingGradeCal = (grade - 50) / 10 * credit + flunkingGradeCal
          }
          // 单独列出不及格的学分和成绩,且只有大于50分绩点为正值才计算。
        } else {
          totalCredit = credit + totalCredit;
          totalGradeCal = (grade - 50) / 10 * credit + totalGradeCal;
          // 及格的学分和成绩
        };
      };
    };
    console.log("总学分是" + totalCredit)
    console.log("总计算是" + totalGradeCal)
    console.log("挂科学分是" + flunkingCredit)
    console.log("总挂科计算是" + flunkingGradeCal)
    switch (Number(flunkingCredit)) {
      case 0:
        console.log("都及格了");
        // 如果都及格什么也不做
        that.setData({
          totalCredit: totalCredit,
          gradePointAverage: totalGradeCal / totalCredit
        });
        console.log(totalCredit)
        console.log(totalGradeCal / totalCredit)
        // 向data赋值计算结果
        break;
      default:
        wx.showModal({
          // 弹窗让用户选择
          title: '请选择计算方式',
          content: '平均绩点是否包含未达到60的成绩？\n★为建议项',
          cancelText: '包含',
          cancelColor: '#ff0000',
          confirmText: '排除★',
          success(res) {
            if (res.cancel) {
              // 包含不及格成绩
              totalCredit = totalCredit + flunkingCredit;
              totalGradeCal = totalGradeCal + flunkingGradeCal;
              // 写入不及格学分与成绩计算
              console.log("不及格学分成绩被计入")
              console.log("新总学分是" + totalCredit)
              console.log("新总计算是" + totalGradeCal)
            } else if (res.confirm) {
              console.log("都及格了");
              // 不包含不及格成绩，什么都不做
              // console.log(totalCredit)
              // console.log(totalGradeCal / totalCredit)
            }
            that.setData({
              totalCredit: totalCredit,
              gradePointAverage: totalGradeCal / totalCredit
            })
            // 向data赋值计算结果
          }
        });
    }
  },
  onLoad(e) {
    u.sP(this.data.page, this, a, e)
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
  cA(e) {
    u.cA(e, this)
	},
	sN(e) {
		u.sN(e)
	}
})