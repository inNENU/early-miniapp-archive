var u = getApp().util, a = getApp().globalData;
Page({
  data: {page: [
      { name: 'head', title: '本部北苑餐厅' },
      {name: 'p', text: '东北师范大学本部校区有北苑食堂和南苑食堂两个食堂。南苑食堂共三层，北苑食堂共两层。地理位置如图：' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6C/9E/CgpQU1l8LBKAAIbWAAD7j-z-b3M8245036/imageView/v1/thumbnail/640x0' },
{ name: 'h3', text: '一楼' },
      {
        name: 'p', text: '1.基本餐北苑餐厅一楼整体区域分为两个部分，位于北侧的区域为基本餐区，每天分时间段供应三餐, 相对于其他档口，基本餐价格比较亲民。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7F/1F/CgpQVFl8LnKAdPG8AABlG0iPvGo9169624/imageView/v1/thumbnail/640x0' },
{ name: 'p', text: '早餐供应时间为：6：30-9：00（供应面条、粥、豆浆、包子、炒菜等）' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7F/20/CgpQVFl8L_OAHY1lAACOeqUB1ME7269170/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/8F/E0/wKjmqVl8LxeAHK05AADVXAej1S89823382/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6C/A0/CgpQU1l8LpOAMi19AACoaWWW_IU6360955/imageView/v1/thumbnail/640x480' },
      {
        name: 'p', text: '午餐供应时间为：11：00-12：30晚餐供应时间为：16：30-18：00米饭0.25元一两，素菜1-2.5元左右，荤菜2.5- 3.5元左右。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7F/21/CgpQVFl8MNuAe_HxAAEWIvTNzlY7442671/imageView/v1/thumbnail/640x480' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/8F/E1/wKjmqVl8MNyAdHDAAAEap3hwtMA9244954/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6C/A2/CgpQU1l8MNuAJvPoAACdm1MkC5M9583013/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7F/22/CgpQVFl8MYWAPP46AAEsULy1MNY8412893/imageView/v1/thumbnail/640x480' },
      {
        name: 'p', text: '2.其他档口一楼南侧：开封包子、米线、麻辣烫、蒸功夫盖浇饭、妈妈亲饺子、李阿峰麻辣拌、西部拉面、营养套餐、老鸭粉丝汤、煎饼王、手抓饼' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7F/22/CgpQVFl8MYSABPwnAADYSpQdVQg1458673/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/DE/wKjmqll8MVmASgnWAANAnzRXmpc5298797/imageView/v1/thumbnail/640x480' },
      { name: 'h3', text: '二楼' },
      {
        name: 'p', text: '1.二楼南侧：营养快餐、东北小炒、韩国料理、四川风味、五谷鱼粉、麦多馅饼、麻辣香锅、烤肉木桶饭、北京风味、正大炸鸡汉堡、尚品双拼、麻婆面、小面。选择较多，味道不错，但是一般排队的人也比较多，价位比基本餐高，价位大概在7-16元左右。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/E0/wKjmqll8Mw-ALbo4AADcasb_GQA2845303/imageView/v1/thumbnail/640x480' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/7F/23/CgpQVFl8Mw-Ab9j5AAIg5tpBkSE3199388/imageView/v1/thumbnail/640x480' },
      {
        name: 'p', text: '2.清真食堂位置：北苑二楼西侧。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7F/24/CgpQVFl8M4aALbEaAAC8QA82Hqc2210411/imageView/v1/thumbnail/640x480' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/E0/wKjmqll8M4aAIqj0AADEIMG7lqg3100178/imageView/v1/thumbnail/640x480' },
      {
        name: 'p', text: '一荤两素大概平均价位在7、8元左右，两荤一素在9、10元左右。注意：不能带非清真类食品、非清真食堂的筷子餐盘等入内。' },
],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})