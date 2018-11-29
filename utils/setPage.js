//预加载界面，在界面被调用时，将该界面包含的所有aim对应json处理后写入存储
const preLoad = (ctx, globalData) => { //参数：页面指针，全局变量
  let page = ctx.data.page;
  if (page) {
    page.forEach(component => {
      if ("content" in component) {
        component.content.forEach(y => {
          if ("aim" in y) {
            let head = page[0];
            getOnlinePage({
              From: head.title,
              aim: y.aim,
              depth: head.aimDepth
            }, globalData, ctx);
          }
        });
      }
    });
  }
  wx.reportMonitor("1", 1);
};

//从本地或网络获取在线页面的json并处理存储，被preLoad调用
const getOnlinePage = (opt, globalData, ctx) => { //参数：页面传参，全局变量，页面指针
  let pageData = wx.getStorageSync(opt.aim); //尝试从存储中读取界面数据
  if (pageData) { //已存在界面数据
    ctx.$session.set(opt.aim + "Temp", disposePage(pageData, globalData, opt)); //预处理后写入缓存
  } else { //不存在界面数据，需在线获取
    let length = opt.aim.length;
    while (!isNaN(opt.aim.charAt(length))) length--; //获取字母长度以便确定文件夹名称
    wx.request({
      url: `https://mrhope.top/mpRes/${opt.aim.substring(0, length + 1)}/${opt.aim}.json`, //服务器json路径
      success: res => {
        console.log(res); //调试模式：输出下载内容
        if (res.statusCode == 200) { //资源获取正常
          opt.share ? "" : wx.setStorageSync(opt.aim, res.data); //非分享界面下将页面数据写入存储
          ctx.$session.set(opt.aim + "Temp", disposePage(res.data, globalData, opt));
        } else { //资源获取状态码异常
          console.warn("res error"), wx.reportMonitor("16", 1); //输出报警
          ctx.$session.set(opt.aim + "Temp", disposePage([{ //设置故障页数据到该页面缓存中
            tag: "error",
            statusBarHeight: globalData.info.statusBarHeight
          }], globalData, opt));
        }
      },
      fail: res => { //网络请求失败
        console.warn(res), wx.reportMonitor("17", 1); //输出报警
      }
    });
  }
};

//获得界面数据，生成正确的界面数据
const disposePage = (page, globalData, opt) => { //参数：page数组，全局数据，页面传参
  if (page) {
    if (page[0].tag == "head") {
      page[0].statusBarHeight = globalData.info.statusBarHeight, page[0].url = new Array();
      if (opt && !page[0].action) {
        "aim" in opt ? page[0].aim = opt.aim : page[0].aim = page[0].title; //设置界面名称
        "From" in opt ? page[0].leftText = opt.From : ""; //设置页面来源
        if ("depth" in opt) {
          page[0].aimDepth = Number(opt.depth) + 1;
        }
        if ("share" in opt) {
          page[0].action = "redirect", console.log("redirect"); //重定向到sharePage
        }
      }
      page.forEach((x, y) => {
        x.id = y;
        if (x.src) {
          (x.res) ? page[0].url.push(x.res): page[0].url.push(x.src), x.res = x.src;
          (x.imgMode) ? "" : x.imgMode = "widthFix";
        }
        if (x.docName) {
          let temp = x.docName.split(".")[1];
          x.docName = x.docName.split(".")[0];
          x.docType = temp == "docx" || temp == "doc" ? "doc" : temp == "pptx" || temp == "ppt" ? "ppt" : temp == "xlsx" || temp == "xls" ? "xls" : temp == "jpg" || temp == "jpeg" ? "jpg" : temp == "pdf" || temp == "png" || temp == "gif" ? temp : temp == "mp4" || temp == "mov" || temp == "avi" || temp == "rmvb" ? "video" : "document";
        }
        //setList
        if ("content" in x) {
          x.content.forEach((i, j) => {
            i.id = y + "-" + j;
            //set List navigator
            if ("url" in i) {
              i.url += "?From=" + page[0].title;
            }
            if ("aim" in i) {
              i.url = "module" + page[0].aimDepth + "?From=" + page[0].title + "&aim=" + i.aim + "&depth=" + page[0].aimDepth;
            }
            //set List switch
            if ("swiKey" in i) {
              i.status = wx.getStorageSync(i.swiKey);
            }
            //set List slider
            if ("sliKey" in i) {
              i.value = wx.getStorageSync(i.sliKey);
            }
            //set List picker
            if ("pickerValue" in i) {
              if (i.single) {
                let res = wx.getStorageSync(i.key);
                i.value = i.pickerValue[res], i.currentValue = [res];
              } else {
                let res = wx.getStorageSync(i.key).split("-");
                i.currentValue = new Array(), i.value = new Array();
                res.forEach((k, l) => {
                  i.value[l] = i.pickerValue[l][Number(k)];
                  i.currentValue[l] = Number(k);
                });
              }
            }
          });
        }
      });
    } else {
      console.warn("No head tag in page!"), wx.reportMonitor("14", 1);
    }
  } else {
    console.warn("No pageData!"), wx.reportMonitor("15", 1);
  }
  return page;
};

