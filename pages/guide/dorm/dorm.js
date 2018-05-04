var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '寝室' },
      { name: 'list', head: '寝室分布', content: [{ text: '本部校区', url: 'details/dorm1' }, { text: '净月校区', url: 'details/dorm2' }], },
      { name: 'list', head: '寝室环境', content: [{ text: '室内布局', url: 'details/dorm3' }, { text: '公共区域', url: 'details/dorm4' }] },
      { name: 'p', head: '禁用物品', text: '宿舍内严禁使用违章电器，如电熨斗、电吹风、电炉、电水壶、电热毯、热得快等大功率电器。床帘和吊椅也是不允许的。(只可以挂蚊帐)' },
      { name: 'p', text: '校会君偷偷告诉萌新们一句：元旦的时候男女生可以互串寝室哦~' },
      { name: 'foot' },
    ], grey: true,
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) }, onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } }, img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})