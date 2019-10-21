/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:52:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-21 22:45:47
 * @Description: 小程序资源说明
 */
import { changeNav, popNotice, setColor } from '../utils/page';
import $register from 'wxpage';
import { modal } from '../utils/wx';
const { globalData: a } = getApp() as WechatMiniprogram.App.MPInstance<{}>;

/** 列表动作 */
type ListAction = 'resource' | 'public' | 'physics';

$register('resource', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '资源说明', shareable: true, leftText: '返回' },
      { tag: 'title', text: '小程序页面资源' },
      {
        tag: 'p',
        text:
          '   小程序资源项目库在Github上开源。如果您愿意对小程序提供帮助，可以帮助扩充或编辑小程序的页面文字、图片以及相关文件。您可以点击下方的复制链接按钮复制链接，并使用浏览器访问对应网站。'
      },
      {
        tag: 'List',
        content: [{ text: '资源地址', button: 'resource' }]
      },
      { tag: 'title', text: '学习资源' },
      {
        tag: 'p',
        text:
          '   目前，Mr.Hope正在发起学习资源共享。你可以提供你所在专业的学习资料来帮助Mr.Hope扩充资料库。您可以点击下方的复制链接按钮复制链接，并使用浏览器访问对应网站。'
      },
      {
        tag: 'List',
        content: [
          { text: '公共课程', button: 'public' },
          { text: '物理学', button: 'physics' }
        ]
      },
      { tag: 'foot', author: '' }
    ]
  },

  onLoad() {
    this.setData({ 'page[0].statusBarHeight': a.info.statusBarHeight });
    popNotice('resource');
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor();

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onPageScroll(event) {
    changeNav(event, this);
  },

  /** 列表动作 */
  list({ detail }: any) {
    if (detail.event) this[detail.event as ListAction]();
  },

  /** 复制资源地址到剪切板 */
  resource() {
    this.copy('https://github.com/GodofHope/inNENUWebsite');
  },

  /** 复制公共课程地址到剪切板 */
  public() {
    this.copy('https://github.com/GodofHope/publicCourse');
  },

  /** 复制物理学课程地址到剪切板 */
  physics() {
    this.copy('https://github.com/GodofHope/physics');
  },

  /** 复制内容到剪切板 */
  copy(url: string) {
    wx.setClipboardData({
      data: url,
      success: () => {
        modal('复制成功', '链接地址已经成功复制至剪切板，请打开浏览器粘贴跳转');
      }
    });
  }
});