//设置界面，在onNavigate时调用，将界面数据写入初始数据
function presetPage(page, globalData, option, ctx, Set = true) { //参数：page数组，全局数据，页面传参，页面指针，page处理状态(默认为已处理)
  console.log("将要跳转：", option);
  ctx.data = {
    T: globalData.T,
    nm: globalData.nm,
    page: Set ? page : disposePage(page, globalData, option)
  };
  if (option && page) {
    try {
      ctx.aim = option.query.aim;
    } catch (msg) {
      ctx.aim = option.aim;
    }
  }
  console.log(ctx.aim + "载入", "data是：", ctx.data);
}

//设置本地界面数据，在界面初始化之后使用
function setPage(page, globalData, opt, ctx) { //参数：page数组，全局数据，页面传参，页面指针
  ctx.setData({
    T: globalData.T,
    nm: globalData.nm,
    page: disposePage(page, globalData, opt)
  });
}

//设置在线界面数据，在界面初始化之后使用
function setOnlinePage(globalData, opt, ctx, preload = true) { //参数：全局变量，页面传参，页面指针，是否需要预加载(默认需要)
  if (ctx.aim != opt.aim) {
    console.log("onLoad开始：", opt);
    ctx.aim = opt.aim;
    let source, length = opt.aim.length;
    while (!isNaN(opt.aim.charAt(length))) length--;
    source = opt.aim.substring(0, length + 1);
    wx.request({
      url: `https://mrhope.top/mpRes/${source}/${opt.aim}.json`,
      success: res => {
        console.log(res);
        if (res.statusCode == 200) {
          setPage(disposePage(res.data, globalData, opt), globalData, opt, ctx);
          if (!opt.share) {
            wx.setStorageSync(opt.aim, res.data);
          }
          if (preload) {
            preLoad(ctx, globalData), console.log("preload finish");
          }
        } else {
          console.warn("res error"), wx.reportMonitor("12", 1);
          setPage([{
            tag: "error",
            statusBarHeight: globalData.info.statusBarHeight
          }], globalData, opt, ctx);
        }
        console.log("onLoad 成功"), wx.reportMonitor("0", 1);
      },
      fail: res => {
        console.warn(res), wx.reportMonitor("13", 1);
        setPage([{
          tag: "error",
          statusBarHeight: globalData.info.statusBarHeight
        }], globalData, opt, ctx);
      },
      complete: () => {
        popNotice(opt.aim);
      }
    });
  } else {
    preLoad(ctx, globalData), console.log("preload finish");
  }
}

