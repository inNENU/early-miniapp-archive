var P = require("../utils/wxpage"),
  S = require("../utils/setPage"),
  a = getApp().globalData;

P("shop", {
  data: {
    T: a.T,
    nm: a.nm,
    page: [{
      tag: "head",
      title: "东青文创",
      action: true
    }, {
      tag: "swiper",
      Class: "shopSwiper",
      url: [
        "http://mrhope.top/mp/wenchuang/wenchuang1.jpg",
        "http://mrhope.top/mp/wenchuang/wenchuang8.jpg",
        "http://mrhope.top/mp/wenchuang/wenchuang10.jpg",
        "http://mrhope.top/mp/wenchuang/wenchuang11.jpg"
      ]
    }],
    goods: [{
      id: 1,
      src: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
      name: "搪瓷杯",
      desc: "浓郁老干部气息，泡茶必备",
      price: 100,
      url: "/shop/good?from=东青文创",
      tag: ["儒雅", "高逼格", "古朴", "怀旧", "质感"]
    }, {
      id: 2,
      src: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
      name: "明信片",
      desc: "一整套明信片+叶脉书签+定制钥匙扣+礼品袋",
      url: "/shop/good?from=东青文创",
      tag: ["2.5次元", "优美如画", "真实叶脉书签"]
    }, {
      id: 3,
      src: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
      name: "懂事青年T恤",
      desc: "青春活力范，各种尺码均有",
      url: "/shop/good?from=东青文创",
      tag: ["青春", "前卫"]
    }],
  },
  onPreload(res) {
    if (!S.preSet(this.$take(res.query.name), a, null, this, false)) {
      this.set = true;
    }
    console.log("Shop preload finished time:", new Date() - a.d, "ms");
  },
  onLoad() {
    this.setData({
      T: a.T,
      nm: a.nm
    });
    if (!this.set) {
      S.Set(this.data.page, a, null, this, false);
    }
    S.Notice("shop");
    let that = this;
    this.$on("theme", data => {
      that.setData({
        T: data
      });
    });
    this.$on("nightmode", data => {
      that.setData({
        nm: data
      });
    });
  },
  onReady() {
    if (!this.set) {
      S.request("main/shop", (data, indicator) => {
        S.Set(data, a, null, indicator);
      }, this);
    }
    S.request("main/goods", (data, indicator) => {
      indicator.setData({
        goods: data
      });
    }, this);
  },
  onPageScroll(e) {
    S.nav(e, this);
  },
  cA(e) {
    S.component(e, this);
  },
  showInput() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping(e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
});