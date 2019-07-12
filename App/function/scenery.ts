/*
 * @Author: Mr.Hope
 * @Date: 2019-06-24 23:46:48
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-06-24 23:51:46
 * @Description: 东师风景
 */

import $register from 'wxpage';

$register('scenery', {
  data: {
    page: [{ tag: 'head', title: '校园风景' }],
    currentSrc: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    imgs: [
      {
        id: 1,
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        id: 2,
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        id: 3,
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
    ]
  }
});
