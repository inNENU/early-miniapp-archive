/* global Component*/
Component({

  properties: {
    res: { type: Object, value: { title: '加载中', leftText: '返回' } },
    theme: { type: String, value: 'iOS' }
  }
  /*
   * Lifetimes: {
   * Ready() {
   *   console.log(this.data);
   *   this._observer = this.createIntersectionObserver({ thresholds: [0.05, 0.785, 1], initialRatio: 0 })
   *   this._observer.relativeTo(".iOS-navigationBar").observe(".iOS-head", res => {
   *     let height = this.data.res.height, view = res.intersectionRect;
   *     console.log(view.top, view.bottom)
   *     if (this.data.titleDisplay) {
   *       if (this.data.borderDisplay) {
   *         if (view.bottom == height + 44) this.setData({ borderDisplay: false }), console.log('border hide');
   *       }
   *       else {
   *         if (view.bottom && view.bottom < height + 44)
   *          this.setData({ borderDisplay: true }), console.log('border show');
   *         if (view.top && view.top > height + 2) this.setData({ titleDisplay: false }), console.log('title hide');
   *       }
   *     } else {
   *       if (view.top && view.top < height + 2) this.setData({ titleDisplay: true }), console.log('title show');
   *     }
   *   });
   * },
   * detached() {
   *   if (this._observer) this._observer.disconnect();
   * },
   * }
   */
});
