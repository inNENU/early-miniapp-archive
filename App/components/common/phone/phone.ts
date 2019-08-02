/*
 * @Author: Mr.Hope
 * @Date: 2019-07-22 13:45:36
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-30 16:52:26
 * @Description: 电话组件
 */

import $register from 'wxpage';
import { tip } from '../../../utils/wx';

$register.C({
  properties: { config: { type: Object } },
  methods: {
    call() {
      wx.makePhoneCall({ phoneNumber: this.data.config.num.toString() });// 拨打电话
    },
    addContact() {
      const { globalData: { env } } = getApp();// 获得当前小程序环境

      if (env === 'wx')
        wx.addPhoneContact({// 添加联系人
          firstName: this.data.config.fName,
          lastName: this.data.config.lName,
          mobilePhoneNumber: this.data.config.num,
          organization: this.data.config.org,
          workPhoneNumber: this.data.config.workNum,
          remark: this.data.config.remark,
          photoFilePath: this.data.config.head,
          nickName: this.data.config.nickName,
          weChatNumber: this.data.config.wechat,
          addressState: this.data.config.province,
          addressCity: this.data.config.city,
          addressStreet: this.data.config.street,
          addressPostalCode: this.data.config.postCode,
          title: this.data.config.title,
          hostNumber: this.data.config.hostNum,
          email: this.data.config.email,
          url: this.data.config.website,
          homePhoneNumber: this.data.config.homeNum
        });
      else tip('QQ暂不支持添加联系人');
    }
  },
  options: {
    addGlobalClass: true, // 兼容QQ
    styleIsolation: 'shared'
  }
});
