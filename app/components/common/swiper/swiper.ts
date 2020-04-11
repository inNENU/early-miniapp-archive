Component({
  properties: { config: Object },

  methods: {
    change(event: WXEvent.SwiperChange) {
      this.triggerEvent('change', event);
    },
    animation(event: WXEvent.SwiperAnimationFinish) {
      this.triggerEvent('animation', event);
    }
  }
});
