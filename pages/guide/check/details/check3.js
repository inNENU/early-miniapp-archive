var u = getApp().util, a = getApp().globalData; Page({

data: { page: [
{ name: 'head', title: '坐火车到校（长春西站）'},
{ name: 'h3', text: '到本部' },
{ name: 'h3', text: '公交' },
{ name: 'p', text: '159路到桂林路站，转乘25路、160路到动植物公园站。' },
{ name: 'h3', text: '有轨电车-公交' },
{ name: 'p', text: '乘坐55路有轨电车到工农大路站，到马路（一定要到马路对面，要不你就惨了）对面转乘80路到东北师范大学站下车。' },
{ name: 'h3', text: '打车' },
{ name: 'p', text: '约24元，40分钟左右。千万不要坐门口招揽客人那种“40一位”“50一位”的黑车，等一会儿就会有很多出租车。' },
{ name: 'h3', text: '到净月' },
{ name: 'h3', text: '公交-轻轨' },
{ name: 'p', text: '159路到宽平大桥站，转乘轻轨3号线到东北师范大学站。159路首车：05:40，末车：19:00轻轨3号线运营时间为6:00—21:00' },
{ name: 'h3', text: '有轨电车-轻轨' },
{ name: 'p', text: '乘坐55路有轨电车到宽平大桥站，转乘轻轨3号线到东北师范大学站。55路有轨电车首车：06:00，末车：19:10轻轨3号线运营时间为6:00—21:00。' },
{ name: 'h3', text: '打车' },
{ name: 'p', text: '约50元，50分钟。' },

],

},

onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})