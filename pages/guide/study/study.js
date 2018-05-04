var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '学习' },
      { name: 'h2', text: '奖学金' },
      { name: 'list', content: [{ text: '类型及评定时间', url: 'details/learning1' },  { text: '特别说明', url: 'details/learning3' }] },
      { name: 'h2', text: '东师及专业排名' },
      { name: 'list', content: [{ text: '东师排名', url: 'details/learning4' }, { text: '专业排名', url: 'details/learning5' }] },
      { name: 'h2', text: '本科课程设置' },
      { name: 'list', content: [{ text: '通识教育课程', url: 'details/learning6' }, { text: '专业教育课程', url: 'details/learning7' }, { text: '发展课程课程', url: 'details/learning8' }, { text: '绩点计算方法', url: 'details/learning9' }] },
      { name: 'h2', text: '选课' },
      { name: 'list', content: [{ text: '选课内容', url: 'details/learning10' }, { text: '选课流程', url: 'details/learning11' }, { text: '选课操作系统', url: 'details/learning12' }, { text: '选课技巧', url: 'details/learning13' }] },
      { name: 'h2', text: '体测' },
      { name: 'list', content: [{ text: '体测时间', url:'details/learning14' }, { text: '测试项目及权重', url:'details/learning15' }, { text: '测试成绩说明', url:'details/learning16' }, { text: '测试项目评分表', url:'details/learning17' }, { text: '申请免测/缓测的条件及程序', url:'details/learning18' }] }, { name: 'h2', text: '转专业' }, { name: 'list', content: [{ text: '转专业实施办法及注意事项', url: 'details/learning19' }, { text: '各专业准入细则汇编', url: 'details/learning20' }] },
      { name: 'h2', text: '英语' },
      { name: 'list', content: [{ text: '分级考试', url: 'details/learning21' }, { text: '英语课', url: 'details/learning22' }, { text: '四六级报考', url: 'details/learning23' }] },
      { name: 'h2', text: '图书馆' }, 
      { name: 'list', content: [{ text: '图书馆风貌', url: 'details/learning24' }, { text: '馆藏分布', url: 'details/learning25' }, { text: '图书馆开门时间', url: 'details/learning26' }, { text: '借书权限', url: 'details/learning27' }, { text: '其他服务', url: 'details/ learning28' }, { text: '注意事项', url: 'details/ learning29' }] },
      { name: 'h2', text: '' },
      { name: 'list', content: [{ text: '计算机二级', url: 'details/learning30' }] },
      { name: 'h2', text: '' },
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})