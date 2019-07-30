/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 13:49:06
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-30 16:00:47
 * @Description: 组件函数库
 */

const logger = wx.getLogManager({ level: 1 });

/**
 * 图片函数
 *
 * @param res 组件参数
 * @param ctx 页面指针
 */
const image = (res: NormalEvent, ctx: any) => {
  switch (res.type) {

    // 图片加载完成
    case 'load':
      ctx.setData({ [`page[${res.target.id}].load`]: true });
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
 * @param res 组件参数
 * @param ctx 页面指针
 * @param callback 函数回调
 */
const picker = (res: PickerEvent, ctx: any, callback?: (type: string) => void) => {
  const position = res.currentTarget.dataset.id.split('-');
  const content = ctx.data.page[position[0]].content[position[1]];// 获得选择器位置与内容

  // 切换嵌入选择器显隐
  if (res.type === 'tap') ctx.setData(
    { [`page[${position[0]}].content[${position[1]}].visible`]: !content.visible },
    () => callback ? callback(res.type) : ''
  );
  else if (res.type === 'change') {
    const { value } = res.detail;

    if (Array.isArray(value)) {
      // 判断为多列选择器，遍历每一列更新页面数据、并存储选择器值
      value.forEach((x: string | number, y: number) => {
        content.value[y] = content.pickerValue[y][Number(x)];
        content.currentValue[y] = x;
      });
      wx.setStorageSync(content.key, value.join('-'));
    } else {
      // 判断为单列选择器，更新页面数据并存储选择器值
      content.value = content.pickerValue[Number(value)];
      content.currentValue = Number(value);
      wx.setStorageSync(content.key, Number(value));
    }

    // 将选择器的变更响应到页面上
    ctx.setData(
      { [`page[${position[0]}].content[${position[1]}]`]: content },
      () => callback ? callback(res.type) : ''
    );
  }
};

/**
 * 滑块函数
 *
 * @param res 组件参数
 * @param ctx 页面指针
 * @param callback 函数回调
 */
const slider = (res: SliderEvent, ctx: any, callback?: (type: string) => void) => {
  const pos = res.currentTarget.dataset.id.split('-');
  const content = ctx.data.page[pos[0]].content[pos[1]];
  const { value } = res.detail;

  switch (res.type) {

    // 切换滑块显隐
    case 'tap':
      content.visible = !content.visible;
      break;

    // 移动时实时更新页面显示
    case 'changing':
      content.value = value;
      break;

    // 更新页面数据，并写入值到存储
    case 'change':
    default:
      content.value = value;
      wx.setStorageSync(content.sliKey, value);
  }

  // 写入页面数据
  ctx.setData({ [`page[${pos[0]}].content[${pos[1]}]`]: content }, () => callback ? callback(res.type) : '');
};

/**
 * 开关函数
 *
 * @param res 组件参数
 * @param ctx 页面指针
 * @param callback 函数回调
 */
const Switch = (res: SwitchEvent, ctx: any, callback?: () => void) => {
  const pos = res.target.dataset.id.split('-');

  // 更新页面数据
  ctx.setData(
    { [`page[${pos[0]}].content[${pos[1]}].status`]: res.detail.value },
    () => callback ? callback() : ''
  );
  wx.setStorageSync(ctx.data.page[pos[0]].content[pos[1]].swiKey, res.detail.value); // 将开关值写入存储的swiKey变量中
};

/**
 * 组件函数
 *
 * @param res 组件参数
 * @param ctx 页面指针
 * @param callback 回调函数
 */
const componentAction = (res: MiniprogramEvent, ctx: any, callback?: (type?: string) => void) => {
  switch (res.currentTarget.dataset.action) { // 判断action类型并调用各组件函数
    case 'img':
      image(res, ctx);
      break;
    case 'navigate':
      ctx.$route(res.currentTarget.dataset.url);
      break;
    case 'back':
      ctx.$back();
      break;
    case 'picker':
      picker(res, ctx, callback);
      break;
    case 'switch':
      Switch(res, ctx, callback);
      break;
    case 'slider':
      slider(res, ctx, callback);
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
 * @param option 组件参数
 * @param ctx 页面指针
 */
const changeNav = (option: Page.IPageScrollOption, ctx: any) => {
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

export default {
  nav: changeNav,
  trigger: componentAction
};
