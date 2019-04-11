/* global wx getApp*/
const { globalData: a, lib: { $act, $file, $page, $set } } = getApp(),
  result = {};

$page('PEcal', {
  data: {
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
  onLoad() { },
  onReady() {
    $set.Notice('PEcal');
  },
  genderChange(event) {
    result.gender = event.detail.value;
  },
  gradeChange(event) {
    result.grade = event.detail.value;

  },
  input(event) {
    const { project } = event.currentTarget.dataset;

    result[project] = event.detail.value;
  },
  calculate() {
    let config;

    console.log(result);
    if (result.gender && result.grade) {
      const hash = [100, 95, 90, 85, 80, 78, 76, 74, 72, 70, 68, 66, 64, 62, 60, 50, 40, 30, 20, 10];

      config = $file.getJson(`function/PEcal/${result.gender}${result.grade}`);
      console.log(config);
    } else wx.showToast({ title: '请选择年龄与性别', icon: 'none', duration: 2500, image: '/icon/close.png' });

  }
});
