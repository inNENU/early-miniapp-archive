/*global Component*/
Component({

  properties: {
    res: { type: Object, value: { title: "加载中", leftText: "返回" } },
    theme: { type: String, value: 'iOS' }
  },
  lifetimes: {
    ready() {
      console.log(this.data);
      this._observer = this.createIntersectionObserver({ thresholds: [0.8,1], initialRatio: 0 })
      this._observer.relativeTo(".iOS-navigationBar").observe(".iOS-head", (res) => {
        console.log(res);
      });
    },
    // moved() { },
    // detached() {
    // if (this._observer) this._observer.disconnect();
    // },
  },
  methods: {
    _titleChange() {

    }
  }

})