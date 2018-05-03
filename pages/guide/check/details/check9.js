var u = getApp().util, a = getApp().globalData; Page({

data: { page: [
{ name: 'head', title: '报到流程'},
{ name: 'p', text: '17级报到时间是8月16日，15号下午1:30就可以去报到啦。开学后军训两周，即8月18日-9月1日。以下信息参照往年信息，可能并非今年真实情况，只具参考价值。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/CA/2A/CgpQVFmSgIGAGn9LAAJ7yqVH9Mg1573873/imageView/v1/thumbnail/640x0' },
{ name: 'h3', text: '大体流程' },
{ name: 'h3', text: '提前来' },
{ name: 'p', text: '到各学院找接待人员进行登记、领取钥匙→到宿舍放置行李→报到那天三去（本部）到排球场北边的学思路/（净月）图书馆门前那找自己学院的摆台处补办手续、领取一卡通→在宿舍一楼的自助终端机处修改密码、绑定银行卡、充值。如果宿舍分配结果还没出来，新生可能暂时被安排到其他宿舍暂时居住，分配具体结果出来后才安排到实际的宿舍去住，会有相关人员进行接待和安排住宿事宜。（可以联系导员了解情况）提前来的萌新们如果到校时间过早或过晚，建议提前联系自己的导员或者学院的学长学姐，说明情况，以便给你建议和帮助。必要的话可以提前和学长学姐联系，请他们给你们带路。' },
{ name: 'h3', text: '报到当天来' },
{ name: 'p', text: '（本部）到排球场北边的学思路/（净月）图书馆门前那找自己学院的摆台处进行登记、领取一卡通、宿舍钥匙→到宿舍放置行李→在宿舍一楼的自助终端机处绑定银行卡、修改密码、充值→晚上导员查寝。' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/D3/3F/CgpQVFmTzriABTu7AAIudSEDHiY0243843/imageView/v1/thumbnail/640x0' },
{ name: 'h3', text: '因故不能按时报到' },
{ name: 'p', text: '须提供相关证明向录取学院请假，请假时间一般不得超过两周。未请假或逾期不报到者除因不可抗力等正当事由外，视为自动放弃入学资格。' },
{ name: 'h3', text: '报到（接待）时间' },
{ name: 'p', text: '前一天下午13：30—22：00报到当天7：00—22：00' },
{ name: 'h3', text: '报到（接待）地点' },
{ name: 'p', text: '本部校区：保卫处与地理科学学院间的道路两侧' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6F/D7/CgpQU1l-wKKACFf_AAC_VnGWuvY5287777/imageView/v1/thumbnail/640x0' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/82/AF/wKjmqll92yaAUjGWAAO2gdQVjjE4308853/imageView/v1/thumbnail/640x0' },
{ name: 'p', text: '（如果当天下雨可能在北苑食堂一楼）' },
{ name: 'p', text: '净月校区在净月图书馆门前广场' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/D3/80/CgpQVFmT0n2ABsINAAZSIYPJymg8963198/imageView/v1/thumbnail/640x0' },
{ name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/82/B2/wKjmqll93pWAaqvCAAQbHyLV_ko9159655/imageView/v1/thumbnail/640x0' },
{ name: 'p', text: '（如果下雨可能在一食堂）' },

],

},

onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})