/* global worker */
worker.onMessage(msg => {
  console.log(msg);
  const msgString = JSON.stringify(msg);

  worker.postMessage({ msg: msgString });
});
