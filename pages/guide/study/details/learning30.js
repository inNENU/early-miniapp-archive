var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '计算机二级' },
      { name: 'p', text: ' 报考条件：基本无条件限制。考试内容：无纸化考试。二级C，二级VB，二级VFP，二级JAVA，二级ACCESS，二级C++，二级OFFICE。\n操作技能：计算机二级考试包含语言程序设计，包括C、C++、Java、Visual Basic、WEB程序设计；数据库程序设计（包括VisualFoxPro、Access、MySql）；MS office高级应用包括Word、EXCEL、PPT办公软件高级应用。\n考试时间:从2014年开始，全国计算机等级考试二级每年考三次。第一次在每年3月21日至3月24日；第二次在每年9月19日至23日；第三次在每年12月13日至16日；其中，12月那次为首次试点考试，只开考一二级，各考点根据实际报名人数决定是否开考。二级考试时间为120分钟。系统环境Windows 7、Visual C++6.0、Visual Basic 6.0、Visual FoxPro6.0、Access2010、NetBeans、My SQL（Community 5.5.16）；Visual Studio 2010（C#）、MS Office2010。\n推荐理由:对国企、公务员和部分私企有用，在工作中计算机技术的基本运用是十分必要的，建议报考。' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})