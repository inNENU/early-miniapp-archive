function checkVersion(version) {
  wx.getSystemInfo({
    success: function (res) {
      let SDK = res.SDKVersion; if (SDK.charAt(0) <= 1 && SDK.charAt(2) < 9) { wx.showModal({ title: '微信版本过低', content: '无法加载小程序，请将客户端升级到V6.6.0版本及以上', showCancel: false, success(res) { if (res.confirm) { wx.navigateBack({}) }; } }) };
      wx.getStorage({ key: 'version', success: function (res) { let preVersion = res.data; if (version != preVersion) { wx.setStorageSync('version', version); wx.showModal({ title: '小程序已升级', content: '检测到小程序更新，为了保障小程序正常运行，您的数据已被清空。请重新进入小程序完成新版本的初始化。', confirmText: '退出', showCancel: false, success(res) { if (res.confirm) { wx.clearStorage(); wx.navigateBack({}) }; } }); }; }, fail: function () { wx.setStorageSync('version', version) } });
      return version;
    }
  });
}
function initialize(key, defaultKey) {
  let value = wx.getStorageSync(key);
  if (value || value === false) { return value } else { wx.setStorageSync(key, defaultKey); return defaultKey; }
}
function setTheme(theme) {
  let value = wx.getStorageSync('theme'); if (value) { return value } else {
    if (theme == "auto") {
      let platform = wx.getSystemInfoSync().platform;
      if (platform == 'ios') { return 'iOS' };
      if (platform == 'android') { return 'wechat' };
      if (platform == 'devtools') { return 'iOS' };
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
function iOSnav(pos, page) {
  var n = page[0], T, B;
  if (pos.scrollTop <= 42) { T = false; B = false; }
  else if (pos.scrollTop >= 53) { T = true; B = true; }
  else { T = true; B = false; };
  if (n.titleDisplay === null) { n.titleDisplay = T, n.borderDisplay = B; return page; }
  else { if (n.titleDisplay != T || n.borderDisplay != B) { n.titleDisplay = T, n.borderDisplay = B }; return page; }
}
function setNav(page, a, e) {
  if (a.info.model.substring(0, 8) === 'iPhone X') { page[0].iPhoneX = true };
  if (a.info.platform.substring(0, 7) === 'android') { page[0].android = true };
  if (e && !page[0].top && 'from' in e) { page[0].backText = e.from };
}
function setListContent(page, a, i) {
  if ('content' in page[i]) {
    let content = page[i].content;
    for (let j = 0; j < content.length; j++) {
      content[j].id = i + "-" + j;
      if ('key' in content[j]) { content[j].status = wx.getStorageSync(content[j].key); };
      if ('url' in content[j]) { content[j].url += "?from=" + page[0].title };
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
function pickerView(page, e) {
  if (e.type == 'tap') { return displayPickerView(page, e) }
  if (e.type == 'change') { return setPickerValue(page, e) }
}
function setPickerValue(page, e) {
  console.log(e)
  let pos = e.target.dataset.id.split('-'), content = page[pos[0]].content[pos[1]], value = e.detail.value;
  for (let k = 0; k < value.length; k++) {
    content.value[k] = content.pickerValue[k][Number(value[k])]; content.currentValue[k] = value[k]
  }; wx.setStorageSync(content.pickerKey, value.join('-')); return page;
}
function displayPickerView(page, e) {
  console.log(e)
  let pos = e.currentTarget.id.split('-'), content = page[pos[0]].content[pos[1]];
  content.visible = !content.visible; return page;
}
function setSwitch(page, e) {
  console.log(e)
  let pos = e.target.id.split('-'), content = page[pos[0]].content[pos[1]];
  content.status = e.detail.value; wx.setStorageSync(content.key, e.detail.value);
  return page;
}
function setPage(page, a, e) {
  setNav(page, a, e); page[0].url = new Array(); page[0].T = a.T;
  for (let i = 0; i < page.length; i++) {
    let current = page[i]; current.id = i;
    if (current.src) {
      page[0].url.push(page[i].src);
      if (!current.imgMode) { current.imgMode = a.imgMode };
    };
    setListContent(page, a, i);
  }; return page;
}
function tabBarChanger(nm) {
  if (nm) { wx.setTabBarStyle({ color: "#7A7E83", selectedColor: "#3cc51f", backgroundColor: '#000000', borderStyle: 'white' }) }
  else { wx.setTabBarStyle({ color: "#7A7E83", selectedColor: "#3cc51f", backgroundColor: '#ffffff', borderStyle: 'black' }) };
}
function go(url) { wx.navigateTo({ url: url }) }
function back() { wx.navigateBack({}) }
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function arrayKeynumber(array, key) {
  for (var i in array) {
    if (array[i] == key) { return i }
  }
}
function imgLoad(page, e) {
  let current = page[e.target.id];
  if (e.type == 'load') { current.load = true }
  else if (e.type == 'error') { current.error = true }
  else if (e.type == 'tap') { wx.previewImage({ current: current.src, urls: page[0].url }) }; return page;
}
module.exports = {
  init: initialize,
  sT: setTheme,
  nm: nightmode,
  nav: iOSnav,
  tBC: tabBarChanger,
  go: go,
  back: back,
  sP: setPage,
  sPV: setPickerValue,
  dP: displayPickerView,
  pV: pickerView,
  sS: setSwitch,
  ak: arrayKeynumber,
  cV: checkVersion,
  img: imgLoad,
  // formatTime: formatTime,
}
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