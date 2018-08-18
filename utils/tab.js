module.exports = {
  checkUpdate,
  tabBarChanger,
  markerSet,
  request,
  resDownload
}

// 初始化存储
function initialize(key, defaultKey) {
  let value = wx.getStorageSync(key);
  return (value || value === false) ? value : (wx.setStorageSync(key, defaultKey), defaultKey);
}

// 动态根据夜间模式改变导航栏 from main.js & me.js
function tabBarChanger(nm) {
  (nm) ? wx.setTabBarStyle({
    backgroundColor: '#000000',
    borderStyle: 'white'
  }): wx.setTabBarStyle({
    backgroundColor: '#ffffff',
    borderStyle: 'black'
  });
}

//检查资源更新 from function.js & guide.js
function checkUpdate(notifyKey, storageKey, onlineFileName, title, content, dataUsage) {
  let notify = initialize(notifyKey, true),
    local = initialize(storageKey, undefined);
  console.log(notifyKey + 'is' + notify), console.log(local); //调试
  if (notify) {
    wx.request({
      url: 'https://mrhope.top/mp/' + onlineFileName + '.json',
      success(Request) {
        console.log(Request); //调试
        let onlineData = Request.data;
        if (Request.statusCode == 200) {
          if (local == undefined) {
            wx.showModal({
              title: title,
              content: content,
              cancelText: '否',
              cancelColor: '#ff0000',
              confirmText: '是',
              success(choice) {
                if (choice.cancel) {
                  wx.showModal({
                    title: '是否要关闭此提示？',
                    content: '关闭后不会再显示类似提示。您可以在设置中重新打开提示。',
                    cancelText: '关闭',
                    cancelColor: '#ff0000',
                    confirmText: '保持打开',
                    success(choice2) {
                      if (choice2.cancel) {
                        wx.setStorageSync(notifyKey, false)
                      }
                    }
                  })
                }
                if (choice.confirm) {
                  resDownload(onlineData, null);
                  wx.setStorageSync(storageKey, JSON.stringify(onlineData));
                }
              }
            });
          } else if (local !== JSON.stringify(onlineData)) {
            console.log('not match') //调试
            wx.showModal({
              title: '部分资源有更新？',
              content: '是否立即更新资源？\n(会消耗' + dataUsage + '流量)',
              cancelText: '否',
              cancelColor: '#ff0000',
              confirmText: '是',
              success(choice) {
                if (choice.confirm) {
                  resDownload(onlineData, JSON.parse(local));
                  wx.setStorageSync(storageKey, JSON.stringify(onlineData));
                }
              }
            });
          } else {
            console.log('match') //调试
          }
        } else {
          console.error('Funclist error!')
        }
      }
    })
  }
}

// //resRefresh的附属函数
// function resSnyc(fileNumList, refreshList) {
//   wx.showLoading({
//     title: '下载中...0%',
//     mask: true
//   });
//   let percent = new Array(),
//     successNumber = 0,
//     fileNum = 0;
//   fileNumList.forEach(x => {
//     fileNum += x + 1;
//   })
//   console.log("fileNum是" + fileNum);
//   for (let i = 0; i <= fileNum; i++) {
//     percent.push(((i / fileNum) * 100).toString().substring(0, 4));
//   }
//   let timeoutFunc = setTimeout(function() {
//     wx.hideLoading();
//     console.error('hide timeout')
//   }, 10000);
//   refreshList.forEach((x, y) => {
//     wx.request({
//       url: 'https://mrhope.top/mp/' + x + '/' + x + '.json',
//       success(res) {
//         console.log(x), console.log(res); //调试
//         successNumber += 1, wx.setStorageSync(x, res.data);
//         wx.showLoading({
//           title: '下载中...' + percent[successNumber] + '%',
//           mask: true
//         });
//         if (successNumber == fileNum) {
//           wx.hideLoading();
//           console.log('hide'); //调试
//           clearTimeout(timeoutFunc);
//         };
//       },
//       fail(res) {
//         console.warn(x), console.warn(res);
//       }
//     });
//     for (let j = 1; j <= fileNumList[y]; j++) {
//       wx.request({
//         url: 'https://mrhope.top/mp/' + x + '/' + x + j + '.json',
//         success(res) {
//           console.log(res), console.log(x + j); //调试
//           successNumber += 1, wx.setStorageSync(x + j, res.data);
//           wx.showLoading({
//             title: '下载中...' + percent[successNumber] + '%',
//             mask: true
//           });
//           if (successNumber == fileNum) {
//             wx.hideLoading();
//             console.log('hide'); //调试
//             clearTimeout(timeoutFunc);
//           };
//         },
//         fail(res) {
//           console.error(res), console.error(x + j);
//           successNumber += 1;
//         }
//       })
//     }
//   })
// }

//resRefresh的附属函数
function resSnyc(refreshList) {
  wx.showLoading({
    title: '下载中...0%',
    mask: true
  });
  let percent = new Array(),
    successNumber = 0,
    fileNum = refreshList.length;
  console.log("fileNum是" + fileNum);
  for (let i = 0; i <= fileNum; i++) {
    percent.push(((i / fileNum) * 100).toString().substring(0, 4));
  }
  let timeoutFunc = setTimeout(function() {
    wx.hideLoading();
    console.error('hide timeout')
  }, 10000);
  refreshList.forEach(x => {
    wx.request({
      url: `https://mrhope.top/mp/${x}/${x}.json`,
      success(res) {
        console.log(x), console.log(res); //调试
        res.data.forEach((y, z) => {
          wx.setStorageSync(x + z, y);
        })
        successNumber += 1;
        wx.showLoading({
          title: '下载中...' + percent[successNumber] + '%',
          mask: true
        });
        if (successNumber == fileNum) {
          wx.hideLoading();
          console.log('hide'); //调试
          clearTimeout(timeoutFunc);
        };
      },
      fail(res) {
        console.warn(x), console.warn(res);
      }
    });
  })
}

