var u = getApp().util,
	a = getApp().globalData;
Page({
	data: {
		page: [{
			tag: 'head',
			title: 'V0.6开发日志',
			grey: true
		},
		{
			tag: 'p',
			head: 'V0.6.1',
			text: '修复完善了fileList部分更新的功能；'
		},
		{
			tag: 'p',
			head: 'V0.6.2',
			text: '添加了swiper组件；'
		},
		],
	},
	onLoad(e) {
		u.sP(this.data.page, this, a, e)
	},
	onPageScroll(e) {
		u.nav(e, this)
	},
	cA(e) {
		u.cA(e, this)
	},
})