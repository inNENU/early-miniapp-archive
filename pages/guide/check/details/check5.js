var u = getApp().util, a = getApp().globalData; Page({

data: { page: [
{ name: 'head', title: '温馨提示（关于打车）'},
{ name: 'h3', text: '关于出租车' },
{ name: 'p', text: '长春站、长春西站出站口门口黑车特别特别多，人生地不熟的来可能会被宰（全国哪个城市都一样），大家千万不要坐黑车在长春站北出站口地下是有一个综合换乘中心的，出了火车站之后，按照地下通道的指示牌，就可以到达出租车的换乘中心，非常便捷。这里可以前往轻轨和出租车换乘通道。这里的出租车是可以信赖的！另外，上车师傅问你到哪，就是到“东北师大本部”或者“东北师大净月校区”。如果师傅不知道，就说“人民大街与自由大路交汇那个东北师大”（本部）或者“博硕路上面那个”（净月）。' },
{ name: 'h3', text: '关于目的地' },
{ name: 'p', text: '1．本部正门也就是西门，你下车需要横穿马路 。2．本部北门其实有两个，师傅只能听懂的是幼儿园那个门，或东师会馆那个门。好处在于你不用横穿马路。3.净月东门在净月大街上，北门在博硕路上。4.净月的路线可能曲折一点。5.私家车进入师大校园是要收费的。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/AF/wKjmqll92yaAUjGWAAO2gdQVjjE4308853/imageView/v1/thumbnail/640x0' },
{ name: 'n', text: '▲图为本部校区' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/82/B2/wKjmqll93pWAaqvCAAQbHyLV_ko9159655/imageView/v1/thumbnail/640x0' },
{ name: 'n', text: '▲图为净月校区' },





],

},

onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})