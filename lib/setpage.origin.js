/* global wx*/

// 初始化文件管理器
const fileManager = wx.getFileSystemManager(), logger = wx.getLogManager({ level: 1 });
const userPath = wx.env.USER_DATA_PATH;

// 获得界面数据，生成正确的界面数据 || 参数：page数组，全局数据，页面传参
const disposePage = (page, globalData, opt) => {
  if (page)  // 如果page参数传入
    if (page[0].tag == "head") {

      // 对page中head标签执行初始化
      page[0].statusBarHeight = globalData.info.statusBarHeight, page[0].url = [];

      if (opt && !page[0].action) {
        "aim" in opt ? page[0].aim = opt.aim : page[0].aim = page[0].title; // 设置界面名称
        if ("From" in opt) page[0].leftText = opt.From; // 设置页面来源
        if ("depth" in opt) page[0].aimDepth = Number(opt.depth) + 1; // 设置界面路径深度
        if ("share" in opt) page[0].action = "redirect", console.info("redirect"); // 判断是否来自分享，分享页重定向到sharePage
      }
      page.forEach((x, y) => {
        x.id = y; // 对page每项元素添加id

        // 处理图片
        if (x.src) {
          x.res ? page[0].url.push(x.res) : page[0].url.push(x.src), x.res = x.src;
          if (!x.imgMode) x.imgMode = "widthFix";
        }

        // 处理文档
        if (x.docName) {
          let temp = x.docName.split(".")[1];
          x.docName = x.docName.split(".")[0];
          x.docType = temp == "docx" || temp == "doc" ?
            "doc" :
            temp == "pptx" || temp == "ppt" ?
              "ppt" :
              temp == "xlsx" || temp == "xls" ?
                "xls" :
                temp == "jpg" || temp == "jpeg" ?
                  "jpg" :
                  temp == "mp4" || temp == "mov" || temp == "avi" || temp == "rmvb" ?
                    "video" :
                    temp == "pdf" || temp == "png" || temp == "gif" ?
                      temp :
                      "document";
        }

        // 设置list组件
        if ("content" in x) x.content.forEach((i, j) => {
          i.id = `${y}-${j}`; // 列表每项添加id

          // 设置列表导航
          if ("url" in i) i.url += `?From=${page[0].title}`;
          if ("aim" in i)
            i.url = `module${page[0].aimDepth}?From=${page[0].title}&aim=${i.aim}&depth=${page[0].aimDepth}`;

          // 设置列表开关与滑块
          if ("swiKey" in i) i.status = wx.getStorageSync(i.swiKey);
          if ("sliKey" in i) i.value = wx.getStorageSync(i.sliKey);

          // 设置列表选择器
          if ("pickerValue" in i)
            if (i.single) { // 单列选择器
              let res = wx.getStorageSync(i.key);
              i.value = i.pickerValue[res], i.currentValue = [res];
            } else { // 多列选择器
              let res = wx.getStorageSync(i.key).split("-");
              i.currentValue = [], i.value = [];
              res.forEach((k, l) => {
                i.value[l] = i.pickerValue[l][Number(k)], i.currentValue[l] = Number(k);
              });
            }

        });
      });
    } else {
      console.warn("No head tag in page!");
      logger.warn("No head tag"), wx.reportMonitor("14", 1);
    } // 调试：未找到head tag
  else console.warn("No pageData!"), wx.reportMonitor("15", 1); // 调试：未传入page

  return page; // 返回处理后的page
};

