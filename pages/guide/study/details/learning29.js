var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '注意事项' },
      { name: 'p', text: ' 1.读者有责任在借阅期限内归还所借图书资料，凡逾期归还所借书刊资料的，须缴纳资料占用费，逾期两天以内（不含逾期日），不缴纳滞纳金;逾期三天及以上，每过一天缴纳滞纳金0.5元，滞纳金最高金额不超过该书赔偿价格。2.若读者逾期归还图书，图书馆规定读者只有缴清逾期罚款后，方可重新享有图书馆服务。所以持有过期图书会影响继续借书，并影响读者享受其他图书馆服务。3.若读者损坏或丢失图书，可赔偿原书或根据不同情况赔偿。 4.关于电子阅览：学校每学期为学生提供30个小时的免费上机时间，称为教学机时。教学机时使用完后读者需要自行缴费，需到校园卡自助服务机自助办理。自行缴费部分为自费机时。 注：打印费用在自费机时中扣除。' }
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})