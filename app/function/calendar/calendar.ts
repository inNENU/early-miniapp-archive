import $register = require('wxpage');
import { changeNav, popNotice, setColor } from '../../utils/page';
import { getJSON, readJSON, writeJSON } from '../../utils/file';
import { AppOption } from '../../app';
import { TimeLineItem } from '../../components/timeline/timeline';
import { requestJSON } from '../../utils/wx';
const { globalData } = getApp<AppOption>();

const path = 'function/calendar/all';

$register('calendar', {
  data: {
    theme: globalData.theme,
    /** 头部配置 */
    head: {
      title: '东师校历',
      statusBarHeight: globalData.info.statusBarHeight,
      leftText: '功能大厅'
    },
    calendar: [] as TimeLineItem[]
  },

  onNavigate() {
    getJSON(path);
  },

  onLoad() {
    const calendar = readJSON(path);

    if (calendar)
      this.setData({
        theme: globalData.theme,
        calendar
      });
    else
      requestJSON(path, (data) => {
        this.setData({
          theme: globalData.theme,
          calendar: data as any
        });

        // 写入JSON文件
        writeJSON('function/calendar', 'all', data);
      });

    popNotice('calendar');
  },

  onShow() {
    // 设置胶囊和背景颜色
    const { nc, bc } = setColor(false);

    wx.setNavigationBarColor(nc);
    wx.setBackgroundColor(bc);
  },

  onPageScroll(event) {
    changeNav(event, this, 'head');
  },

  /** 显示校历详情 */
  display(event: WXEvent.Touch) {
    const path = `function/calendar/${event.detail.aim}`;
    const content = readJSON(path);

    if (content)
      this.setData({
        calendarDetail: content[1],
        name: content[0],
        display: true
      });
    else
      requestJSON(path, (data) => {
        this.setData({ calendarDetail: data[1], name: data[0], display: true });

        // 写入JSON文件
        writeJSON('function/calendar', 'all', data);
      });
  },

  /** 关闭校历详情 */
  close() {
    this.setData({ display: false });
  },

  onShareAppMessage: () => ({ title: '东师校历', path: '/function/calendar' })
});
