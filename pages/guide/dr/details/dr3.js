var u = getApp().util, a = getApp().globalData; Page({

  data: {
    page: [
      { name: 'head', title: '本部美食节' },
      { name: 'p', text: '学校食堂每年都会举行美食节哦~' },
      { name: 'h3', text: '北苑' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/E6/wKjmqll8OtuADVjkAAC7lBekiqw4286751/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7F/2A/CgpQVFl8OtqAZyT_AACXZMqkEDs3360157/imageView/v1/thumbnail/640x480' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/80/E6/wKjmqll8OtqAEuAeAACzw4NsAbg1820590/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M00/7F/2A/CgpQVFl8OtmAX5tyAAEmSG-7lyY0501183/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/E6/wKjmqll8OtyALNYwAAEP8jZOfxU6138187/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/E6/wKjmqll8OtyALNYwAAEP8jZOfxU6138187/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/E6/wKjmqll8OtyALNYwAAEP8jZOfxU6138187/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/E6/wKjmqll8OtyALNYwAAEP8jZOfxU6138187/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/E6/wKjmqll8OtyALNYwAAEP8jZOfxU6138187/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/E6/wKjmqll8OtyALNYwAAEP8jZOfxU6138187/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g2/M01/80/E6/wKjmqll8OtyALNYwAAEP8jZOfxU6138187/imageView/v1/thumbnail/640x0' },
      { name: 'h3', text: '南苑' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/8F/EB/wKjmqVl8O5OAZFzXAADbiBG_3TI3482738/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/6C/AC/CgpQU1l8O5OAHtT9AAEWob41bbI8272268/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M00/6C/AC/CgpQU1l8O5KAKCJ7AAEZan02lGQ2356207/imageView/v1/thumbnail/640x0' },
      { name: 'img', src: 'https://pic.kuaizhan.com/g1/M01/8F/EB/wKjmqVl8O5GAPsZ-AAD0kjTShqw5004038/imageView/v1/thumbnail/640x0' },
    ],

  },

  onLoad(e) { let page = u.sP(this.data.page, a, e); this.setData({ T: a.T, nm: a.nm, page: page }) },

  onPageScroll(e) { let page = u.nav(e, this.data.page); if (page) { this.setData({ page: page }) } }, back() { u.back() },

})