// 从本地或网络获取在线页面的json并处理存储，被preLoad调用 || 参数：页面传参，全局变量，页面指针
const getOnlinePage = (opt, globalData, ctx) => {

  // 确定文件夹名称
  let length = opt.aim.length, pageData;
  while (!isNaN(opt.aim.charAt(length))) length--;
  let aimName = opt.aim.substring(0, length + 1);

  // 尝试从存储中读取界面数据
  try {
    // 尝试从文件中解析页面数据
    pageData = JSON.parse(fileManager.readFileSync(`${userPath}/page/${aimName}/${opt.aim}.json`, "utf-8"));

    // 已存在界面数据直接预处理后写入缓存
    if (pageData) ctx.$session.set(`${opt.aim}Temp`, disposePage(pageData, globalData, opt));
    // 不存在页面数据，抛出错误
    else throw opt.aim;

    // 不存在界面数据，需在线获取
  } catch (e) {
    console.log(`读取${opt.aim}出现问题，需要重新获取`);// 调试

    // 向服务器请求json
    wx.request({
      url: `https://nenuyouth.com/Res/page/${aimName}/${opt.aim}.json`,
      success: res => {
        console.log(res); // 调试

        // 资源获取正常
        if (res.statusCode == 200) {
          ctx.$session.set(`${opt.aim}Temp`, disposePage(res.data, globalData, opt)); // 页面处理结果写入缓存
          if (!opt.share) { // 非分享界面下将页面数据写入存储
            try {
              fileManager.mkdirSync(`${userPath}/page/${aimName}/${opt.aim}.json`, true);
            } catch (err) {
              console.log("目录已存在");
            }
            fileManager.writeFileSync(`${userPath}/page/${aimName}/${opt.aim}.json`, JSON.stringify(res.data), "utf8");
          }

          // 资源获取状态码异常
        } else {
          // 设置故障页数据到该页面缓存中
          ctx.$session.set(`${opt.aim}Temp`, disposePage([{
            tag: "error", statusBarHeight: globalData.info.statusBarHeight
          }], globalData, opt));

          console.warn("res error"), wx.reportMonitor("16", 1); // 输出报警
        }
      },

      // 网络请求失败，输出报警
      fail: res => {
        console.warn(res), wx.reportMonitor("17", 1);
      }
    });
  }
};

// 预加载界面，在界面被调用时，将该界面包含的所有aim对应json处理后写入存储 || 参数：页面指针，全局变量
const preLoad = (ctx, globalData) => {
  let page = ctx.data.page;
  if (page) page.forEach(component => {
    if ("content" in component) // 该组件是列表，需要预加载界面，提前获取界面到存储
      component.content.forEach(i => {
        if ("aim" in i)
          getOnlinePage({ From: page[0].title, aim: i.aim, depth: page[0].aimDepth }, globalData, ctx);
      });
  });
  wx.reportMonitor("1", 1); // 统计报告
};

// 设置界面，在onNavigate时调用，将界面数据写入初始数据 || 参数：page数组，全局数据，页面传参，页面指针，page处理状态(默认为已处理)
const presetPage = (page, globalData, option, ctx, Set = true) => {
  console.info("将要跳转：", option); // 控制台输出参数
  ctx.data = {
    T: globalData.T, nm: globalData.nm,
    page: Set ? page : disposePage(page, globalData, option) // 如果未处理现进行处理再赋值
  };

  // 写入界面aim值
  if (option && page) try {
    ctx.aim = option.query.aim;
  } catch (msg) {
    ctx.aim = option.aim;
  }

  console.info(`${ctx.aim}载入`, "data是：", ctx.data); // 函数调用完成，输出
};

// 设置本地界面数据，在界面初始化之后使用 || 参数：page数组，全局数据，页面传参，页面指针
const setPage = (page, globalData, opt, ctx) => {

  // 设置页面数据
  ctx.setData({ T: globalData.T, nm: globalData.nm, page: disposePage(page, globalData, opt) });

  // 设置胶囊颜色
  let [frontColor, backgroundColor] = globalData.nm ? ["#ffffff", "#000000"] : ["#000000", "#ffffff"];
  wx.setNavigationBarColor({ frontColor, backgroundColor });
};

