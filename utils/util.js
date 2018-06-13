function checkResUpdate() {
  let resNotify = initialize('resNotify', true),
    localList = initialize('localList', undefined);
  console.log('resNotify ' + resNotify);
  console.log(localList);
  if (resNotify) {
    wx.request({
      url: 'https://mrhope.top/mp/fileList.json',
      success(listRequest) {
        console.log(listRequest);
        let fileList = listRequest.data;
        if (listRequest.statusCode == 200) {
          if (localList == undefined) {
            wx.showModal({
              title: '是否离线部分页面文字资源？',
              content: '选择离线后可以在无网络连接时查看部分界面。(会消耗50K流量)',
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
                        wx.setStorageSync('resNotify', false)
                      }
                    }
                  })
                }
                if (choice.confirm) {
                  resDownload(fileList, null);
                  wx.setStorageSync('localList', JSON.stringify(fileList));
                }
              }
            });
          } else if (localList !== JSON.stringify(fileList)) {
            console.log('not match')
            wx.showModal({
              title: '部分页面资源有更新？',
              content: '是否立即更新界面资源？\n(会消耗10K流量)',
              cancelText: '否',
              cancelColor: '#ff0000',
              confirmText: '是',
              success(choice) {
                if (choice.confirm) {
                  resDownload(fileList, JSON.parse(localList));
                  wx.setStorageSync('localList', JSON.stringify(fileList));
                }
              }
            });
          } else {
            console.log('match')
          }
        } else {
          console.warn('FileList error!')
        }
      }
    })
  }
}

function resDownload(fileList, localList) {
  console.log(fileList);
  console.log(localList);
  let category = Object.keys(fileList),
    fileNum = 0,
    successNumber = 0;
  console.log(category);
  if (localList) {
    let refreshList = new Array();
    for (let i = 0; i < category.length; i++) {
      if (!localList[category[i]] || localList[category[i]][1] !== fileList[category[i]][1]) {
        console.log(category[i] + 'don\'t match')
        fileNum += fileList[category[i]][0] + 1;
        refreshList.push(category[i]);
      };
      if (!localList[category[i]]) {
        console.log('本地' + category[i] + '不存在')
      };
      if (localList[category[i]][1] !== fileList[category[i]][1]) {
        console.log(category[i] + '版本号不相等')
      };
    };
    console.log("fileNum是" + fileNum + "；refreshList是" + refreshList);
    wx.showLoading({
      title: successNumber + '/' + fileNum + '下载中...',
      mask: true
    });
    for (let i = 0; i < refreshList.length; i++) {
      wx.request({
        url: 'https://mrhope.top/mp/' + refreshList[i] + '/' + refreshList[i] + '.json',
        success(res) {
          console.log(refreshList[i]);
          console.log(res);
          wx.setStorageSync(refreshList[i], res.data);
          successNumber += 1;
          wx.showLoading({
            title: successNumber + '/' + fileNum + '下载中...',
            mask: true
          });
          if (successNumber == fileNum) {
            wx.hideLoading();
            console.log('hide')
          };
        },
        fail(res) {
          console.warn(refreshList[i]);
          console.warn(res);
        }
      });
      for (let j = 1; j <= fileList[refreshList[i]][0]; j++) {
        wx.request({
          url: 'https://mrhope.top/mp/' + refreshList[i] + '/' + refreshList[i] + j + '.json',
          success(res) {
            console.log(res);
            console.log(refreshList[i] + j);
            wx.setStorageSync(refreshList[i] + j, res.data);
            successNumber += 1;
            wx.showLoading({
              title: successNumber + '/' + fileNum + '下载中...',
              mask: true
            });
            if (successNumber == fileNum) {
              wx.hideLoading();
              console.log('hide')
            };
          },
          fail(res) {
            console.warn(res);
            console.warn(refreshList[i]);
          }
        })
      }
    }
  } else {
    for (let i = 0; i < category.length; i++) {
      fileNum += fileList[category[i]][0] + 1;
    };
    console.log(fileNum);
    wx.showLoading({
      title: successNumber + '/' + fileNum + '下载中...',
      mask: true
    });
    for (let i = 0; i < category.length; i++) {
      wx.request({
        url: 'https://mrhope.top/mp/' + category[i] + '/' + category[i] + '.json',
        success(res) {
          console.log(category[i]);
          console.log(res);
          wx.setStorageSync(category[i], res.data);
          successNumber += 1;
          wx.showLoading({
            title: successNumber + '/' + fileNum + '下载中...',
            mask: true
          });
          if (successNumber == fileNum) {
            wx.hideLoading();
            console.log('hide')
          };
        },
        fail(res) {
          console.warn(category[i]);
          console.warn(res);
        }
      });
      for (let j = 1; j <= fileList[category[i]][0]; j++) {
        wx.request({
          url: 'https://mrhope.top/mp/' + category[i] + '/' + category[i] + j + '.json',
          success(res) {
            console.log(res);
            console.log(category[i] + j);
            wx.setStorageSync(category[i] + j, res.data);
            successNumber += 1;
            wx.showLoading({
              title: successNumber + '/' + fileNum + '下载中...',
              mask: true
            });
            if (successNumber == fileNum) {
              wx.hideLoading();
              console.log('hide')
            };
          },
          fail(res) {
            console.warn(res);
            console.warn(category[i]);
          }
        })
      }
    }
  }
}

