module.exports = {
  picker,
  slider,
  Switch,
  gD: getDistance
}

// 选择器函数
function picker(e, indicator) {
  let pos = e.currentTarget.dataset.id.split('-'),
    content = indicator.data.page[pos[0]].content[pos[1]];
  if (e.type == 'tap') {
    content.visible = !content.visible;
    indicator.setData({
      page: indicator.data.page
    })
  }
  if (e.type == 'change') {
    let value = e.detail.value;
    if (content.single) {
      content.value = content.pickerValue[Number(value)];
      content.currentValue = value;
      wx.setStorageSync(content.key, Number(value));
    } else {
      for (let k = 0; k < value.length; k++) {
        content.value[k] = content.pickerValue[k][Number(value[k])];
        content.currentValue[k] = value[k]
      };
      wx.setStorageSync(content.key, value.join('-'));
    }
    indicator.setData({
      page: indicator.data.page
    });
    return value;
  }
}

// 滑块函数
function slider(e, indicator) {
  let pos = e.currentTarget.dataset.id.split('-'),
    content = indicator.data.page[pos[0]].content[pos[1]],
    value = e.detail.value;
  switch (e.type) {
    case 'tap':
      content.visible = !content.visible;
      break;
    case 'changing':
      content.value = value;
      break;
    case 'change':
      content.value = value;
      wx.setStorageSync(content.sliKey, value);
      break;
  }
  indicator.setData({
    page: indicator.data.page
  });
  return value;
}

// 开关函数
function Switch(e, indicator) {
  let pos = e.target.dataset.id.split('-'),
    page = indicator.data.page,
    content = page[pos[0]].content[pos[1]];
  content.status = e.detail.value;
  indicator.setData({
    page: page
  });
  wx.setStorageSync(content.swiKey, e.detail.value);
  return page;
}

// 输出特定元素在数组中的index
function arrayKeynumber(array, key) {
  for (let i in array) {
    if (array[i] == key) {
      return i
    }
  }
}

// 网络重连
function reConnet(indicator, a, e) {
  wx.onNetworkStatusChange(function(res) {
    console.log(res.isConnected);
    console.log(res.networkType);
    if (res.isConnected) {
      let source = (isNaN(e.aim.charAt(e.aim.length - 1))) ? e.aim : e.aim.substring(0, e.aim.length - 1);
      wx.request({
        url: 'https://mrhope.top/mp/' + source + '/' + e.aim + '.json',
        success(res) {
          console.log(res);
          wx.hideToast();
          (res.statusCode == 200) ? (setPage(res.data, indicator, a, e), wx.setStorageSync(e.aim, res.data)) : indicator.setData({
            page: [{
              tag: 'error'
            }]
          })
        }
      })
    }
  })
}

// 跳转制定界面
function go(url) {
  wx.navigateTo({
    url: url
  })
}

//-----测试中-----

//尚未投入使用

function getRad(d) {
  return d * Math.PI / 180.0;
}

function getDistance(lat1, lng1, lat2, lng2) {
  let f = getRad((lat1 + lat2) / 2);
  let g = getRad((lat1 - lat2) / 2);
  let l = getRad((lng1 - lng2) / 2);

  let sg = Math.sin(g);
  let sl = Math.sin(l);
  let sf = Math.sin(f);

  let s, c, w, r, d, h1, h2;
  let a = 6378137.0;
  let fl = 1 / 298.257;

  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;

  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;

  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;

  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
}

function donate() {
  wx.getClipboardData({
    data: '吱口令',
    success: function(res) {
      wx.showToast({
        title: '吱口令已复制到剪切板，请打开支付宝',
        duration: 1000,
      })
    }
  })
}

function setPersonInfo(page) {
  let nickName, imgPath;
  if (wx.getStorageSync('login')) {
    nickName = wx.getStorageSync('nickName'), imgPath = wx.getStorageSync('imgPath');
  } else {

  };
}

function forceLogin() {
  if (!wx.getStorageSync('login')) {
    wx.showModal({
      title: '您还未登陆',
      content: '点击确定跳转至登录页',
      confirmText: '是',
      showCancel: 'false',
      success(choice) {
        if (choice.confirm) {
          wx.redirectTo({
            url: '/pages/me/me',
          })
        }
      }
    })
  }
}

function getMarkers() {
  wx.getStorage({
    key: id,
    success: function(key) {
      console.log(key.data);
      setPage(key.data, indicator, a, e);
      wx.hideLoading();
    },
    fail: function(res) {
      console.log(res);
      if (res.errMsg == 'getStorage:fail data not found') {
        wx.getNetworkType({
          success: function(res) {
            console.log(res);
            let net = res.networkType;
            if (net == 'none' || net == 'unknown') {
              setPage([{
                tag: 'error',
                statusBarHeight: a.info.statusBarHeight
              }], indicator, a, e);
              wx.hideLoading();
              wx.showToast({
                title: '您未打开互联网！由于您未提前缓存此界面，界面无法加载！\n请检查您的互联网连接！',
                icon: 'none',
                duration: 10000
              });
              reConnet(indicator, a, e);
            } else {
              let source;
              if (isNaN(e.aim.charAt(e.aim.length - 1))) {
                source = e.aim;
              } else {
                source = e.aim.substring(0, e.aim.length - 1);
              };
              wx.request({
                url: 'https://mrhope.top/mp/' + source + '/' + e.aim + '.json',
                success(res) {
                  console.log(res);
                  if (res.statusCode == 200) {
                    setPage(res.data, indicator, a, e);
                    wx.setStorageSync(e.aim, res.data);
                  } else {
                    console.log('res error');
                    setPage([{
                      tag: 'error',
                      statusBarHeight: a.info.statusBarHeight
                    }], indicator, a, e);
                  }
                  wx.hideLoading();
                }
              })
            }
          }
        })
      }
    },
  })
  wx.request({
    url: '',
  })
}

// function formatNumber(n) {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }
// function formatTime(date) {
//   let year = date.getFullYear()
//   let month = date.getMonth() + 1
//   let day = date.getDate()
//   let hour = date.getHours()
//   let minute = date.getMinutes()
//   let second = date.getSeconds()
//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }


// iOS导航栏弹性滚动特效
// function scrollNav(e) {
// 	let pos = e.changedTouches[0].pageY - e.changedTouches[0].clientY
// 	console.log(pos)
// 	if (pos < 27) {
// 		wx.pageScrollTo({
// 			scrollTop: 0,
// 			duration: 500
// 		})
// 	} else if (pos < 53) {
// 		wx.pageScrollTo({
// 			scrollTop: 53,
// 			duration: 500
// 		})
// 	}
// }