// 弹出通知，在onLoad时被调用 || 参数：当前界面的aim值
const popNotice = aim => {
  if (wx.getStorageSync(`${aim}Notify`)) { // 判断是否需要弹窗

    // 从存储中获取通知内容并展示
    let notice = wx.getStorageSync(`${aim}notice`);
    wx.showModal({
      title: notice[0], content: notice[1], showCancel: false,

      // 防止二次弹窗
      success: () => {
        wx.removeStorageSync(`${aim}Notify`);
      }

    });
    console.info("弹出通知");// 调试
  }
  wx.reportAnalytics("page_aim_count", { aim });// aim统计分析
};

// 设置在线界面数据，在界面初始化之后使用 || 参数：全局变量，页面传参，页面指针，是否需要预加载(默认需要)
const setOnlinePage = (globalData, opt, ctx, preload = true) => {

  // 页面已经载入，立即执行本界面的预加载
  if (ctx.aim == opt.aim)
    preLoad(ctx, globalData), console.info("preload finish");

  // 需要重新载入界面
  else {
    console.info("onLoad开始，参数是：", opt);
    ctx.aim = opt.aim;

    // 获取文件夹名称
    let length = opt.aim.length;
    while (!isNaN(opt.aim.charAt(length))) length--;
    let aimName = opt.aim.substring(0, length + 1);

    // 向服务器请求json
    wx.request({
      url: `https://nenuyouth.com/Res/page/${aimName}/${opt.aim}.json`,
      success: res => {
        console.log(res);
        if (res.statusCode == 200) {

          // 设置界面
          setPage(disposePage(res.data, globalData, opt), globalData, opt, ctx);

          // 非分享界面下将页面数据写入存储
          if (!opt.share) {
            try {
              fileManager.mkdirSync(`${userPath}/page/${aimName}/${opt.aim}.json`, true);
            } catch (err) {
              console.log(`${opt.aim}目录已存在`);
            }
            fileManager.writeFileSync(`${userPath}/page/${aimName}/${opt.aim}.json`, JSON.stringify(res.data), "utf8");
          }

          // 如果需要执行预加载，则执行
          if (preload) preLoad(ctx, globalData), console.log("preload finish");

        } else {

          // 设置error界面
          setPage([{ tag: "error", statusBarHeight: globalData.info.statusBarHeight }], globalData, opt, ctx);
          console.warn("res error"), wx.reportMonitor("12", 1);// 调试
        }
        console.info("onLoad 成功"), wx.reportMonitor("0", 1);// 调试
      },
      fail: res => {
        // 设置error页面
        setPage([{
          tag: "error", statusBarHeight: globalData.info.statusBarHeight
        }], globalData, opt, ctx);
        console.warn(res), wx.reportMonitor("13", 1);// 调试
      },

      // 加载完成时弹出通知
      complete: () => {
        popNotice(opt.aim);
      }
    });
  }
};

// 列表函数 for Android，控制列表显隐 || 参数：组件传参，页面指针
const list = (res, ctx) => {
  let id = res.currentTarget.id;
  ctx.setData({ [`page[${id}].display`]: !ctx.data.page[id].display });
};

// 图片函数
const image = (e, ctx) => {
  switch (e.type) {

    // 图片加载完成
    case "load": ctx.setData({ [`page[${e.target.id}].load`]: true });
      break;

    // 图片加载出错
    case "error": console.warn("图片加载失败"), wx.reportMonitor("10", 1);
      ctx.setData({ [`page[${e.target.id}].error`]: true });
      break;

    // 开始预览图片
    case "tap":
    default: wx.previewImage({ current: ctx.data.page[e.target.id].res, urls: ctx.data.page[0].url });
  }
};

