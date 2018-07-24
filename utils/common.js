module.exports = {
  // nC: noticeCheck,
  // cRU: checkResUpdate,
  // cFU: checkFuncUpdate,
  // rR: resRefresh,
  // init: initialize,
  // sT: setTheme,
  // nm: nightmode,
  nav: changeNav,
  // sP: setPage,
  // sl: slider,
  // tBC: tabBarChanger,
  // back: back,
  // sS: Switch,
  // ak: arrayKeynumber,
  gC: getContent,
  // doc: document,
  // phone: phone,
  // on: on,
  // emit: emit,
  // remove: remove,
  // donate: donate,
  // cA: componemtAction,
  // go: go,
  // sN: scrollNav,
  // gD: getDistance
}

function getContent(indicator, a, e) {
  console.log(indicator); //调试
  console.log(e); //调试
  wx.showLoading({
    title: '加载中...'
  });
  wx.getStorage({
    key: e.aim,
    success(key) {
      console.log(key.data); //调试
      setPage(key.data, indicator, a, e);
      wx.hideLoading();
    },
    fail(res) {
      console.log(res);
      if (res.errMsg == 'getStorage:fail data not found') {
        wx.getNetworkType({
          success: function(res) {
            console.log(res);
            var net = res.networkType;
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
}

// 导航栏动态改变
function changeNav(e, indicator) {
  var n = indicator.data.page[0],
    T, B, S;
  if (e.scrollTop <= 1) {
    T = B = S = false;
  } else if (e.scrollTop <= 42) {
    T = B = false, S = true;
  } else if (e.scrollTop >= 53) {
    T = B = S = true;
  } else {
    T = S = true, B = false;
  };
  if (n.titleDisplay != T || n.borderDisplay != B || n.shadow != S) {
    n.titleDisplay = T, n.borderDisplay = B, n.shadow = S;
    indicator.setData({
      page: indicator.data.page
    })
  };
}