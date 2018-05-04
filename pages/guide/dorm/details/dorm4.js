var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '公共设施' },
      { name: 'p', head: '洗漱区', text: '洗漱区全天供应冷水。生活热水每日使用量固定为18升(新生需要先在生活用水补助机上刷卡进行激活，激活时间略有延时)，超过18升按照￥0.2/升扣除，可以自行到生活用水补助机处充值。寝室楼下就设有生活用水补助机。本部校区早5时至8时，晚21时到23时供应热水；净月校区早6时到8时，晚19时到22时供热水(天华公寓全天供应)。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/91/62/wKjmqVl9hACAR66rAADtC1XuulU0747826/imageView/v1/thumbnail/640x0', text: '图为本部三舍AB洗漱区' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/91/62/wKjmqVl9g7mAbnfZAACMNWfdtg41656008/imageView/v1/thumbnail/640x0', text: '图为本部三舍C洗漱区' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/91/62/wKjmqVl9g6CAEI-WAAGVw7uu5Xs1056054/imageView/v1/thumbnail/640x0', text: '图为净月公寓洗漱区' },
      { name: 'p', head: '卫生间', text: '卫生间处在公共区域，有阿姨定期打扫卫生，很整洁。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/91/63/wKjmqVl9hXSAOBeAABmrRBrl_Q83881084/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/96/CgpQVFl9hV-ASgSHAC3XwsJHYhM9384030/imageView/v1/thumbnail/640x0' },
      { name: 'p', head: '吹风机', text: '女生寝室楼每层楼都有一个或两个吹风机，插一卡通就可以使用。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/98/CgpQVFl9iISAW_AWAA3EFjs57wM4349529/imageView/v1/thumbnail/640x0' },
      { name: 'p', head: '洗衣机', text: '>洗衣机是单筒洗衣机，可洗可甩干。大部分寝室楼的每个楼层有两个洗衣机。洗衣机为刷卡使用。根据所需洗涤方式刷卡，刷卡完毕后将洗衣机盖关闭即可洗衣, 洗衣用的洗衣液或洗衣粉需自己准备，在洗衣前加入洗衣机内。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/98/CgpQVFl9iMaAY6bwAAEyJlHpDXA3713141/imageView/v1/thumbnail/640x0' },
      { name: 'p', head: '直饮水机', text: '刷卡分别可以接冷/常温/热的饮用水，学校每天免费供应90秒使用时长(约2-4升，视直饮机水压)，全天供应。超出部分收取制水成本费用，热水0.3元/升，常温水0.2元/升。直饮水服务所需的额外费用，是使用校园卡小钱包内的余额，师生可以在自助终端机上进行一卡通小钱包充值。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/55/wKjmqll9iROAAyvXAAFvl0L2slU0180058/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/91/68/wKjmqVl9ib2ATy4sACjJ4Roa5YQ6686464/imageView/v1/thumbnail/640x0' },
      { name: 'p', head: '自习室', text: '寝室楼内每层均设有自习室。自习室不间断供电。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6E/2E/CgpQU1l9jHKAFQ84AAFVHQOisPI2108104/imageView/v1/thumbnail/640x0', text: '三舍A自习室' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6E/29/CgpQU1l9iciAdPf6ABhnksBE_IU0815243/imageView/v1/thumbnail/640x0', text: '三舍B自习室' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/5A/wKjmqll9jC-Aa9uaAAG9IJn9V_c5121719/imageView/v1/thumbnail/640x0', text: '三舍C自习室' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/91/68/wKjmqVl9icmAc7SrAAC8hfsXXwo9367729/imageView/v1/thumbnail/640x0', text: '天华公寓自习室' },
      { name: 'p', head: '电梯', text: '三舍作为高层建筑，A座、C座拥有四台电梯，B拥有三台电梯，客梯不停低楼层，入住时可以使用货梯。净月寝室没有电梯。' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/5B/wKjmqll9jOGAITeNAAGlLL3dLNI6483845/imageView/v1/thumbnail/640x0',text:'三舍电梯' },
      { name: 'foot' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})