function resRefresh() {
  wx.request({
    url: 'https://mrhope.top/mp/fileList.json',
    success(listRequest) {
      console.log(listRequest);
      let fileList = listRequest.data;
      if (listRequest.statusCode == 200) {
        resDownload(fileList, null)
      } else {
        console.warn('FileList error!')
      }
    }
  })
}

function getContent(indicator, a, e) {
  console.log(indicator);
  console.log(e);
  wx.showLoading({
    title: '拼命加载中'
  });
  wx.getStorage({
    key: e.aim,
    success: function(key) {
      console.log(key.data);
      wx.hideLoading();
      setPage(key.data, indicator, a, e);
    },
    fail: function(res) {
      console.log(res);
      if (res.errMsg == 'getStorage:fail data not found') {
        wx.getNetworkType({
          success: function(res) {
            console.log(res);
            var net = res.networkType;
            if (net == 'none') {
              indicator.setData({
                page: [{
                  tag: 'error'
                }]
              });
              wx.hideLoading();
              wx.showToast({
                title: '无法加载！网络无连接，且您未提前缓存此界面！',
                icon: 'none',
                duration: 10000
              });
              reConnet(indicator, a, e);
            } else if (net == 'unknown') {
              indicator.setData({
                page: [{
                  tag: 'error'
                }]
              });
              wx.hideLoading();
              wx.showToast({
                title: '无法加载！未知网络无法联网，且您未提前缓存此界面！',
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
                  wx.hideLoading();
                  if (res.statusCode == 200) {
                    setPage(res.data, indicator, a, e);
                    wx.setStorageSync(e.aim, res.data)
                  } else {
                    console.log('res error');
                    setPage([{
                      tag: 'error'
                    }], indicator, a, e);
                  }
                }
              })
            }
          }
        })
      }
    },
  })
}

function initialize(key, defaultKey) {
  let value = wx.getStorageSync(key);
  if (value || value === false) {
    return value
  } else {
    wx.setStorageSync(key, defaultKey);
    return defaultKey;
  }
}

function setTheme(theme) {
  let value = wx.getStorageSync('theme');
  if (value) {
    return value
  } else {
    if (theme == "auto") {
      let p = wx.getSystemInfoSync().platform,
        t, num;
      if (p == 'ios') {
        t = 'iOS';
        num = 0;
      } else if (p == 'android') {
        t = 'wechat';
        num = 1;
      } else if (p == 'devtools') {
        t = 'iOS';
        num = 0;
      };
      wx.setStorageSync('theme', t);
      wx.setStorageSync('themeNum', num);
      return t;
    } else {
      return theme;
    }
  }
}

function nightmode(date, startTime, endTime) {
  let nm = initialize('nightmode', true),
    nmAC = initialize('nightmodeAutoChange', true);
  let nB = initialize('nightBrightness', 30),
    dB = initialize('dayBrightness', 70);
  let nBC = initialize('nightBrightnessChange', false),
    dBC = initialize('dayBrightnessChange', false);
  let s = initialize('nmStart', startTime).split('-'),
    e = initialize('nmEnd', endTime).split('-');
  let start = Number(s[0]) * 100 + Number(s[1]),
    end = Number(e[0]) * 100 + Number(e[1]);
  let time = date.getHours() * 100 + date.getMinutes();
  var temp;
  if (nmAC) {
    if (start <= end) {
      if (time >= start && time <= end) {
        temp = true
      } else {
        temp = false
      }
    } else {
      if (time <= start && time >= end) {
        temp = false
      } else {
        temp = true
      }
    };
    if (temp && nBC) {
      wx.setScreenBrightness({
        value: nB / 100
      })
    } else if (!temp && dBC) {
      wx.setScreenBrightness({
        value: dB / 100
      })
    }
    wx.setStorageSync('nightmode', temp);
    return temp;
  } else {
    if (nm && nBC) {
      wx.setScreenBrightness({
        value: nB / 100
      });
    } else if (!nm && dBC) {
      wx.setScreenBrightness({
        value: dB / 100
      });
    }
    return nm;
  }
}

