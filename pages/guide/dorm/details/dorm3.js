var u = require('../../../../utils/util.js');
const a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '室内布局' },
      { name: 'h3', text: '室内大体布局描述' },
      { name: 'p', text: '除纽瓦克学院寝室为四人间以外，其他学院寝室均为标准六人间。寝室内每侧三个床位，为上床下桌设计。桌边有衣柜，衣柜门上有锁孔，可以自备小锁，(锁孔较小勿备大锁）。每个床位脚边墙壁上均配备一三孔插座与一双孔插座用于供电。床的尺寸：长1.9-2m，宽0.85-0.9m。学校会为学生们准备褥子，至于被子、床单、枕头等，大家可以自行准备或者到宿管阿姨那里购买（是一整套哒，480元左右）。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/4A/wKjmqll9feWAP365AAC4FSISITg1558713/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/4B/wKjmqll9fi-ARLWiAAFJ8uOp2Dk5212959/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/82/4B/wKjmqll9fi6APjeZAAHI3lLh0hI7811935/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '晾衣服' },
      { name: 'p', text: '本部三舍的寝室没有阳台（除了部分位于阴面的寝室，也就是窗朝向动植物公园的寝室），但是中间的空地上方是有晾衣杆的，是的，没有错，要在室内晾衣服；而净月的公寓大多是有阳台的，阳台上装有暖气片。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/82/4D/wKjmqll9gGWAVRZhAAKqvxFS2CU2939649/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/91/CgpQVFl9gGSAcbKbAAJ-nG7fOMk7514748/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '空调与暖气' },
      { name: 'p', text: '想知道空调装在哪吗？？？在虚无里……因为宿舍里没有空调，也没有电风扇。但是不代表长春天气不热，所以需要自备小电风扇，有那种USB小风扇，可以上网看看，当然萌新们来的时候应该已经不是太热了。冬天的幸福感就来源于暖气片啦!去年大概10月20多号开始陆续供暖，在室内还是挺舒服的，穿春秋天的衣服完全没有问题，所以也不用带太厚的被子，当然冬天还盖夏天的被子的话大部分人也是会感到冷的。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/4E/wKjmqll9ggGAXwoJAAD9dbUhBAw0816754/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '网线插口' },
      { name: 'p', text: '>进门左右手边的墙壁上各有一个网线插口哦，所以只能插两条网线，如果要多人同时插网线则需要买交换机。' },
      { name: 'h3', text: '卫浴' },
      { name: 'p', text: '很抱歉卫浴都处于公共区域内' },
      { name: 'h3', text: '' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})