//弹出通知，在onLoad时被调用
function popNotice(aim) { //参数：当前界面的aim值
  if (wx.getStorageSync(`${aim}Notify`)) {
    let notice = wx.getStorageSync((`${aim}notice`));
    wx.showModal({
      title: notice[0],
      content: notice[1],
      showCancel: false,
      success() {
        wx.removeStorageSync(`${aim}Notify`);
      }
    }), console.log("弹出通知");
  }
  wx.reportAnalytics("page_aim_count", { //aim统计分析
    aim
  });
}



// 组件函数
function componentAction(res, ctx) { //参数：组件传参，页面指针
  let action = res.currentTarget.dataset.action;
  switch (action) {
    case "img":
      image(res, ctx);
      break;
    case "navigate":
      ctx.$route(res.currentTarget.dataset.url);
      break;
    case "back":
      ctx.$back();
      break;
    case "list":
      list(res, ctx);
      break;
    case "doc":
      document(res);
      break;
    case "phone":
      phone(res, ctx);
      break;
    case "picker":
      picker(res, ctx);
      break;
    case "switch":
      Switch(res, ctx);
      break;
    case "slider":
      slider(res, ctx);
      break;
    case "share":
      share(res, ctx);
      break;
    case "video":
      video(res, ctx);
      break;
    default:
      console.warn("error"), wx.reportMonitor("11", 1);
  }
}

//列表函数 for Android

function list(e, ctx) {
  let id = e.currentTarget.id,
    page = ctx.data.page;
  page[id].display = !page[id].display;
  ctx.setData({
    page
  });
}

// 图片函数
function image(e, ctx) {
  let current = ctx.data.page[e.target.id];
  switch (e.type) {
    case "load":
      current.load = true;
      ctx.setData({
        page: ctx.data.page
      });
      break;
    case "error":
      current.error = true, wx.reportMonitor("10", 1);
      ctx.setData({
        page: ctx.data.page
      });
      break;
    case "tap":
      wx.previewImage({
        current: current.res,
        urls: ctx.data.page[0].url
      });
      break;
  }
}

// 选择器函数
function picker(e, ctx) {
  let pos = e.currentTarget.dataset.id.split("-"),
    content = ctx.data.page[pos[0]].content[pos[1]];
  if (e.type == "tap") {
    content.visible = !content.visible;
    ctx.setData({
      page: ctx.data.page
    });
  }
  if (e.type == "change") {
    let value = e.detail.value;
    if (content.single) {
      content.value = content.pickerValue[Number(value)];
      content.currentValue = value;
      wx.setStorageSync(content.key, Number(value));
    } else {
      value.forEach((x, y) => {
        content.value[y] = content.pickerValue[y][Number(x)];
        content.currentValue[y] = x;
      });
      wx.setStorageSync(content.key, value.join("-"));
    }
    ctx.setData({
      page: ctx.data.page
    });
  }
}

// 滑块函数
function slider(e, ctx) {
  let pos = e.currentTarget.dataset.id.split("-"),
    content = ctx.data.page[pos[0]].content[pos[1]],
    value = e.detail.value;
  switch (e.type) {
    case "tap":
      content.visible = !content.visible;
      break;
    case "changing":
      content.value = value;
      break;
    case "change":
      content.value = value;
      wx.setStorageSync(content.sliKey, value);
      break;
  }
  ctx.setData({
    page: ctx.data.page
  });
}

// 开关函数
function Switch(e, ctx) {
  let pos = e.target.dataset.id.split("-"),
    page = ctx.data.page,
    content = page[pos[0]].content[pos[1]];
  content.status = e.detail.value;
  ctx.setData({
    page: page
  });
  wx.setStorageSync(content.swiKey, e.detail.value);
  return page;
}

