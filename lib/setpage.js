/* global wx*/

// 引入文件管理
const $file = require('./file'),
  $act = require('./interface');

// 声明日志管理器
const logger = wx.getLogManager({ level: 1 }),

  /**
   * 获得界面数据，生成正确的界面数据
   *
   * @param {*} page 页面数据
   * @param {*} globalData 全局数据
   * @param {*} option 页面传参
   * @returns {*} 处理之后的page
   */
  disposePage = (page, globalData, option) => {
    if (page)  // 如果page参数传入
      if (page[0].tag === 'head') {

        // 对page中head标签执行初始化
        page[0].statusBarHeight = globalData.info.statusBarHeight;
        page[0].url = [];

        if (option && !page[0].action) {
          page[0].aim = 'aim' in option ? option.aim : page[0].title; // 设置界面名称
          if ('From' in option) page[0].leftText = option.From; // 设置页面来源
          if ('depth' in option) page[0].aimDepth = Number(option.depth) + 1; // 设置界面路径深度

          // 判断是否来自分享，分享页左上角动作默认为重定向
          if ('share' in option) {
            page[0].action = 'redirect';
            console.info('redirect');
          }

          // 添加返回文字
          if (!page[0].leftText) page[0].leftText = '返回';
        }
        page.forEach((element, index) => {
          element.id = index; // 对page每项元素添加id

          // 处理图片
          if (element.src) {
            if (element.res) page[0].url.push(element.res);
            else {
              page[0].url.push(element.src);
              element.res = element.src;
            }
            if (!element.imgMode) element.imgMode = 'widthFix';
          }

          // 处理文档
          if (element.docName) {
            const { 1: temp } = element.docName.split('.');

            element.docName = element.docName.split('.')[0];
            element.docType = temp === 'docx' || temp === 'doc'
              ? 'doc'
              : temp === 'pptx' || temp === 'ppt'
                ? 'ppt'
                : temp === 'xlsx' || temp === 'xls'
                  ? 'xls'
                  : temp === 'jpg' || temp === 'jpeg'
                    ? 'jpg'
                    : temp === 'mp4' || temp === 'mov' || temp === 'avi' || temp === 'rmvb'
                      ? 'video'
                      : temp === 'pdf'
                        ? 'pdf'
                        : temp === 'png' || temp === 'gif'
                          ? temp
                          : 'document';
          }

          // 设置list组件
          if ('content' in element) element.content.forEach((listElement, listIndex) => {
            listElement.id = `${index}-${listIndex}`; // 列表每项添加id

            // 设置列表导航
            if ('url' in listElement) listElement.url += `?From=${page[0].title}`;
            if ('aim' in listElement)
              listElement.url =
                `module${page[0].aimDepth}?From=${page[0].title}&aim=${listElement.aim}&depth=${page[0].aimDepth}`;

            // 设置列表开关与滑块
            if ('swiKey' in listElement) listElement.status = wx.getStorageSync(listElement.swiKey);
            if ('sliKey' in listElement) listElement.value = wx.getStorageSync(listElement.sliKey);

            // 设置列表选择器
            if ('pickerValue' in listElement)
              if (listElement.single) { // 单列选择器
                const pickerValue = wx.getStorageSync(listElement.key);

                listElement.value = listElement.pickerValue[pickerValue];
                listElement.currentValue = [pickerValue];
              } else { // 多列选择器
                const pickerValues = wx.getStorageSync(listElement.key).split('-');

                listElement.currentValue = [];
                listElement.value = [];
                pickerValues.forEach((k, l) => {
                  listElement.value[l] = listElement.pickerValue[l][Number(k)];
                  listElement.currentValue[l] = Number(k);
                });
              }

          });
        });
        // 调试
        console.info(`${page[0].aim}处理完毕`);

        // 调试：未找到head tag
      } else {
        console.warn('No head tag in page!');
        logger.warn('No head tag');
        wx.reportMonitor('14', 1);
      }
    // 调试：未传入page
    else {
      console.warn('No pageData!');
      wx.reportMonitor('15', 1);
    }

    return page; // 返回处理后的page
  },

  /**
   * 从本地或网络获取在线页面的json并处理存储，被preLoad调用
   *
   * @param {*} option 页面传参
   * @param {*} globalData 全局变量
   * @param {*} ctx 页面指针
   * @returns {void}
   */
  getOnlinePage = (option, globalData, ctx) => {

    // 确定文件夹名称
    let { length } = option.aim,
      pageData;

    while (!isNaN(option.aim.charAt(length))) length--;
    const folder = option.aim.substring(0, length + 1);

    // 尝试从存储中读取界面数据
    try {
      // 尝试从文件中解析页面数据
      pageData = $file.readJson(`page/${folder}/${option.aim}`);

      // 已存在界面数据直接预处理后写入缓存
      if (pageData) ctx.$session.set(`${option.aim}Temp`, disposePage(pageData, globalData, option));
      // 不存在页面数据，抛出错误
      else throw option.aim;

      // 不存在界面数据，需在线获取
    } catch (e) {
      console.log(`读取${option.aim}出现问题，需要重新获取`);// 调试

      // 向服务器请求json
      $act.request(`page/${folder}/${option.aim}`, data => {
        // 页面处理结果写入缓存
        ctx.$session.set(`${option.aim}Temp`, disposePage(data, globalData, option));

        // 非分享界面下将页面数据写入文件存储
        if (!option.share) $file.writeJson(`page/${folder}`, `${option.aim}`, data);
      }, () => { // 调试
        wx.reportMonitor('17', 1);
      }, () => {
        // 设置故障页数据到该页面缓存中
        ctx.$session.set(`${option.aim}Temp`, disposePage([
          {
            tag: 'error',
            statusBarHeight: globalData.info.statusBarHeight
          }
        ], globalData, option));

        console.warn('res error');
        wx.reportMonitor('16', 1); // 输出报警
      });
    }
  },

  /**
   * 预加载界面，在界面被调用时，将该界面包含的所有aim对应json处理后写入存储
   *
   * @param {*} ctx 页面指针
   * @param {*} globalData 全局变量
   * @returns {void}
   */
  preLoad = (ctx, globalData) => {
    const { page } = ctx.data;

    if (page) page.forEach(component => {
      if ('content' in component) // 该组件是列表，需要预加载界面，提前获取界面到存储
        component.content.forEach(element => {
          if ('aim' in element)
            getOnlinePage({ From: page[0].title, aim: element.aim, depth: page[0].aimDepth }, globalData, ctx);
        });
    });
    wx.reportMonitor('1', 1); // 统计报告
  },

  /**
   * 设置界面，在onNavigate时调用，将界面数据写入初始数据
   *
   * @param {*} page page数组
   * @param {*} globalData 全局数据
   * @param {*} option 页面传参
   * @param {*} ctx 页面指针
   * @param {boolean} [Set=true] page处理状态(默认为已处理)
   * @returns {void}
   */
  presetPage = (page, globalData, option, ctx, Set = true) => {
    console.info('将要跳转：', option); // 控制台输出参数

    // 写入界面aim值
    if (option) try {
      ctx.aim = option.query.aim;
    } catch (msg) {
      ctx.aim = option.aim;
    }

    if (page) {
      ctx.data = {
        T: globalData.T, nm: globalData.nm,
        page: Set ? page : disposePage(page, globalData, option) // 如果未处理现进行处理再赋值
      };

      console.info(`${ctx.aim}载入`, 'data是：', ctx.data); // 函数调用完成，输出
    } else {
      ctx.data = { T: globalData.T, nm: globalData.nm };
      console.warn(`${ctx.aim}载入失败`, 'data是：', ctx.data);
    }
  },

  // 设置本地界面数据，在界面初始化之后使用 || 参数：page数组，全局数据，页面传参，页面指针
  setPage = (page, globalData, opt, ctx) => {

    // 设置页面数据
    ctx.setData({ T: globalData.T, nm: globalData.nm, page: disposePage(page, globalData, opt) });
  },

  /**
   * 弹出通知，在onLoad时被调用
   *
   * @param {string} aim 当前界面的aim值
   * @returns {void}
   */
  popNotice = aim => {
    if (wx.getStorageSync(`${aim}Notify`)) { // 判断是否需要弹窗

      // 从存储中获取通知内容并展示
      const notice = wx.getStorageSync(`${aim}notice`);

      wx.showModal({
        title: notice[0], content: notice[1], showCancel: false,

        // 防止二次弹窗
        success: () => {
          wx.removeStorageSync(`${aim}Notify`);
        }

      });
      console.info('弹出通知');// 调试
    }
    wx.reportAnalytics('page_aim_count', { aim });// Aim统计分析
  },

  /**
   * 设置在线界面数据，在界面初始化之后使用
   *
   * @param {*} globalData 全局变量
   * @param {*} option 页面传参
   * @param {*} ctx 页面指针
   * @param {boolean} [preload=true] 是否需要预加载(默认需要)
   * @returns {void}
   */
  setOnlinePage = (globalData, option, ctx, preload = true) => {
    /*
     * Console.log(ctx);
     * console.log('aim比较', ctx.aim, option.aim, ctx.aim === option.aim);
     */

    // 页面已经载入，立即执行本界面的预加载
    if (ctx.aim === option.aim) {
      console.log(`${ctx.aim}已加载`);
      preLoad(ctx, globalData);
      console.info(`preload ${ctx.aim} finish`);

      // 需要重新载入界面
    } else {
      console.info(`${option.aim}onLoad开始，参数为：`, option);
      ctx.aim = option.aim;

      // 获取文件夹名称
      let { length } = option.aim;

      while (!isNaN(option.aim.charAt(length))) length--;
      const aimName = option.aim.substring(0, length + 1),
        page = $file.readJson(`page/${aimName}/${option.aim}`);

      // 如果本地存储中含有page直接处理
      if (page) {
        setPage(page, globalData, option, ctx);
        popNotice(option.aim);
        console.info(`${option.aim}onLoad成功：`, ctx.data);
        wx.reportMonitor('0', 1);

        // 如果需要执行预加载，则执行
        if (preload) {
          preLoad(ctx, globalData);
          console.log(`${option.aim}界面预加载完成`);
        }
      } else
        // 请求页面Json
        $act.request(`page/${aimName}/${option.aim}`, data => {
          // 设置界面
          setPage(data, globalData, option, ctx);

          // 非分享界面下将页面数据写入存储
          if (!option.share) $file.writeJson(`page/${aimName}`, `${option.aim}`, data);

          // 如果需要执行预加载，则执行
          if (preload) {
            preLoad(ctx, globalData);
            console.log(`${option.aim}界面预加载完成`);
          }

          // 弹出通知
          popNotice(option.aim);

          // 调试
          console.info(`${option.aim}onLoad成功`);
          wx.reportMonitor('0', 1);
        }, () => {
          // 设置error页面并弹出通知
          setPage([{ tag: 'error', statusBarHeight: globalData.info.statusBarHeight }], globalData, option, ctx);
          popNotice(option.aim);

          // 调试
          console.warn(`${option.aim}onLoad失败，错误为`, res);
          logger.warn(`${option.aim}onLoad失败，错误为`, res);
          wx.reportMonitor('13', 1);
        }, () => {
          // 设置error界面
          setPage([{ tag: 'error', statusBarHeight: globalData.info.statusBarHeight }], globalData, option, ctx);

          // 调试
          console.warn(`${option.aim}资源错误`);
          wx.reportMonitor('12', 1);
          console.info(`${option.aim}onLoad成功`);
          wx.reportMonitor('0', 1);
        });
    }
  },

  /**
   * 列表函数 for Android，控制列表显隐
   *
   * @param {*} res 组件参数
   * @param {*} ctx 页面指针
   * @returns {void}
   */
  list = (res, ctx) => {
    const { id } = res.currentTarget;

    ctx.setData({ [`page[${id}].display`]: !ctx.data.page[id].display });
  },

  /**
   * 图片函数
   *
   * @param {*} res 组件参数
   * @param {*} ctx 页面指针
   * @returns {void}
   */
  image = (res, ctx) => {
    switch (res.type) {

      // 图片加载完成
      case 'load': ctx.setData({ [`page[${res.target.id}].load`]: true });
        break;

      // 图片加载出错
      case 'error':
        console.warn('图片加载失败');
        wx.reportMonitor('10', 1);
        ctx.setData({ [`page[${res.target.id}].error`]: true });
        break;

      // 开始预览图片
      case 'tap':
      default: wx.previewImage({ current: ctx.data.page[res.target.id].res, urls: ctx.data.page[0].url });
    }
  },

  /**
   * 选择器函数
   *
   * @param {*} res 组件参数
   * @param {*} ctx 页面指针
   * @returns {void}
   */
  picker = (res, ctx) => {
    const position = res.currentTarget.dataset.id.split('-'),
      content = ctx.data.page[position[0]].content[position[1]];// 获得选择器位置与内容

    // 切换嵌入选择器显隐
    if (res.type === 'tap') ctx.setData({ [`page[${position[0]}].content[${position[1]}].visible`]: !content.visible });

    if (res.type === 'change') {
      const { value } = res.detail;

      if (content.single) {
        // 判断为单列选择器，更新页面数据并存储选择器值
        content.value = content.pickerValue[Number(value)];
        content.currentValue = value;
        wx.setStorageSync(content.key, Number(value));

      } else {
        // 判断为多列选择器，遍历每一列更新页面数据、并存储选择器值
        value.forEach((x, y) => {
          content.value[y] = content.pickerValue[y][Number(x)];
          content.currentValue[y] = x;
        });
        wx.setStorageSync(content.key, value.join('-'));
      }

      // 将选择器的变更响应到页面上
      ctx.setData({ [`page[${position[0]}].content[${position[1]}]`]: content });
    }
  },

  /**
   * 滑块函数
   *
   * @param {*} res 组件参数
   * @param {*} ctx 页面指针
   * @returns {void}
   */
  slider = (res, ctx) => {
    const pos = res.currentTarget.dataset.id.split('-'),
      content = ctx.data.page[pos[0]].content[pos[1]],
      { value } = res.detail;

    switch (res.type) {

      // 切换滑块显隐
      case 'tap': content.visible = !content.visible;
        break;

      // 移动时实时更新页面显示
      case 'changing': content.value = value;
        break;

      // 更新页面数据，并写入值到存储
      case 'change':
      default:
        content.value = value;
        wx.setStorageSync(content.sliKey, value);
    }

    // 写入页面数据
    ctx.setData({ [`page[${pos[0]}].content[${pos[1]}]`]: content });
  },

  /**
   * 开关函数
   *
   * @param {*} res 组件参数
   * @param {*} ctx 页面指针
   * @returns {void}
   */
  Switch = (res, ctx) => {
    const pos = res.target.dataset.id.split('-');

    ctx.setData({ [`page[${pos[0]}].content[${pos[1]}].status`]: res.detail.value });// 更新页面数据
    wx.setStorageSync(ctx.data.page[pos[0]].content[pos[1]].swiKey, res.detail.value); // 将开关值写入存储的swiKey变量中

    return ctx.data.page; // 返回修改后的page数组
  },

  /**
   * 打开文档
   *
   * @param {*} res 组件参数
   * @returns {void}
   */
  documentHandler = res => {
    const { doctype, url } = res.currentTarget.dataset; // 解构赋值

    if (['doc', 'ppt', 'xls', 'pdf'].includes(doctype) > -1) {
      // 检测到文档

      wx.showLoading({ title: '下载中...0%', mask: true });// 显示下载提示

      // 开始下载文件
      const docTask = wx.downloadFile({
        url,

        // 下载成功，隐藏下载提示并打开文档
        success: data => {
          wx.hideLoading();
          wx.openDocument({ filePath: data.tempFilePath });
        },

        // 下载失败，隐藏下载提示告知用户下载失败并上报
        fail: () => {
          wx.hideLoading();
          $act.tip('文档下载失败');
          wx.reportMonitor('9', 1);
        }
      });

      // 监听下载进度，并更新弹窗显示
      docTask.onProgressUpdate(data => {
        wx.showLoading({ title: `下载中...${data.progress}%`, mask: true });
      });

      // 检测到图片，开始图片浏览
    } else if (['jpg', 'png', 'gif'].includes(doctype) > -1) wx.previewImage({ urls: [url] });
  },

  /**
   * 电话组件函数
   *
   * @param {*} res 组件参数
   * @param {*} ctx 页面指针
   * @returns {void}
   */
  phone = (res, ctx) => {
    const Type = res.target.dataset.type,
      info = ctx.data.page[res.currentTarget.id];

    if (Type === 'call') wx.makePhoneCall({ phoneNumber: info.num.toString() });// 拨打电话
    else if (Type === 'add') wx.addPhoneContact({// 添加联系人
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
  },

  /**
   * 分享按钮
   *
   * @param {*} res 组件参数
   * @param {*} ctx 页面指针
   * @returns {void}
   */
  share = (res, ctx) => {
    const touch = res.touches[0];

    // 记录触摸点与按钮左上角的像素偏差与点击时间
    if (res.type === 'touchstart') {
      ctx.left = touch.pageX - res.currentTarget.offsetLeft;
      ctx.top = touch.pageY - res.currentTarget.offsetTop;
      ctx.time = res.timeStamp;

      // 移动分享按钮
    } else if (res.type === 'touchmove')
      ctx.setData({ 'page[0].top': touch.pageY - ctx.top, 'page[0].left': touch.pageX - ctx.left });

    // 视为点击操作，展示菜单
    else if (res.type === 'touchend' && ctx.time > res.timeStamp - 200)
      ctx.setData({ 'page[0].menuDisplay': true });

    // 取消显示菜单，并执行对应逻辑
    else if (res.type === 'tap') {
      ctx.setData({ 'page[0].menuDisplay': false });

      // 下载二维码
      if (res.target.dataset.object === 'download') {
        console.log('Start QRCode download.');// 调试
        $act.downLoad(`img/share/${ctx.data.page[0].aim}.jpg`, path => {
          wx.getSetting({// 获取用户设置
            success: res2 => {

              // 如果已经授权相册直接写入图片
              if (res2.authSetting['scope.writePhotosAlbum'])
                wx.saveImageToPhotosAlbum({
                  filePath: path,
                  success: () => {
                    $act.tip('二维码保存成功');

                    // 调试
                    logger.debug('二维码保存成功');
                    wx.reportMonitor('8', 1);
                  },
                  fail: msg => {
                    $act.tip('二维码保存失败');

                    // 调试
                    console.warn('二维码保存失败:', msg);
                    logger.warn('二维码保存失败', msg);
                    wx.reportMonitor('6', 1);
                  }
                });

              // 没有授权——>提示用户授权
              else wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: () => {

                  // 获得授权，写入图片
                  wx.saveImageToPhotosAlbum({
                    filePath: path,
                    success: () => {
                      $act.tip('二维码保存成功');

                      // 调试
                      wx.reportMonitor('8', 1);
                    },
                    fail: msg => {
                      $act.tip('二维码保存失败');

                      // 调试
                      console.warn('二维码保存失败:', msg);
                      logger.warn('二维码保存失败', msg);
                      wx.reportMonitor('6', 1);
                    }
                  });
                },

                // 用户拒绝权限，提示用户开启权限
                fail: () => {
                  wx.showModal({
                    title: '权限被拒', content: '您拒绝了相册写入权限，如果想要保存图片，请在小程序设置页允许权限',
                    showCancel: false, confirmText: '确定', confirmColor: '#3CC51F',
                    complete: () => {
                      $act.tip('二维码保存失败');

                      // 调试
                      logger.warn('用户拒绝相册授权');
                    }
                  });
                }
              });
            }
          });
        }, () => {
          $act.tip('二维码下载失败');

          // 调试
          console.warn(`下载二维码失败${ctx.data.page[0].aim}`);
          logger.warn(`下载二维码失败${ctx.data.page[0].aim}`);
          wx.reportMonitor('6', 1);
        }, statusCode => {
          $act.tip('二维码下载失败，服务器出错');

          // 调试
          console.warn(`二维码状态码异常:${statusCode}`);
          logger.warn(`二维码状态码异常:${statusCode}`);
          wx.reportMonitor('7', 1);
        });
      };
    }
  },

  /**
   * 视频组件函数
   *
   * @param {*} res 组件参数
   * @returns {void}
   */
  video = res => {
    console.info(`视频状态为${res.type}`); // 输出视频组件状态
    if (res.type === 'waiting') $act.tip('缓冲中..');// 视频缓冲时提示用户等待
    else if (res.type === 'play') wx.hideToast(); // 正常播放时隐藏提示
    // 提示用户播放错误
    else if (res.type === 'error') {
      $act.tip('视频加载出错');

      // 调试
      wx.reportMonitor('5', 1);
      logger.warn('视频加载出错');
    }
  },

  /**
   * 组件函数
   *
   * @param {*} res 组件参数
   * @param {*} ctx 页面指针
   * @returns {void}
   */
  componentAction = (res, ctx) => {
    switch (res.currentTarget.dataset.action) { // 判断action类型并调用各组件函数
      case 'img': image(res, ctx);
        break;
      case 'navigate': ctx.$route(res.currentTarget.dataset.url);
        break;
      case 'back': ctx.$back();
        break;
      case 'list': list(res, ctx);
        break;
      case 'doc': documentHandler(res);
        break;
      case 'phone': phone(res, ctx);
        break;
      case 'picker': picker(res, ctx);
        break;
      case 'switch': Switch(res, ctx);
        break;
      case 'slider': slider(res, ctx);
        break;
      case 'share': share(res, ctx);
        break;
      case 'video': video(res);
        break;

      // 找不到对应函数，错误报警
      default:
        console.warn('ComponentAction error');
        logger.warn('ComponentAction error');
        wx.reportMonitor('11', 1);
    }
  },

  /**
   * 导航栏动态改变
   *
   * @param {*} option 组件参数
   * @param {*} ctx 页面指针
   * @returns {void}
   */
  changeNav = (option, ctx) => {
    const { 0: pageHead } = ctx.data.page;
    let titleDisplay, borderDisplay, shadow;

    // 判断情况并赋值
    if (option.scrollTop <= 1) titleDisplay = borderDisplay = shadow = false;
    else if (option.scrollTop <= 42) {
      titleDisplay = borderDisplay = false;
      shadow = true;
    } else if (option.scrollTop >= 53) titleDisplay = borderDisplay = shadow = true;
    else {
      titleDisplay = shadow = true;
      borderDisplay = false;
    }

    // 判断结果并更新界面数据
    if (pageHead.titleDisplay !== titleDisplay) ctx.setData({ 'page[0].titleDisplay': titleDisplay });
    else if (pageHead.borderDisplay !== borderDisplay) ctx.setData({ 'page[0].borderDisplay': borderDisplay });
    else if (pageHead.shadow !== shadow) ctx.setData({ 'page[0].shadow': shadow });
  },

  /**
   * 设置胶囊与背景颜色
   *
   * @param {*} globalData 页面全局数据
   * @param {*} grey 页面是否为灰色背景
   * @returns {void}
   */
  color = (globalData, grey) => {
    const [frontColor, backgroundColor] = globalData.nm ? ['#ffffff', '#000000'] : ['#000000', '#ffffff'];
    let temp;

    if (globalData.nm && grey)
      switch (globalData.T) {
        case 'Andriod': temp = ['#10110b', '#10110b', '#10110b'];
          break;
        case 'iOS': temp = ['#10110b', '#0a0a08', '#10110b'];
          break;
        case 'NENU':
        default:
          temp = ['#070707', '#070707', '#070707'];
      }
    else if (globalData.nm && !grey)
      switch (globalData.T) {
        case 'iOS': temp = ['#000000', '#0a0a08', '#000000'];
          break;
        case 'Andriod':
        case 'NENU':
        default:
          temp = ['#000000', '#000000', '#000000'];
      }
    else if (!globalData.nm && grey)
      switch (globalData.T) {
        case 'Andriod': temp = ['#f8f8f8', '#f8f8f8', '#f8f8f8'];
          break;
        case 'NENU': temp = ['#f0f0f0', '#f0f0f0', '#f0f0f0'];
          break;
        case 'iOS':
        default: temp = ['#f4f4f4', '#efeef4', '#efeef4'];
      }
    else
      switch (globalData.T) {
        case 'Andriod': temp = ['#f8f8f8', '#f8f8f8', '#f8f8f8'];
          break;
        case 'NENU': temp = ['ffffff', 'ffffff', 'ffffff'];
          break;
        case 'iOS':
        default:
          temp = ['#f4f4f4', 'ffffff', 'ffffff'];
      }

    return [
      { frontColor, backgroundColor },
      { backgroundColorTop: temp[0], backgroundColor: temp[1], backgroundColorBottom: temp[2] }
    ];
  },

  /**
   * 加载字体
   *
   * @param {*} theme 主题
   * @returns {void}
   */
  loadFont = theme => {
    try {
      if (theme === 'Android')
        wx.loadFontFace({
          family: 'FZKTJW', source: 'url("https://mp.nenuyouth.com/fonts/FZKTJW.ttf")',
          complete: res => {
            console.info(`楷体字体${res.status}`);// 调试
          }
        });
      else if (theme === 'NENU')
        wx.loadFontFace({
          family: 'FZSSJW', source: 'url("https://mp.nenuyouth.com/fonts/FZSSJW.ttf")',
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
  color,
  loadFont,
  Switch
};
