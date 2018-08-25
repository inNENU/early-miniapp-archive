var P = require('../utils/wxpage'),
	S = require('../utils/setPage'),
	a = getApp().globalData;

P('sharePage', {
	onNavigate(res) {
		console.log('将要跳转：', res)
		this.aim = S.preSet(this.$session.get(res.query.aim + 'Temp'), a, res, this);
		console.log(this.aim + '载入'), console.log(this.data);
	},
	onLoad(res) {
		if (!this.aim) {
			console.log(res)
			this.aim = S.Online(a, res, this);
			console.log('onLoad 成功')
		}
		S.Notice(this.aim);
		wx.reportMonitor('2', 1)
	},
	onReady() {
		if (this.aim) {
			S.preLoad(this, a);
		}
	},
	navigate(res) {
		this.$route(res.currentTarget.dataset.url)
	},
	onPageScroll(e) {
		S.nav(e, this)
	},
	cA(e) {
		S.component(e, this)
	},
	redirect() {
		this.$launch('/pages/main')
	},
	onShareAppMessage() {
		return {
			title: this.data.page[0].title,
			path: `/modules/sharePage?From=主页&step=1&share=true&aim=${this.aim}`
		}
	},
})