// 选择器函数
const picker = (e, ctx) => {
  let pos = e.currentTarget.dataset.id.split("-"), content = ctx.data.page[pos[0]].content[pos[1]];// 获得选择器位置与内容

  // 切换嵌入选择器显隐
  if (e.type == "tap") ctx.setData({ [`page[${pos[0]}].content[${pos[1]}].visible`]: !content.visible });

  if (e.type == "change") {
    let value = e.detail.value;

    if (content.single) {
      // 判断为单列选择器，更新页面数据并存储选择器值
      content.value = content.pickerValue[Number(value)], content.currentValue = value;
      wx.setStorageSync(content.key, Number(value));

    } else {
      // 判断为多列选择器，遍历每一列更新页面数据、并存储选择器值
      value.forEach((x, y) => {
        content.value[y] = content.pickerValue[y][Number(x)], content.currentValue[y] = x;
      });
      wx.setStorageSync(content.key, value.join("-"));
    }

    // 将选择器的变更响应到页面上
    ctx.setData({ [`page[${pos[0]}].content[${pos[1]}]`]: content });
  }
};

// 滑块函数
const slider = (e, ctx) => {
  let pos = e.currentTarget.dataset.id.split("-"),
    content = ctx.data.page[pos[0]].content[pos[1]], value = e.detail.value;
  switch (e.type) {

    // 切换滑块显隐
    case "tap": content.visible = !content.visible;
      break;

    // 移动时实时更新页面显示
    case "changing": content.value = value;
      break;

    // 更新页面数据，并写入值到存储
    case "change": content.value = value;
      wx.setStorageSync(content.sliKey, value);
  }

  // 写入页面数据
  ctx.setData({ [`page[${pos[0]}].content[${pos[1]}]`]: content });
};

// 开关函数
const Switch = (e, ctx) => {
  let pos = e.target.dataset.id.split("-");
  ctx.setData({ [`page[${pos[0]}].content[${pos[1]}].status`]: e.detail.value });// 更新页面数据
  wx.setStorageSync(ctx.data.page[pos[0]].content[pos[1]].swiKey, e.detail.value); // 将开关值写入存储的swiKey变量中

  return ctx.data.page; // 返回修改后的page数组
};

// 打开文档
const documentHandler = e => {
  let { doctype, url } = e.currentTarget.dataset; // 解构赋值

  if (["doc", "ppt", "xls", "pdf"].includes(doctype) > -1) {
    // 检测到文档

    wx.showLoading({ title: "下载中...0%", mask: true });// 显示下载提示

    // 开始下载文件
    let docTask = wx.downloadFile({
      url,

      // 下载成功，隐藏下载提示并打开文档
      success: res => {
        wx.hideLoading(), wx.openDocument({ filePath: res.tempFilePath });
      },

      // 下载失败，隐藏下载提示告知用户下载失败并上报
      fail: () => {
        wx.hideLoading(), wx.reportMonitor("9", 1);
        wx.showToast({ title: "文档下载失败", icon: "none" });
      }
    });

    // 监听下载进度，并更新弹窗显示
    docTask.onProgressUpdate(res => {
      wx.showLoading({ title: `下载中...${res.progress}%`, mask: true });
    });

  } else if (["jpg", "png", "gif"].includes(doctype) > -1) wx.previewImage({ urls: [url] });
  // 检测到图片，开始图片浏览
};

