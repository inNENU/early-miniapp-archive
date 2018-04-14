var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [{name:'head',title:'东师排名'},
      { name: 'h3', text: ' 东师排名' },
      { name: 'p', text: '2017年7月东北师范大学国内排名48，国际排名950，前1%学科数4科,在师范类高校中国内排行第三,较之前5月相比，国内排名下降了一名，国际排名下降了10名'},
      { name:'h3', text: 'ESI是世界普遍采用的科研表现评价工具'},
      { name: 'p', text: '基本科学指标数据库（Essential Science Indicators，简称ESI）是衡量科学研究绩效、跟踪科学发展趋势的基本分析评价工具，它是基于科睿唯安公司（Clarivate Analytics，原汤森路透知识产权与科技事业部）Web ofScience（SCIE/SSCI）所收录的全球12000多种学术期刊的1000多万条文献记录而建立的计量分析数据库。目前，ESI已成为当今世界范围内普遍用以评价高校、学术机构、国家/地区国际学术水平及影响力的重要评价指标工具之一，其数据库以学科分门别类(共分22个学科)，采集面覆盖全球几万乃至十几万家不同研究单位的学科。'},
      { name: 'h3', text: '百强高校稳步前进'},
      {
        name: 'p', text: '本期青塔统计了科睿唯安公布的2017年7月ESI中国内地高校TOP100的情况，并与2017年5月进行了对比。从统计结果上来看，本次大部分百强高校有一定程度的进步。北京大学位居国内高校首位，国际排名112位，入选学科数也达到21个。中国科学院大学国际排名117位，位居国内高校第二。浙江大学国际排名131位，入选ESI前1%学科总数18个。清华大学国际排名134位，入选ESI前1%学科总数16个。北京大学、中国科学院大学、浙江大学、清华大学、上海交通大学和复旦大学六所高校进入国际排名前200位。此外，中国科学技术大学、南京大学、中山大学和山东大学ESI综合排名也进入国内高校前十位。相比2017年5月份，大多数高校国际排名都有一定程度的进步。其中进步增幅最大的是深圳大学，相比5月大幅进步了34位。此外，进步较大的高校还有南方医科大学、重庆医科大学、华北电力大学等。'},
      { name: 'h3', text: '11所高校新增学科进入ESI前1%'},
      {
        name: 'p', text: '相比2017年5月份，本次百强高校中共有11所高校新增学科进入ESI前1%。西安交通大学新增2个学科进入ESI前1%，入选ESI前1%学科数达到14个。中国科学院大学、哈尔滨工业大学、华南理工大学、厦门大学、北京师范大学、首都医科大学、重庆大学、重庆医科大学、上海师范大学、杭州师范大学等10所高校新增1个学科进入ESI前1%。此外， 还有1所高校ESI前1%学科数减少一个。下面来看看各校综合排名情况（按照各高校论文总引用次数进行排名；中国地质大学、中国石油大学和中国矿业大学三所高校并没有区分两地办学的情况）：'},

      { name: 'img', src:'http://mmbiz.qpic.cn/mmbiz_png/HFhbcJtfjIJ0Fl9ajUK0vmwjQiao2h51TGn3OzZmEG5Z2TSZNNlDzbLgPUQnnCdWrAQ7fpw1Q3RBwNPYTgAwVow/640?tp=webp&wxfrom=5&wx_lazy=1'},
      { name: 'img', src:'http://mmbiz.qpic.cn/mmbiz_jpg/s67UCDghNJn1OzriaAvpYh0CwE0osH1YAvkQiaox7ntgXYS6NkTKuDAm4CLlXuh2eErzboKRhuy5YXic89lXRb4kA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1'}

  
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})