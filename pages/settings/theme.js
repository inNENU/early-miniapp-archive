var u = require('../../utils/util.js');
const a = getApp().globalData;
Page({
  data: {
    array: ['iOS', 'wechat', 'debug',],
    page: [
      { name: 'nav', navtitle: '主题', navtext: '首页' },
      { name: 'head', text: '主题设置' },
      { name: 'h2', text: '主题选择' },
      { name: 'list', content: [{ text: '夜间模式', switchchange: 'switchnm', key: 'nightmode' }, { text: '自动切换夜间模式开关', switchchange: 'switchnmAC', key: 'nightmodeAutoChange' }] },
    ],
  },
  onLoad(e) { this.setData({ page: u.sP(this.data.page, a, e), T: a.T, nm: a.nm, index: u.ak(this.data.array, a.T) }) },
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
})