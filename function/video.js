var P = require('../utils/wxpage'),
	S = require('../utils/setPage'),
	a = getApp().globalData;

P('video', {
	data: {},
	onNavigate(res) {
		let id = res.query.id ? res.id : 0,
			videoList = wx.getStorageSync('funcResList1');
		this.data.info = a.info, this.data.nm = a.nm, this.data.id = id;
		if (videoList) {
			this.data.videoList = videoList, this.data.videoName = videoList[id].name, this.data.videoAuthor = videoList[id].author, this.data.src = videoList[id].src, this.set = true;
		} else {
			S.request('funcResList/funcResList1', function (data, indicator) {
				indicator.data.videoList = data, indicator.data.videoName = data[id].name, indicator.data.videoAuthor = data[id].author, indicator.data.src = data[id].src, indicator.set = true;
				wx.setStorageSync('funcResList1', data);
			}, this)
		}
	},
	onLoad(e) {
		wx.loadFontFace({
			family: 'FZSSJW',
			source: 'url("https://mrhope.top/ttf/FZSSJW.ttf")',
			complete(res) {
				console.log('宋体字体' + res.status); //调试
			}
		});
		if (!this.set) {
			let id = e.id ? e.id : 0,
				videoList = wx.getStorageSync('funcResList1');
			this.setData({
				info: a.info,
				nm: a.nm,
				id: id
			})
			if (videoList) {
				let item = videoList[id];
				this.setData({
					videoName: item.name,
					videoAuthor: item.author,
					src: item.src ? item.src : null,
					vid: item.vid ? item.vid : null,
					videoList: videoList
				})
				// let that = this,
				//   item = videoList[id];
				// if ('vid' in item) {
				//   wx.request({
				// 		url: `https://mrhope.top/mpServer/videoQQ.php?vid=${item.vid}`,
				//     success(res) {
				//       let detail = res.data.vl.vi[0];
				//       that.setData({
				//         videoName: item.name,
				//         videoAuthor: item.author,
				//         src: `${detail.ul.ui[0].url}${detail.fn}?vkey=${detail.ul.ui[0].url}`,
				//         videoList: videoList
				//       })
				//     }
				//   })
				// } else {
				//   this.setData({
				//     videoName: videoList[id].name,
				//     videoAuthor: videoList[id].author,
				//     src: videoList[id].src,
				//     videoList: videoList
				//   });
				// }
			} else {
				S.request('funcResList/funcResList1', function (data, indicator) {
					let item = data[id];
					indicator.setData({
						videoName: item.name,
						videoAuthor: item.author,
						src: item.src ? item.src : null,
						vid: item.vid ? item.vid : null,
						videoList: data
					})
					// if ('vid' in item) {
					//   wx.request({
					//     url: `https://mrhope.top/mpServer/videoQQ.php?vid=${item.vid}`,
					//     success(res) {
					//       let detail = res.data.vl.vi[0];
					//       indicator.setData({
					//         videoName: item.name,
					//         videoAuthor: item.author,
					//         src: `${detail.ul.ui[0].url}${detail.fn}?vkey=${detail.ul.ui[0].url}`,
					//         videoList: data
					//       })
					//     }
					//   })
					// } else {
					//   indicator.setData({
					//     videoName: item.name,
					//     videoAuthor: item.author,
					//     src: item.src,
					//     videoList: data
					//   });
					// }
					wx.setStorageSync('funcResList1', data);
				}, this)
			}
		};
		S.Notice('movie');
	},
	play(e) {
		let id = e.currentTarget.id,
			item = this.data.videoList[id];
		this.setData({
			videoName: item.name,
			videoAuthor: item.author,
			src: item.src ? item.src : null,
			vid: item.vid ? item.vid : null,
			id: id
		})
		// let that = this,
		//   id = e.currentTarget.id,
		//   item = this.data.videoList[id];
		// if ('vid' in item) {
		//   wx.request({
		//     url: `https://mrhope.top/mpServer/videoQQ.php?vid=${item.vid}`,
		//     success(res) {
		//       let detail = res.data.vl.vi[0];
		//       that.setData({
		//         videoName: item.name,
		//         videoAuthor: item.author,
		//         src: `${detail.ul.ui[0].url}${detail.fn}?vkey=${detail.ul.ui[0].url}`,
		//         id: id
		//       })
		//     }
		//   })
		// } else {
		//   this.setData({
		//     videoName: item.name,
		//     videoAuthor: item.author,
		//     src: item.src,
		//     id: id
		//   });
		// }
	},
	cA(e) {
		S.component(e, this)
	},
})