// //资源下载 from fuction.js & guide.js 被resRefresh调用
// function resDownload(onlineList, localList) {
//   console.log(onlineList), console.log(localList); //调试
//   let category = Object.keys(onlineList),
//     fileNumList = new Array(),
//     refreshList = new Array();
//   console.log(category); //调试
//   if (localList) {
//     category.forEach(x => {
//       if (!localList[x] || localList[x][1] !== onlineList[x][1]) {
//         console.log(x + 'don\'t match'); //调试
//         fileNumList.push(onlineList[x][0]), refreshList.push(x);
//       };
//     })
//     resSnyc(fileNumList, refreshList);
//   } else {
//     category.forEach(x => {
//       fileNumList.push(onlineList[x][0]);
//     })
//     refreshList = category;
//     resSnyc(fileNumList, refreshList);
//   }
// }

// function markerSet() {
//   let localList, markerData = wx.getStorageSync('marker'),
//     temp = wx.getStorageSync('localFunc'),
//     markerVersion = localList ? localList.marker[1] : null,
//     currentVersion = wx.getStorageSync('markerVersion');
//   if (temp) {
//     localList = JSON.parse(temp)
//   }
//   if (!markerData) {
//     request('marker/marker', function(data, indicator) {
//       wx.setStorageSync('marker', data);
//       if (setMarker(data[0], 'benbu') && setMarker(data[1], 'jingyue') && markerVersion) {
//         wx.setStorageSync('markerVersion', markerVersion)
//       } else {
//         console.warn('Marker set failure.')
//       };
//     }, null);
//   } else {
//     if (markerVersion != currentVersion) {
//       if (setMarker(markerData[0], 'benbu') && setMarker(markerData[1], 'jingyue')) {
//         wx.setStorageSync('markerVersion', markerVersion)
//       } else {
//         console.warn('Marker set failure.')
//       };
//     }
//   }
// }

//资源下载 from fuction.js & guide.js 被resRefresh调用
function resDownload(onlineList, localList) {
  console.log(onlineList), console.log(localList); //调试
  let category = Object.keys(onlineList);
  console.log(category); //调试
  if (localList) {
    let refreshList = new Array();
    category.forEach(x => {
      if (localList[x] !== onlineList[x]) {
        console.log(x + 'don\'t match'); //调试
        refreshList.push(x);
      };
    })
    resSnyc(refreshList);
  } else {
    resSnyc(category);
  }
}

function markerSet() {
  let localList, markerData = wx.getStorageSync('marker'),
    temp = wx.getStorageSync('localFunc'),
    markerVersion = localList ? localList.marker[1] : null,
    currentVersion = wx.getStorageSync('markerVersion');
  if (temp) {
    localList = JSON.parse(temp)
  }
  if (!markerData) {
    request('marker/marker', function(data, indicator) {
      wx.setStorageSync('marker', data);
      if (setMarker(data[0], 'benbu') && setMarker(data[1], 'jingyue') && markerVersion) {
        wx.setStorageSync('markerVersion', markerVersion)
      } else {
        console.warn('Marker set failure.')
      };
    }, null);
  } else {
    if (markerVersion != currentVersion) {
      if (setMarker(markerData[0], 'benbu') && setMarker(markerData[1], 'jingyue')) {
        wx.setStorageSync('markerVersion', markerVersion)
      } else {
        console.warn('Marker set failure.')
      };
    }
  }
}

function setMarker(data, name) {
  let marker = initMarker(data.points),
    category = data.category;
  wx.setStorageSync(name + '-all', marker);
  Object.keys(category).forEach(x => {
    let markerDetail = new Array;
    for (let j = category[x][0]; j <= category[x][1]; j++) {
      markerDetail.push(marker[j])
    };
    wx.setStorageSync(name + '-' + x, markerDetail)
  })
  return 'success';
}

//初始化marker，被setMarker调用
function initMarker(markers) {
  markers.forEach(x => {
    let temp = {
      iconPath: "/function/icon/marker.png",
      width: 25,
      height: 25,
      alpha: 0.8,
      label: {
        content: x.name,
        color: "#1A9D5E",
        fontSize: "10",
        anchorX: -4 - 5 * x.name.length,
        anchorY: 0,
        bgColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#efeef4',
        borderRadius: 2,
        padding: "3",
      },
      callout: {
        content: x.detail,
        color: "#ffffff",
        fontSize: "16",
        borderRadius: "10",
        bgColor: "#1A9D5E",
        padding: "10",
        display: "BYCLICK"
      }
    };
    if (!("title" in x)) {
      x.title = x.detail
    };
    delete x.name, delete x.detail;
    Object.assign(x, temp);
  })
  return markers;
}

//wx.request包装
function request(path, Func, indicator) {
  wx.request({
    url: `https://mrhope.top/mp/${path}.json`,
    success(res) {
      console.log(res)
      if (res.statusCode == 200) Func(res.data, indicator)
      else console.warn(`request ${path} fail: ${res.statusCode}`)
    }
  });
}