module.exports = {
  noticeCheck: noticeCheck,
  checkUpdate: checkUpdate,
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
  donate: donate,
  cA: componemtAction,
  go: go,
  gD: getDistance
}

//弹窗检查 from app.js
function noticeCheck() {
  wx.request({
    url: 'https://mrhope.top/mp/notice.json',
    success(res) {
      console.log(res); //调试
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
    },
    fail() {
      wx.showToast({
        title: '似乎未检测到互联网连接',
        icon: 'none',
        duration: 3000
      })
      console.error('noticeList error')
    }
  })
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
    title: '更新中...0%',
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
          title: '更新中...' + percent[successNumber] + '%',
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
            title: '更新中...' + percent[successNumber] + '%',
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

//设置page数组 被setPage和preLoadPage调用
function setPageData(page, a, e) {
	//setNav
	if (page && page[0].tag == 'head') {
		page[0].statusBarHeight = a.info.statusBarHeight;
		if (e && !page[0].top && 'From' in e) {
			page[0].backText = e.From
		};
		if (e && !page[0].top && 'step' in e) {
			page[0].aimStep = Number(e.step) + 1
		};
	};
	page[0].url = new Array();
	for (let i = 0; i < page.length; i++) {
		//setImage
		let Module = page[i];
		Module.id = i;
		if (Module.src) {
			(Module.res) ? page[0].url.push(Module.res) : page[0].url.push(Module.src), Module.res = Module.src;
			(Module.imgMode) ? '' : Module.imgMode = a.imgMode
		};
		//setList
		if ('content' in Module) {
			for (let j = 0; j < Module.content.length; j++) {
				let item = Module.content[j];
				item.id = i + "-" + j;
				//set List navigator
				if ('url' in item) {
					item.url += "?From=" + page[0].title
				};
				if ('aim' in item) {
					item.url = "/templates/module" + page[0].aimStep + "?From=" + page[0].title + "&aim=" + item.aim + "&step=" + page[0].aimStep
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
	return page;
}

// 设置界面
function setPage(page, indicator, a, e) {
  indicator.setData({
    T: a.T,
    nm: a.nm,
    page: setPageData(page, a, e)
  });
  //pop notice
  if (wx.getStorageSync(page[0].title + 'noticeNotify')) {
    let notice = wx.getStorageSync((page[0].title + 'notice'));
    wx.showModal({
      title: notice[0],
      content: notice[1],
      showCancel: false,
      success: function() {
        wx.removeStorageSync(page[0].title + 'noticeNotify');
      }
    })
  }
}

// 预载入界面
function preloadPage(page, a) {
  for (let i = 0; i < page.length; i++) {
    if ('content' in page[i]) {
      if ('aim' in item) {
        let category = item.url.split('?')[1].split('&'),
          e = {
            From: category[0].split('=')[1],
            aim: category[1].split('=')[1],
            step: category[2].split('=')[1]
          };

      };
    }
  }
  //setNav
  if (page && page[0].tag == 'head') {
    page[0].statusBarHeight = a.info.statusBarHeight;
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
}


// 显示界面
function showPage(page, indicator, a, e) {
  //setNav
  if (page && page[0].tag == 'head') {
    if (e && !page[0].top && 'from' in e) {
      page[0].backText = e.from
    };
    if (e && !page[0].top && 'step' in e) {
      page[0].aimStep = Number(e.step) + 1
    };
  };
  for (let i = 0; i < page.length; i++) {
    //setList
    if ('content' in Module) {
      for (let j = 0; j < Module.content.length; j++) {
        let item = Module.content[j];
        //set List navigator
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
  });
  //pop notice
  if (wx.getStorageSync(page[0].title + 'noticeNotify')) {
    let notice = wx.getStorageSync((page[0].title + 'notice'));
    wx.showModal({
      title: notice[0],
      content: notice[1],
      showCancel: false,
      success: function() {
        wx.removeStorageSync(page[0].title + 'noticeNotify');
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
        urls: indicator.data.page[0].url
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

//尚未投入使用

function getRad(d) {
  return d * Math.PI / 180.0;
}

function getDistance(lat1, lng1, lat2, lng2) {
  let f = getRad((lat1 + lat2) / 2);
  let g = getRad((lat1 - lat2) / 2);
  let l = getRad((lng1 - lng2) / 2);

  let sg = Math.sin(g);
  let sl = Math.sin(l);
  let sf = Math.sin(f);

  let s, c, w, r, d, h1, h2;
  let a = 6378137.0;
  let fl = 1 / 298.257;

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


// iOS导航栏弹性滚动特效
// function scrollNav(e) {
// 	let pos = e.changedTouches[0].pageY - e.changedTouches[0].clientY
// 	console.log(pos)
// 	if (pos < 27) {
// 		wx.pageScrollTo({
// 			scrollTop: 0,
// 			duration: 500
// 		})
// 	} else if (pos < 53) {
// 		wx.pageScrollTo({
// 			scrollTop: 53,
// 			duration: 500
// 		})
// 	}
// }