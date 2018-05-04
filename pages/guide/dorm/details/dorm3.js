var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '室内布局' },
      { name: 'p', head: '室内大体布局描述', text: '除纽瓦克学院寝室为四人间以外，其他学院寝室均为标准六人间。寝室内每侧三个床位，为上床下桌设计。桌边有衣柜，衣柜门上有锁孔，可以自备小锁(锁孔较小勿备大锁)。每个床位脚边墙壁上均配备一三孔插座与一双孔插座用于供电。床铺尺寸：长1.9m-2m，宽0.85m-0.9m。寝室方面已经为同学们准备了褥子，至于被子、床单、枕头等，大家可以自行准备或者到宿管阿姨那里购买(一整套480元左右)。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/4A/wKjmqll9feWAP365AAC4FSISITg1558713/imageView/v1/thumbnail/640x0', text: '寝室未入住实拍图' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/4B/wKjmqll9fi-ARLWiAAFJ8uOp2Dk5212959/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/82/4B/wKjmqll9fi6APjeZAAHI3lLh0hI7811935/imageView/v1/thumbnail/640x0' },
      { name: 'p', head: '晾衣服', text: '本部三舍只有阴面寝室拥有阳台(窗朝向公路一侧的寝室)，其他寝室中间的空地上方装有晾衣杆。由于禁止在走廊栏杆上晾衣物，所以同学们只能在寝室内晾衣服；净月公寓大多是有阳台的。由于阳台上装有暖气片，一年四季衣服都能很快晾干。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/82/4D/wKjmqll9gGWAVRZhAAKqvxFS2CU2939649/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/91/CgpQVFl9gGSAcbKbAAJ-nG7fOMk7514748/imageView/v1/thumbnail/640x0' },
      { name: 'p', head: '空调与暖气', text: '寝室内未安装空调或电风扇。为度过夏天，可以考虑自备小电风扇。冬天供暖期很长而且暖气温度很高。每年会在10月中旬开始陆续供暖，在室内还是挺舒服的，穿春秋天的衣服完全没有问题，所以不用带太厚的被子。当然冬天还盖夏天的被子的话大部分人也是会感到冷的，校会君还是提醒一下有必要准备两床被。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/4E/wKjmqll9ggGAXwoJAAD9dbUhBAw0816754/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '此处放置一图片' },
      { name: 'p', head: '网线插口', text: '进门左右手边的墙壁上会有一侧安装无线路由器，路由器上提供了四个网线接口以供连接使用，如果四个网线接口无法满足需求可以考虑购买并使用交换机。' },
      { name: 'p', head: '卫浴', text: '所有学生宿舍均没有独立卫浴。' },
      { name: 'foot' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})