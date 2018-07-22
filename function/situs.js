	var u = getApp().util,
	  a = getApp().globalData;
	Page({
	  data: {
	    page: [{
	        tag: 'head',
					title:'本部校区',
	        display: false,
	      },
	      {
	        tag: 'swiper',
	        url: [
	          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
	          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
	          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
	        ],
	      }, {
	        tag: 'p',
	        head: 'V0.7.0',
	        text: '修复iOS error返回按钮的问题；\n修复map界面点击态失效的问题；\n修复商品页关闭按钮位置错误的问题；\n修复map弹出列表显示错误的问题；\n修复NENU首页导航栏异常；\n修复shop界面导航栏不随主题切换的问题；'
	      }, {
	        tag: 'p',
	        head: 'V0.7.1',
	        text: 'map界面增加marker与label；\n'
	      }, {
	        tag: 'p',
	        head: 'V0.7.0',
	        text: '修复iOS error返回按钮的问题；\n修复map界面点击态失效的问题；\n修复商品页关闭按钮位置错误的问题；\n修复map弹出列表显示错误的问题；\n修复NENU首页导航栏异常；\n修复shop界面导航栏不随主题切换的问题；'
	      }, {
	        tag: 'p',
	        head: 'V0.7.1',
	        text: 'map界面增加marker与label；\n'
	      }, {
	        tag: 'p',
	        head: 'V0.7.0',
	        text: '修复iOS error返回按钮的问题；\n修复map界面点击态失效的问题；\n修复商品页关闭按钮位置错误的问题；\n修复map弹出列表显示错误的问题；\n修复NENU首页导航栏异常；\n修复shop界面导航栏不随主题切换的问题；'
	      }, {
	        tag: 'p',
	        head: 'V0.7.1',
	        text: 'map界面增加marker与label；\n'
	      },
	    ],
	  },
	  onLoad(e) {
	    u.sP(this.data.page, this, a);
	  },
	  onPageScroll(e) {
	    u.nav(e, this)
	  },
	  cA(e) {
	    u.cA(e, this)
	  },
	  sN(e) {
	    u.sN(e)
	  }
	})