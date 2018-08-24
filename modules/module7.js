var P = require('../utils/wxpage'),
	S = require('../utils/setPage');
var a = getApp().globalData;

P('module7', {
	onNavigate(res) {
		console.log('将要跳转：', res)
		this.aim = S.preSet(this.$session.get(res.query.aim + 'Temp'), a, res, this)
		console.log(this.aim + '载入'), console.log(this.data);
	},
	onLoad(res) {
		if (this.aim != res.aim) {
			console.log(res)
			this.aim = S.Online(a, res, this);
			wx.reportMonitor('0', 1)
			console.log('onLoad 成功')
		}
		S.Notice(this.aim);
	},
	onReady() {
		if (this.aim) {
			S.preLoad(this, a);
			wx.reportMonitor('1', 1)
			console.log('preload')
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
	onShareAppMessage() {
		return {
			title: this.data.page[0].title,
			path: `/modules/sharePage?From=主页&step=1&share=true&aim=${this.aim}`
		}
	},
})