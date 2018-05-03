var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'head', title: '本部南苑食堂' },
      {
        name: 'p', text: '东北师范大学本部校区有北苑食堂和南苑食堂两个食堂。南苑食堂共三层，北苑食堂共两层。地理位置如图：' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6C/9E/CgpQU1l8LBKAAIbWAAD7j-z-b3M8245036/imageView/v1/thumbnail/640x0' },
{ name: 'h3', text: '一楼' },
      {
        name: 'p', text: '特色档口南苑一楼有各种档口，有包子、面条、炒饭，另外还有清真食物档口等，味道比较好，价位适中。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6C/A9/CgpQU1l8N0KAWiQ5AAN0qjh1IaY1618944/imageView/v1/thumbnail/640x480' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/8F/E8/wKjmqVl8Nv2AIgsxAC8uKlgD3b40781391/imageView/v1/thumbnail/640x480' },
      { name: 'h3', text: '二楼' },
      {
        name: 'p', text: '南苑二楼为基本餐区，分时间段供应食物，价位比较亲民。早餐供应时间为：6：30-8：30。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/8F/E9/wKjmqVl8OCmAe75CAADM4LAeaI09565676/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6C/AA/CgpQU1l8OCqAefj-AACCUZ7wDAc1259252/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/8F/E9/wKjmqVl8OCqAENSGAACtXyrFwGA6299445/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/8F/E9/wKjmqVl8OCuAQUunAAGwsCiLl182094304/imageView/v1/thumbnail/640x480' },
      {
        name: 'p', text: '午餐供应时间为：10：30-12：30。晚餐供应时间为：16：30-18：00' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7F/26/CgpQVFl8N5iAQ9qaACrlDArll5Q1155799/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6C/AA/CgpQU1l8N_qAIIvZAAJKe8yVF9Q4539407/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/8F/E9/wKjmqVl8N_uAeKstAAJswygX2io7155944/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6C/AA/CgpQU1l8N_2ABvZnAAJyqPZsIW40839455/imageView/v1/thumbnail/640x480' },
      { name: 'h3', text: '三楼' },
      {
        name: 'p', text: '三楼分为两个部分，从西边的楼梯上去，是思齐自助餐厅，东边楼梯上去是清真餐厅。两个餐厅都可以承担着学生部分团体活动，如社团聚会、老乡会等。两个餐厅是不通的，需要由不同的楼梯上楼。（1）西部的思齐餐厅属于自助饭店的性质，自助早餐五元一位，可供选择较多，很划算。中午和晚上会有自助小火锅，8毛钱一串。（2）东边的餐厅为清真饭店。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7F/27/CgpQVFl8OTWAa6Q5AAO0RxI-T4M0230744/imageView/v1/thumbnail/640x480' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/E3/wKjmqll8OTaAChyCAARZ7qmmwgo7475499/imageView/v1/thumbnail/640x480' },
    ],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})