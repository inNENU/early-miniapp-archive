var u = require('../../utils/util.js');
const a = getApp().globalData;
var date = new Date()
var time = [[], []];
for (let i = 0; i <= 23; i++) { time[0].push(i + '时') };
for (let i = 0; i <= 59; i++) { if (i < 10) { time[1].push('0' + i + '分') } else { time[1].push(i + '分') } };
Page({
  data: {
    array: ['iOS', 'wechat', 'debug',],
    page: [
      { name: 'head', title: '主题设置' },
      { name: 'h2', text: '夜间模式' },
      {
        name: 'list', content: [
          { text: '夜间模式', switchchange: 'switchnm', key: 'nightmode' },
          { text: '自动切换开关', switchchange: 'switchnmAC', key: 'nightmodeAutoChange' },
          { text: '开始时间', pickerKey: 'nmStart', pickerValue: time, tap: 'displayStart', pickerchange: 'setStart', currentValue: [], value: [] },
          { text: '结束时间', pickerKey: 'nmEnd', pickerValue: time, tap: 'displayEnd', pickerchange: 'setEnd', currentValue: [], value: [] }
        ]
      },
    ],
  },
  onLoad(e) {
    let p = this.data.page; p = u.iP(p, 'nmStart', 2, 2); p = u.iP(p, 'nmEnd', 2, 3);
    this.setData({ page: u.sP(p, a, e), T: a.T, nm: a.nm, index: u.ak(this.data.array, a.T) })
  },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  bindPickerChange(e) {
    let v = e.detail.value, T = this.data.array[v];
    a.T = T; wx.setStorageSync("theme", T);
    this.setData({ index: v, page: u.sP(this.data.page, a) });
  },
  switchnm(e) {
    wx.setStorageSync("nightmode", e.detail.value);
    let nm = u.nm(new Date()); a.nm = nm;
    this.setData({ nm: nm, page: u.sP(this.data.page, a) });
  },
  switchnmAC(e) {
    wx.setStorageSync("nightmodeAutoChange", e.detail.value); wx.setStorageSync("nightmode", e.detail.value);
    let nm = u.nm(new Date()); a.nm = nm;
    this.setData({ nm: nm, page: u.sP(this.data.page, a) });
  },
  displayStart() {
    let page = this.data.page; page[2].content[2].display = !page[2].content[2].display
    this.setData({ page: page })
  },
  setStart(e) {
    this.setData({ page: u.sPV(this.data.page, e.detail.value, 2, 2) })
  },
  displayEnd() {
    let page = this.data.page; page[2].content[3].display = !page[2].content[3].display
    this.setData({ page: page })
  },
  setEnd(e) {
    this.setData({ page: u.sPV(this.data.page, e.detail.value, 2, 3) })
  },
  back() { u.back() },
  onUnload() { a.nm = u.nm(new Date()) },
})