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
      { tag: 'list', head: '夜间模式', foot: '“夜间模式”启用后，所有界面的背景被置于暗色并采用亮色文字以在保护眼睛的同时，保持暗光下显示效果。', content: [{ text: '夜间模式', Switch: 'switchnm', swiKey: 'nightmode' },] },
      {
        tag: 'list', foot: '亮度数据为百分比', content: [
          { text: '设定时间', Switch: 'switchnmAC', swiKey: 'nightmodeAutoChange' },
          { text: '开始时间', key: 'nmStart', pickerValue: time },
          { text: '结束时间', key: 'nmEnd', pickerValue: time },
          { text: '日间亮度调整开关', Switch: 'swithDay', swiKey: 'dayBrightnessChange' },
          { text: '日间模式亮度', slider: 'dB', min: 0, max: 100, sliKey: 'dayBrightness' },
          { text: '夜间亮度调整开关', Switch: 'swithNight', swiKey: 'nightBrightnessChange' },
          { text: '夜间模式亮度', slider: 'nB', min: 0, max: 100, sliKey: 'nightBrightness' },
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
  onLoad(e) {
    let p = this.data.page, list = p[2].content, nmAC = wx.getStorageSync('nightmodeAutoChange'), dC = wx.getStorageSync('dayBrightnessChange'), nC = wx.getStorageSync('nightBrightnessChange');
    if (!nmAC || !dC) { list[4].display = false }; if (!nmAC || !dC) { list[6].display = false };
    if (!nmAC) { list[1].display = list[2].display = list[3].display = list[5].display = false; };
    u.sP(p, this, a, e); this.setData({ index: u.ak(this.data.array, a.T) })
  },
  onPageScroll(e) { u.nav(e, this) },
  Switch(e) { u.sS(e, this) },
  pV(e) { u.pV(e, this) },
  refresh(e) { u.rR() },
  back() { u.back() },
  onUnload() { a.nm = u.nm(new Date()) },
  switchnm(e) {
    let p = u.sS(e, this), list = p[2].content, value = e.detail.value; a.nm = value;
    if (value && list[5].status) { wx.setScreenBrightness({ value: list[6].value / 100 }) }
    else if (!value && list[3].status) { wx.setScreenBrightness({ value: list[4].value / 100 }) };
    list[0].status = list[1].display = list[2].display = list[3].display = list[4].display = list[4].visible = list[5].display = list[6].display = list[6].visible = false; wx.setStorageSync("nightmodeAutoChange", false);
    this.setData({ nm: value, page: p });
  },
  switchnmAC(e) {
    let p = u.sS(e, this), list = p[2].content; let nm = u.nm(new Date()); a.nm = nm;
    p[1].content[0].status = nm; wx.setStorageSync("nightmode", nm);
    if (nm && list[5].status) { wx.setScreenBrightness({ value: list[6].value / 100 }) }
    else if (!nm && list[3].status) { wx.setScreenBrightness({ value: list[4].value / 100 }) };
    if (e.detail.value) { list[1].display = list[2].display = list[3].display = list[5].display = true; }
    else { list[1].display = list[2].display = list[3].display = list[4].visible = list[5].display = list[6].visible = false; };
    if (!list[0].status) { list[4].display = false } else { if (!list[3].status) { list[4].display = false } else { list[4].display = true } }; if (!list[0].status) { list[6].display = false } else { if (!list[5].status) { list[6].display = false } else { list[6].display = true } };
    this.setData({ nm: nm, page: p });
  },
  swithDay(e) { let p = u.sS(e, this), list = p[2].content; list[4].visible = list[4].display = e.detail.value; this.setData({ page: p }); },
  swithNight(e) { let p = u.sS(e, this), list = p[2].content; list[6].visible = list[6].display = e.detail.value; this.setData({ page: p }); },
  dB(e) {
    u.sl(e, this); if (!a.nm && this.data.page[2].content[3].status) { wx.setScreenBrightness({ value: e.detail.value / 100 }) }
  },
  nB(e) {
    u.sl(e, this); if (a.nm && this.data.page[2].content[5].status) { wx.setScreenBrightness({ value: e.detail.value / 100 }) }
  },
  bindPickerChange(e) {
    let v = e.detail.value, T = this.data.array[v];
    a.T = T; wx.setStorageSync("theme", T);
    u.sP(this.data.page, this, a, e)
    this.setData({ index: v });
  },
})