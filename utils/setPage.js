//预加载界面，在上一个界面被调用，写入存储
function preLoad(indicator, globalData) {
  let page = indicator.data.page;
  if (page) {
    page.forEach(x => {
      if ('content' in x) {
        x.content.forEach(y => {
          if ('aim' in y) {
            let head = page[0];
            getOnlinePage({
              From: head.title,
              aim: y.aim,
              step: head.aimStep
            }, globalData, indicator)
          };
        })
      }
    });
  }
}

//获取在线页面，被preLoad调用
function getOnlinePage(opt, globalData, indicator) {
  let pageData = wx.getStorageSync(opt.aim);
  if (pageData) {
		console.log(getPageData(pageData, globalData, opt))
    indicator.$session.set(opt.aim + 'Temp', getPageData(pageData, globalData, opt));
  } else {
    let source, length = opt.aim.length;
    if (isNaN(opt.aim.charAt(length - 1))) {
      source = opt.aim;
    } else if (isNaN(opt.aim.charAt(length - 2))) {
      source = opt.aim.substring(0, length - 1);
    } else if (isNaN(opt.aim.charAt(length - 3))) {
      source = opt.aim.substring(0, length - 2);
    } else {
      source = opt.aim.substring(0, length - 3);
    };
    wx.request({
      url: 'https://mrhope.top/mp/' + source + '/' + opt.aim + '.json',
      success(res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (!opt.share) {
            wx.setStorageSync(opt.aim, res.data);
          }
          indicator.$session.set(opt.aim + 'Temp', getPageData(res.data, globalData, opt));
        } else {
          console.warn('res error');
          indicator.$session.set(opt.aim + 'Temp', getPageData([{
            tag: 'error',
            statusBarHeight: globalData.info.statusBarHeight
          }], globalData, opt));;
        }
      }
    })
  };
}

//获得界面数据，被getOnlinePage调用，生成正确的界面数据
function getPageData(page, globalData, opt) {
  if (page) {
    if (page[0].tag == 'head') {
      page[0].statusBarHeight = globalData.info.statusBarHeight, page[0].url = new Array();
      if (opt && !page[0].action) {
        if ('From' in opt) {
          page[0].leftText = opt.From
        };
        if ('step' in opt) {
          page[0].aimStep = Number(opt.step) + 1
        };
        if ('share' in opt) {
          page[0].action = 'redirect';
          console.log('redirect'); //调试
        };
        if ('aim' in opt) {
          page[0].aim = opt.aim;
        } else {
          page[0].aim = page[0].title;
        }
      };
      page.forEach((x, y) => {
        x.id = y;
        if (x.src) {
          (x.res) ? page[0].url.push(x.res): page[0].url.push(x.src), x.res = x.src;
          (x.imgMode) ? '' : x.imgMode = 'widthFix'
        };
        //setList
        if ('content' in x) {
          x.content.forEach((i, j) => {
            i.id = y + "-" + j;
            //set List navigator
            if ('url' in i) {
              i.url += "?From=" + page[0].title
            };
            if ('aim' in i) {
              i.url = "module" + page[0].aimStep + "?From=" + page[0].title + "&aim=" + i.aim + "&step=" + page[0].aimStep
            };
            //set List switch
            if ('swiKey' in i) {
              i.status = wx.getStorageSync(i.swiKey);
            };
            //set List slider
            if ('sliKey' in i) {
              i.value = wx.getStorageSync(i.sliKey);
            };
            //set List picker
            if ('pickerValue' in i) {
              if (i.single) {
                let res = wx.getStorageSync(i.key);
                i.value = i.pickerValue[res], i.currentValue = [res]
              } else {
                let res = wx.getStorageSync(i.key).split('-');
                i.currentValue = new Array(), i.value = new Array();
                res.forEach((k, l) => {
                  i.value[l] = i.pickerValue[l][Number(k)];
                  i.currentValue[l] = Number(k);
                })
              }
            }
          })
        }
      });
    } else {
      console.warn('No head tag in page!');
    };
  } else {
    console.warn('No pageData!')
  }
  return page;
}

//设置界面，在onNavigate时调用，将界面数据写入初始数据
function presetPage(page, globalData, opt, indicator, Set = true) {
  // loadFont(globalData.T);
  console.log(page);
  indicator.data = {
    T: globalData.T,
    nm: globalData.nm,
    page: Set ? page : getPageData(page, globalData, opt)
  };
  if (opt && page) {
    try {
      return opt.query.aim;
    } catch (msg) {
      return opt.aim
    }
  } else {
    return false
  }
}

//设置本地界面数据，在界面初始化之后使用
function setPage(page, globalData, opt, indicator) {
  indicator.setData({
    T: globalData.T,
    nm: globalData.nm,
    page: getPageData(page, globalData, opt)
  });
}

//设置在线界面数据，在界面初始化之后使用
function setOnlinePage(globalData, opt, indicator) {
  let source, length = opt.aim.length;
  if (isNaN(opt.aim.charAt(length - 1))) {
    source = opt.aim;
  } else if (isNaN(opt.aim.charAt(length - 2))) {
    source = opt.aim.substring(0, length - 1);
  } else if (isNaN(opt.aim.charAt(length - 3))) {
    source = opt.aim.substring(0, length - 2);
  } else {
    source = opt.aim.substring(0, length - 3);
  };
  wx.request({
    url: 'https://mrhope.top/mp/' + source + '/' + opt.aim + '.json',
    success(res) {
      console.log(res);
      if (res.statusCode == 200) {
        setPage(getPageData(res.data, globalData, opt), globalData, opt, indicator);
        if (!opt.share) {
          wx.setStorageSync(opt.aim, res.data);
        }
      } else {
        console.warn('res error');
        setPage([{
          tag: 'error',
          statusBarHeight: globalData.info.statusBarHeight
        }], globalData, opt, indicator);
      }
    }
  })
  return opt.aim;
}

