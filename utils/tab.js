module.exports = {
  checkUpdate,
  resRefresh,
  tabBarChanger,
  markerSet
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
  console.log(notifyKey + 'is' + notify); //调试
  console.log(local);
  if (notify) {
    wx.request({
      url: 'https://mrhope.top/mp/' + onlineFileName + '.json',
      success(Request) {
        console.log(Request);
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

//resRefresh的附属函数
function resSnyc(fileNumList, refreshList) {
  wx.showLoading({
    title: '下载中...0%',
    mask: true
  });
  let percent = new Array(),
    successNumber = 0,
    fileNum = 0;
  for (let i = 0; i < fileNumList.length; i++) {
    fileNum += fileNumList[i] + 1;
  };
  console.log("fileNum是" + fileNum);
  for (let i = 0; i <= fileNum; i++) {
    percent.push(((i / fileNum) * 100).toString().substring(0, 4));
  }
  let timeoutFunc = setTimeout(function() {
    wx.hideLoading();
    console.error('hide timeout')
  }, 10000);
  for (let i = 0; i < refreshList.length; i++) {
    wx.request({
      url: 'https://mrhope.top/mp/' + refreshList[i] + '/' + refreshList[i] + '.json',
      success(res) {
        console.log(refreshList[i]), console.log(res);
        wx.setStorageSync(refreshList[i], res.data);
        successNumber += 1;
        wx.showLoading({
          title: '下载中...' + percent[successNumber] + '%',
          mask: true
        });
        if (successNumber == fileNum) {
          wx.hideLoading();
          console.log('hide');
          clearTimeout(timeoutFunc);
        };
      },
      fail(res) {
        console.warn(refreshList[i]), console.warn(res);
      }
    });
    for (let j = 1; j <= fileNumList[i]; j++) {
      wx.request({
        url: 'https://mrhope.top/mp/' + refreshList[i] + '/' + refreshList[i] + j + '.json',
        success(res) {
          console.log(res), console.log(refreshList[i] + j);
          wx.setStorageSync(refreshList[i] + j, res.data);
          successNumber += 1;
          wx.showLoading({
            title: '下载中...' + percent[successNumber] + '%',
            mask: true
          });
          if (successNumber == fileNum) {
            wx.hideLoading();
            console.log('hide');
            clearTimeout(timeoutFunc);
          };
        },
        fail(res) {
          console.error(res), console.error(refreshList[i] + j);
          successNumber += 1;
        }
      })
    }
  }
}

//资源下载 from fuction.js & guide.js 被resRefresh调用
function resDownload(onlineList, localList) {
  console.log(onlineList), console.log(localList); //调试
  let category = Object.keys(onlineList),
    fileNumList = new Array(),
    refreshList = new Array();
  console.log(category);
  if (localList) {
    for (let i = 0; i < category.length; i++) {
      if (!localList[category[i]] || localList[category[i]][1] !== onlineList[category[i]][1]) {
        console.log(category[i] + 'don\'t match')
        fileNumList.push(onlineList[category[i]][0]);
        refreshList.push(category[i]);
      };
    };
    resSnyc(fileNumList, refreshList);
  } else {
    for (let i = 0; i < category.length; i++) {
      fileNumList.push(onlineList[category[i]][0]);
    };
    refreshList = category;
    resSnyc(fileNumList, refreshList);
  }
}

//资源刷新 from theme.js
function resRefresh() {
  wx.request({
    url: 'https://mrhope.top/mp/fileList.json',
    success(listRequest) {
      console.log(listRequest);
      let fileList = listRequest.data;
      if (listRequest.statusCode == 200) {
        resDownload(fileList, null)
      } else {
        console.error('FileList error!')
      }
    }
  })
}

function initMarker(markers) {
  for (let i = 0; i < markers.length; i++) {
    let point = markers[i],
      temp = {
        iconPath: "/function/icon/marker.png",
        width: 25,
        height: 25,
        alpha: 0.8,
        label: {
          content: point.name,
          color: "#1A9D5E",
          fontSize: "10",
          anchorX: -4 - 5 * point.name.length,
          anchorY: 0,
          bgColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#efeef4',
          borderRadius: 2,
          padding: "3",
        },
        callout: {
          content: point.detail,
          color: "#ffffff",
          fontSize: "16",
          borderRadius: "10",
          bgColor: "#1A9D5E",
          padding: "10",
          display: "BYCLICK"
        }
      };
    if (!("title" in point)) {
      point.title = point.detail
    };
    delete point.name;
    delete point.detail;
    Object.assign(point, temp);
  };
  return markers;
}

function markerSet() {
  let data = wx.getStorageSync('marker');
  if (data) {
    console.log(data);
    if (setMarker(data[0], 'benbu') && setMarker(data[1], 'jingyue')) {
      wx.removeStorageSync('marker');
    }
  }
}

function setMarker(data, name) {
  let marker = initMarker(data.points),
    category = data.category,
    categoryList = Object.keys(category);
  wx.setStorageSync(name, marker);
  for (let i = 0; i < categoryList.length; i++) {
    let markerDetail = new Array; //=
    for (let j = category[categoryList[i]][0]; j <= category[categoryList[i]][1]; j++) {
      markerDetail.push(marker[j])
    };
    wx.setStorageSync(name + '-' + categoryList[i], markerDetail)
  };
  return 'success';
}