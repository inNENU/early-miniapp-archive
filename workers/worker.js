// worker.onMessage(function(res) {
//   console.log(res)
// })
var msg;
worker.onMessage((msg) => {
  console.log(msg);
  msg = JSON.stringify(msg);
  worker.postMessage({
    msg: msg
  })
})