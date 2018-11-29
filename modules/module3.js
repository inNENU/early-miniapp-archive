var P = require("../utils/wxpage"),
	S = require("../utils/setPage");
var a = getApp().globalData;

P("module3", {
	onNavigate(res) {
		S.preSet(this.$session.get(res.query.aim + "Temp"), a, res, this);
	},
	onLoad(res) {
		S.Online(a, res, this);
	},
	navigate(res) {
		this.$route(res.currentTarget.dataset.url);
	},
	onPageScroll(e) {
		S.nav(e, this);
	},
	cA(e) {
		S.component(e, this);
	},
	onShareAppMessage() {
		return {
			title: this.data.page[0].title,
      path: `/modules/sharePage?From=主页&depth=1&share=true&aim=${this.aim}`
		};
	},
	onUnload() {
		delete this.data.page;
	}
});