// 电话组件函数
const phone = (e, ctx) => {
  let Type = e.target.dataset.type, info = ctx.data.page[e.currentTarget.id];
  if (Type == "call") wx.makePhoneCall({ phoneNumber: info.num.toString() });// 拨打电话
  else if (Type == "add") wx.addPhoneContact({// 添加联系人
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
};

// 分享按钮
const share = (e, ctx) => {
  let touch = e.touches[0];

  // 记录触摸点与按钮左上角的像素偏差与点击时间
  if (e.type == "touchstart") {
    ctx.left = touch.pageX - e.currentTarget.offsetLeft, ctx.top = touch.pageY - e.currentTarget.offsetTop;
    ctx.time = e.timeStamp;

    // 移动分享按钮
  } else if (e.type == "touchmove")
    ctx.setData({ "page[0].top": touch.pageY - ctx.top, "page[0].left": touch.pageX - ctx.left });

  // 视为点击操作，展示菜单
  else if (e.type == "touchend" && ctx.time > e.timeStamp - 200)
    ctx.setData({ "page[0].menuDisplay": true });

  // 取消显示菜单，并执行对应逻辑
  else if (e.type == "tap") {
    ctx.setData({ "page[0].menuDisplay": false });

    // 下载二维码
    if (e.target.dataset.object == "download") {
      console.log("Start QRCode download.");// 调试
      wx.downloadFile({
        url: `https://nenuyouth.com/mpImage/share/${ctx.data.page[0].aim}.jpg`,
        success: res1 => {
          console.log(res1);
          if (res1.statusCode == 200) wx.getSetting({// 获取用户设置
            success: res2 => {

              // 如果已经授权相册直接写入图片
              if (res2.authSetting["scope.writePhotosAlbum"]) wx.saveImageToPhotosAlbum({
                filePath: res1.tempFilePath,
                success: msg => {
                  wx.showToast({ title: "二维码保存成功", icon: "none" });
                  console.log(msg), wx.reportMonitor("8", 1), logger.debug("二维码保存成功");
                },
                fail: msg => {
                  wx.showToast({ title: "二维码保存失败", icon: "none" });
                  console.log(msg), console.warn("save fail"), wx.reportMonitor("6", 1), logger.warn("二维码保存失败");
                }
              });

              // 没有授权——>提示用户授权
              else wx.authorize({
                scope: "scope.writePhotosAlbum",
                success: () => {

                  // 获得授权，写入图片
                  wx.saveImageToPhotosAlbum({
                    filePath: res1.tempFilePath,
                    success: msg => {
                      wx.showToast({ title: "二维码保存成功", icon: "none" });
                      console.log(msg), wx.reportMonitor("8", 1);
                    },
                    fail: msg => {
                      console.log(msg), console.warn("save fail"), wx.reportMonitor("6", 1);
                      wx.showToast({ title: "二维码保存失败", icon: "none" });
                    }
                  });
                },

                // 用户拒绝权限，提示用户开启权限
                fail: () => {
                  wx.showModal({
                    title: "权限被拒", content: "您拒绝了相册写入权限，如果想要保存图片，请在小程序设置页允许权限",
                    showCancel: false, confirmText: "确定", confirmColor: "#3CC51F",
                    complete: () => {
                      wx.showToast({ title: "二维码保存失败", icon: "none", duration: 1500, mask: false });
                    }
                  });
                }
              });
            }
          });
          else console.warn(`QRCode statusCode error:${res1.statusCode}`), wx.reportMonitor("7", 1);// 二维码获取状态码异常
        },

        // 二维码下载失败
        fail: () => {
          wx.showToast({ title: "二维码下载失败", icon: "none" });
          console.warn("download fail"), wx.reportMonitor("6", 1);
        }
      });
    }
  }
};

// 视频组件函数
const video = e => {
  console.info(`视频状态为${e.type}`); // 输出视频组件状态
  if (e.type == "waiting") wx.showToast({ title: "缓冲中...", icon: "none" });// 视频缓冲时提示用户等待
  else if (e.type == "play") wx.hideToast(); // 正常播放时隐藏提示
  else if (e.type == "error")
    wx.showToast({ title: "视频加载出错", icon: "none", duration: 2000 }), wx.reportMonitor("5", 1); // 提示用户播放错误
};

// 组件函数 || 参数：组件传参，页面指针
const componentAction = (res, ctx) => {
  switch (res.currentTarget.dataset.action) { // 判断action类型并调用各组件函数
    case "img": image(res, ctx);
      break;
    case "navigate": ctx.$route(res.currentTarget.dataset.url);
      break;
    case "back": ctx.$back();
      break;
    case "list": list(res, ctx);
      break;
    case "doc": documentHandler(res);
      break;
    case "phone": phone(res, ctx);
      break;
    case "picker": picker(res, ctx);
      break;
    case "switch": Switch(res, ctx);
      break;
    case "slider": slider(res, ctx);
      break;
    case "share": share(res, ctx);
      break;
    case "video": video(res);
      break;
    default: console.warn("ComponentAction error"), wx.reportMonitor("11", 1); // 找不到对应函数，错误报警
  }
};

// 导航栏动态改变 || 参数：组件传参，页面指针
const changeNav = (opt, ctx) => {
  let e = ctx.data.page[0], i, j, k;
  if (opt.scrollTop <= 1) i = j = k = false;
  else if (opt.scrollTop <= 42) i = j = false, k = true;
  else if (opt.scrollTop >= 53) i = j = k = true;
  else i = k = true, j = false;
  if (e.titleDisplay != i) ctx.setData({ "page[0].titleDisplay": i });
  else if (e.borderDisplay != j) ctx.setData({ "page[0].borderDisplay": j });
  else if (e.shadow != k) ctx.setData({ "page[0].shadow": k });
};

// wx.request包装 || 参数：网址路径，执行函数，页面指针
const request = (path, Function) => {
  wx.request({
    url: `https://nenuyouth.com/${path}.json`,
    success: res => {
      console.log(res);
      // eslint-disable-next-line no-new-func
      if (res.statusCode == 200) Function(res.data);// 成功返回数据，执行函数
      else console.warn(`request ${path} fail: ${res.statusCode}`), wx.reportMonitor("3", 1);// 返回码异常，未返回正确数据
    },

    // 网络请求失败
    fail: res => {
      console.log(res), wx.reportMonitor("4", 1);
    }
  });
};

// 设置背景颜色
const setBgcolor = (globalData, grey) => {
  console.log("setBgcolor");
  let color;
  if (globalData.nm && grey)
    switch (globalData.T) {
      case "Andriod": color = ["#10110b", "#10110b", "#10110b"];
        break;
      case "iOS": color = ["#10110b", "#0a0a08", "#10110b"];
        break;
      case "NENU": color = ["#070707", "#070707", "#070707"];
    }
  else if (globalData.nm && !grey)
    switch (globalData.T) {
      case "iOS": color = ["#000000", "#0a0a08", "#000000"];
        break;
      case "Andriod":
      case "NENU": color = ["#000000", "#000000", "#000000"];
    }
  else if (!globalData.nm && grey)
    switch (globalData.T) {
      case "Andriod": color = ["#f8f8f8", "#f8f8f8", "#f8f8f8"];
        break;
      case "NENU": color = ["#f0f0f0", "#f0f0f0", "#f0f0f0"];
        break;
      case "iOS": color = ["#f4f4f4", "#efeef4", "#efeef4"];
    }
  else
    switch (globalData.T) {
      case "Andriod": color = ["#f8f8f8", "#f8f8f8", "#f8f8f8"];
        break;
      case "NENU": color = ["ffffff", "ffffff", "ffffff"];
        break;
      case "iOS": color = ["#f4f4f4", "ffffff", "ffffff"];
    }


  wx.setBackgroundColor({ backgroundColorTop: color[0], backgroundColor: color[1], backgroundColorBottom: color[2] });
};

// 加载字体 || 参数：主题
const loadFont = theme => {
  try {
    if (theme == "Android")
      wx.loadFontFace({
        family: "FZKTJW", source: "url(\"https://nenuyouth.com/fonts/FZKTJW.ttf\")",
        complete: res => {
          console.info(`楷体字体${res.status}`);// 调试
        }
      });
    else if (theme == "NENU")
      wx.loadFontFace({
        family: "FZSSJW", source: "url(\"https://nenuyouth.com/fonts/FZSSJW.ttf\")",
        complete: res => {
          console.info(`宋体字体${res.status}`);// 调试
        }
      });
    else throw theme;
  } catch (e) {
    console.warn(`Theme ${e} cannot be handled.`);
  }
};

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
  Switch
};