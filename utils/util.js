function checkVersion(version) {
  wx.getSystemInfo({
    success: function (res) {
      let SDK = res.SDKVersion; if (SDK.charAt(0) <= 1 && SDK.charAt(2) < 9) { wx.showModal({ title: '微信版本过低', content: '无法加载小程序，请将客户端升级到V6.6.0版本及以上', showCancel: false, success(res) { if (res.confirm) { wx.navigateBack({}) }; } }) };
      wx.getStorage({ key: 'appVersion', success: function (res) { let preVersion = res.data; if (version != preVersion) { wx.setStorageSync('appVersion', version); wx.showModal({ title: '小程序已升级', content: '检测到小程序更新，为了保障小程序正常运行，您的数据已被清空。请重新进入小程序完成新版本的初始化。', confirmText: '退出', showCancel: false, success(res) { if (res.confirm) { wx.clearStorage(); wx.navigateBack({}) }; } }); }; }, fail: function () { wx.setStorageSync('appVersion', version) } });
      return version;
    }
  });
}

function initialize(key, defaultKey) { let value = wx.getStorageSync(key); if (value || value === false) { return value } else { wx.setStorageSync(key, defaultKey); return defaultKey; } }

function setTheme(theme) {
  let value = wx.getStorageSync('theme'); if (value) { return value } else {
    if (theme == "auto") {
      let p = wx.getSystemInfoSync().platform;
      if (p == 'ios') { return 'iOS' }; if (p == 'android') { return 'wechat' }; if (p == 'devtools') { return 'iOS' };
    } else { return theme }
  }
}

function nightmode(date, startTime, endTime) {
  let nm = initialize('nightmode', true), nmAC = initialize('nightmodeAutoChange', true);
  let s = initialize('nmStart', startTime).split('-'), e = initialize('nmEnd', endTime).split('-');
  let start = Number(s[0]) * 100 + Number(s[1]), end = Number(e[0]) * 100 + Number(e[1]);
  let time = date.getHours() * 100 + date.getMinutes(); var temp;
  if (nmAC) {
    if (start <= end) { if (time >= start && time <= end) { temp = true } else { temp = false } }
    else { if (time <= start && time >= end) { temp = false } else { temp = true } };
    wx.setStorageSync('nightmode', temp); return temp;
  } else { return nm; }
}

function changeNav(pos, page, indicator) {
  var n = page[0], T, B;
  if (pos.scrollTop <= 42) { T = false; B = false; } else if (pos.scrollTop >= 53) { T = true; B = true; } else { T = true; B = false; };
  if (n.titleDisplay === null || n.titleDisplay != T || n.borderDisplay != B) { n.titleDisplay = T, n.borderDisplay = B; indicator.setData({ page: page }) }
}

function setNav(page, a, e) {
  if (a.info.model.substring(0, 8) === 'iPhone X') { page[0].iPhoneX = true };
  if (a.info.platform.substring(0, 7) === 'android') { page[0].android = true };
  if (e && !page[0].top && 'from' in e) { page[0].backText = e.from };
  if (e && !page[0].top && 'step' in e) { page[0].aimStep = Number(e.step) + 1 };
}

function setListContent(page, a, i) {
  if ('content' in page[i]) {
    let content = page[i].content;
    for (let j = 0; j < content.length; j++) {
      content[j].id = i + "-" + j;
      if ('key' in content[j]) { content[j].status = wx.getStorageSync(content[j].key); };
      if ('url' in content[j]) { content[j].url += "?from=" + page[0].title };
      if ('aim' in content[j]) { content[j].url = "guide" + page[0].aimStep + "?from=" + page[0].title + "&aim=" + content[j].aim + "&step=" + page[0].aimStep };
      if ('pickerKey' in content[j]) {
        content[j].currentValue = new Array(); content[j].value = new Array();
        let temp = wx.getStorageSync(content[j].pickerKey).split('-');
        for (let k = 0; k < temp.length; k++) {
          content[j].value[k] = content[j].pickerValue[k][Number(temp[k])]; content[j].currentValue[k] = Number(temp[k]);
        }
      }
    }
  }
}

