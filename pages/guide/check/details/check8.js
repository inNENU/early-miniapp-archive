var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'head', title: '校内外超市' },
      { name: 'h3', text: '本部校区' },
      {
        name: 'p', text: '校内：1.北苑超市（较大）：北苑地下一楼。2.南苑超市（较小）：南苑食堂东南角。校外-恒客隆:路线1：从三舍旁的校门出发（动植物园公园对面）：（1）步行：步行时间约22分钟，步行路程约1.6公里。(2）公交：从三舍旁的校门出去到动植物公园门口坐车25路：05:30-21:10；1元，约20分钟。（体育场站上车，桂林路站下车。228路/218A路/238路：05:40-20:20；1元，约24分钟。（动植物公园站上车，同志街站下车）80路内环：05:48-18:30；1元，约22分钟。（体育场站上车，同志街站下车）。218B路：06:40-19:50；1元，约37分钟。（动植物公园站上车，同志街站下车）路线2：从正门出发（1）步行：步行时间约13分钟，步行路程约970米（2）公交： 120路副B线/ 240路：05: 50 - 18:00/06:00-19:50；1元，约23分钟。（自由大路站上车，同志街下车）' },
{ name: 'h3', text: '净月校区' },
      {
        name: 'p', text: '校内1.二食堂楼下（较大)2.浴池门口（较小）校外-沃尔玛1.步行（捷径）：从体育场旁边的小门出去，穿过小区，右转便是，大约10分钟路程。2.公交： 120路副B线：05: 50 - 18:00,1元，约23分钟。（东北师范大学站上车，吉林警察学院站下车）158路东环：06: 00 - 18:30；1元，约31分钟。（吉林财经大学上车，迅驰广场下车）160路或轻轨三号线转158路东环： 05: 30 - 18:00，2元（东北师范大学站上车，金屏街站下车）06: 00 - 21:00，2元（东北师大入口进，华桥外院入口出）  06: 00 - 18:30；1元，（净月大街站上车，迅驰广场站下车）约29分钟' },


],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})