/*
 * @Author: Mr.Hope
 * @Date: 2019-07-01 17:15:44
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-16 12:41:17
 * @Description: Page函数库
 */


// 引入文件管理
import $file from './file';
import $wx from './wx';
import { WXPage } from 'wxpage';

// 声明日志管理器
const logger = wx.getLogManager({ level: 1 });

// 声明全局数据
let globalData: GlobalData;

/**
 * 在脚本内初始化全局数据
 *
 * @param data 全局数据
 */
const init = (data: GlobalData) => {
  globalData = data;
};

/**
 * 获得界面数据，生成正确的界面数据
 *
 * @param page 页面数据
 * @param option 页面传参
 * @returns 处理之后的page
 */
const disposePage = (page: PageData, option: PageArg) => {
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

        // 添加运行环境
        page[0].env = globalData.env;
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
        if ('content' in element) element.content.forEach((listElement: any, listIndex: number) => {
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
              const pickerValue: string | number = wx.getStorageSync(listElement.key);

              listElement.value = listElement.pickerValue[pickerValue];
              listElement.currentValue = [pickerValue];
            } else { // 多列选择器
              const pickerValues: string[] = wx.getStorageSync(listElement.key).split('-');

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
};

/**
 * 获取文件夹与路径名称
 *
 * @param aim 页面名称
 */
const resolveAim = (aim: string) => {
  let { length } = aim;

  while (!isNaN(Number(aim.charAt(length)))) length--;
  const folder = aim.substring(0, length + 1);

  return { folder, path: `${folder}/${aim}` };
};

/**
 * 提前获得子界面。在界面加载完毕时，检查界面包含的所有链接是否已存在本地json，如果没有立即获取并处理后写入存储
 *
 * @param page 页面数据
 */
const preGetPage = (page: PageData) => {
  if (page) page.forEach(component => {
    if ('content' in component) // 该组件是列表，需要预加载界面，提前获取界面到存储
      component.content.forEach((element: any) => {
        if ('aim' in element) {
          const { path } = resolveAim(element.aim);

          $file.getJson(`page/${path}`, () => null);
        }
      });
  });
  wx.reportMonitor('1', 1); // 统计报告
};

/**
 * **简介:**
 * 
 * - 描述：预处理页面数据写入全局数据
 * 
 * - 用法：在页面onNavigate时调用，
 * 
 * - 性质：同步函数
 * 
 * @param option 页面跳转参数
 * @param page page数组
 */
const resolvePage = (option: WXPage.PageArg, page?: PageData) => {
  console.info('将要跳转：', option); // 控制台输出参数
  const { aim } = option.query;

  if (page) globalData.page.data = disposePage(page, option.query);
  else {
    const { path } = resolveAim(aim);

    $file.getJson(`page/${path}`, pageData => {
      if (pageData) globalData.page.data = disposePage(pageData as PageData, option.query);
      else {
        globalData.page.data = disposePage(
          [{ tag: 'error', statusBarHeight: globalData.info.statusBarHeight }],
          option.query
        );
        console.warn(`${aim}载入失败`);
      }
    });
  }
  // 设置aim值
  globalData.page.aim = aim;

  return globalData.page.data;
};

interface SetPageOption {
  option: PageArg;
  ctx: any;
  handle?: boolean;
}

/**
 *  **简介:**
 *
 * - 描述：设置本地界面数据，如果传入`page`参数，则根据`handle`的值决定是否在`setData`前处理`page`。
 * 如果没有传入`page`，则使用`PageOption.data.page`。之后根据`preload`的值决定是否对页面链接进行预加载。
 *
 * - 用法：在页面onLoad时调用，
 *
 * - 性质：同步函数
 * 
 * @param option 页面传参
 * @param ctx 页面指针
 * @param [handle=false] 页面是否已经被处理
 * @param [page] 页面数据
 * @param [preload=true] 是否预加载子页面
 */
const setPage = ({ option, ctx, handle = false }: SetPageOption, page?: PageData, preload = true) => {
  // 设置页面数据
  if (page)
    ctx.setData({
      T: globalData.T,
      nm: globalData.nm,
      page: handle ? page : disposePage(page, option)
    });
  // 页面已经预处理完毕，立即写入page书记并执行本界面的预加载
  else if (globalData.page.aim === option.aim) {
    console.log(`${option.aim}已处理`);
    ctx.setData({ T: globalData.T, nm: globalData.nm, page: globalData.page.data }, () => {
      console.log(`${option.aim}已写入`);
      if (preload) {
        preGetPage(ctx.data.page);
        console.log(`${option.aim}预加载子页面完成`);
      }
    });
  } else {
    console.log(`${option.aim}未处理`);
    // 设置页面数据
    ctx.setData({
      T: globalData.T,
      nm: globalData.nm,
      page: handle ? ctx.data.page : disposePage(ctx.data.page, option)
    });
  }
};

/**
 * **简介:**
 * 
 * - 描述：弹出通知
 * 
 * - 用法：在页面onLoad时调用，
 * 
 * - 性质：同步函数
 *
 * @param aim 当前界面的aim值
 */
const popNotice = (aim: string) => {
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
};

/**
 * **简介:**
 * 
 * - 描述：设置在线界面数据
 * 
 * - 用法：在页面onLoad时调用，
 * 
 * - 性质：同步函数
 *
 * @param option 页面传参
 * @param ctx 页面指针
 * @param preload 是否需要预加载(默认需要)
 */
const setOnlinePage = (option: PageArg, ctx: any, preload = true) => {

  // 页面已经预处理完毕，立即写入page书记并执行本界面的预加载
  if (globalData.page.aim === option.aim) {
    console.log(`${option.aim}已处理`);
    ctx.setData({ T: globalData.T, nm: globalData.nm, page: globalData.page.data }, () => {
      console.log(`${option.aim}已写入`);
      if (preload) {
        preGetPage(ctx.data.page);
        console.log(`${option.aim}预加载子页面完成`);
      }
    });

    // 需要重新载入界面
  } else {
    console.info(`${option.aim}onLoad开始，参数为：`, option);
    const { folder, path } = resolveAim(option.aim);

    ctx.aim = option.aim;

    const page = $file.readJson(`page/${path}`);

    // 如果本地存储中含有page直接处理
    if (page) {
      setPage({ option, ctx }, page);
      popNotice(option.aim);
      console.info(`${option.aim}onLoad成功：`, ctx.data);
      wx.reportMonitor('0', 1);

      // 如果需要执行预加载，则执行
      if (preload) {
        preGetPage(ctx.data.page);
        console.log(`${option.aim}界面预加载完成`);
      }
    } else
      // 请求页面Json
      $wx.request(`page/${path}`, data => {
        // 设置界面
        setPage({ option, ctx }, data as PageData);

        // 非分享界面下将页面数据写入存储
        if (!option.share) $file.writeJson(`page/${folder}`, `${option.aim}`, data);

        // 如果需要执行预加载，则执行
        if (preload) {
          preGetPage(ctx.data.page);
          console.log(`${option.aim}界面预加载完成`);
        }

        // 弹出通知
        popNotice(option.aim);

        // 调试
        console.info(`${option.aim}onLoad成功`);
        wx.reportMonitor('0', 1);
      }, res => {
        // 设置error页面并弹出通知
        setPage({ option, ctx }, [{ tag: 'error', statusBarHeight: globalData.info.statusBarHeight }]);
        popNotice(option.aim);

        // 调试
        console.warn(`${option.aim}onLoad失败，错误为`, res);
        logger.warn(`${option.aim}onLoad失败，错误为`, res);
        wx.reportMonitor('13', 1);
      }, () => {
        // 设置error界面
        setPage({ option, ctx }, [{ tag: 'error', statusBarHeight: globalData.info.statusBarHeight }]);

        // 调试
        console.warn(`${option.aim}资源错误`);
        wx.reportMonitor('12', 1);
        console.info(`${option.aim}onLoad成功`);
        wx.reportMonitor('0', 1);
      });
  }
};

/**
 * **简介:**
 *
 * - 描述：设置胶囊与背景颜色
 *
 * - 用法：在页面onShow时调用，
 *
 * - 性质：同步函数
 *
 * @param grey 页面是否为灰色背景
 */
const color = (grey: boolean) => {
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

  return {
    nc: { frontColor, backgroundColor },
    bc: { backgroundColorTop: temp[0], backgroundColor: temp[1], backgroundColorBottom: temp[2] }
  };
};

/**
 * 加载字体
 *
 * @param theme 主题
 */
const loadFont = (theme: string) => {
  try {
    if (theme === 'Android')
      wx.loadFontFace({
        family: 'FZKTJW', source: 'url("https://mp.nenuyouth.com/fonts/FZKTJW.ttf")',
        complete: res => {
          console.info('楷体字体', res);// 调试
        }
      });
    else if (theme === 'NENU')
      wx.loadFontFace({
        family: 'FZSSJW', source: 'url("https://mp.nenuyouth.com/fonts/FZSSJW.ttf")',
        complete: res => {
          console.info('宋体字体', res);// 调试
        }
      });
    else throw theme;
  } catch (e) {
    console.warn(`Theme ${e} cannot be handled.`);
  }
};

export default {
  init,
  resolve: resolvePage,
  Set: setPage,
  Online: setOnlinePage,
  Notice: popNotice,
  color,
  loadFont
};