// 打开文档
function document(e) {
  let {
    doctype,
    url
  } = e.currentTarget.dataset;
  console.log(doctype, url, e.currentTarget.dataset); //调试
  if (["doc", "ppt", "xls", "pdf"].indexOf(doctype) > -1) {
    console.log("if1");
    wx.showLoading({
      title: "下载中...",
      mask: true
    });
    wx.downloadFile({
      url,
      success: res => {
        wx.hideLoading();
        wx.openDocument({
          filePath: res.tempFilePath
        });
      },
      fail: res => {
        wx.hideLoading(), wx.reportMonitor("9", 1);
        wx.showToast({
          title: "文档下载失败",
          icon: "none"
        });
      }
    });
  } else if (["jpg", "png", "gif"].indexOf(doctype) > -1) {
    console.log("if2");
    wx.previewImage({
      urls: [url]
    });
  }
}

// 电话组件函数
function phone(e, ctx) {
  let Type = e.target.dataset.type,
    info = ctx.data.page[e.currentTarget.id];
  if (Type == "call") {
    wx.makePhoneCall({
      phoneNumber: info.num.toString()
    });
  } else if (Type == "add") {
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
    });
  }
}

//分享按钮
function share(e, ctx) {
  let touch = e.touches[0];
  if (e.type == "touchstart") {
    ctx.left = touch.pageX - e.currentTarget.offsetLeft;
    ctx.top = touch.pageY - e.currentTarget.offsetTop;
    ctx.time = e.timeStamp;
  } else if (e.type == "touchmove") {
    ctx.setData({
      "page[0].top": touch.pageY - ctx.top,
      "page[0].left": touch.pageX - ctx.left,
    });
  } else if (e.type == "touchend" && ctx.time > e.timeStamp - 200) {
    console.log("tap");
    ctx.setData({
      "page[0].menuDisplay": true
    });
  } else if (e.type == "tap") {
    ctx.setData({
      "page[0].menuDisplay": false
    });
    if (e.target.dataset.object == "download") {
      console.log("download");
      wx.downloadFile({
        url: `https://mrhope.top/mpImage/share/${ctx.data.page[0].aim}.jpg`,
        success(res) {
          if (res.statusCode == 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(msg) {
                console.log(msg), wx.reportMonitor("8", 1);
                wx.showToast({
                  title: "二维码保存成功",
                  icon: "none"
                });
              },
              fail(msg) {
                console.log(msg), console.warn("save fail"), wx.reportMonitor("6", 1);
                wx.showToast({
                  title: "二维码保存失败",
                  icon: "none"
                });
              }
            });
          } else {
            console.warn(`QRCode statusCode error:${res.statusCode}`), wx.reportMonitor("7", 1);
          }
        },
        fail() {
          console.warn("download fail"), wx.reportMonitor("6", 1);
          wx.showToast({
            title: "二维码下载失败",
            icon: "none"
          });
        }
      });
    }
  }
}

//视频组件函数
function video(e, ctx) {
  console.log(e.type);
  if (e.type == "waiting") {
    wx.showToast({
      title: "缓冲中...",
      icon: "none"
    });
  } else if (e.type == "play") {
    wx.hideToast();
  } else if (e.type == "error") {
    wx.showToast({
      title: "视频加载出错",
      icon: "none",
      duration: 2000
    });
    wx.reportMonitor("5", 1);
  }
}

// 导航栏动态改变
function changeNav(e, ctx) { //参数：组件传参，页面指针
  let n = ctx.data.page[0],
    T, B, S;
  if (e.scrollTop <= 1) {
    T = B = S = false;
  } else if (e.scrollTop <= 42) {
    T = B = false, S = true;
  } else if (e.scrollTop >= 53) {
    T = B = S = true;
  } else {
    T = S = true, B = false;
  }
  if (n.titleDisplay != T) ctx.setData({
    "page[0].titleDisplay": T
  });
  else if (n.borderDisplay != B) ctx.setData({
    "page[0].borderDisplay": B
  });
  else if (n.shadow != S) ctx.setData({
    "page[0].shadow": S
  });
}

