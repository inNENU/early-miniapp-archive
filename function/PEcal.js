/* global wx getApp*/
const { globalData: a, lib: { $file, $page, $set } } = getApp();

$page('PEcal', {
  data: {},
  onLoad() {
    // $file.readJson('function/PEcal/');
  },
  onReady() {
    $set.Notice('PEcal');
  },
  judge(res) {
    const { project } = res.currentTarget.dataset;


  }
});
