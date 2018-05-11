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
        tag: 'list', head: '夜间模式', content: [
          { text: '夜间模式', Switch: 'switchnm', key: 'nightmode' },
          { text: '自动切换开关', Switch: 'switchnmAC', key: 'nightmodeAutoChange' },
          { text: '开始时间', pickerKey: 'nmStart', pickerValue: time },
          { text: '结束时间', pickerKey: 'nmEnd', pickerValue: time }
        ]
      },
      {
        tag: 'list', head: '资源更新',foot:'如果页面显示出现问题请强制刷新资源', content: [
          { text: '资源更新提示', Switch: 'switchresNotify', key: 'resNotify' },
          { text: '立即刷新', button: 'refresh' },
        ]
      },
      { tag: 'p', head: '主题设置' },
    ],
  },
  onLoad(e) { u.sP(this.data.page, this, a, e); this.setData({ index: u.ak(this.data.array, a.T) }) },
  onPageScroll(e) { u.nav(e, this.data.page, this) }, back() { u.back() },
  switchnm(e) {
    let p = this.data.page, value = e.detail.value; a.nm = value;
    p[1].content[1].status = false; wx.setStorageSync("nightmodeAutoChange", false);
    this.setData({ nm: value, page: u.sS(p, e) });
  },
  switchnmAC(e) {
    let p = u.sS(this.data.page, e); let nm = u.nm(new Date());
    a.nm = nm; p[1].content[0].status = nm; wx.setStorageSync("nightmode", nm)
    this.setData({ nm: nm, page: p });
  },
  switchresNotify(e) {
    let p = u.sS(this.data.page, e); this.setData({ page: p });
  },
  pV(e) { u.pV(this.data.page, e, this) },
  back() { u.back() },
  onUnload() { a.nm = u.nm(new Date()) },
  bindPickerChange(e) {
    let v = e.detail.value, T = this.data.array[v];
    a.T = T; wx.setStorageSync("theme", T);
    u.sP(this.data.page, this, a, e)
    this.setData({ index: v });
  },
  refresh(e) { u.rR() }
})