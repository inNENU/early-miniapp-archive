/*
 * @Author: Mr.Hope
 * @Date: 2019-07-23 18:34:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-08 14:31:54
 * @Description: 列表组件
 */

import $register from 'wxpage';

$register.C({
  properties: { config: Object },
  methods: {
    navigate(res: WXEvent.Base) {
      const { url } = this.data.config.content[res.currentTarget.id];

      this.$route(url);
    }
  },
  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
