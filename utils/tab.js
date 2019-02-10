/* global wx*/
// 初始化日志管理器
const logger = wx.getLogManager({ level: 1 });

// resRefresh的附属函数
const resSnyc = refreshList => {
  wx.showLoading({ title: "更新中...0%", mask: true });
  let percent = [], successNumber = 0, fileNum = refreshList.length;
  for (let i = 0; i <= fileNum; i++)
    percent.push((i / fileNum * 100).toString().substring(0, 4));

  let timeoutFunc = setTimeout(() => {
    wx.hideLoading();
    console.error("update timeout"), wx.reportMonitor("20", 1);
  }, 10000);
  refreshList.forEach(x => {
    wx.request({
      url: `https://nenuyouth.com/mpRes/${x}/${x}.json`,
      success: res => {
        if (res.statusCode == "200") {
          console.log(x), console.log(res); // 调试
          res.data.forEach((y, z) => {
            wx.setStorageSync(x + z, y);
          });
          successNumber += 1;
          wx.showLoading({ title: `更新中...${percent[successNumber]}%`, mask: true });
          if (successNumber == fileNum) {
            wx.hideLoading(), clearTimeout(timeoutFunc);
            console.log("hide"); // 调试
          }
        } else console.warn(`${x} statueCode ${res.statusCode}`), wx.reportMonitor("22", 1);
      },
      fail: res => {
        console.warn(`${x} download failure`), console.warn(res), wx.reportMonitor("21", 1);
      }
    });
  });
};

// 资源下载 from fuction.js & guide.js 被resRefresh调用
const resDownload = (onlineList, localList, storageKey) => {
  let category = Object.keys(onlineList);
  console.log(category); // 调试
  if (localList) {
    let refreshList = [];
    category.forEach(x => {
      if (localList[x] !== onlineList[x]) {
        console.log(`${x}don't match`); // 调试
        refreshList.push(x);
      }
    });
    resSnyc(refreshList);
  } else resSnyc(category);
  wx.setStorageSync(storageKey, JSON.stringify(onlineList));
  wx.setStorageSync(`${storageKey}Time`, Math.round(new Date() / 1000));
};

// 检查资源更新
const checkUpdate = (notifyKey, storageKey, onlineFileName, dataUsage) => {
  let notify = wx.getStorageSync(notifyKey), local = wx.getStorageSync(storageKey),
    localTime = wx.getStorageSync(`${storageKey}Time`), currentTime = Math.round(new Date() / 1000);
  console.log(`${notifyKey} is ${notify}`), console.log(local); // 调试
  console.log(`localTime is ${localTime}`), console.log(`currentTime is ${currentTime}`); // 调试
  if (notify || currentTime > localTime + 200000)
    wx.request({
      url: `https://nenuyouth.com/Res/${onlineFileName}.json`,
      success: Request => {
        console.log(Request); // 调试
        let onlineData = Request.data;
        if (Request.statusCode == 200)
          if (local == false) {
            wx.showModal({
              title: "打开资源更新提示？", content: "开启后在资源更新时会提示您更新资源文件。",
              cancelText: "关闭", cancelColor: "#ff0000", confirmText: "打开",
              success: choice2 => {
                if (choice2.confirm) resDownload(onlineData, null, storageKey);
                if (choice2.cancel)
                  wx.showModal({
                    title: "更新提示已关闭",
                    content: "您可以在设置中重新打开提示。请注意：小程序会定期对界面文件进行强制更新。下面开始首次下载。",
                    showCancel: false,
                    success: () => {
                      wx.setStorageSync(notifyKey, false), resDownload(onlineData, null, storageKey);
                    }
                  });

              }
            });
          } else if (local == JSON.stringify(onlineData)) console.log("match");
          else {
            console.log("not match"); // 调试
            if (notify)
              wx.showModal({
                title: "部分资源有更新？", content: `是否立即更新资源？\n(会消耗${dataUsage}流量)`,
                cancelText: "否", cancelColor: "#ff0000", confirmText: "是",
                success: choice => {
                  if (choice.confirm) resDownload(onlineData, JSON.parse(local), storageKey);
                }
              });
            else resDownload(onlineData, JSON.parse(local), storageKey);
          }  // 调试
        else console.error(`Resjson errorcode is ${Request.statusCode}`), wx.reportMonitor("18", 1);
      },
      fail: () => {
        console.error("Resjson download failure"), wx.reportMonitor("19", 1);
      }
    });
};

// 动态根据夜间模式改变导航栏 from main.js & me.js
const tabBarChanger = nm => {
  let color = nm ? ["#000000", "white"] : ["#ffffff", "black"];
  wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
};

// 初始化marker，被setMarker调用
const initMarker = markers => {
  markers.forEach(x => {
    let temp = {
      iconPath: "/function/icon/marker.png", width: 25, height: 25, alpha: 0.8,
      label: {
        content: x.name, color: "#1A9D5E", fontSize: "10", anchorX: -4 - 5 * x.name.length, anchorY: 0,
        bgColor: "#ffffff", borderWidth: 1, borderColor: "#efeef4", borderRadius: 2, padding: "3"
      },
      callout: {
        content: x.detail, color: "#ffffff", fontSize: "16",
        borderRadius: "10", bgColor: "#1A9D5E", padding: "10", display: "BYCLICK"
      }
    };
    if (!("title" in x)) x.title = x.detail;
    delete x.name, delete x.detail;
    Object.assign(x, temp);
  });

  return markers;
};

const setMarker = (data, name) => {
  let marker = initMarker(data.points),
    category = data.category;
  wx.setStorageSync(`${name}-all`, marker);
  Object.keys(category).forEach(x => {
    let markerDetail = [];
    for (let j = category[x][0]; j <= category[x][1]; j++) markerDetail.push(marker[j]);
    wx.setStorageSync(`${name}-${x}`, markerDetail);
  });

  return true;
};

// wx.request包装
const request = (path, Func) => {
  wx.request({
    url: `https://nenuyouth.com/mpRes/${path}.json`,
    success: res => {
      console.log("Request success:", res);// 调试
      if (res.statusCode == 200) Func(res.data);
      else console.warn(`request ${path} fail: ${res.statusCode}`), wx.reportMonitor("3", 1);
    },
    fail: res => {
      console.log(res), wx.reportMonitor("4", 1);
    }
  });
};

const markerSet = () => {
  let localList, markerData = wx.getStorageSync("marker"),
    temp = wx.getStorageSync("localFunc"),
    markerVersion = localList ? localList.marker[1] : null,
    currentVersion = wx.getStorageSync("markerVersion");
  if (temp) localList = JSON.parse(temp);
  if (!markerData)
    request("marker/marker", data => {
      wx.setStorageSync("marker", data);
      if (setMarker(data[0], "benbu") && setMarker(data[1], "jingyue") && markerVersion)
        wx.setStorageSync("markerVersion", markerVersion);
      else console.warn("Marker set failure."), wx.reportMonitor("25", 1);
    }, null);
  else if (markerVersion != currentVersion)
    if (setMarker(markerData[0], "benbu") && setMarker(markerData[1], "jingyue"))
      wx.setStorageSync("markerVersion", markerVersion);
    else console.warn("Marker set failure."), wx.reportMonitor("25", 1);
};

module.exports = { checkUpdate, tabBarChanger, markerSet, request, resDownload };