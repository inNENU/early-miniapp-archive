/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 20:52:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-20 18:19:36
 * @Description: 小程序资源说明
 */
import $register from 'wxpage';
import $page from '../utils/page';
import $wx from '../utils/wx';
const { globalData: a } = getApp();

type ListAction = 'github' | 'gitee';

$register('resource', {
  data: {
    T: a.T,
    nm: a.nm,
    page: [
      { tag: 'head', title: '资源说明', shareable: true, leftText: '返回' },
      { tag: 'title', text: '小程序页面资源' },
      {
        tag: 'p',
        text: '   小程序资源存储在代码托管网站Github、与国内Gitee(码云)上。如果您愿意对小程序提供帮助，可以帮助扩充或编辑小程序的页面文字、图片以及相关文件。您可以点击下方的复制链接按钮复制链接，并使用浏览器访问对应网站。'
      },
      {
        tag: 'List',
        content: [{ text: 'Github地址', button: 'github' }, { text: '码云地址', button: 'gitee' }]
      },
      { tag: 'title', text: '学习资源' },
      {
        tag: 'p',
        text: '   目前，Mr.Hope正在发起学习资源共享。你可以提供你所在专业的学习资料来帮助Mr.Hope扩充资料库。'
      },
      {
        tag: 'List',
        content: [{ text: '公共课程', button: 'public' }, { text: '物理学', button: 'physics' }]
      },
      { tag: 'foot', author: '' }
    ]
  },
  onLoad() {
    this.setData({ 'page[0].statusBarHeight': a.info.statusBarHeight });
    $page.Notice('resource');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color();

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },
  list({ detail }: any) {
    if (detail.event) this[detail.event as ListAction]();
  },
  github() {
    this.copy('https://github.com/GodofHope/miniprogramWebsite');
  },
  gitee() {
    this.copy('https://gitee.com/Mr-Hope/miniprogramWebsite');
  },
  public() {
    this.copy('https://github.com/GodofHope/publicCourse');
  },
  physics() {
    this.copy('https://github.com/GodofHope/physics');
  },
  copy(url: string) {
    wx.setClipboardData({
      data: url,
      success: () => {
        $wx.modal('复制成功', '链接地址已经成功复制至剪切板，请打开浏览器粘贴跳转');
      }
    });
  },
  onPageScroll(event) {
    $page.nav(event, this);
  }
});
