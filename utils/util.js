function checkUpdate(notifyKey, storageKey, onlineFileName, title, content, dataUsage) {
  let notify = initialize(notifyKey, true),
    local = initialize(storageKey, undefined);
  console.log(notifyKey + notify);
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
            console.log('not match')
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
            console.log('match')
          }
        } else {
          console.error('Funclist error!')
        }
      }
    })
  }
}

function checkFunctionUpdate() {
  checkUpdate('funcNotify', 'localFunc', 'funcList', '是否立即下载功能所需资源？', '下载后会使功能响应速度明显提升。(会消耗30K流量)', '20K')
}

function checkResUpdate() {
  checkUpdate('resNotify', 'localList', 'fileList', '是否立即下载界面所需资源？', '下载后可离线查看大部分界面。(会消耗60K流量)', '30K')
}

function resDownload(fileList, localList) {
  console.log(fileList);
  console.log(localList);
  let category = Object.keys(fileList),
    fileNum = 0,
    successNumber = 0,
    percent = new Array,
    k;
  console.log(category);
  if (localList) {
    let refreshList = new Array();
    for (let i = 0; i < category.length; i++) {
      if (!localList[category[i]] || localList[category[i]][1] !== fileList[category[i]][1]) {
        console.log(category[i] + 'don\'t match')
        fileNum += fileList[category[i]][0] + 1;
        refreshList.push(category[i]);
      };
    };
    console.log("fileNum是" + fileNum);
    for (let i = 0; i <= fileNum; i++) {
      percent.push(((i / fileNum) * 100).toString().substring(0, 4));
    }
    wx.showLoading({
      title: '更新中...0%',
      mask: true
    });
    setTimeout(function() {
      wx.hideLoading();
      console.warn('hide timeout')
    }, 10000);
    for (let i = 0; i < refreshList.length; i++) {
      wx.request({
        url: 'https://mrhope.top/mp/' + refreshList[i] + '/' + refreshList[i] + '.json',
        success(res) {
          console.log(refreshList[i]), console.log(res);
          wx.setStorageSync(refreshList[i], res.data);
          successNumber += 1;
          wx.showLoading({
            title: '更新中...' + percent[successNumber] + '%',
            mask: true
          });
          if (successNumber == fileNum) {
            wx.hideLoading();
            console.log('hide')
          };
        },
        fail(res) {
          console.warn(refreshList[i]), console.warn(res);
        }
      });
      for (let j = 1; j <= fileList[refreshList[i]][0]; j++) {
        wx.request({
          url: 'https://mrhope.top/mp/' + refreshList[i] + '/' + refreshList[i] + j + '.json',
          success(res) {
            console.log(res), console.log(refreshList[i] + j);
            wx.setStorageSync(refreshList[i] + j, res.data);
            successNumber += 1;
            wx.showLoading({
              title: '更新中...' + percent[successNumber] + '%',
              mask: true
            });
            if (successNumber == fileNum) {
              wx.hideLoading();
              console.log('hide')
            };
          },
          fail(res) {
            console.error(res), console.error(refreshList[i]);
          }
        })
      }
    }
  } else {
    for (let i = 0; i < category.length; i++) {
      fileNum += fileList[category[i]][0] + 1;
    };
    for (let i = 0; i <= fileNum; i++) {
      percent.push(((i / fileNum) * 100).toString().substring(0, 4));
    };
    console.log(fileNum);
    wx.showLoading({
      title: '下载中...0%',
      mask: true
    });
    setTimeout(function() {
      wx.hideLoading();
      console.warn('hide timeout')
    }, 10000);
    for (let i = 0; i < category.length; i++) {
      wx.request({
        url: 'https://mrhope.top/mp/' + category[i] + '/' + category[i] + '.json',
        success(res) {
          console.log(category[i]), console.log(res);
          wx.setStorageSync(category[i], res.data);
          successNumber += 1;
          wx.showLoading({
            title: '下载中...' + percent[successNumber] + '%',
            mask: true
          });
          if (successNumber == fileNum) {
            wx.hideLoading();
            console.log('hide')
          };
        },
        fail(res) {
          console.error(category[i] + 'error'), console.error(res);
        }
      });
      for (let j = 1; j <= fileList[category[i]][0]; j++) {
        wx.request({
          url: 'https://mrhope.top/mp/' + category[i] + '/' + category[i] + j + '.json',
          success(res) {
            console.log(category[i] + j), console.log(res);
            wx.setStorageSync(category[i] + j, res.data);
            successNumber += 1;
            wx.showLoading({
              title: '下载中...' + percent[successNumber] + '%',
              mask: true
            });
            if (successNumber == fileNum) {
              wx.hideLoading();
              console.log('hide')
            };
          },
          fail(res) {
            console.error(category[i] + 'error'), console.error(res);
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
        console.error('FileList error!')
      }
    }
  })
}

function getContent(indicator, a, e) {
  console.log(indicator);
  console.log(e);
  wx.showLoading({
    title: '加载中...'
  });
  wx.getStorage({
    key: e.aim,
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

// 初始化存储
function initialize(key, defaultKey) {
  let value = wx.getStorageSync(key);
  return (value || value === false) ? value : (wx.setStorageSync(key, defaultKey), defaultKey);
}

//设置主题
function setTheme(theme) {
  let value = wx.getStorageSync('theme');
  if (value) {
    return value
  } else {
    if (theme == "auto") {
      let p = wx.getSystemInfoSync().platform,
        t, num;
      switch (p) {
        case 'ios':
          t = 'iOS',
            num = 0;
          break;
        case 'android':
          t = 'wechat',
            num = 1;
          break;
        default:
          t = 'iOS',
            num = 0;
      }
      wx.setStorageSync('theme', t);
      wx.setStorageSync('themeNum', num);
      return t;
    } else {
      return theme;
    }
  }
}

// 夜间模式
function nightmode(date, startTime, endTime) {
  let nm = initialize('nightmode', true),
    nmAC = initialize('nightmodeAutoChange', true),
    nB = initialize('nightBrightness', 30),
    dB = initialize('dayBrightness', 70),
    nBC = initialize('nightBrightnessChange', false),
    dBC = initialize('dayBrightnessChange', false),
    s = initialize('nmStart', startTime).split('-'),
    e = initialize('nmEnd', endTime).split('-'),
    time = date.getHours() * 100 + date.getMinutes();
  let start = Number(s[0]) * 100 + Number(s[1]),
    end = Number(e[0]) * 100 + Number(e[1]),
    temp;
  if (nmAC) {
    (start <= end) ? temp = ((time >= start && time <= end) ? true : false): temp = ((time <= start && time >= end) ? false : true);
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

// iOS导航栏弹性滚动特效
function scrollNav(e) {
  let pos = e.changedTouches[0].pageY - e.changedTouches[0].clientY
  console.log(pos)
  if (pos < 27) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  } else if (pos < 53) {
    wx.pageScrollTo({
      scrollTop: 53,
      duration: 500
    })
  }
}

// 设置界面
function setPage(page, indicator, a, e) {
  //setNav
  if (page && page[0].tag == 'head') {
    page[0].statusBarHeight = a.info.statusBarHeight;
    if (a.info.platform.substring(0, 7) === 'android') {
      page[0].android = true
    } else if (a.info.model.substring(0, 8) === 'iPhone X') {
      page[0].iPhoneX = true
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
      (Module.res) ? url.push(Module.res): url.push(Module.src), Module.res = Module.src;
      (Module.imgMode) ? '' : Module.imgMode = a.imgMode
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
  });
  //pop notice
  if (wx.getStorageSync(page[0].title + 'noticeNotify')) {
    let notice = wx.getStorageSync((page[0].title + 'notice'));
    wx.showModal({
      title: notice[0],
      content: notice[1],
      showCancel: false,
      success: function() {
        wx.clearStorageSync(page[0].title + 'noticeNotify');
      }
    })
  }
}

// json组件判断触发函数
function componemtAction(e, indicator) {
  console.log(e);
  let action = e.currentTarget.dataset.action;
  switch (action) {
    case 'img':
      image(e, indicator);
      break;
    case 'doc':
      document(e);
      break;
    case 'phone':
      phone(e, indicator);
      break;
    case 'picker':
      picker(e, indicator);
      break;
    case 'switch':
      Switch(e, indicator);
      break;
    case 'slider':
      slider(e, indicator);
      break;
    case 'back':
      wx.navigateBack({});
      break;
    case 'swiper':
      break;
    default:
      console.log('error');
  }
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
    })
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
  })
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

// 动态根据夜间模式改变导航栏
function tabBarChanger(nm) {
  (nm) ? wx.setTabBarStyle({
    backgroundColor: '#000000',
    borderStyle: 'white'
  }): wx.setTabBarStyle({
    backgroundColor: '#ffffff',
    borderStyle: 'black'
  });
}

// 图片函数
function image(e, indicator) {
  let current = indicator.data.page[e.target.id];
  switch (e.type) {
    case 'load':
      current.load = true;
      indicator.setData({
        page: indicator.data.page
      });
      break;
    case 'error':
      current.error = true;
      indicator.setData({
        page: indicator.data.page
      });
      break;
    case 'tap':
      wx.previewImage({
        current: current.res,
        urls: indicator.data.url
      });
      break;
  }
}

// 打开文档
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

// 电话组件函数
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

// 返回上一页
function back() {
  wx.navigateBack({})
}

// 输出特定元素在数组中的index
function arrayKeynumber(array, key) {
  for (var i in array) {
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

//弹窗检查
function noticeCheck() {
  wx.request({
    url: 'https://mrhope.top/mp/notice/notice.json',
    success(res) {
      if (res.statusCode == 200) {
        let data = res.data,
          category = Object.keys(data);
        for (let i = 0; i < category.length; i++) {
          if (data[category[i]][2] != wx.getStorageSync(category[i] + 'noticeVersion')) {
            wx.setStorageSync(category[i] + 'notice', [data[category[i]][0], data[category[i]][1]]);
            wx.setStorageSync(category[i] + 'noticeVersion', data[category[i]][2]);
            wx.setStorageSync(category[i] + 'noticeNotify', true);
          }
        }
      }
    }
  })
}

//尚未投入使用

function getRad(d) {
  return d * Math.PI / 180.0;
}

function getDistance(lat1, lng1, lat2, lng2) {
  var f = getRad((lat1 + lat2) / 2);
  var g = getRad((lat1 - lat2) / 2);
  var l = getRad((lng1 - lng2) / 2);

  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);

  var s, c, w, r, d, h1, h2;
  var a = 6378137.0;
  var fl = 1 / 298.257;

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
  wx.request({
    url: '',
  })
}

module.exports = {
  cRU: checkResUpdate,
  rR: resRefresh,
  init: initialize,
  sT: setTheme,
  nm: nightmode,
  nav: changeNav,
  sP: setPage,
  sl: slider,
  tBC: tabBarChanger,
  back: back,
  sS: Switch,
  ak: arrayKeynumber,
  gC: getContent,
  doc: document,
  phone: phone,
  on: on,
  emit: emit,
  remove: remove,
  donate: donate,
  cA: componemtAction,
  // formatTime: formatTime,
  go: go,
  sN: scrollNav,
  gD: getDistance
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