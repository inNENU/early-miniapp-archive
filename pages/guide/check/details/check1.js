var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'head', title: '认准校区和校门' },
      { name: 'p', text: '东师有两个校区，萌新们可以根据录取通知书上写的学院找到相应的校区（新生手册里有些各个学院对应的校区~），报到的时候千万别走错校区啊！！！' },
      { name: 'h3', text: '以下院系或专业本位于部校区' },
      { name: 'p', text: '教育学部、心理学院、文学院、历史文化学院、外国语学院、马克思主义学部、数学与统计学院、物理学院、化学学院、生命科学学院、地理科学学院、环境学院（大一）、体育学院' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/AF/wKjmqll92yaAUjGWAAO2gdQVjjE4308853/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '本部正门' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/E3/CgpQVFl9v4GAa0YUAADNGstGXzI9309641/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '这是学校的正门，进门正对着就是学校的图书馆。如果下车到了这个门，那么你要走的路是最远的，当然学校不是太大，所以不会走太久。要去报到的话往图书馆方向一直走，之后左拐到尽头后再右拐，一直往前走就能见到搭着橘色棚子的迎新摆台处。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6F/D7/CgpQU1l-wKKACFf_AAC_VnGWuvY5287777/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '本部东北门（动植物园对面）' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7B/F0/CgpQVFl63yKAX_eMABKbcZnJE1Q5356069/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '这是离三舍最近的校门，正对着动植物公园门口，下车往左望分别就是三舍D、C、B、A，走两步就到了，所以很多同学打的回校都会让司机开到这个门。作为新生没有钥匙和手续，不能马上去宿舍，因此进门后往前走几步右拐，一直往前走就能见到搭着橘色棚子的迎新摆台处。' },
      { name: 'h3', text: '本部北门（东师会馆、幼儿园旁）' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/8E/71/wKjmqVl7P7qAc5ejABN62rJgECY0133923/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '从这个门进去右手边是师大附属幼儿园，往前走遇到第一个岔路左拐，一直往前走就能见到搭着橘色棚子的迎新摆台处。' },
      { name: 'h3', text: '以下院系或专业位于净月校区' },
      { name: 'p', text: '政法学院、经济学院、商学院、外国语学院、音乐学院（研究生在本部）、美术学院、信息科学与技术学院、传媒科学学院、民族教育学院、东北师范大学罗格斯大学•纽瓦克学院' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/82/B2/wKjmqll93pWAaqvCAAQbHyLV_ko9159655/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '净月东门' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7D/AF/wKjmqll637CAd3TdAB92hvI6uGk6755607/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '这个门正对着图书馆，进门后一直往前走，往前走（这条路有点长），经过大菜花（其实是生命树）后再往前走，走到头就是图书馆前的空地了，迎新摆台就在那里。' },
      { name: 'h3', text: '净月北门（雕塑门）' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/8E/77/wKjmqVl7QcGAJ2j_AAGRcU9FO803479870/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '从这个门进去之后直走，看到右手边有一些雕塑（或者图书馆）后右拐，一直走到图书馆前的空地，那里就是迎新摆台的地方。' },
      {
        name: 'p', text: '但是涉及到以下提到的专业的萌新们注意啦，千万要分清自己入学后的校区哦：1.非公费师范师的思想政治教育专业在马克思主义学部，公费师范的思想政治教育专业在政法学院2.环境学院的学生在大一结束后会从本部校区搬到净月校区3.英语系的学生在本部的外国语学院，而日语系、俄语系、商务英语系的学生在净月的外国语学院4.音乐学院的研究生在本部' },
{ name: 'h3', text: '两校区地址' },
      {
        name: 'p', text: '如果要邮寄东西到学校，或者在淘宝上买东西直接寄到学校的，可以按照下面的地址填写：本部校区：吉林省长春市南关区南岭街道人民大街5268号 邮编：130022。净月校区：吉林省长春市净月经济开发区净月大街2555号 邮编：130117' },

],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})