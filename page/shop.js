/* global getApp*/
let a = getApp().globalData, { $page, $set } = getApp().lib;

$page("shop", {
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
        "http://nenuyouth.com/mp/wenchuang/wenchuang1.jpg",
        "http://nenuyouth.com/mp/wenchuang/wenchuang8.jpg",
        "http://nenuyouth.com/mp/wenchuang/wenchuang10.jpg",
        "http://nenuyouth.com/mp/wenchuang/wenchuang11.jpg"
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
    }]
  },
  onPreload(res) {
    if (!$set.preSet(this.$take(res.query.name), a, null, this, false)) this.set = true;
    console.log("Shop preload finished time:", new Date() - a.d, "ms");
  },
  onLoad() {
    this.setData({ T: a.T, nm: a.nm });
    if (!this.set) $set.Set(this.data.page, a, null, this, false);
    $set.Notice("shop");
    this.$on("theme", data => {
      this.setData({ T: data });
    });
    this.$on("nightmode", data => {
      this.setData({ nm: data });
    });
  },
  onReady() {
    if (!this.set) $set.request("main/shop", data => {
      $set.Set(data, a, null, this);
    });
    $set.request("main/goods", data => {
      this.setData({ goods: data });
    });
  },
  onPageScroll(e) {
    $set.nav(e, this);
  },
  cA(e) {
    $set.component(e, this);
  },
  showInput() {
    this.setData({ inputShowed: true });
  },
  hideInput() {
    this.setData({ inputVal: "", inputShowed: false });
  },
  clearInput() {
    this.setData({ inputVal: "" });
  },
  inputTyping(e) {
    this.setData({ inputVal: e.detail.value });
  }
});