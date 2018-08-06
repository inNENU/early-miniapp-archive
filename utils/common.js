module.exports = {
  nav: changeNav,
  setPage,
  setPageData,
  preloadPage,
  getContent,
  componentAction,
  component: componentAction,
  setBgcolor,
  loadFont
}


//获取内容 被任一模板界面调用
function getContent(indicator, a, e) {
  console.log(indicator), console.log(e); //调试
  wx.showLoading({
    title: '加载中...'
  });
  if (showPage(indicator, a, e)) {
    wx.hideLoading();
  } else {
    let pageData = wx.getStorageSync(e.aim);
    if (pageData) {
      console.log(pageData); //调试
      setPage(pageData, indicator, a, e);
      wx.hideLoading();
    } else {
      wx.getNetworkType({
        success: function(res) {
          console.log(res);
          let net = res.networkType;
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
            } else if (isNaN(e.aim.charAt(e.aim.length - 2))) {
              source = e.aim.substring(0, e.aim.length - 1);
            } else if (isNaN(e.aim.charAt(e.aim.length - 3))) {
              source = e.aim.substring(0, e.aim.length - 2);
            } else {
              source = e.aim.substring(0, e.aim.length - 3);
            };
            wx.request({
              url: 'https://mrhope.top/mp/' + source + '/' + e.aim + '.json',
              success(res) {
                console.log(res);
                if (res.statusCode == 200) {
                  setPage(res.data, indicator, a, e);
                  if (!e.share) {
                    wx.setStorageSync(e.aim, res.data);
                  }
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
  };
  return e.aim;
}

// json组件判断触发函数
function componentAction(e, indicator) {
  console.log(e);
  let action = e.currentTarget.dataset.action;
  switch (action) {
    case 'img':
      image(e, indicator);
      break;
    case 'back':
      wx.navigateBack({});
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

//设置page数组 被setPage和preLoadPage调用
function setPageData(page, a, e) {
  //setNav
  if (page && page[0].tag == 'head') {
    page[0].statusBarHeight = a.info.statusBarHeight;
    if (e && !page[0].action) {
      if ('From' in e) {
        page[0].leftText = e.From
      };
      if ('step' in e) {
        page[0].aimStep = Number(e.step) + 1
      };
      if ('share' in e) {
        page[0].action = 'redirect';
        console.log('redirect'); //调试
      };
    };
    try {
      page[0].aim = e.aim;
    } catch (err) {
      page[0].aim = page[0].title;
    };
  };
  page[0].url = new Array();
  for (let i = 0; i < page.length; i++) {
    //setImage
    let Module = page[i];
    Module.id = i;
    if (Module.src) {
      (Module.res) ? page[0].url.push(Module.res): page[0].url.push(Module.src), Module.res = Module.src;
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
          item.url = "/modules/module" + page[0].aimStep + "?From=" + page[0].title + "&aim=" + item.aim + "&step=" + page[0].aimStep
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

// 弹出通知 由setPage和showPage调用
function popNotice(aim) {
  if (wx.getStorageSync(aim + 'noticeNotify')) {
    let notice = wx.getStorageSync((aim + 'notice'));
    wx.showModal({
      title: notice[0],
      content: notice[1],
      showCancel: false,
      success: function() {
        wx.removeStorageSync(aim + 'noticeNotify');
      }
    })
  }
}


// 设置界面
function setPage(page, indicator, a, e) {
  loadFont(a.T);
  let pageData = setPageData(page, a, e)
  indicator.setData({
    T: a.T,
    nm: a.nm,
    page: pageData
  });
  popNotice(pageData[0].aim);
  setBgcolor(a, page[0].grey);
}

// 预载入界面
function preloadPage(page, a) {
  if (page) {
    console.log(page) //调试
    for (let i = 0; i < page.length; i++) {
      if ('content' in page[i]) {
        for (let j = 0; j < page[i].content.length; j++) {
          let item = page[i].content[j];
          if ('aim' in item) {
            let category = item.url.split('?')[1].split('&'),
              e = {
                From: category[0].split('=')[1],
                aim: category[1].split('=')[1],
                step: category[2].split('=')[1]
              },
              aim = e.aim + 'Temp',
              preloadPage = wx.getStorageSync(aim);
            if (!preloadPage) {
              let loadPage = wx.getStorageSync(e.aim); //调试
              console.log('preSetPage ' + e.aim), console.log(loadPage)
              loadPage ? wx.setStorageSync(aim, setPageData(loadPage, a, e)) : '';
            }
          };
        }
      }
    }
  }
}

// 显示界面
function showPage(indicator, a, e) {
  loadFont(a.T);
  let page = wx.getStorageSync(e.aim + 'Temp');
  if (page) {
    if (e.share) {
      page[0].action = 'redirect';
    }
    indicator.setData({
      T: a.T,
      nm: a.nm,
      page: page
    });
    popNotice(page[0].aim);
    setBgcolor(a, page[0].grey);
    return true;
  } else {
    return false;
  }
}

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