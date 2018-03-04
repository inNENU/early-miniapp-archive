var u = require('../../utils/util.js');
const a = getApp().globalData;
Page({
  data: {
    array: ['iOS', 'wechat', 'debug',],
    page: [
      { name: 'nav', navtitle: '主题', navtext: '首页' },
      { name: 'head', text: '主题设置' },
      { name: 'h2', text: '主题选择' },
      { name: 'list', content: [{ text: '夜间模式', switchchange: 'switchnm', checked: 'nightmode' }, { text: '自动切换夜间模式开关', switchchange: 'switchnmAC', checked: 'nightmodeAutoChange' }] },
    ],
  },
  onLoad() { this.setData({ page: u.sP(this.data.page, a), T: a.T, nm: a.nm, index: u.ak(this.data.array, a.T) }) },
  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } },
  bindPickerChange(e) {
    let v = e.detail.value, T = this.data.array[v];
    this.setData({ index: v }); a.T = T;
    wx.setStorageSync("index", Number(v));
    wx.setStorageSync("theme", T);
    this.setData({ page: u.sP(this.data.page, a) });
  },
  switchnm(e) {
    wx.setStorageSync("nightmode", e.detail.value);
    this.setData({ page: u.sP(this.data.page, a) }); a.nm = u.nm(new Date());
  },
  switchnmAC(e) {
    wx.setStorageSync("nightmodeAutoChange", e.detail.value);
    this.setData({ page: u.sP(this.data.page, a) }); a.nm = u.nm(new Date());
  },
  back() { u.back() },
})