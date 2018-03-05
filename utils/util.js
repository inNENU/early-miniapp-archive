function initialize(key, defaultKey) {
  let value = wx.getStorageSync(key);
  if (value || value === false) { return value; }
  else { wx.setStorageSync(key, defaultKey); return defaultKey; }
}
function nightmode(date) {
  let nm = initialize('nightmode', false);
  let nmAC = initialize('nightmodeAutoChange', false);
  let nmStart = initialize('nmStart', 2000);
  let nmEnd = initialize('nmEnd', 500);
  let time = date.getHours() * 100 + date.getMinutes();
  if (nmAC && nm) {
    if (nmStart < nmEnd) { if (time >= nmStart && time <= nmEnd) { return true } else { return false } }
    if (nmEnd < nmStart) { if (time <= nmStart && time >= nmEnd) { return false } else { return true } }
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
  if (e && !page[0].top && 'from' in e) { page[0].backText = e.from };
}
function setListContent(page, a, i, e) {
  if ('content' in page[i]) {
    var content = page[i].content;
    for (let j = 0; j < content.length; j++) {
      if ('key' in content[j]) { page[i].content[j].checked = wx.getStorageSync(content[j].key) }
      if ('url' in content[j]) { page[i].content[j].url += "?from=" + page[0].title }
    }
  }
}
function setPage(page, a, e) {
  setNav(page, a, e);
  for (let i = 0; i < page.length; i++) {
    page[i].theme = a.T;
    if (page[i].name === 'img') { page[i].imgMode = a.imgMode };
    setListContent(page, a, i, e);
  };
  return page;
}
function tBC(nm) {
  if (nm) { wx.setTabBarStyle({ color: "#7A7E83", selectedColor: "#3cc51f", backgroundColor: '#000000', borderStyle: 'white' }) }
  else { wx.setTabBarStyle({ color: "#7A7E83", selectedColor: "#3cc51f", backgroundColor: '#ffffff', borderStyle: 'black' }) };
}
function go(url) { wx.navigateTo({ url: url, }) }
function back() { wx.navigateBack({}) }
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function arrayKeynumber(array, key) {
  for (var i in array) {
    if (Object.is(array[i], key)) { return i }
  }
}
module.exports = {
  init: initialize,
  nm: nightmode,
  nav: iOSnav,
  tBC: tBC,
  go: go,
  back: back,
  sP: setPage,
  formatTime: formatTime,
  ak: arrayKeynumber,
}
// function iOSnav2(pos) {
//   let pos = e.changedTouches[0].pageY - e.changedTouches[0].clientY
//   console.log(pos)
//   if (pos < 52) {
//     if (pos < 30) { wx.pageScrollTo({ scrollTop: 0, duration: 200 }) }
//     else { wx.pageScrollTo({ scrollTop: 52, duration: 200 }) }
//   
// }