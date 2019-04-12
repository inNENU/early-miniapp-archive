/* global wx getApp*/
const { globalData: a, lib: { $act, $file, $page, $set } } = getApp(),
  special = [
    { text: '引体向上', unit: '个', id: 'chinning' },
    { text: '仰卧起坐', unit: '个', id: 'situp' }
  ],
  longRunText = ['1000米跑', '800米跑'],
  result = {},
  longRunPicker = [['2分', '3分', '4分', '5分', '6分', '7分'], []];

for (let i = 0; i < 60; i++) longRunPicker[1].push(`${i}秒`);

$page('PEcal', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [{ tag: 'head', title: '体测计算器', grey: true, leftText: '功能大厅' }],
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
      { text: '50米跑', unit: '秒', type: 'digit', id: 'shortRun' }
    ],
    longRun: { text: '800米跑' },
    special: { text: '仰卧起坐', unit: '个', id: 'situp' },
    PEscore: {}
  },
  onLoad() {
    $set.Set(this.data.page, a, null, this, false);
    const gender = wx.getStorageSync('gender'),
      grade = wx.getStorageSync('grade');

    // 将用户上次选择的性别和年级载入
    if (gender) { // 改变特别项目和长跑的名称
      this.setData({
        [`gender[${gender === 'male' ? 0 : 1}].checked`]: true,
        'longRun.text': gender === 'male' ? longRunText[0] : longRunText[1],
        special: gender === 'male' ? special[0] : special[1]
      });
      result.gender = gender;
    }
    if (grade) {
      this.setData({ [`grade[${grade === 'Low' ? 0 : 1}].checked`]: true });
      result.grade = grade;
    }

    // 设置长跑选择器数据
    this.setData({ 'longRun.picker': longRunPicker });

    // 设置胶囊和背景颜色
    const [nc, bc] = $set.color(a, true);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  onReady() {
    // 设置胶囊颜色
    const [frontColor, backgroundColor] = a.nm ? ['#ffffff', '#000000'] : ['#000000', '#ffffff'];

    wx.setNavigationBarColor({ frontColor, backgroundColor });

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

    // 改变特别项目和长跑的名称
    this.setData({
      special: value === 'male' ? special[0] : special[1],
      'longRun.text': value === 'male' ? longRunText[0] : longRunText[1]
    });
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
  longRunHandler(e) {
    console.log(e);
    const { value } = e.detail;

    // 设置显示数据
    this.setData({ 'longRun.value': `${longRunPicker[0][value[0]]} ${longRunPicker[1][value[1]]}` });

    result.longRun = (value[0] + 2) * 60 + value[1];
    console.log(result.longRun);
  },
  calculate() {

    wx.showLoading({ title: '计算中...', mask: true });
    console.info('输入结果为：', result);

    if (result.gender && result.grade) {
      const hash = [10, 20, 30, 40, 50, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 85, 90, 95, 100],
        PEscore = {
          vitalCapacity: 0,
          sitAndReach: 0,
          standingLongJump: 0,
          shortRun: 0,
          longRun: 0,
          special: 0
        };

      if (result.height && result.weight) {
        const score = Math.round(result.weight * 100000 / result.height / result.height) / 10,
          state = result.gender === 'male'
            ? score <= 17.8 ? '低体重' : score >= 28.0 ? '肥胖' : score >= 24.0 ? '超重' : '正常'
            : score <= 17.1 ? '低体重' : score >= 28.0 ? '肥胖' : score >= 24.0 ? '超重' : '正常';

        PEscore.BMIscore = result.gender === 'male'
          ? score <= 17.8 ? 80 : score >= 28.0 ? 60 : score >= 24.0 ? 80 : 100
          : score <= 17.1 ? 80 : score >= 28.0 ? 60 : score >= 24.0 ? 80 : 100;


        PEscore.passScore = score <= 28 ? 60 : Math.ceil(score - 28);

        this.setData({ BMI: { score, state } });
      }

      $file.getJson(`function/PEcal/${result.gender}${result.grade}`, config => {

        // 计软长跑时间
        config.longRun.forEach((element, index) => {
          const time = element.split('-');

          config.longRun[index] = Number(time[0]) * 60 + Number(time[1]);
        });

        // 以下三项越高越好，进行计算
        ['vitalCapacity', 'sitAndReach', 'standingLongJump'].forEach(x => {
          if (result[x])
            for (let i = 0; i < config[x].length; i++)
              if (result[x] < config[x][i]) {
                PEscore[x] = hash[i];
                break;
              } else if (i = config[x].length - 1)
                PEscore[x] = hash[i];
        });

        // 以下两项越低越好
        ['shortRun', 'longRun'].forEach(x => {
          if (result[x])
            for (let i = 0; i < config[x].length; i++)
              if (result[x] > config[x][i]) {
                PEscore[x] = hash[i];
                break;
              } else if (i = config[x].length - 1)
                PEscore[x] = hash[i];
        });

        // 计算特别类项目分数
        const specialScore = result.gender === 'male' ? 'chinning' : 'situp';

        for (let i = 0; i < config[specialScore].length; i++)
          if (config[specialScore][i] !== '' && result[specialScore] && result[specialScore] < config[specialScore][i]) {
            PEscore.specialScore = hash[i];
            break;
          } else if (i = config[specialScore].length - 1)
            PEscore.special = hash[i];

        const finalScore = PEscore.vitalCapacity * 0.15 + PEscore.shortRun * 0.2 + PEscore.sitAndReach * 0.1 +
          PEscore.standingLongJump * 0.1 + PEscore.special * 0.1 + PEscore.longRun * 0.2;

        console.log(PEscore);
        this.setData({
          PEscore,
          PE: {
            score: finalScore,
            state: finalScore >= PEscore.passScore ? '及格' : '不及格'
          }
        });
      });
      wx.hideLoading();
    } else {
      wx.hideLoading();
      wx.showToast({ title: '请选择年龄与性别', icon: 'none', duration: 2500, image: '/icon/close.png' });
    }
  }
});
