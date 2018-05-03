var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'head', title: '报道',},
      { name: 'h2', text: '到校路线' },
      { name: 'list', content: [{ text: '认准校区和校门', url: 'details/check1' }, { text: '坐火车到校（长春站）', url: 'details/check2' },{ text: '坐火车到校（长春西站）', url: 'details/check3' },{ text: '坐飞机到校', url: 'details/check4' },{ text: '温馨提示（关于打车）', url: 'details/check5' },{ text: '关于接站', url: 'details/check6' }], },
      { name: 'h2', text: '需带物品' },
      { name: 'list', content: [{ text: '需带物品', url: 'details/check7' },{ text: '校内外超市', url: 'details/check8' },] },
      { name: 'h2', text: '报到流程' },
      { name: 'list', content: [{ text: '报到流程', url: 'details/check9' },{ text: '缴费相关', url: 'details/check10' },{ text: '绿色通道', url: 'details/check11' },{ text: '使用校园卡', url: 'details/check12' },{ text: '体检、户口迁移、其他', url: 'details/check13' },{ text: '防盗防骗攻略', url: 'details/check14' },] },
    ],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})