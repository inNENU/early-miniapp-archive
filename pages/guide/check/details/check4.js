var u = getApp().util, a = getApp().globalData; Page({

data: { page: [
{ name: 'head', title: '坐飞机到学校'},
{ name: 'h3', text: '到本部' },
{ name: 'h3', text: '机场巴士-公交' },
{ name: 'p', text: '最佳方案——约1小时3分钟，需步行417米，21元。机场巴士1号线/ 6号线→306路/66路/6路/6路夜车。1.乘坐机场巴士1号线到达人民广场站即终点站，20元（机场巴士-首：06:00，末：18:00 ）2.步行约323米，到达人民广场公交站（西南方向）（从人民广场终点站到人民广场公交站）' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/82/2F/wKjmqll9W5yASllQAACz-fycnWU9488751/imageView/v1/thumbnail/640x0' },
{ name: 'n', text: '▲图为从人民广场终点站到人民广场公交站地图' },
{ name: 'p', text: '3.乘坐306路/66路/6路/6路夜车到达自由大路站，1元4.步行约63米 到达东北师范大学（东北方向）' },
{ name: 'img', src:'https://pic.kuaizhan.com/g2/M01/7D/95/CgpQVFl7Pf6AXyZiAAEwMfUNe0M5133029/imageView/v1/thumbnail/640x0' },
{ name: 'n', text: '▲图为东北师范大学正门' },
{ name: 'h3', text: '动车-其他' },
{ name: 'p', text: '先坐动车到长春站，约15分钟，每天大约有16趟车（一等座：10.5元；二等座：8.5元）再从长春站到东北师范大学。一定要查好班车时间，提前规划（长春站到本部的方法见【到火车站-本部】）。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/70/wKjmqll9npSAU_AcAAHqvU6w-tg0508498/imageView/v1/thumbnail/640x0' },
{ name: 'n', text: '▲图为龙嘉到长春动车时刻表' },
{ name: 'h3', text: '打车' },
{ name: 'p', text: '出租车到本部的价格一般是100左右，约50分钟。长春市龙嘉机场在离长春市区非常非常远的郊区，交通极其不便，打车费用惊人。' },
{ name: 'h3', text: '到净月' }, 
{name: 'h3', text: '打车' },
{ name: 'p', text: '机场-市内80-90（不含高速费），市内-净月校区20，讲价完大约100多点。可以走机场高速-长平高速，到净月收费站下，40分钟左右。' },
{ name: 'h3', text: '机场大巴-公交' },
{ name: 'p', text: '乘坐机场大巴到人民广场(20元)，转乘160（2元）至东北师范大学站。全程2小时左右。' },
{ name: 'h3', text: '动车-其他' },
{ name: 'p', text: '先坐动车到长春站，约15分钟，每天大约有16趟车（一等座：10.5元；二等座：8.5元），再从长春站通过以上途径坐到净月校区。坐动车一定要查好班车时间，提前规划。' },   

],

},

onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})