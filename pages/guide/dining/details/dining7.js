var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '北苑一楼' },
      { name: 'h3', text: '基本餐' },
      { name: 'p', head: '基本餐价格', text: '米饭￥0.25/两，素菜￥1—￥2.5，荤菜￥2.5—￥3.5。' },
      { name: 'p', head: '基本餐供应时间', text: '早餐供应时间为：6：30-9：00\n(供应面条、粥、豆浆、包子、炒菜等)' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7F/20/CgpQVFl8L_OAHY1lAACOeqUB1ME7269170/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/8F/E0/wKjmqVl8LxeAHK05AADVXAej1S89823382/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6C/A0/CgpQU1l8LpOAMi19AACoaWWW_IU6360955/imageView/v1/thumbnail/640x480', text: '图为早餐主食区' },
      { name: 'p', head: false, text: '午餐供应时间为：11：00-12：30\n晚餐供应时间为：16：30-18：00\n' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7F/21/CgpQVFl8MNuAe_HxAAEWIvTNzlY7442671/imageView/v1/thumbnail/640x480', text: '图为餐盘餐具' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/8F/E1/wKjmqVl8MNyAdHDAAAEap3hwtMA9244954/imageView/v1/thumbnail/640x480', text: '图为荤菜区' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6C/A2/CgpQU1l8MNuAJvPoAACdm1MkC5M9583013/imageView/v1/thumbnail/640x480', text: '北苑基本餐真诚服务同学' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7F/22/CgpQVFl8MYWAPP46AAEsULy1MNY8412893/imageView/v1/thumbnail/640x480', text: '▲北苑一楼北侧' },
      { name: 'p', text: '' },
      { name: 'h3', text: '一楼南侧档口' },
      { name: 'p', head: '添加档口详细信息（档口卖什么）再加点图。', text: '开封包子、米线、麻辣烫、蒸功夫盖浇饭、妈妈亲饺子、李阿峰麻辣拌、西部拉面、营养套餐、老鸭粉丝汤、煎饼王、手抓饼' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7F/22/CgpQVFl8MYSABPwnAADYSpQdVQg1458673/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/DE/wKjmqll8MVmASgnWAANAnzRXmpc5298797/imageView/v1/thumbnail/640x480' },
      { name: 'foot' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})