//wx.request包装
function request(path, Func, ctx) { //参数：网址路径，执行函数，页面指针
  wx.request({
    url: `https://mrhope.top/${path}.json`,
    success: res => {
      console.log(res);
      if (res.statusCode == 200) Func(res.data, ctx);
      else console.warn(`request ${path} fail: ${res.statusCode}`), wx.reportMonitor("3", 1);
    },
    fail: res => {
      console.log(res), wx.reportMonitor("4", 1);
    }
  });
}

module.exports = {
  preLoad,
  preSet: presetPage,
  Set: setPage,
  Online: setOnlinePage,
  Notice: popNotice,
  nav: changeNav,
  component: componentAction,
  setBgcolor,
  loadFont,
  request,
};

function setBgcolor(a, grey) {
  console.log("setBgcolor");
  if (a.nm && grey) {
    switch (a.T) {
      case "Andriod":
        wx.setBackgroundColor({
          backgroundColor: "#10110b",
          backgroundColorTop: "#10110b",
          backgroundColorBottom: "#10110b"
        });
        break;
      case "iOS":
        wx.setBackgroundColor({
          backgroundColor: "#10110b",
          backgroundColorTop: "#0a0a08",
          backgroundColorBottom: "#10110b"
        });
        break;
      case "NENU":
        wx.setBackgroundColor({
          backgroundColor: "#070707",
          backgroundColorTop: "#070707",
          backgroundColorBottom: "#070707"
        });
    }
  } else if (a.nm && !grey) {
    switch (a.T) {
      case "iOS":
        wx.setBackgroundColor({
          backgroundColor: "#000",
          backgroundColorTop: "#0a0a08",
          backgroundColorBottom: "#000"
        });
        break;
      case "Andriod":
      case "NENU":
        wx.setBackgroundColor({
          backgroundColor: "#000",
          backgroundColorTop: "#000",
          backgroundColorBottom: "#000"
        });
    }
  } else if (!a.nm && grey) {
    switch (a.T) {
      case "Andriod":
        wx.setBackgroundColor({
          backgroundColor: "#f8f8f8",
          backgroundColorTop: "#f8f8f8",
          backgroundColorBottom: "#f8f8f8"
        });
        break;
      case "NENU":
        wx.setBackgroundColor({
          backgroundColorTop: "#f0f0f0",
          backgroundColor: "#f0f0f0",
          backgroundColorBottom: "#f0f0f0"
        });
        break;
      case "iOS":
        wx.setBackgroundColor({
          backgroundColorTop: "#f4f4f4",
          backgroundColor: "#efeef4",
          backgroundColorBottom: "#efeef4"
        });
    }
  } else {
    switch (a.T) {
      case "Andriod":
        wx.setBackgroundColor({
          backgroundColor: "#f8f8f8",
          backgroundColorTop: "#f8f8f8",
          backgroundColorBottom: "#f8f8f8"
        });
        break;
      case "NENU":
        wx.setBackgroundColor({
          backgroundColor: "#fff",
          backgroundColorTop: "#fff",
          backgroundColorBottom: "#fff"
        });
        break;
      case "iOS":
        wx.setBackgroundColor({
          backgroundColorTop: "#f4f4f4",
          backgroundColor: "#fff",
          backgroundColorBottom: "#fff",
        });
    }
  }
}

function loadFont(theme) {
  try {
    if (theme == "Android") {
      wx.loadFontFace({
        family: "FZKTJW",
        source: "url(\"https://mrhope.top/ttf/FZKTJW.ttf\")",
        complete(res) {
          console.log("楷体字体" + res.status); //调试
        }
      });
    } else if (theme == "NENU") {
      wx.loadFontFace({
        family: "FZSSJW",
        source: "url(\"https://mrhope.top/ttf/FZSSJW.ttf\")",
        complete(res) {
          console.log("宋体字体" + res.status); //调试
        }
      });
    } else throw theme;
  } catch (theme) {
    console.warn(`Theme ${theme} cannot be handled.`);
  }
}