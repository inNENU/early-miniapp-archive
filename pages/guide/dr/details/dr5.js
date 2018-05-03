var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'head', title: '净月二食堂' },
      {
        name: 'p', text: '净月校区有两个食堂，分别为中快食堂和二食堂，中快食堂有三层、二食堂有两层。二食堂一楼为超市、快递点等，二楼为基本餐，三楼选择较多。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6C/CC/CgpQU1l8VESANLrsAADDaSbHfIY8042344/imageView/v1/thumbnail/640x0' },
{ name: 'h3', text: '二楼' },
      {
        name: 'p', text: '基本餐供应时间：早 06:30—08: 30 （供应包子、饼、粥、豆浆等）； 午11: 00—12: 30 ； 晚 16:30—18: 00。 米饭0.5元一碗，素菜一份1-3元，荤菜半份3-4元左右，吃一顿一荤两素的午晚餐大概7元左右，吃一顿小菜+包子 + 粥的早餐大概5元左右。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6C/CD/CgpQU1l8VPKAOvxAAAm5Z6SiyYw5143137/imageView/v1/thumbnail/640x0' },
{ name: 'h3', text: '三楼（营业时间：6:00-22:00）' },
      { name: 'p', text: '二食堂三楼平面图' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7F/49/CgpQVFl8VTuAcH7RAACnPGh4KvI9487017/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6C/CD/CgpQU1l8VYeAM9CBAACglC87gOA6378496/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/90/0C/wKjmqVl8VYaAOwqJAADK5DXWcbE2854669/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/90/0C/wKjmqVl8VYaACleHAADKhum5Tao9037644/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/90/0C/wKjmqVl8VYSAebr_AAB4ILOTUj48596260/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/90/0C/wKjmqVl8VYWABsGVAACmFGO0dPc4438614/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6C/CD/CgpQU1l8VYSAaI6gAACdOFKgzx43785589/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/81/07/wKjmqll8VhGACFAyAAzwRYn29-02862138/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6C/D0/CgpQU1l8V46AEh-eAA0xSSlPcDs0040481/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '二食堂三楼选择较多，口味也不错，可以自己一个人吃，几个人一起吃也可以点炒菜，价格适中，价位在7-15元左右，吃一顿饭平均需要10元。（还有插座可以充电或者在人少时自习）' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7F/4A/CgpQVFl8VV6AWWAKAADQA8Qfg147450008/imageView/v1/thumbnail/640x0' },
    ],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})