var c = getApp().commmon,
	a = getApp().globalData;
Page({
  onLoad(e) {
    var page = [{
        "tag": "head",
        "title": "报道"
      },
      {
        "tag": "h2",
        "text": "到校路线"
      },
      {
        "tag": "list",
        "content": [{
            "text": "认准校区和校门",
            "aim": "check1"
          },
          {
            "text": "坐火车到校（长春站）",
            "aim": "check2"
          },
          {
            "text": "坐火车到校（长春西站）",
            "aim": "check3"
          },
          {
            "text": "坐飞机到校",
            "aim": "check4"
          },
          {
            "text": "温馨提示（关于打车）",
            "aim": "check5"
          },
          {
            "text": "关于接站",
            "aim": "check6"
          }
        ]
      },
      {
        "tag": "h2",
        "text": "需带物品"
      },
      {
        "tag": "list",
        "content": [{
            "text": "需带物品",
            "aim": "check7"
          },
          {
            "text": "校内外超市",
            "aim": "check8"
          }
        ]
      },
      {
        "tag": "h2",
        "text": "报到流程"
      },
      {
        "tag": "list",
        "content": [{
            "text": "报到流程",
            "aim": "check9"
          },
          {
            "text": "缴费相关",
            "aim": "check10"
          },
          {
            "text": "绿色通道",
            "aim": "check11"
          },
          {
            "text": "使用校园卡",
            "aim": "check12"
          },
          {
            "text": "体检、户口迁移、其他",
            "aim": "check13"
          },
          {
            "text": "防盗防骗攻略",
            "aim": "check14"
          }
        ]
      }
    ];
    console.log(page);
    c.setPage(page, this, a, e);
  },
	onPageScroll(e) {
		c.nav(e, this)
	},
	cA(e) {
		c.componentAction(e, this)
	}
})