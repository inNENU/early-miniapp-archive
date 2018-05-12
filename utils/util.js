function checkVersion(version) {
  wx.getSystemInfo({
    success: function (res) {
      let SDK = res.SDKVersion; if (SDK.charAt(0) <= 1 && SDK.charAt(2) < 9) { wx.showModal({ title: '微信版本过低', content: '无法加载小程序，请将客户端升级到V6.6.0版本及以上', showCancel: false, success(res) { if (res.confirm) { wx.navigateBack({}) }; } }) };
      wx.getStorage({ key: 'appVersion', success: function (res) { let preVersion = res.data; if (version != preVersion) { wx.setStorageSync('appVersion', version); wx.showModal({ title: '小程序已升级', content: '检测到小程序更新，为了保障小程序正常运行，您的数据已被清空。请重新进入小程序完成新版本的初始化。', confirmText: '退出', showCancel: false, success(res) { if (res.confirm) { wx.clearStorage(); wx.navigateBack({}) }; } }); }; }, fail: function () { wx.setStorageSync('appVersion', version) } });
      return version;
    }
  });
}

function checkResUpdate() {
  let resNotify = initialize('resNotify', true), resVersion = initialize('resVersion', 0);
  console.log('resNotify ' + resNotify); console.log('resVersion ' + resVersion);
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
                    title: '是否离线部分页面文字资源？', content: '选择离线后可以在无网络连接时查看部分界面。(会消耗100K流量)',
                    cancelText: '否', cancelColor: '#ff0000', confirmText: '是',
                    success(choice) {
                      if (choice.cancel) {
                        wx.showModal({
                          title: '是否要关闭此提示？', content: '关闭后不会再显示类似提示。您可以在设置中重新打开提示。',
                          cancelText: '关闭', cancelColor: '#ff0000', confirmText: '保持打开',
                          success(choice2) { if (choice2.cancel) { wx.setStorageSync('resNotify', false) } }
                        })
                      }
                      if (choice.confirm) { resDownload(fileList); wx.setStorageSync('resVersion', webVersion); }
                    }
                  });
                }
                else if (webVersion > resVersion) {
                  wx.showModal({
                    title: '部分页面资源有更新？', content: '是否立即更新界面资源？\n(会消耗100K流量)',
                    cancelText: '否', cancelColor: '#ff0000', confirmText: '是',
                    success(choice) { if (choice.confirm) { resDownload(fileList); wx.setStorageSync('resVersion', webVersion); } }
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

function resDownload(fileList) {
  let successNumber = 0;
  wx.showLoading({ title: successNumber + '/' + fileList.length + '下载中...', mask: true });
  for (let i = 0; i < fileList.length; i++) {
    wx.request({
      url: 'https://mrhope.top/miniProgram/' + fileList[i] + '.json', success(res) {
        console.log(res); console.log(fileList[i]); wx.setStorageSync(fileList[i], res.data);
        successNumber += 1;
        wx.showLoading({ title: successNumber + '/' + fileList.length + '下载中...', mask: true });
        if (successNumber == fileList.length) { wx.hideLoading(); console.log('hide') };
      }, fail(res) { console.warn(res); console.warn(fileList[i]); }
    })
  }
}

function resRefresh() {
  wx.request({
    url: 'https://mrhope.top/miniProgram/fileList.json', success(listRequest) {
      console.log(listRequest); let webVersion = listRequest.data[0], fileList = listRequest.data[1];
      if (listRequest.statusCode == 200) { resDownload(fileList) }
      else { console.warn('FileList error!') }
    }
  })
}

function initialize(key, defaultKey) {
  let value = wx.getStorageSync(key);
  if (value || value === false) { return value } else { wx.setStorageSync(key, defaultKey); return defaultKey; }
}

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
  let nB = initialize('nmBrightness', 30), dB = initialize('dayBrightness', 70);
  let nBC = initialize('nmBrightnessChange', false), dBC = initialize('dayBrightnessChange', false);
  let s = initialize('nmStart', startTime).split('-'), e = initialize('nmEnd', endTime).split('-');
  let start = Number(s[0]) * 100 + Number(s[1]), end = Number(e[0]) * 100 + Number(e[1]);
  let time = date.getHours() * 100 + date.getMinutes(); var temp;
  if (nmAC) {
    if (start <= end) { if (time >= start && time <= end) { temp = true } else { temp = false } }
    else { if (time <= start && time >= end) { temp = false } else { temp = true } };
    if (temp && nBC) { wx.setScreenBrightness({ value: nB / 100 }) }
    else if (!temp && dBC) { wx.setScreenBrightness({ value: dB / 100 }) }
    wx.setStorageSync('nightmode', temp); return temp;
  } else {
    if (nm && nBC) { wx.setScreenBrightness({ value: nB / 100 }); }
    else if (!nm && dBC) { wx.setScreenBrightness({ value: dB / 100 }); }
    return nm;
  }
}

function changeNav(pos, page, indicator) {
  var n = page[0]; let T, B, S;
  if (pos.scrollTop <= 1) { T = false; B = false; S = false } else if (pos.scrollTop <= 42) { T = false; B = false; S = true }
  else if (pos.scrollTop >= 53) { T = true; B = true; S = true } else { T = true; B = false; S = true };
  if (n.titleDisplay === null || n.titleDisplay != T || n.borderDisplay != B || n.shadow != S)
  { n.titleDisplay = T, n.borderDisplay = B; n.shadow = S; indicator.setData({ page: page }) }
}

function setPage(page, indicator, a, e) {
  console.log(page); console.log(indicator); console.log(a); console.log(e);
  //setNavStart
  if (a.info.model.substring(0, 8) === 'iPhone X') { page[0].iPhoneX = true };
  if (a.info.platform.substring(0, 7) === 'android') { page[0].android = true };
  if (e && !page[0].top && 'from' in e) { page[0].backText = e.from };
  if (e && !page[0].top && 'step' in e) { page[0].aimStep = Number(e.step) + 1 };
  page[0].url = new Array(); page[0].T = a.T;
  //setList
  for (let i = 0; i < page.length; i++) {
    let Module = page[i]; Module.id = i;
    if (Module.src) { page[0].url.push(page[i].src); if (!Module.imgMode) { Module.imgMode = a.imgMode }; };
    if ('content' in Module) {
      for (let j = 0; j < Module.content.length; j++) {
        let item = Module.content[j]; item.id = i + "-" + j;
        if ('url' in item) { item.url += "?from=" + page[0].title };
        if ('aim' in item) { item.url = "guide" + page[0].aimStep + "?from=" + page[0].title + "&aim=" + item.aim + "&step=" + page[0].aimStep };
        if ('swiKey' in item) { item.status = wx.getStorageSync(item.swiKey); };
        if ('sliKey' in item) { item.value = wx.getStorageSync(item.sliKey); };
        if ('pickerValue' in item) {
          let res = wx.getStorageSync(item.key).split('-'); item.currentValue = new Array(); item.value = new Array();
          for (let k = 0; k < res.length; k++) {
            item.value[k] = item.pickerValue[k][Number(res[k])]; item.currentValue[k] = Number(res[k]);
          }
        }
      }
    }
  }; indicator.setData({ T: a.T, nm: a.nm, page: page })
}

function pickerView(page, e, indicator) {
  let pos = e.currentTarget.dataset.id.split('-'), content = page[pos[0]].content[pos[1]];
  if (e.type == 'tap') { content.visible = !content.visible; indicator.setData({ page: page }) }
  if (e.type == 'change') {
    let value = e.detail.value;
    for (let k = 0; k < value.length; k++) {
      content.value[k] = content.pickerValue[k][Number(value[k])]; content.currentValue[k] = value[k]
    }; wx.setStorageSync(content.key, value.join('-')); indicator.setData({ page: page })
  }
}

function slider(page, e, indicator) {
  let pos = e.currentTarget.dataset.id.split('-'), content = page[pos[0]].content[pos[1]], value = e.detail.value;
  if (e.type == 'tap') { content.visible = !content.visible; }
  else if (e.type == 'changing') { content.value = value; }
  else if (e.type == 'change') { content.value = value; wx.setStorageSync(content.sliKey, value); };
  indicator.setData({ page: page })
}

function setSwitch(page, e, indicator) {
  let pos = e.target.id.split('-'), content = page[pos[0]].content[pos[1]];
  content.status = e.detail.value; indicator.setData({ page: page }); wx.setStorageSync(content.swiKey, e.detail.value);
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

function openDocument(e) {
  wx.downloadFile({ url: e.currentTarget.dataset.url, success: function (res) { let path = res.tempFilePath; wx.openDocument({ filePath: path }) } })
}

function phone(page, e) {
  console.log(e);
  let Type = e.target.dataset.type, info = page[e.currentTarget.id];
  if (Type == 'call') { wx.makePhoneCall({ phoneNumber: info.num.toString() }) }
  else if (Type == 'add') { wx.addPhoneContact({ firstName: info.fName, lastName: info.lName, mobilePhoneNumber: info.num, organization: info.org, workPhoneNumber: info.workNum, remark: info.remark, photoFilePath: info.head, nickName: info.nickName, weChatNumber: info.wechat, addressState: info.province, addressCity: info.city, addressStreet: info.street, addressPostalCode: info.postCode, title: info.title, hostNumber: info.hostNum, email: info.email, url: info.website, homePhoneNumber: info.homeNum }) }
}
// function phone(page,e) {
//   console.log(e);
//   let Type = e.target.dataset.type, info = e.currentTarget.dataset;
//   if (Type == 'call') { wx.makePhoneCall({ phoneNumber: info.num.toString() }) }
//   else if (Type == 'add') {
//     wx.addPhoneContact({ firstName: info.fname, lastName: info.lname, organization: info.org, workPhoneNumber: info.workNum, remark: info.remark })
//   }
// }

module.exports = {
  cV: checkVersion,
  cRU: checkResUpdate,
  rR: resRefresh,
  init: initialize,
  sT: setTheme,
  nm: nightmode,
  nav: changeNav,
  sP: setPage,
  pV: pickerView,
  sl: slider,
  tBC: tabBarChanger,
  back: back,
  sS: setSwitch,
  ak: arrayKeynumber,
  img: imgLoad,
  gC: getContent,
  doc: openDocument,
  phone: phone,
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