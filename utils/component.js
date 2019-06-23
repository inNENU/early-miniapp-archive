
/**
 * 列表函数 for Android，控制列表显隐
 *
 * @param {*} res 组件参数
 * @param {*} ctx 页面指针
 * @param {Function} callback 函数回调
 * @returns {void}
 */
const list = (res, ctx, callback) => {
  const { id } = res.currentTarget;

  ctx.setData({ [`page[${id}].display`]: !ctx.data.page[id].display }, () => callback());
};

/**
 * 图片函数
 *
 * @param {*} res 组件参数
 * @param {*} ctx 页面指针
 * @returns {void}
 */
const image = (res, ctx) => {
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
};

/**
 * 选择器函数
 *
 * @param {*} res 组件参数
 * @param {*} ctx 页面指针
 * @param {Function} callback 函数回调
 * @returns {void}
 */
const picker = (res, ctx, callback) => {
  const position = res.currentTarget.dataset.id.split('-');
  const content = ctx.data.page[position[0]].content[position[1]];// 获得选择器位置与内容

  // 切换嵌入选择器显隐
  if (res.type === 'tap') ctx.setData(
    { [`page[${position[0]}].content[${position[1]}].visible`]: !content.visible },
    () => callback(res.type)
  );
  else if (res.type === 'change') {
    const { value } = res.detail;

    if (content.single) {
      // 判断为单列选择器，更新页面数据并存储选择器值
      content.value = content.pickerValue[Number(value)];
      content.currentValue = Number(value);
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
    ctx.setData({ [`page[${position[0]}].content[${position[1]}]`]: content }, () => callback(res.type));
  }
};

/**
 * 滑块函数
 *
 * @param {*} res 组件参数
 * @param {*} ctx 页面指针
 * @param {Function} callback 函数回调
 * @returns {void}
 */
const slider = (res, ctx, callback) => {
  const pos = res.currentTarget.dataset.id.split('-');
  const content = ctx.data.page[pos[0]].content[pos[1]];
  const { value } = res.detail;

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
  ctx.setData({ [`page[${pos[0]}].content[${pos[1]}]`]: content }, () => callback(res.type));
};

/**
 * 开关函数
 *
 * @param {*} res 组件参数
 * @param {*} ctx 页面指针
 * @param {Function} callback 函数回调
 * @returns {void}
 */
const Switch = (res, ctx, callback) => {
  const pos = res.target.dataset.id.split('-');

  ctx.setData({ [`page[${pos[0]}].content[${pos[1]}].status`]: res.detail.value }, () => callback());// 更新页面数据
  wx.setStorageSync(ctx.data.page[pos[0]].content[pos[1]].swiKey, res.detail.value); // 将开关值写入存储的swiKey变量中
};

/**
 * 打开文档
 *
 * @param {*} res 组件参数
 * @returns {void}
 */
const documentHandler = res => {
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
        $wx.tip('文档下载失败');
        wx.reportMonitor('9', 1);
      }
    });

    // 监听下载进度，并更新弹窗显示
    docTask.onProgressUpdate(data => {
      wx.showLoading({ title: `下载中...${data.progress}%`, mask: true });
    });

    // 检测到图片，开始图片浏览
  } else if (['jpg', 'png', 'gif'].includes(doctype) > -1) wx.previewImage({ urls: [url] });
};

/**
 * 电话组件函数
 *
 * @param {*} res 组件参数
 * @param {*} ctx 页面指针
 * @returns {void}
 */
const phone = (res, ctx) => {
  const Type = res.target.dataset.type;
  const info = ctx.data.page[res.currentTarget.id];

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
};

/**
 * 分享按钮
 *
 * @param {*} res 组件参数
 * @param {*} ctx 页面指针
 * @returns {void}
 */
const share = (res, ctx) => {
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
      $wx.downLoad(`img/share/${ctx.data.page[0].aim}.jpg`, path => {
        wx.getSetting({// 获取用户设置
          success: res2 => {

            // 如果已经授权相册直接写入图片
            if (res2.authSetting['scope.writePhotosAlbum'])
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success: () => {
                  $wx.tip('二维码保存成功');

                  // 调试
                  logger.debug('二维码保存成功');
                  wx.reportMonitor('8', 1);
                },
                fail: msg => {
                  $wx.tip('二维码保存失败');

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
                    $wx.tip('二维码保存成功');

                    // 调试
                    wx.reportMonitor('8', 1);
                  },
                  fail: msg => {
                    $wx.tip('二维码保存失败');

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
                    $wx.tip('二维码保存失败');

                    // 调试
                    logger.warn('用户拒绝相册授权');
                  }
                });
              }
            });
          }
        });
      }, () => {
        $wx.tip('二维码下载失败');

        // 调试
        console.warn(`下载二维码失败${ctx.data.page[0].aim}`);
        logger.warn(`下载二维码失败${ctx.data.page[0].aim}`);
        wx.reportMonitor('6', 1);
      }, statusCode => {
        $wx.tip('二维码下载失败，服务器出错');

        // 调试
        console.warn(`二维码状态码异常:${statusCode}`);
        logger.warn(`二维码状态码异常:${statusCode}`);
        wx.reportMonitor('7', 1);
      });
    };
  }
};

/**
 * 视频组件函数
 *
 * @param {*} res 组件参数
 * @returns {void}
 */
const video = res => {
  console.info(`视频状态为${res.type}`); // 输出视频组件状态
  if (res.type === 'waiting') $wx.tip('缓冲中..');// 视频缓冲时提示用户等待
  else if (res.type === 'play') wx.hideToast(); // 正常播放时隐藏提示
  // 提示用户播放错误
  else if (res.type === 'error') {
    $wx.tip('视频加载出错');

    // 调试
    wx.reportMonitor('5', 1);
    logger.warn('视频加载出错');
  }
};

/**
 * 组件函数
 *
 * @param {*} res 组件参数
 * @param {*} ctx 页面指针
 * @param {Function} [callback] 回调函数
 * @returns {void}
 */
const componentAction = (res, ctx, callback) => {
  switch (res.currentTarget.dataset.action) { // 判断action类型并调用各组件函数
    case 'img': image(res, ctx);
      break;
    case 'navigate':
      ctx.$route(res.currentTarget.dataset.url);
      break;
    case 'back': ctx.$back();
      break;
    case 'share': share(res, ctx);
      break;
    case 'doc': documentHandler(res);
      break;
    case 'phone': phone(res, ctx);
      break;
    case 'picker': picker(res, ctx, callback);
      break;
    case 'switch': Switch(res, ctx, callback);
      break;
    case 'slider': slider(res, ctx, callback);
      break;
    case 'video': video(res);
      break;
    case 'list': list(res, ctx);
      break;

    // 找不到对应函数，错误报警
    default:
      console.warn('ComponentAction error');
      logger.warn('ComponentAction error');
      wx.reportMonitor('11', 1);
  }
};

/**
 * 导航栏动态改变
 *
 * @param {*} option 组件参数
 * @param {*} ctx 页面指针
 * @returns {void}
 */
const changeNav = (option, ctx) => {
  const { 0: pageHead } = ctx.data.page;
  let titleDisplay;
  let borderDisplay;
  let shadow;

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
};

module.exports = {
  nav: changeNav,
  trigger: componentAction
};
