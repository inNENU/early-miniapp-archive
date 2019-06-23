/* global wx getApp*/
const { globalData: a, lib: { $component, $file, $register, $page } } = getApp();
const special = [
  { text: '引体向上', unit: '个', type: 'number', id: 'chinning' },
  { text: '仰卧起坐', unit: '个', type: 'number', id: 'situp' }
];
const longRunText = ['1000米跑', '800米跑'];
const longRunPicker = [['2分', '3分', '4分', '5分', '6分', '7分'], []];

for (let i = 0; i < 60; i++) longRunPicker[1].push(`${i}秒`);

$register('PEcal', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [{ tag: 'head', title: '体测计算器', grey: true, leftText: '功能大厅' }],
    gender: {
      picker: ['男', '女'],
      value: ['male', 'female']
    },
    grade: {
      picker: ['大一', '大二', '大三', '大四'],
      value: ['Low', 'Low', 'High', 'High']
    },
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
    PEscore: {},
    result: {},
    scoreList: [
      { text: 'BMI', id: 'BMI' },
      { text: '坐位体前屈', id: 'sitAndReach' },
      { text: '肺活量', id: 'vitalCapacity' },
      { text: '立定跳远', id: 'standingLongJump' },
      { text: '50米跑', id: 'shortRun' }
    ]
  },
  onLoad(option) {
    $page.Set({ option, ctx: this }, this.data.page);
    const genderIndex = wx.getStorageSync('gender');
    const gradeIndex = wx.getStorageSync('grade');

    // 将用户上次选择的性别和年级载入
    if (genderIndex || genderIndex === 0)  // 改变特别项目和长跑的名称
      this.setData({
        'gender.index': genderIndex,
        'longRun.text': genderIndex === 0 ? longRunText[0] : longRunText[1],
        special: genderIndex === 0 ? special[0] : special[1],
        'result.gender': this.data.gender.value[genderIndex]
      });

    if (gradeIndex || gradeIndex === 0) // 写入年级
      this.setData({
        'grade.index': gradeIndex,
        'result.grade': this.data.grade.value[gradeIndex]
      });

    // 设置长跑选择器数据
    this.setData({ 'longRun.picker': longRunPicker });

    // 设置胶囊和背景颜色
    const [nc, bc] = $page.color(true);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);

    // 设置通知
    $page.Notice('PEcal');
  },
  onPageScroll(e) {
    $component.nav(e, this);
  },
  cA(e) {
    $component.trigger(e, this);
  },
  genderChange(event) {
    const index = Number(event.detail.value);
    const gender = this.data.gender.value[index];

    wx.setStorageSync('gender', index);

    // 改变特别项目和长跑的名称
    this.setData({
      'result.gender': gender,
      'gender.index': index,
      special: gender === 'male' ? special[0] : special[1],
      'longRun.text': gender === 'male' ? longRunText[0] : longRunText[1]
    });
  },
  gradeChange(event) {
    const index = Number(event.detail.value);

    // 设置年级
    this.setData({
      'grade.index': index,
      'result.grade': this.data.grade.value[index]
    });
    wx.setStorageSync('grade', index);
  },
  focus(event) {
    console.log('focus', event);
    const { id } = event.currentTarget;
    const query = wx.createSelectorQuery();

    this.setData({ input: { status: true, height: event.detail.height } });

    query.select(`#${id}`)
      .boundingClientRect();
    query.selectViewport().fields({ size: true, scrollOffset: true });
    query.exec(res => {
      console.log(res);
      console.log('bottom是', res[0].bottom);
      console.log('scrollTop是', res[1].scrollTop);
      console.log('键盘高度是', event.detail.height);
      console.log('屏幕高度为', res[1].height);
      console.log(res[0].bottom + event.detail.height > res[1].height);
      if (res[0].bottom + event.detail.height > res[1].height) {
        console.log('scroll');
        console.log('计划向上滚动', res[0].bottom + event.detail.height - res[1].height + 10);
        console.log('新的应为', res[1].scrollTop + res[0].bottom + event.detail.height - res[1].height + 10);
        wx.pageScrollTo({ scrollTop: res[1].scrollTop + res[0].bottom + event.detail.height - res[1].height + 10 });
      }
    });
  },
  input(event) {
    console.log(event);
    const project = event.currentTarget.id;

    this.setData({ [`result.${project}`]: event.detail.value });
  },
  blur() {
    this.setData({ 'input.status': false });
  },
  longRunHandler(event) {
    const { value } = event.detail;

    // 设置显示数据
    this.setData({
      'longRun.value': `${longRunPicker[0][value[0]]} ${longRunPicker[1][value[1]]}`,
      'result.longRun': (value[0] + 2) * 60 + value[1]
    });


  },
  calculate() {
    const { result } = this.data;

    wx.showLoading({ title: '计算中...', mask: true });
    console.info('输入结果为：', result);

    if (result.gender && result.grade) { // 可以计算
      const hash = [10, 20, 30, 40, 50, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 85, 90, 95, 100];
      const { length } = hash;
      const PEscore = {
        BMI: 0,
        vitalCapacity: 0,
        sitAndReach: 0,
        standingLongJump: 0,
        shortRun: 0,
        longRun: 0,
        special: 0
      };

      if (result.height && result.weight) { // 可以计算BMI
        let state;
        const score = Math.round(result.weight * 100000 / result.height / result.height) / 10;

        // 计算BMI状态与分值
        [state, PEscore.BMI] = result.gender === 'male'
          ? score <= 17.8 ? ['低体重', 80] : score >= 28.0 ? ['肥胖', 60] : score >= 24.0 ? ['超重', 80] : ['正常', 100]
          : score <= 17.1 ? ['低体重', 80] : score >= 28.0 ? ['肥胖', 60] : score >= 24.0 ? ['超重', 80] : ['正常', 100];

        // 计算及格分数
        PEscore.passScore = result.grade === 'Low'
          ? score <= 28 ? 60 : 60 - Math.ceil(score - 28) * 2
          : 50;

        this.setData({ BMI: { score, state } });
      }

      $file.getJson(`function/PEcal/${result.gender}${result.grade}`, config => { // 读取相应配置文件

        // 转换长跑时间
        config.longRun = config.longRun.map(element => {
          const time = element.split('-');

          return Number(time[0]) * 60 + Number(time[1]);
        });

        // 转换立定跳远单位
        config.standingLongJump = config.standingLongJump.map(element => element / 100);

        console.log(config);

        // 以下三项越高越好，进行计算
        ['vitalCapacity', 'sitAndReach', 'standingLongJump'].forEach(x => {
          if (result[x]) {
            for (let i = 0; i < length; i++)
              if (result[x] <= config[x][i]) {
                PEscore[x] = hash[i];
                break;
              } else if (i === length - 1)
                PEscore[x] = hash[i];
          } else PEscore[x] = 0;
        });

        // 以下两项越低越好
        ['shortRun', 'longRun'].forEach(x => {
          if (result[x]) {
            for (let i = 0; i < length; i++)
              if (result[x] >= config[x][i]) {
                PEscore[x] = hash[i];
                break;
              } else if (i === length - 1)
                PEscore[x] = hash[i];
          } else PEscore[x] = 0;
        });

        // 计算特别类项目分数
        const specialScore = result.gender === 'male' ? 'chinning' : 'situp';

        for (let i = 0; i < length; i++)
          if (result[specialScore]) {
            if (config[specialScore][i] !== '' && result[specialScore] && result[specialScore] <= config[specialScore][i]) {
              PEscore.special = hash[i];
              break;
            } else if (i === length - 1)
              PEscore.special = hash[i];
          } else PEscore.special = 0;

        // TODO:计算加分


        // 计算最终成绩
        const finalScore = (PEscore.vitalCapacity * 0.15 + PEscore.shortRun * 0.2 + PEscore.sitAndReach * 0.1 +
          PEscore.standingLongJump * 0.1 + PEscore.special * 0.1 + PEscore.longRun * 0.2 +
          PEscore.BMI * 0.15).toFixed(2);

        console.info('成绩为', PEscore);
        this.setData({
          showScore: true,
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
      wx.showToast({ title: '请选择性别年级', icon: 'none', duration: 2500, image: '/icon/close.png' });
    }
  },
  navigate() {
    this.$route('/module/module1?From=体测计算器&aim=test0&depth=1');
  },

  redirect() {
    this.$launch('/page/main');
  },
  onShareAppMessage: () => ({ title: '体测计算器', path: '/function/PEcal?share=true' })
});