function changeNav(e, indicator) {
  var n = indicator.data.page[0];
  let T, B, S;
  if (e.scrollTop <= 1) {
    T = false;
    B = false;
    S = false
  } else if (e.scrollTop <= 42) {
    T = false;
    B = false;
    S = true
  } else if (e.scrollTop >= 53) {
    T = true;
    B = true;
    S = true
  } else {
    T = true;
    B = false;
    S = true
  };
  if (n.titleDisplay != T || n.borderDisplay != B || n.shadow != S) {
    n.titleDisplay = T, n.borderDisplay = B;
    n.shadow = S;
    indicator.setData({
      page: indicator.data.page
    })
  }
}

function setPage(page, indicator, a, e) {
  //setNav
  if (page && page[0].tag == 'head') {
    page[0].statusBarHeight = a.info.statusBarHeight;
    if (a.info.model.substring(0, 8) === 'iPhone X') {
      page[0].iPhoneX = true
    };
    if (a.info.platform.substring(0, 7) === 'android') {
      page[0].android = true
    };
    if (e && !page[0].top && 'from' in e) {
      page[0].backText = e.from
    };
    if (e && !page[0].top && 'step' in e) {
      page[0].aimStep = Number(e.step) + 1
    };
  };
  var url = new Array();
  for (let i = 0; i < page.length; i++) {
    //setImage
    let Module = page[i];
    Module.id = i;
    if (Module.src) {
      if (Module.res) {
        url.push(Module.res)
      } else {
        url.push(Module.src);
        Module.res = Module.src
      };
      if (!Module.imgMode) {
        Module.imgMode = a.imgMode
      };
    };
    //setList
    if ('content' in Module) {
      for (let j = 0; j < Module.content.length; j++) {
        let item = Module.content[j];
        item.id = i + "-" + j;
        //set List navigator
        if ('url' in item) {
          item.url += "?from=" + page[0].title
        };
        if ('aim' in item) {
          item.url = "/templates/module" + page[0].aimStep + "?from=" + page[0].title + "&aim=" + item.aim + "&step=" + page[0].aimStep
        };
        //set List switch
        if ('swiKey' in item) {
          item.status = wx.getStorageSync(item.swiKey);
        };
        //set List slider
        if ('sliKey' in item) {
          item.value = wx.getStorageSync(item.sliKey);
        };
        //set List picker
        if ('pickerValue' in item) {
          if (item.single) {
            let res = wx.getStorageSync(item.key);
            item.value = item.pickerValue[res];
            item.currentValue = [res]
          } else {
            let res = wx.getStorageSync(item.key).split('-');
            item.currentValue = new Array();
            item.value = new Array();
            for (let k = 0; k < res.length; k++) {
              item.value[k] = item.pickerValue[k][Number(res[k])];
              item.currentValue[k] = Number(res[k]);
            }
          }
        }
      }
    }
  };
  indicator.setData({
    T: a.T,
    nm: a.nm,
    page: page,
    url: url,
  })
}

function componemtAction(e, indicator) {
  console.log(e)
  let action = e.currentTarget.dataset.action;
  if (action == 'img') {
    image(e, indicator)
  } else if (action == 'doc') {
    document(e)
  } else if (action == 'phone') {
    phone(e, indicator)
  } else if (action == 'picker') {
    picker(e, indicator)
  } else if (action == 'switch') {
    Switch(e, indicator)
  } else if (action == 'slider') {
    slider(e, indicator)
  } else if (action == 'back') {
    wx.navigateBack({})
  }
}

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
    })
  }
}

function slider(e, indicator) {
  let pos = e.currentTarget.dataset.id.split('-'),
    content = indicator.data.page[pos[0]].content[pos[1]],
    value = e.detail.value;
  if (e.type == 'tap') {
    content.visible = !content.visible;
  } else if (e.type == 'changing') {
    content.value = value;
  } else if (e.type == 'change') {
    content.value = value;
    wx.setStorageSync(content.sliKey, value);
  };
  indicator.setData({
    page: indicator.data.page
  })
}

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

function tabBarChanger(nm) {
  if (nm) {
    wx.setTabBarStyle({
      backgroundColor: '#000000',
      borderStyle: 'white'
    })
  } else {
    wx.setTabBarStyle({
      backgroundColor: '#ffffff',
      borderStyle: 'black'
    })
  };
}

