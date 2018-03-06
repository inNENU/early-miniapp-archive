var u = require('../../utils/util.js');
const a = getApp().globalData;
var date = new Date()
var time = [[], []];
for (let i = 0; i <= 23; i++) { time[0].push(i + '时') };
for (let i = 0; i <= 59; i++) { time[1].push(i + '分') };
Page({
  data: {
    array: ['iOS', 'wechat', 'debug',],
    page: [
      { name: 'head', title: '主题设置' },
      { name: 'h2', text: '主题选择' },
      { name: 'list', content: [{ text: '夜间模式', switchchange: 'switchnm', key: 'nightmode' }, { text: '自动切换夜间模式开关', switchchange: 'switchnmAC', key: 'nightmodeAutoChange' }, { text: '夜间模式开始时间', pickerKey: 'nmStart', pickerValue: time, currentValue: [], value: [{ name: '时' }, { name: '分' }], tap: 'display', pickerchange: 'setStart' }] },
    ],
  },
  onLoad(e) {
    let page = this.data.page;
    let Start = wx.getStorageSync('nmStart');
    let End = wx.getStorageSync('nmEnd');
    page[2].content[2].currentValue[0] = Math.trunc(Start / 100);
    page[2].content[2].value[0].value = Math.trunc(Start / 100);
    page[2].content[2].currentValue[1] = (Start / 100 - Math.trunc(Start / 100)) * 100;
    page[2].content[2].value[1].value = (Start / 100 - Math.trunc(Start / 100)) * 100;
    this.setData({ page: u.sP(page, a, e), T: a.T, nm: a.nm, index: u.ak(this.data.array, a.T) })
  },
  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } },
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
  back() { u.back() },
  display() {
    let page = this.data.page;
    page[2].content[2].display = !page[2].content[2].display
    this.setData({
      display: !this.data.display, page: page
    })
  },
  setStart(e) {
    let v = e.detail.value, page = this.data.page;
    var temp = 0;
    for (let i = 0; i < v.length; i++) {
      temp = 100 * temp + v[i];
      page[2].content[2].value[i].value = v[i];
      page[2].content[2].currentValue[i] = v[i]
    }
    this.setData({ page: page })
    wx.setStorageSync(page[2].content[2].pickerKey, temp)
  },
})