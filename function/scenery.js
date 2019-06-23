/* global wx getApp*/
const { globalData: a, lib: { $act, $file, $register, $set } } = getApp();

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
