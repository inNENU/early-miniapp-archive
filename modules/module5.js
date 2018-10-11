var P = require('../utils/wxpage'),
	S = require('../utils/setPage');
var a = getApp().globalData;

P('module5', {
	onNavigate(res) {
		console.log('将要跳转：', res)
		S.preSet(this.$session.get(res.query.aim + 'Temp'), a, res, this)
	},
	onLoad(res) {
		if (this.aim != res.aim) {
			console.log(res)
			let aim = this.aim = S.Online(a, res, this);
			wx.reportAnalytics('page_aim_count', {
				aim
			});
			wx.reportMonitor('0', 1), console.log('onLoad 成功');
		}
		S.Notice(this.aim);
	},
	onReady() {
		if (this.aim) {
			S.preLoad(this, a);
			let aim = this.aim;
			wx.reportAnalytics('page_aim_count', {
				aim
      });
			wx.reportMonitor('1', 1), console.log('preload');
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
	onUnload() {
		this.data.page = null;
	}
})