//弹出通知，在onLoad时被调用
function popNotice(aim) {
  if (wx.getStorageSync(aim + 'noticeNotify')) {
    let notice = wx.getStorageSync((aim + 'notice'));
    wx.showModal({
      title: notice[0],
      content: notice[1],
      showCancel: false,
      success() {
        wx.removeStorageSync(aim + 'noticeNotify');
      }
    })
  }
}



// json组件判断触发函数
function componentAction(res, indicator) {
  console.log(res);
  let action = res.currentTarget.dataset.action;
  switch (action) {
    case 'img':
      image(res, indicator);
      break;
    case 'navigate':
      indicator.$route(res.currentTarget.dataset.url)
      break;
    case 'back':
      indicator.$back();
      break;
    case 'doc':
      document(res);
      break;
    case 'phone':
      phone(res, indicator);
      break;
    case 'picker':
      picker(res, indicator);
      break;
    case 'switch':
      Switch(res, indicator);
      break;
    case 'slider':
      slider(res, indicator);
      break;
    default:
      console.warn('error');
  }
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
      value.forEach((x, y) => {
        content.value[y] = content.pickerValue[y][Number(x)];
        content.currentValue[y] = x
      })
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

// 打开文档
function document(e) {
  wx.showLoading({
    title: '下载中...',
    mask: true
  });
  wx.downloadFile({
    url: e.currentTarget.dataset.url,
    success(res) {
      wx.hideLoading();
      wx.openDocument({
        filePath: res.tempFilePath
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

// 导航栏动态改变
function changeNav(e, indicator) {
  let n = indicator.data.page[0],
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

module.exports = {
  preLoad,
  preSet: presetPage,
  Set: setPage,
  Online: setOnlinePage,
  // Local: getLocalPage,
  // Get: getPageData,
  Notice: popNotice,
  nav: changeNav,
  component: componentAction,
  setBgcolor,
  loadFont,
  request,
}

function setBgcolor(a, grey) {
  console.log('setBgcolor')
  if (a.nm && grey) {
    switch (a.T) {
      case 'Andriod':
        wx.setBackgroundColor({
          backgroundColor: '#10110b',
          backgroundColorTop: '#10110b',
          backgroundColorBottom: '#10110b'
        });
        break;
      case 'iOS':
        wx.setBackgroundColor({
          backgroundColor: '#10110b',
          backgroundColorTop: '#0a0a08',
          backgroundColorBottom: '#10110b'
        });
        break;
      case 'NENU':
        wx.setBackgroundColor({
          backgroundColor: '#070707',
          backgroundColorTop: '#070707',
          backgroundColorBottom: '#070707'
        });
    }
  } else if (a.nm && !grey) {
    switch (a.T) {
      case 'iOS':
        wx.setBackgroundColor({
          backgroundColor: '#000',
          backgroundColorTop: '#0a0a08',
          backgroundColorBottom: '#000'
        });
        break;
      case 'Andriod':
      case 'NENU':
        wx.setBackgroundColor({
          backgroundColor: '#000',
          backgroundColorTop: '#000',
          backgroundColorBottom: '#000'
        });
    }
  } else if (!a.nm && grey) {
    switch (a.T) {
      case 'Andriod':
        wx.setBackgroundColor({
          backgroundColor: '#f8f8f8',
          backgroundColorTop: '#f8f8f8',
          backgroundColorBottom: '#f8f8f8'
        });
        break;
      case 'NENU':
        wx.setBackgroundColor({
          backgroundColorTop: '#f0f0f0',
          backgroundColor: '#f0f0f0',
          backgroundColorBottom: '#f0f0f0'
        });
        break;
      case 'iOS':
        wx.setBackgroundColor({
          backgroundColorTop: '#f4f4f4',
          backgroundColor: '#efeef4',
          backgroundColorBottom: '#efeef4'
        });
    }
  } else {
    switch (a.T) {
      case 'Andriod':
        wx.setBackgroundColor({
          backgroundColor: '#f8f8f8',
          backgroundColorTop: '#f8f8f8',
          backgroundColorBottom: '#f8f8f8'
        });
        break;
      case 'NENU':
        wx.setBackgroundColor({
          backgroundColor: '#fff',
          backgroundColorTop: '#fff',
          backgroundColorBottom: '#fff'
        });
        break;
      case 'iOS':
        wx.setBackgroundColor({
          backgroundColorTop: '#f4f4f4',
          backgroundColor: '#fff',
          backgroundColorBottom: '#fff',
        });
    }
  }
}

function loadFont(theme) {
  try {
    if (theme == 'Android') {
      wx.loadFontFace({
        family: 'FZKTJW',
        source: 'url("https://mrhope.top/ttf/FZKTJW.ttf")',
        complete(res) {
          console.log('楷体字体' + res.status); //调试
        }
      });
    } else if (theme == "NENU") {
      wx.loadFontFace({
        family: 'FZSSJW',
        source: 'url("https://mrhope.top/ttf/FZSSJW.ttf")',
        complete(res) {
          console.log('宋体字体' + res.status); //调试
        }
      });
    }
  } catch (msg) {
    console.warn(msg)
  }
}