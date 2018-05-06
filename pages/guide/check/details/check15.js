var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '本部校区校门' },
      { name: 'h3', text: '本部校区图' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/AF/wKjmqll92yaAUjGWAAO2gdQVjjE4308853/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '本部正门' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/E3/CgpQVFl9v4GAa0YUAADNGstGXzI9309641/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '这是学校的正门，进门正对着就是学校的图书馆。如果下车到了这个门，那么你要走的路是最远的，当然学校不是太大，所以不会走太久。要去报到的话往图书馆方向一直走，之后左拐到尽头后再右拐，一直往前走就能见到搭着橘色棚子的迎新摆台处。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6F/D7/CgpQU1l-wKKACFf_AAC_VnGWuvY5287777/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '本部东北门（动植物园对面）' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7B/F0/CgpQVFl63yKAX_eMABKbcZnJE1Q5356069/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '这是离三舍最近的校门，正对着动植物公园门口，下车往左望分别就是三舍D、C、B、A，走两步就到了，所以很多同学打的回校都会让司机开到这个门。作为新生没有钥匙和手续，不能马上去宿舍，因此进门后往前走几步右拐，一直往前走就能见到搭着橘色棚子的迎新摆台处。' },
      { name: 'h3', text: '本部北门(东师会馆、幼儿园旁)' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/8E/71/wKjmqVl7P7qAc5ejABN62rJgECY0133923/imageView/v1/thumbnail/640x0' },
      { name: 'p', text: '从这个门进去右手边是师大附属幼儿园，往前走遇到第一个岔路左拐，一直往前走就能见到搭着橘色棚子的迎新摆台处。' },
      { name: 'h3', text: '' },
    ],
  },
  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },
  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } },
  back() { u.back() },
})