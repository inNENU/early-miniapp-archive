/*global worker*/
// worker.onMessage(function(res) {
//   console.log(res)
// })
worker.onMessage((msg) => {
  console.log(msg);
  msg = JSON.stringify(msg);
  worker.postMessage({
    msg: msg
  })
})