var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [{ name: 'head', title: '选课系统操作' },
    { name: 'h3', text: ' 选课系统登录方式' },
    { name: 'p', text: '1.三种方式（建议使用IE浏览器）（1）打开浏览器输入http://xk.nenu.edu.cn/直接进入选课页面。（2）登录东北师范大学主页，点击内网入口“学生服务”区域中的“本科选课”，进入选课页面。（3）登录东北师范大学主页，进入教务处主页点击“学生选课快速入口”进入选课页面。' },
    { name: 'img', src: "https://pic.kuaizhan.com/g1/M01/6E/29/CgpQU1l9iaOAMmMVAAgUP4l5IuM0604612/imageView/v1/thumbnail/640x0" },
    { name: 'p', text: '2.选课系统用户名、密码均为学校统一认证的邮箱用户名和密码。(注：就是上网账号和密码，账号不加“@nenu.edu.cn”)如果忘记用户名或密码，请与学校信息化管理与规划办公室联系，以免耽误选课。信息化管理与规划办公室服务热线：85099005；服务QQ：1309969928；办公地点：田家炳楼213（本部校区），冬华公寓（净月校区）。' },
    { name: 'h3', text: ' 其他操作注意事项' },
    { name: 'p', text: '\n1.没有评教的同学一定要先评教，否则无法选课。\n2.选课期间每天早8：00—9：00进行选课数据整理，选课服务停止，学生不能选课，学院（部）涉及数据调整审批等事宜在该时间段完成。3.选课期间如遇到问题可以通过以下几种方式解决：（1）选课期间每天9：00至19：00教务助理中心工作人员在本部图书馆电子阅览室、净月图书馆电子阅览室设立选课咨询指导处，进行选课指导和收集同学们的意见及建议。（2）与所在学院教务秘书联系解决。（3）与教务处工作人员联系解决。4.预选课阶段，课程总学分可以超过每学期学分限制，但在正选阶段与退补选阶段，课程总学分必须在每学期学分限制内。' }
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) }, back() { u.back() },
})