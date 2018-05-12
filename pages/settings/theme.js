var u = getApp().util, a = getApp().globalData;
var date = new Date()
var time = [[], []];
for (let i = 0; i <= 23; i++) { time[0].push(i + '时') };
for (let i = 0; i <= 59; i++) { if (i < 10) { time[1].push('0' + i + '分') } else { time[1].push(i + '分') } };
Page({
  data: {
    array: ['iOS', 'wechat', 'debug',],
    page: [
      { tag: 'head', title: '主题设置', grey: true },
      {
        tag: 'list', head: '夜间模式', foot: '亮度数据为百分比', content: [
          { text: '夜间模式', Switch: 'switchnm', swiKey: 'nightmode' },
          { text: '自动切换开关', Switch: 'switchnmAC', swiKey: 'nightmodeAutoChange' },
          { text: '开始时间', key: 'nmStart', pickerValue: time },
          { text: '结束时间', key: 'nmEnd', pickerValue: time },
          { text: '日间亮度调整开关', swiKey: 'dayBrightnessChange' },
          { text: '日间模式亮度', slider: 'dB', min: 0, max: 100, sliKey: 'dayBrightness' },
          { text: '夜间亮度调整开关', swiKey: 'nmBrightnessChange' },
          { text: '夜间模式亮度', slider: 'nB', min: 0, max: 100, sliKey: 'nmBrightness' },
        ]
      },
      {
        tag: 'list', head: '资源更新', foot: '如果页面显示出现问题请强制刷新资源', content: [
          { text: '资源更新提示', swiKey: 'resNotify' },
          { text: '立即刷新', button: 'refresh' },
        ]
      },
      { tag: 'p', head: '主题设置' },
    ],
  },
  onLoad(e) { u.sP(this.data.page, this, a, e); this.setData({ index: u.ak(this.data.array, a.T) }) },
  onPageScroll(e) { u.nav(e, this.data.page, this) },
  Switch(e) { u.sS(this.data.page, e, this) },
  pV(e) { u.pV(this.data.page, e, this) },
  refresh(e) { u.rR() },
  back() { u.back() },
  onUnload() { a.nm = u.nm(new Date()) },
  switchnm(e) {
    let p = this.data.page, value = e.detail.value; a.nm = value;
    if (value && this.data.page[1].content[6].status) { wx.setScreenBrightness({ value: p[1].content[7].value / 100 }) }
    else if (!value && this.data.page[1].content[4].status) { wx.setScreenBrightness({ value: p[1].content[5].value / 100 }) };
    p[1].content[1].status = false; u.sS(p, e, this); wx.setStorageSync("nightmodeAutoChange", false);
    this.setData({ nm: value });
  },
  switchnmAC(e) {
    u.sS(this.data.page, e, this); let nm = u.nm(new Date()); a.nm = nm;
    let p = this.data.page; p[1].content[0].status = nm; wx.setStorageSync("nightmode", nm);
    if (nm && this.data.page[1].content[6].status) { wx.setScreenBrightness({ value: p[1].content[7].value / 100 }) }
    else if (!nm && this.data.page[1].content[4].status) { wx.setScreenBrightness({ value: p[1].content[5].value / 100 }) }
    this.setData({ nm: nm, page: p });
  },
  dB(e) {
    u.sl(this.data.page, e, this);
    if (!a.nm && this.data.page[1].content[4].status) { wx.setScreenBrightness({ value: e.detail.value / 100 }) }
  },
  nB(e) {
    u.sl(this.data.page, e, this);
    if (a.nm && this.data.page[1].content[6].status) { wx.setScreenBrightness({ value: e.detail.value / 100 }) }
  },
  bindPickerChange(e) {
    let v = e.detail.value, T = this.data.array[v];
    a.T = T; wx.setStorageSync("theme", T);
    u.sP(this.data.page, this, a, e)
    this.setData({ index: v });
  },
})