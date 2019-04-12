/* global wx getApp*/
const { globalData: a, lib: { $act, $file, $page, $set } } = getApp(),
  result = {};

$page('PEcal', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [{ tag: 'head', title: '体测计算器', leftText: '功能大厅' }],
    gender: [
      { text: '男', value: 'male' },
      { text: '女', value: 'female' }
    ],
    grade: [
      { text: '大一 大二', value: 'Low' },
      { text: '大三 大四', value: 'High' }
    ],
    list: [
      { text: '身高', unit: '厘米', type: 'number', id: 'height' },
      { text: '体重', unit: '千克', type: 'digit', id: 'weight' },
      { text: '坐位体前屈', unit: '厘米', type: 'digit', id: 'sitAndReach' },
      { text: '肺活量', unit: '毫升', type: 'number', id: 'vitalCapacity' },
      { text: '立定跳远', unit: '米', type: 'digit', id: 'standingLongJump' },
      { text: '50米跑', unit: '秒', type: 'digit', id: 'shortRun' },
      { text: result.gender === 'male' ? '引体向上' : '仰卧起坐', unit: '个', id: result.gender === 'male' ? 'chinning' : 'situp' }
    ]
  },
  onLoad() {
    $set.Set(this.data.page, a, null, this, false);
    const gender = wx.getStorageSync('gender'),
      grade = wx.getStorageSync('grade');

    // 将用户上次选择的性别和年级载入
    if (gender) {
      this.setData({ [`gender[${gender === 'male' ? 0 : 1}].checked`]: true });
      result.gender = gender;
    }
    if (grade) {
      this.setData({ [`grade[${grade === 'Low' ? 0 : 1}].checked`]: true });
      result.grade = grade;
    }
  },
  onReady() {
    $set.Notice('PEcal');
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  },
  genderChange(event) {
    const { value } = event.detail;

    result.gender = value;
    wx.setStorageSync('gender', value);
  },
  gradeChange(event) {
    const { value } = event.detail;

    result.grade = value;
    wx.setStorageSync('grade', value);
  },

  input(event) {
    const { project } = event.currentTarget.dataset;

    result[project] = event.detail.value;
  },
  calculate() {

    console.log(result);
    if (result.gender && result.grade) {
      const hash = [100, 95, 90, 85, 80, 78, 76, 74, 72, 70, 68, 66, 64, 62, 60, 50, 40, 30, 20, 10];

      $file.getJson(`function/PEcal/${result.gender}${result.grade}`, config => {
        console.log(config);
      });
    } else wx.showToast({ title: '请选择年龄与性别', icon: 'none', duration: 2500, image: '/icon/close.png' });

  }
});
