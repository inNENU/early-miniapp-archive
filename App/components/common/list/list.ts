/*
 * @Author: Mr.Hope
 * @Date: 2019-07-23 18:34:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-01 15:24:56
 * @Description: 列表组件
 */

import * as $register from 'wxpage';

$register.C({
  properties: {
    /** 普通列表配置 */
    config: Object as any
  },

  methods: {
    /** 导航到指定页面 */
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
