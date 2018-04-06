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
      { name: 'h2', text: '夜间模式' },
      {
        name: 'list', content: [
          { text: '夜间模式', Switch: 'switchnm', key: 'nightmode' },
          { text: '自动切换开关', Switch: 'switchnmAC', key: 'nightmodeAutoChange' },
          { text: '开始时间', picker: 'setStart', pickerKey: 'nmStart', pickerValue: time, tap: 'displayStart', },
          { text: '结束时间', picker: 'setEnd', pickerKey: 'nmEnd', pickerValue: time, tap: 'displayEnd', }
        ]
      },
      { name: 'h2', text: '主题设置' },
    ],
  },
  onLoad(e) {
    let p = u.sP(this.data.page, a, e); p = u.iP(p, 'nmStart', 2, 2); p = u.iP(p, 'nmEnd', 2, 3);
    this.setData({ page: p, T: a.T, nm: a.nm, index: u.ak(this.data.array, a.T) })
  },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  bindPickerChange(e) {
    let v = e.detail.value, T = this.data.array[v];
    a.T = T; wx.setStorageSync("theme", T);
    this.setData({ index: v, page: u.sP(this.data.page, a) });
  },
  switchnm(e) {
    let p = this.data.page, value = e.detail.value;;
    if (!p[2].content[1].checked) {
      wx.setStorageSync("nightmode", value); a.nm = value;
      this.setData({ nm: value, page: u.sS(p, e.detail.value, 2, 0) });
    } else { this.setData({ page: u.sS(p, !value, 2, 0) }) }
  },
  switchnmAC(e) {
    let value = e.detail.value; wx.setStorageSync("nightmodeAutoChange", value);
    let nm = u.nm(new Date()), temp = wx.getStorageSync("nightmode"), p = this.data.page;
    a.nm = nm; p = u.sS(u.sS(p, temp, 2, 0), value, 2, 1)
    this.setData({ nm: nm, page: p });
  },
  displayStart() { let page = this.data.page; page[2].content[2].display = !page[2].content[2].display; this.setData({ page: page }) },
  setStart(e) { this.setData({ page: u.sPV(this.data.page, e.detail.value, 2, 2) }) },
  displayEnd() { let page = this.data.page; page[2].content[3].display = !page[2].content[3].display; this.setData({ page: page }) },
  setEnd(e) { this.setData({ page: u.sPV(this.data.page, e.detail.value, 2, 3) }) },
  back() { u.back() },
  onUnload() { a.nm = u.nm(new Date()) },
})