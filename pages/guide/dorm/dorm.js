var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    // page: [
    //   { tag: 'head', title: '寝室' },
    //   { tag: 'list', head: '寝室分布', content: [{ text: '本部校区', url: 'details/dorm1' }, { text: '净月校区', url: 'details/dorm2' }], },
    //   { tag: 'list', head: '寝室环境', content: [{ text: '室内布局', url: 'details/dorm3' }, { text: '公共区域', url: 'details/dorm4' }] },
    //   { tag: 'p', head: '禁用物品', text: '宿舍内严禁使用违章电器，如电熨斗、电吹风、电炉、电水壶、电热毯、热得快等大功率电器。床帘和吊椅也是不允许的。(只可以挂蚊帐)' },
    //   { tag: 'p', text: '校会君偷偷告诉萌新们一句：元旦的时候男女生可以互串寝室哦~' },
    //   { tag: 'foot' },
    // ], 
    // page: [
    //   { tag: 'head', theme: a.T, },
    //   { tag: 'list' },
    //   { tag: 'list' },
    //   { tag: 'p' },
    //   { tag: 'p' },
    //   { tag: 'foot' },
    // ],
  },
  // onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) }, 
  onLoad(e) {
    let that = this;
    wx.request({
      url: 'http://mrhope.top/miniProgram/dorm.json', header: { 'content-type': 'application/json' },
      success(res) {
        console.log(res); that.setData({ T: a.T, nm: a.nm, page: u.sP(res.data, a, e), }); console.log("set complete")
      }
    });
  },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } }, img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})