function setPage(page, indicator, a, e) {
  console.log(page);
  console.log(indicator);
  console.log(a);
  console.log(e);
  setNav(page, a, e); page[0].url = new Array(); page[0].T = a.T;
  for (let i = 0; i < page.length; i++) {
    let current = page[i]; current.id = i;
    if (current.src) {
      page[0].url.push(page[i].src);
      if (!current.imgMode) { current.imgMode = a.imgMode };
    };
    setListContent(page, a, i);
  }; indicator.setData({ T: a.T, nm: a.nm, page: page })
}

function pickerView(page, e) {
  if (e.type == 'tap') { return displayPickerView(page, e) }
  if (e.type == 'change') { return setPickerValue(page, e) }
}

function setPickerValue(page, e) {
  let pos = e.target.dataset.id.split('-'), content = page[pos[0]].content[pos[1]], value = e.detail.value;
  for (let k = 0; k < value.length; k++) {
    content.value[k] = content.pickerValue[k][Number(value[k])]; content.currentValue[k] = value[k]
  }; wx.setStorageSync(content.pickerKey, value.join('-')); return page;
}

function displayPickerView(page, e) {
  let pos = e.currentTarget.id.split('-'), content = page[pos[0]].content[pos[1]];
  content.visible = !content.visible; return page;
}

function setSwitch(page, e) {
  console.log(e)
  let pos = e.target.id.split('-'), content = page[pos[0]].content[pos[1]];
  content.status = e.detail.value; wx.setStorageSync(content.key, e.detail.value);
  return page;
}

function tabBarChanger(nm) {
  if (nm) { wx.setTabBarStyle({ color: "#7A7E83", selectedColor: "#3cc51f", backgroundColor: '#000000', borderStyle: 'white' }) }
  else { wx.setTabBarStyle({ color: "#7A7E83", selectedColor: "#3cc51f", backgroundColor: '#ffffff', borderStyle: 'black' }) };
}
function back() { wx.navigateBack({}) }

function arrayKeynumber(array, key) {
  for (var i in array) { if (array[i] == key) { return i } }
}

function imgLoad(page, indicator, e) {
  let current = page[e.target.id];
  if (e.type == 'load') { current.load = true } else if (e.type == 'error') { current.error = true }
  else if (e.type == 'tap') { wx.previewImage({ current: current.src, urls: page[0].url }) };
  indicator.setData({ page: page });
}

function checkResUpdate() {
  console.log('checkResUpdate Start')
  let resNotify = initialize('resNotify', true), resVersion = initialize('resVersion', 0);
  console.log('resNotify is ' + resNotify); console.log('resVersion is ' + resVersion);
  if (resNotify) {
    wx.getNetworkType({
      success: function (netWork) {
        console.log(netWork.networkType)
        if (netWork.networkType == 'wifi') {
          wx.request({
            url: 'https://mrhope.top/miniProgram/fileList.json', success(listRequest) {
              console.log(listRequest); let webVersion = listRequest.data[0], fileList = listRequest.data[1];
              if (listRequest.statusCode == 200) {
                if (resVersion == 0) {
                  wx.showModal({
                    title: '是否离线部分页面文字资源？', content: '选择离线后可以在无网络连接时查看部分界面。(会消耗几百K流量)',
                    cancelText: '否', cancelColor: '#ff0000', confirmText: '是',
                    success(choice) {
                      if (choice.cancel) {
                        wx.showModal({
                          title: '是否要关闭此提示？', content: '关闭后不会再显示类似提示。您可以在设置中重新打开提示。',
                          cancelText: '关闭', cancelColor: '#ff0000', confirmText: '保持打开',
                          success(choice2) { if (choice2.cancel) { wx.setStorageSync('resNotify', false) } }
                        })
                      }
                      if (choice.confirm) {
                        var successNumber = 0;
                        wx.showLoading({ title: successNumber + '/' + fileList.length + '下载中...', mask: true });
                        for (let i = 0; i < fileList.length; i++) {
                          wx.request({
                            url: 'https://mrhope.top/miniProgram/' + fileList[i] + '.json', success(res) {
                              console.log(res); wx.setStorageSync(fileList[i], res.data);
                              successNumber += 1;
                              wx.showLoading({ title: successNumber + '/' + fileList.length + '下载中...', mask: true });
                              if (successNumber == fileList.length) { wx.hideLoading(); console.log('hide') };
                            }
                          })
                        }; wx.setStorageSync('resVersion', webVersion);
                      }
                    }
                  });
                }
                else if (webVersion > resVersion) {
                  wx.showModal({
                    title: '部分页面资源有更新？', content: '是否立即更新界面资源？\n(会消耗几百K流量)',
                    cancelText: '否', cancelColor: '#ff0000', confirmText: '是',
                    success(choice) {
                      if (choice.confirm) {
                        var successNumber = 0;
                        wx.showLoading({ title: successNumber + '/' + fileList.length + '下载中...', mask: true });
                        for (let i = 0; i < fileList.length; i++) {
                          wx.request({
                            url: 'https://mrhope.top/miniProgram/' + fileList[i] + '.json', success(res) {
                              console.log(res); wx.setStorageSync(fileList[i], res.data);
                              successNumber += 1;
                              wx.showLoading({ title: successNumber + '/' + fileList.length + '下载中...', mask: true });
                              if (successNumber == fileList.length) { wx.hideLoading(); console.log('hide') };
                            }
                          })
                        }; wx.setStorageSync('resVersion', webVersion);
                      }
                    }
                  });
                }
              }
              else { console.warn('FileList error!') }
            }
          })
        }
      },
    })
  }
}

