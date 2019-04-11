/* global wx getApp*/
const { globalData: a, lib: { $page, $set } } = getApp();

$page('PEcal', {
  data: {},
  onLoad() {

  },
  onReady() {
    $set.Notice('PEcal');
  }
});
