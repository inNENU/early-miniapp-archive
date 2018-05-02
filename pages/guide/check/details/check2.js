var u = getApp().util, a = getApp().globalData; Page({

data: { page: [
{ name: 'head', title: '坐火车到校（到长春站）'},
{ name: 'p', text: '长春站有南北出站口。1.南出站口有直达本部校区的公交线路。（但目前还没开放，下车去南广场只能从通道走过去）2.北出站口（对面有万达的那个）到南出站口：出站后左转直走，左手边有南北广场通道。' },
{ name: 'h3', text: '到本部' },
{ name: 'h3', text: '公交' },
{ name: 'p', text: '南出站口乘6路，66路，306路，至自由大路站，票价1元，车程约20分钟。' },
{ name: 'h3', text: '打车' },
{ name: 'p', text: '约13—17元，高峰点会堵车。（不堵就很快）（关于打车下面会有详细说明）。' },
{ name: 'h3', text: '地铁' },
{ name: 'p', text: '票价2元，从综合换乘中心上长春站北站，往红咀子方向，到东北师大站下车，最快8分钟可到达，下车就是东师校内——校医院门口啦。但是开往红咀子方向的地铁运营时间是6：06-21：46，在这之外的时间坐不了哦。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/2F/CgpQVFl9NjOAZ5Y7AACe3Nft1wg1057471/imageView/v1/thumbnail/640x0' }, 
{ name: 'n', text: '▲图为东北师大站时刻表' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/81/EB/wKjmqll9NjKAI082AAIu81seVvU0019750/imageView/v1/thumbnail/640x0' },
{ name: 'n', text: '▲图为东北师大站门口' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/81/EB/wKjmqll9NjGAJbC1AAJ2AnvSs1k0012295/imageView/v1/thumbnail/640x0' },
{ name: 'n', text: '▲图为地铁内部环境' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/81/EB/wKjmqll9NjCAE4P7AACwAG-p-Fw0371282/imageView/v1/thumbnail/640x0' },
{ name: 'n', text: '▲图为地铁票' },
{ name: 'h3', text: '到净月' },
{ name: 'h3', text: '公交' },
{ name: 'p', text: '南出站口乘160路到东北师范大学站（站名：东北师范大学，千万不要在动植物公园站或者体育场站下车，那个是本部校区），票价2元，车程约1小时。' },
{ name: 'h3', text: '打车' },
{ name: 'p', text: '40分钟左右，约40元（关于打车建议看下后面的【温馨提示——关于打车】）。' },
{ name: 'h3', text: '轻轨' },
{ name: 'p', text: '出了火车站之后，按照地下通道的指示牌可以找到轻轨车站，坐到东北师范大学站。1.3号线（南出站口）：1小时左右（如果人多的话会排队买票，较为耗时），3元。南出站口出站后右转即可看到“长春轻轨”字样，乘3号线到东北师范大学站。2.4号线转3号线（北出站口）：长春站北（在北出站口上车）—卫星路（站内换乘3号线）—东北师范大学站(轻轨3、4号线运营时间均为6:00—21:00。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6D/C4/CgpQU1l9QgaAQKvNAACVn-t0kcA0468354/imageView/v1/thumbnail/640x0' },
{ name: 'n', text: '▲图为轻轨3号线路线图' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6D/C4/CgpQU1l9QgWAJYJhAAF4cJECr-s3482228/imageView/v1/thumbnail/640x0' },
{ name: 'n', text: '▲图为轻轨3号线转4号线地图' },
{ name: 'h3', text: '地铁-轻轨' },
{ name: 'p', text: '4元。从综合换乘中心上长春站北站，往红咀子方向，到卫星广场站下车。开往红咀子方向的地铁运营时间是6：06-21：46，在这之外的时间坐不了哦。之后换乘轻轨3号线到东北师范大学站。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/2F/CgpQVFl9NjKAb5W3AAENuxRnTU02539158/imageView/v1/thumbnail/640x0' },
{ name: 'n', text: '▲图为1号线站点' },

],

},

onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})