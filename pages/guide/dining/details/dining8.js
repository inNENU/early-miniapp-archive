var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '北苑二楼' },
      { name: 'h3', text: '二楼南侧' },
      { name: 'p', head: '下面需要店铺以及相应的简介', text: '二楼的店铺有营养快餐、东北小炒、韩国明洞料理、四川风味、五谷鱼粉、麦多馅饼、麻辣香锅、烤肉木桶饭、北京风味、正大炸鸡汉堡、尚品双拼饭、哞小姐。选择较多，味道不错，但是一般排队的人也比较多，价位比基本餐高，' },
      { name: 'p', head: false, text: '价位：￥7-16。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/E0/wKjmqll8Mw-ALbo4AADcasb_GQA2845303/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7F/23/CgpQVFl8Mw-Ab9j5AAIg5tpBkSE3199388/imageView/v1/thumbnail/640x480' },
      { name: 'h3', text: '清真食堂' },
      { name: 'h3', text: '在这里加上菜谱' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7F/24/CgpQVFl8M4aALbEaAAC8QA82Hqc2210411/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/E0/wKjmqll8M4aAIqj0AADEIMG7lqg3100178/imageView/v1/thumbnail/640x480' },
      { name: 'p', head: false, text: '价位：一荤两素大概平均价位在7、8元左右，两荤一素在9、10元左右。' },
      { name: 'p', text: '注意：不能带非清真类食品、非清真食堂的筷子餐盘等入内。' },
      { name: 'foot' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})