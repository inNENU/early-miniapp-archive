var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'h3', text: '防盗防骗攻略' },
      {
        name: 'p', text: '刚入学期间萌新门一定要注意防盗防骗。【例如】（这些是一些学长学姐们的亲身经历）一位阿姨到寝室说卖英语牛津词典，先交费，后面会送来，结果……（类似的还有英语报纸、四六级资料等） 新东方兼职骗局：发生在大一开学没多久，首先利用真学长学姐和新东方兼职的名义走寝，利用从众心理，让每个寝室有意愿参加新东方兼职的同学在本子上签上自己的名字并留下联系方式。走寝的是真东师坑人学长学姐，并且看到本子上有许多同学的名字，比如班长、年级长，好多人会盲从签字。 然后过一段时间，通知有讲座培训，真东师坑人学姐宣讲大学经验心路历程，凸显卖报纸和英语材料，兼职赚钱容易，表示最低工资收入五千等等…… 吸引加入大一暑期培训和卖英语材料……实际根本不是新东方兼职，卖的很多都不是新东方的材料，卖东西以骗为主，去其他学校要求伪装成该校学长学姐，有良心的学长学姐也不会愿意坑骗自己本校学弟学妹。大部分连培训费的四分之一都拿不回来。（所以真学长学姐推销四六级资料的，有我们学校一卡通的最好慎之又慎，要过四六级自己去当当买套真题刷了就二三十块钱最靠谱。）' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/84/27/wKjmqll-ywOAC2E-AARVEsWQAyc1023336/imageView/v1/thumbnail/640x0' },


],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})