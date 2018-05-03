var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'head', title: '洗浴' },
      { name: 'h3', text: '洗浴（公共浴池）' },
      { name: 'p', text: '东师的浴池是大澡堂，对，没有隔间，没有帘子，有阿姨或大爷可以为你搓澡(搓澡费小贵)。洗澡的时候把一卡通插在感应槽里就会出热水。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/A0/wKjmqll8GAKAXVnDAABxHPNkxug3166146/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '浴池位置' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/8D/wKjmqll8DGqAMKMNACpxkbe-I1U5235384/imageView/v1/thumbnail/640x0' },
      { name: 'n', text: '▲本部：学生八舍旁，幼儿园园长培训中心后侧（二楼可以自带吹风机吹头发）' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/8B/04/wKjmqVl563CADQSUAABpllzyNkA1189650/imageView/v1/thumbnail/640x0' },
      { name: 'n', text: '▲净月：教师进修中心一楼（浴室有吹风机）' },
      { name: 'h3', text: '浴池开、关门时间' },
      {
        name: 'p', text: '本部：7:00-20:30净月：7: 00 - 20:30假期等情况另行通知。' },


],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})