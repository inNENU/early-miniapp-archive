var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'head', title: '快递' },
      { name: 'h3', text: '快递' },
      {
        name: 'p', text: '萌新们要寄东西的话，地址就填学校的地址，然后想要在哪取的话就填那里可以取到的快递，例如我在本部，我的宿舍离菜鸟驿站很近，菜鸟驿站那可以取圆通的快递，那就可以寄圆通快递。学校（邮寄）地址：本部校区：吉林省长春市南岭街道人民大街5268号净月校区：吉林省长春市净月大街2555号' },
{ name: 'h3', text: '本部校区' },
      {
        name: 'p', text: '1.菜鸟驿站是学校为便捷师生收发快递设立的快递信件派发点。目前进驻的快递服务公司有申通、圆通、百世、优速（与百世同一窗口）、顺丰、京东。部分小型EMS邮件也会由菜鸟驿站代理签收。菜鸟驿站，离三舍很近。所以如果要寄东西到学校的话尽量让卖家发这些快递哦~服务站地点：学生二舍北侧（靠近自由大路侧） 营业时间：8: 10—17: 00（周六、周日正常派发快递信件） 服务电话：13596437711(服务站)监督电话：85099915' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/D3/3F/CgpQVFmTzreAE5NnAADYUjkDNJ82583503/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '2.本部南门（文昌路）是露天快递集中地，进驻的快递有中通快递、宅急送、顺丰速运、天天快递、当当黄马甲等。（但是同学们反映南门的很多快递在上学期期末的时候搬了。中通和韵达快递搬到了五舍研究生楼北侧食杂店里）' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/9B/wKjmqll8EsWAVkxvAAbKDJQsOHU3994066/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '3.EMS邮政寄件比较具体，行政楼或各学院都可收到。' },
      { name: 'h3', text: '净月校区' },
      {
        name: 'p', text: '1.校园内快递中心：可取EMS、邮政速递、邮政包裹、顺丰、中通、申通、天天、国通、安能，卓越亚马逊待定。营业时间：8: 30 - 18:00，四季时间不变，节假日不休息。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/9B/wKjmqll8EymAHM31AAInsgjOOrQ1404390/imageView/v1/thumbnail/640x480' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/9C/wKjmqll8E4GAPTk9AAIIFb-nbus4743377/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7E/E0/CgpQVFl8E4OAZvViAAMnCuDBMNk3332936/imageView/v1/thumbnail/640x480' },
      {
        name: 'p', text: '2.校园外快递中心：可取京东、快捷、百世汇通、圆通、韵达。服务地点：博硕路雕塑门（北门）对面绿墅快递中心营业时间：8: 00 - 18:00 （周末：8: 00 - 17:00或17：30），四季时间不变，节假日不休息。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7E/E0/CgpQVFl8E9uAL9FQAAGc8JFW1og0722465/imageView/v1/thumbnail/640x0' },
{ name: 'p', text: '3.中医药大学北门点(即东师西北角小门):可取当当，黄马甲快递。4.其他一些快递如唯品会的寄件，收件地址会在长春中医药大学正门门口，包裹到货后配送员会在电话或短信中说明收货地点，以此为准。' },
{ name: 'h3', text: '净月校区各生活点位置' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/8F/A8/wKjmqVl8FE2AMGxkAAP6Jt25fug6111239/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/9C/wKjmqll8FHCAR5_JAAEzo8X937I2716838/imageView/v1/thumbnail/640x0' },
    ],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})