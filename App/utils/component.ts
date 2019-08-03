/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 13:49:06
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-04 03:48:03
 * @Description: 组件函数库
 */

const logger = wx.getLogManager({ level: 1 });

/**
 * 组件函数
 *
 * @param res 组件参数
 * @param ctx 页面指针
 * @param callback 回调函数
 */
const componentAction = (res: MiniprogramEvent, ctx: any) => {
  switch (res.currentTarget.dataset.action) { // 判断action类型并调用各组件函数
    case 'navigate':
      ctx.$route(res.currentTarget.dataset.url);
      break;
    case 'back':
      ctx.$back();
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
