var u = getApp().util, a = getApp().globalData;
var date = new Date()
var time = [[], []];
for (let i = 0; i <= 23; i++) { time[0].push(i + '时') };
for (let i = 0; i <= 59; i++) { if (i < 10) { time[1].push('0' + i + '分') } else { time[1].push(i + '分') } };
Page({
  data: {
    array: ['iOS', 'wechat', 'debug',],
    page: [
      { name: 'head', title: '主题设置' },
      {
        name: 'list', head: '夜间模式', content: [
          { text: '夜间模式', Switch: 'switchnm', key: 'nightmode' },
          { text: '自动切换开关', Switch: 'switchnmAC', key: 'nightmodeAutoChange' },
          { text: '开始时间', picker: 'setStart', pickerKey: 'nmStart', pickerValue: time, tap: 'displayStart', },
          { text: '结束时间', picker: 'setEnd', pickerKey: 'nmEnd', pickerValue: time, tap: 'displayEnd', }
        ]
      },
      { name: 'p', head: '主题设置' },
    ],
  },
  onLoad(e) {
    let p = u.sP(this.data.page, a, e);
    // p = u.iP(p, 'nmStart', 1, 2); p = u.iP(p, 'nmEnd', 1, 3);
    this.setData({ page: p, T: a.T, nm: a.nm, index: u.ak(this.data.array, a.T) })
  },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  bindPickerChange(e) {
    let v = e.detail.value, T = this.data.array[v];
    a.T = T; wx.setStorageSync("theme", T);
    this.setData({ index: v, page: u.sP(this.data.page, a) });
  },
  switchnm(e) {
    let p = this.data.page, value = e.detail.value; a.nm = value;
    p[1].content[1].checked = false;
    wx.setStorageSync("nightmode", value); wx.setStorageSync("nightmodeAutoChange", false);
    this.setData({ nm: value, page: u.sS(p, e.detail.value, 1, 0) });
  },
  switchnmAC(e) {
    let value = e.detail.value; wx.setStorageSync("nightmodeAutoChange", value);
    let nm = u.nm(new Date()), temp = wx.getStorageSync("nightmode"), p = this.data.page;
    a.nm = nm; p = u.sS(u.sS(p, temp, 1, 0), value, 1, 1)
    this.setData({ nm: nm, page: p });
  },
  displayStart() { let page = this.data.page; page[1].content[2].display = !page[1].content[2].display; this.setData({ page: page }) },
  setStart(e) { this.setData({ page: u.sPV(this.data.page, e.detail.value, 1, 2) }) },
  displayEnd() { let page = this.data.page; page[1].content[3].display = !page[1].content[3].display; this.setData({ page: page }) },
  setEnd(e) { this.setData({ page: u.sPV(this.data.page, e.detail.value, 1, 3) }) },
  back() { u.back() },
  onUnload() { a.nm = u.nm(new Date()) },
})