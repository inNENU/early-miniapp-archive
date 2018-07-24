module.exports = {
  checkUpdate,
  resRefresh,
  tabBarChanger,
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
                  resDownload(onlineData, JSON.parse(onlineData));
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