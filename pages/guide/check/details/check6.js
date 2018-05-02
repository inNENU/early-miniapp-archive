var u = getApp().util, a = getApp().globalData; Page({

data: { page: [
{ name: 'head', title: '关于接站'},
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/82/76/wKjmqll9ojOAbWtlAA0OL5bOQqo2119394/imageView/v1/thumbnail/640x0' },
{ name: 'n', text: '▲图为接站人员' },
{ name: 'p', text: '每年校学生会都会负责新生接站任务。今年接站的地点是在长春站北出站口（下火车正常出站即可）和长春西站，接站时间是8月15日13：30-22：00、8月16日8：00-22：00，工作人员举着“东北师范大学”的牌子在那里等着大家。接站日期按惯例是和学院正式报到日期同时进行，具体的安排会第一时间在“东师青年”微信公众平台上及时发布。接到大家后，工作人员会带大家到相关地点登记，之后将由工作人员统一带到停车场乘车。接站时学校配有统一的校车（新生手册上面所说的包车并不指这个），学生、家长都可以上，不收取任何的费用，校车会将大家直接送往报到处。但是机场学校不负责接哦。' },

],

},

onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})