function getContent(indicator, a, e) {
  console.log(indicator); console.log(a); console.log(e);
  wx.showLoading({ title: '拼命加载中' });
  console.log(e.aim);
  wx.getStorage({
    key: e.aim, success: function (key) {
      console.log(key.data);
      wx.hideLoading(); setPage(key.data, indicator, a, e);
    }, fail: function (res) {
      console.log(res);
      if (res.errMsg == 'getStorage:fail data not found') {
        wx.getNetworkType({
          success: function (res) {
            console.log(res);
            var net = res.networkType;
            if (net == 'none') {
              indicator.setData({ page: [{ tag: 'error' }] }); wx.hideLoading();
              wx.showToast({ title: '无法加载！网络无连接，且您未提前缓存此界面！', icon: 'none', duration: 10000 });
              reConnet(indicator, a, e);
            }
            else if (net == 'unknown') {
              indicator.setData({ page: [{ tag: 'error' }] }); wx.hideLoading();
              wx.showToast({ title: '无法加载！未知网络无法联网，且您未提前缓存此界面！', icon: 'none', duration: 10000 });
              reConnet(indicator, a, e);
            }
            else {
              wx.request({
                url: 'https://mrhope.top/miniProgram/' + e.aim + '.json', success(res) {
                  console.log(res); wx.hideLoading();
                  if (res.statusCode == 200) { setPage(res.data, indicator, a, e); wx.setStorageSync(e.aim, res.data) }
                  else { indicator.setData({ page: [{ tag: 'error' }] }) }
                }
              })
            }
          }
        })
      }
    },
  })
}


function reConnet(indicator, a, e) {
  wx.onNetworkStatusChange(function (res) {
    console.log(res.isConnected); console.log(res.networkType)
    if (res.isConnected) {
      wx.request({
        url: 'https://mrhope.top/miniProgram/' + e.aim + '.json', success(res) {
          console.log(res); wx.hideToast();
          if (res.statusCode == 200) { setPage(res.data, indicator, a, e); wx.setStorageSync(e.aim, res.data) }
          else { indicator.setData({ page: [{ tag: 'error' }] }) }
        }
      })
    }
  })
}
module.exports = {
  cV: checkVersion,
  cRU: checkResUpdate,
  init: initialize,
  sT: setTheme,
  nm: nightmode,
  nav: changeNav,
  sP: setPage,
  pV: pickerView,
  tBC: tabBarChanger,
  back: back,
  sPV: setPickerValue,
  dP: displayPickerView,
  sS: setSwitch,
  ak: arrayKeynumber,
  img: imgLoad,
  gC: getContent,
  // formatTime: formatTime,
  // go: go,
}
// function formatNumber(n) {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }
// function formatTime(date) {
//   var year = date.getFullYear()
//   var month = date.getMonth() + 1
//   var day = date.getDate()
//   var hour = date.getHours()
//   var minute = date.getMinutes()
//   var second = date.getSeconds()
//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }
// function iOSnav2(pos) {
//   let pos = e.changedTouches[0].pageY - e.changedTouches[0].clientY
//   console.log(pos)
//   if (pos < 52) {
//     if (pos < 30) { wx.pageScrollTo({ scrollTop: 0, duration: 200 }) }
//     else { wx.pageScrollTo({ scrollTop: 52, duration: 200 }) }
//   
// }
// function go(url) { wx.navigateTo({ url: url }) }