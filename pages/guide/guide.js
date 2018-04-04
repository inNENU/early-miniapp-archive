var u = require('../../utils/util.js');
const a = getApp().globalData;
Page({
  data: {
    page: [
      { name: 'head', title: '东师指南', top: true },
      { name: 'h2', text: '' },
      { name: 'list', content: [{ text: '寝室', url: 'dorm/dorm' },{ text: '校园卡', url: 'card/card' }] },
    ],
  },
  onShow() { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
})
  // < button bindtap= 'goOther' > 新生报到 < /button>
  //   < button bindtap= 'goDorm' > 寝室 < /button>
  //     < button bindtap= 'goLife' > 生活 < /button>
  //       < button bindtap= 'goOther' > 食堂 < /button>
  //         < button bindtap= 'goOther' > 学习 < /button>
  //           < button bindtap= 'goOther' > 校园网 < /button>
  //             < button bindtap= 'goCard' > 校园卡 < /button>
  //               < button bindtap= 'goOther' > 学生组织 < /button>
  //                 < button bindtap= 'goOther' > 校区位置 < /button>
  //                   < button bindtap= 'goOther' > 资助 < /button>
  //                     < button bindtap= 'goOther' > 吃喝玩乐 < /button>
  //                       < button bindtap= 'goOther' > 长春气候 < /button>