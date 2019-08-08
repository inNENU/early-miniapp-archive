/*
 * @Author: Mr.Hope
 * @Date: 2019-04-15 08:18:06
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-08 13:56:38
 * @Description: 主页
 */
import $register from 'wxpage';
import $component from '../utils/component';
import $wx from '../utils/wx';
import $page from '../utils/page';
import $tab from '../utils/tab';
import { Keywords } from './search';
const { globalData: a } = getApp();

$register('main', {
  data: {
    T: a.T,
    nm: a.nm,
    words: [],
    head: { title: '首页', action: true, statusBarHeight: a.info.statusBarHeight },
    page: [
      {
        tag: 'head', title: '首页', aim: 'main',
        action: true, aimStep: 1, aimDepth: 1, grey: true, hidden: true
      },
      {
        tag: 'grid',
        head: '新生你好',
        content: [
          { text: '新生报到', color: 'orange', name: 'Check', icon: '/icon/tabPage/check.svg', aim: 'check0' },
          { text: '报到流程', color: 'blue', name: 'Step', icon: 'https://mp.nenuyouth.com/icon/module/list.svg', aim: 'check9' },
          { text: '需带物品', color: 'red', name: 'Necessities', icon: 'https://mp.nenuyouth.com/icon/module/good.svg', aim: 'check7' },
          { text: '缴费相关', color: 'purple', name: 'Payment', icon: 'https://mp.nenuyouth.com/icon/module/pay.svg', aim: 'check10' }
        ]
      },
      {
        tag: 'list',
        head: false,
        content: [
          {
            text: '查看更多',
            icon: '/icon/tabPage/check.svg',
            aim: 'check0'
          }
        ],
        foot: ' '
      },
      {
        tag: 'list',
        head: '新生群一览',
        content: [
          {
            text: '官方迎新QQ群',
            icon: 'https://mp.nenuyouth.com/icon/module/QQ.svg',
            aim: 'check23'
          },
          {
            text: '老乡QQ群',
            icon: 'https://mp.nenuyouth.com/icon/module/QQ.svg',
            aim: 'check25'
          }
        ]
      },
      {
        tag: 'list',
        head: '找到组织',
        content: [
          {
            text: '各专业所属学院',
            icon: '/icon/tabPage/course.svg',
            aim: 'check6'
          }
        ]
      },
      {
        tag: 'list',
        head: '专业调整',
        content: [
          {
            text: '双学位与辅修',
            icon: '/icon/tabPage/course.svg',
            aim: 'course13'
          },
          {
            text: '转专业',
            icon: '/icon/tabPage/course.svg',
            aim: 'course12'
          }
        ]
      },
      {
        tag: 'p',
        head: ' ',
        style: 'font-size:14px;color:#888;',
        text: '   如果各位新生同学们还有什么疑问，但是小程序中没有提及的，欢迎联系QQ1178522294咨询。\n   目前QQ小程序无法正常对指南页面进行分享，待2.0.4版本审核通过以后即可正常使用。由于QQ小程序审核周期太长，推荐大家微信搜索小程序“myNenu”使用。(微信小程序版本现为V2.0.5)'
      }
    ]
  },
  onPageLaunch() {
    console.log('主页面启动：', new Date().getTime() - a.date, 'ms');
    const page = wx.getStorageSync('main');
    const color = a.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];

    $page.resolve({ query: { aim: 'main' } }, page ? page : this.data.page);
    wx.setTabBarStyle({
      color: '#8a8a8a',
      selectedColor: '#3cc51f',
      backgroundColor: color[0],
      borderStyle: color[1]
    });
  },
  onLoad() {
    $page.Set({ option: { aim: 'main' }, ctx: this });
    $tab.refresh('main', this, a);
    $page.Notice('main');
  },
  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = $page.color(this.data.page[0].grey);
    const color = this.data.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
    wx.setTabBarStyle({
      color: '#8a8a8a',
      selectedColor: '#3cc51f',
      backgroundColor: color[0],
      borderStyle: color[1]
    });
  },
  onReady() {
    // 注册事件监听器
    this.$on('theme', (T: string) => {
      this.setData({ T });
    });
    this.$on('nightmode', (nm: boolean) => {
      this.setData({ nm });
    });

    // 执行tab页预加载
    ['guide', 'function'].forEach(x => {
      $wx.request(`config/${a.version}/${x}`, (data: object) => {
        this.$put(x, data);
        this.$preload(`${x}?aim=${x}`);
        wx.setStorageSync(x, data);
      });
    });
    this.$preload('me?aim=me');
  },
  onPullDownRefresh() {
    $tab.refresh('main', this, a);
    wx.stopPullDownRefresh();
  },
  onPageScroll(e) {
    $component.nav(e, this, 'head');
  },
  cA(e) {
    $component.trigger(e, this);
  },
  searching(event: WXEvent.Input) {
    const keywords = getApp()
      .keywords() as Keywords;
    const searchWord = event.detail.value;
    const words: string[] = [];

    if (searchWord) {
      Object.keys(keywords)
        .forEach(jsonName => {
          // 判断每个关键词是否包含了searchWord，如果包含则推送
          if (keywords[jsonName].keywords)
            keywords[jsonName].keywords.forEach(keyword => {
              if (keyword.indexOf(searchWord) !== -1 && words.indexOf(keyword) === -1) words.push(keyword);
            });
        });

      console.log(words);

      this.setData({ words });
    }
  },
  search(event: WXEvent.Input) {
    this.$route(`search?words=${event.detail.value}`);
  },
  onShareAppMessage: () => ({ title: 'myNENU', path: '/page/main' })
});