function image(e, indicator) {
  let current = indicator.data.page[e.target.id];
  if (e.type == 'load') {
    current.load = true;
    indicator.setData({
      page: indicator.data.page
    });
  } else if (e.type == 'error') {
    current.error = true;
    indicator.setData({
      page: indicator.data.page
    });
  } else if (e.type == 'tap') {
    wx.previewImage({
      current: current.res,
      urls: indicator.data.url
    })
  };
}

function document(e) {
  wx.showLoading({
    title: '下载中...',
    mask: true
  });
  wx.downloadFile({
    url: e.currentTarget.dataset.url,
    success: function(res) {
      wx.hideLoading();
      let path = res.tempFilePath;
      wx.openDocument({
        filePath: path
      })
    }
  })
}

function phone(e, indicator) {
  let Type = e.target.dataset.type,
    info = indicator.data.page[e.currentTarget.id];
  if (Type == 'call') {
    wx.makePhoneCall({
      phoneNumber: info.num.toString()
    })
  } else if (Type == 'add') {
    wx.addPhoneContact({
      firstName: info.fName,
      lastName: info.lName,
      mobilePhoneNumber: info.num,
      organization: info.org,
      workPhoneNumber: info.workNum,
      remark: info.remark,
      photoFilePath: info.head,
      nickName: info.nickName,
      weChatNumber: info.wechat,
      addressState: info.province,
      addressCity: info.city,
      addressStreet: info.street,
      addressPostalCode: info.postCode,
      title: info.title,
      hostNumber: info.hostNum,
      email: info.email,
      url: info.website,
      homePhoneNumber: info.homeNum
    })
  }
}

function back() {
  wx.navigateBack({})
}

function arrayKeynumber(array, key) {
  for (var i in array) {
    if (array[i] == key) {
      return i
    }
  }
}

function reConnet(indicator, a, e) {
  wx.onNetworkStatusChange(function(res) {
    console.log(res.isConnected);
    console.log(res.networkType)
    if (res.isConnected) {
      wx.request({
        url: 'https://mrhope.top/miniProgram/' + e.aim + '.json',
        success(res) {
          console.log(res);
          wx.hideToast();
          if (res.statusCode == 200) {
            setPage(res.data, indicator, a, e);
            wx.setStorageSync(e.aim, res.data)
          } else {
            indicator.setData({
              page: [{
                tag: 'error'
              }]
            })
          }
        }
      })
    }
  })
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
module.exports = {
  // cV: checkVersion,
  cRU: checkResUpdate,
  rR: resRefresh,
  init: initialize,
  sT: setTheme,
  nm: nightmode,
  nav: changeNav,
  sP: setPage,
  // pV: picker,
  sl: slider,
  tBC: tabBarChanger,
  back: back,
  sS: Switch,
  ak: arrayKeynumber,
  // img: image,
  gC: getContent,
  doc: document,
  phone: phone,
  on: on,
  emit: emit,
  remove: remove,
  donate: donate,
  cA: componemtAction,
  // formatTime: formatTime,
  // go: go,
}
// function checkVersion(version) {
//   wx.getSystemInfo({
//     success: function (res) {
//       let SDK = res.SDKVersion; if (SDK.charAt(0) <= 1 && SDK.charAt(2) < 9) { wx.showModal({ title: '微信版本过低', content: '无法加载小程序，请将客户端升级到V6.6.0版本及以上', showCancel: false, success(res) { if (res.confirm) { wx.navigateBack({}) }; } }) };
//       wx.getStorage({ key: 'appVersion', success: function (res) { let preVersion = res.data; if (version != preVersion) { wx.setStorageSync('appVersion', version); wx.showModal({ title: '小程序已升级', content: '检测到小程序更新，为了保障小程序正常运行，您的数据已被清空。请重新进入小程序完成新版本的初始化。', confirmText: '退出', showCancel: false, success(res) { if (res.confirm) { wx.clearStorage(); wx.navigateBack({}) }; } }); }; }, fail: function () { wx.setStorageSync('appVersion', version) } });
//       return version;
//     }
//   });
// }
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
var events = {};

function on(name, self, callback) {
  var tuple = [self, callback];
  var callbacks = events[name];
  if (Array.isArray(callbacks)) {
    callbacks.push(tuple);
  } else {
    events[name] = [tuple];
  }
}

function remove(name, self) {
  var callbacks = events[name];
  if (Array.isArray(callbacks)) {
    events[name] = callbacks.filter((tuple) => {
      return tuple[0] != self;
    })
  }
}

function emit(name, data) {
  var callbacks = events[name];
  if (Array.isArray(callbacks)) {
    callbacks.map((tuple) => {
      var self = tuple[0];
      var callback = tuple[1];
      callback.call(self, data);
    })
  }
}