var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'head', title: '净月中快餐厅（一食堂）' },
      {
        name: 'p', text: '净月校区有两个食堂，分别为中快食堂和二食堂，中快食堂有三层、二食堂有两层。中快餐厅共三层楼，每一层楼有自己的特色。' },
{ name: 'h3', text: '一楼' },
{ name: 'p', text: '1.基本餐南侧：烤肉木桶饭、吉品川味排骨饭、刀削面、安徽风味鸡蛋灌饼、杭州小笼包、中韩简餐、粗粮细做、麻辣烫。 北侧：麻坡面、麦多馅饼、过桥米线、脆皮鸡排饭、好享扒饭、山西饼、营养粥、鸡柳卷饼、东师饺子王、重庆鸡公煲。价位：大概在7-16元左右。供应时间大致为7：00-20：00(每个档口开关时间不定，视具体情况而定) 。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/81/03/wKjmqll8UW2AbtrwABOfGWDJyPo4816847/imageView/v1/thumbnail/640x0' },
{ name: 'p', text: '中快餐厅新开了面包房哦' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6C/CA/CgpQU1l8UdOAO3QgAAI-e1-EYxk0947389/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6C/CA/CgpQU1l8UcuADU1nAAHnx5DPJ3g8547223/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6C/C9/CgpQU1l8UbqAITL_AAFPAcP8i4E0094340/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '二楼' },
      {
        name: 'p', text: '二楼进门前侧有干锅煎肉饭、基本餐和虾滑，右侧进去还有麻辣香锅，再往左转是普通餐。基本餐供应时间：早6：30-8：30；午11：00-12：30；晚 16：30-18：00。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/81/03/wKjmqll8UXiAWYpaABayDaTyDds2256453/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '三楼' },
      {
        name: 'p', text: '三楼共分为两个部分，一个是前面大厅的餐厅，一个是后面的清真餐厅。大厅的早饭和午饭都为自助餐，种类丰富，价格亲民。供应时间：早 6：30-10：00；午 11：00-12：30；晚饭可点餐，并承接大小型聚餐和活动。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/81/03/wKjmqll8UYGAEr6VABSSiNhhLok3681930/imageView/v1/thumbnail/640x0' },
{ name: 'p', text: '清真餐厅：从三楼餐厅侧面进去，也可以从清真餐厅大门上楼。供应时间：7：00-20：00。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7F/47/CgpQVFl8UYeAG_X-AA5mzI0TAL47744116/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/81/03/wKjmqll8UYyAJlNdABLz9TsU-UA9539984/imageView/v1/thumbnail/640x0' },
    ],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})