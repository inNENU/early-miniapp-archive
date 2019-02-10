/* global wx*/

// 初始化文件管理器
const fileManager = wx.getFileSystemManager(), userPath = wx.env.USER_DATA_PATH;

// const logger = wx.getLogManager({ level: 1 });

// wx.request包装
const request = (path, Func) => {
  wx.request({
    url: `https://nenuyouth.com/Res/${path}.json`,
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

// 资源下载 from fuction.js & guide.js 被checkResUpdate调用
const resDownload = name => {
  wx.setStorageSync(`${name}Download`, false);
  wx.downloadFile({
    url: `https://nenuyouth.com/Res/${name}.zip`,
    success: res => {
      console.log(`${name} statusCode is ${res.statusCode}`);
      if (res.statusCode === 200) {
        fileManager.saveFileSync(res.tempFilePath, `${userPath}/${name}Zip`);
        console.log("save success");
        fileManager.unzip({
          zipFilePath: `${userPath}/${name}Zip`, targetPath: userPath, success: () => {
            console.log("unzip sucess");// 调试
            fileManager.unlinkSync(`${userPath}/${name}Zip`);
            wx.setStorageSync(`${name}Download`, true);
            console.log("delete sucess");// 调试
          },
          fail: msg2 => console.error(`unzip ${name} fail:`, msg2)
        });
      }
    },
    fail: msg1 => console.error(`download ${name} fail:`, msg1)
  });
};

// 检查资源更新
const checkResUpdate = (name, dataUsage) => {
  let notify = wx.getStorageSync(`${name}ResNotify`), // 资源提醒
    local = fileManager.readFileSync(`${userPath}/${name}Version.json`, "utf-8"), // 读取本地Version文件
    localTime = wx.getStorageSync(`${name}UpdateTime`), currentTime = Math.round(new Date() / 1000);// 读取当前和上次更新时间

  // 调试
  console.log(`${name}通知状态为${notify}`, "本地版本文件为：", local);
  console.log(`${name}更新于${localTime}, 现在时间是${currentTime}`);

  if (notify || currentTime > localTime + 1000000)// 如果需要更新
    request(`${name}Version`, data => {
      if (Number(local) == Number(data)) console.log("match");// 资源为最新
      else { // 需要更新
        console.log("not match"); // 调试
        if (notify) wx.showModal({// 如果需要提醒，则弹窗
          title: "发现资源更新", content: `是否立即更新资源？\n(会消耗${dataUsage}流量)`,
          cancelText: "否", cancelColor: "#ff0000", confirmText: "是",
          success: choice => {
            if (choice.confirm) resDownload(name);
            else if (choice.cancal) wx.showModal({// 询问是否关闭更新提示
              title: "开启资源更新提示？", content: "在资源有更新时会提示您更新资源文件。",
              cancelText: "残忍关闭", cancelColor: "#ff0000", confirmText: "保持开启",
              success: choice2 => {
                if (choice2.cancel) wx.showModal({
                  title: "更新提示已关闭", showCancel: false,
                  content: "您可以在设置中重新打开提示。请注意：小程序会每半个月对界面文件进行强制更新。",
                  success: () => {
                    wx.setStorageSync(`${name}ResNotify`, false);// 关闭更新提示
                  }
                });
              }
            });
          }
        });
        else resDownload(name);// 已经半个月了，强制更新
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

const markerSet = () => {
  let localList, markerData = wx.getStorageSync("marker"),
    temp = wx.getStorageSync("localFunc"),
    markerVersion = localList ? localList.marker[1] : null,
    currentVersion = wx.getStorageSync("markerVersion");
  if (temp) localList = JSON.parse(temp);
  if (!markerData)
    request("guide/marker/marker", data => {
      wx.setStorageSync("marker", data);
      if (setMarker(data[0], "benbu") && setMarker(data[1], "jingyue") && markerVersion)
        wx.setStorageSync("markerVersion", markerVersion);
      else console.warn("Marker set failure."), wx.reportMonitor("25", 1);
    });
  else if (markerVersion != currentVersion)
    if (setMarker(markerData[0], "benbu") && setMarker(markerData[1], "jingyue"))
      wx.setStorageSync("markerVersion", markerVersion);
    else console.warn("Marker set failure."), wx.reportMonitor("25", 1);
};

module.exports = { update: checkResUpdate, tabBarChanger, markerSet, resDownload };


/*
 * // 检查资源更新
 * const checkResUpdate = (name, dataUsage) => {
 *   let notify = wx.getStorageSync(`${name}ResNotify`), // 资源提醒
 *     local = fileManager.readFileSync(`${userPath}/${name}Version.json`, "utf-8"), // 读取本地Version文件
 *     localTime = wx.getStorageSync(`${name}UpdateTime`), currentTime = Math.round(new Date() / 1000);// 读取当前和上次更新时间
 */

/*
 *   // 调试
 *   console.log(`${name}通知状态为${notify}`, "本地版本文件为：", local);
 *   console.log(`${name}更新于${localTime}, 现在时间是${currentTime}`);
 */

/*
 *   if (notify || currentTime > localTime + 1000000)// 如果需要更新
 *     wx.request({
 *       url: `https://nenuyouth.com/Res/${name}Version.json`, // 请求在线Version文件
 *       success: Request => {
 */

/*
 *         // 调试
 *         console.log(Request);
 */

/*
 *         let onlineData = Request.data;
 *         if (Request.statusCode == 200)
 *           if (local == JSON.stringify(onlineData)) console.log("match");// 资源为最新
 *           else { // 需要更新
 *             console.log("not match"); // 调试
 *             if (notify) wx.showModal({// 如果需要提醒，则弹窗
 *               title: "发现资源更新", content: `是否立即更新资源？\n(会消耗${dataUsage}流量)`,
 *               cancelText: "否", cancelColor: "#ff0000", confirmText: "是",
 *               success: choice => {
 *                 if (choice.confirm) resDownload(onlineData, local, name);
 *                 else if (choice.cancal) wx.showModal({// 询问是否关闭更新提示
 *                   title: "开启资源更新提示？", content: "在资源有更新时会提示您更新资源文件。",
 *                   cancelText: "残忍关闭", cancelColor: "#ff0000", confirmText: "保持开启",
 *                   success: choice2 => {
 *                     if (choice2.cancel) wx.showModal({
 *                       title: "更新提示已关闭", showCancel: false,
 *                       content: "您可以在设置中重新打开提示。请注意：小程序会每半个月对界面文件进行强制更新。",
 *                       success: () => {
 *                         wx.setStorageSync(`${name}ResNotify`, false);// 关闭更新提示
 *                       }
 *                     });
 *                   }
 *                 });
 *               }
 *             });
 *             else resDownload(onlineData, local, name);// 已经半个月了，强制更新
 *           }  // 调试
 *         else console.error(`Res errorcode is ${Request.statusCode}`), wx.reportMonitor("18", 1);
 *       },
 *       fail: () => {
 *         console.error("Resjson download failure"), wx.reportMonitor("19", 1);
 *       }
 *     });
 * };
 */

/*
 * // resRefresh的附属函数，用资源更新
 * const resSnyc = (refreshList, name) => {
 *   let percent = [], successNumber = 0, fileNum = refreshList.length;
 *   wx.showLoading({ title: "更新中...0%", mask: true });// 展示更新进度提示
 *   for (let i = 0; i <= fileNum; i++) percent.push((i / fileNum * 100).toString().substring(0, 4));// 计算进度百分比
 *   let timeoutFunc = setTimeout(() => {
 *     wx.hideLoading();// 10秒下载超时，取消显示加载提示
 *     console.error("update timeout"), wx.reportMonitor("20", 1), logger.warn(`${name}Res update timeout`);
 *   }, 10000);
 *   refreshList.forEach(i => {
 *     wx.request({
 *       url: `https://nenuyouth.com/Res/${name}/${i}/${i}.json`,
 *       success: res => {
 *         if (res.statusCode == "200") {
 *           console.log(i), console.log(res); // 调试
 *           res.data.forEach((y, z) => {
 *             wx.setStorageSync(i + z, y);
 *           });
 *           successNumber += 1;
 *           wx.showLoading({ title: `更新中...${percent[successNumber]}%`, mask: true });
 *           if (successNumber == fileNum) {
 *             wx.hideLoading(), clearTimeout(timeoutFunc);
 *             console.log("hide"); // 调试
 *           }
 *         } else console.warn(`${i} statueCode ${res.statusCode}`), wx.reportMonitor("22", 1);
 *       },
 *       fail: res => {
 *         console.warn(`${i} download failure`), console.warn(res), wx.reportMonitor("21", 1);
 *       }
 *     });
 *   });
 * };
 */

/*
 * // 资源下载 from fuction.js & guide.js 被resRefresh调用
 * const resDownload = (onlineList, local, name) => {
 *   let localList, category = Object.keys(onlineList), refreshList = [];
 *   try {
 *     localList = JSON.parse(local);
 *   } catch (e) { // parse失败，直接清除本地资源重新下载
 *     localList = null;
 *     console.error(`${name}本地资源损坏`, e), logger.warn(`${name} checkResUpdate Broken`);
 *     if (fileManager.accessSync(`${userPath}/${name}Zip`)) fileManager.unlinkSync(`${userPath}/${name}Zip`);
 *     if (fileManager.accessSync(`${userPath}/${name}`)) fileManager.unlinkSync(`${userPath}/${name}`);
 *     if (fileManager.accessSync(`${userPath}/${name}Version.json`))
 *       fileManager.unlinkSync(`${userPath}/${name}Version.json`);
 *   }
 */

/*
 *   // 调试
 *   console.log(category);
 */

/*
 *   if (localList) {
 *     category.forEach(i => {
 *       if (localList[i] !== onlineList[i]) {
 */

/*
 *         // 调试
 *         console.log(`${i} don't match`);
 */

/*
 *         refreshList.push(i);
 *       }
 *     });
 *     resSnyc(refreshList, name);
 *   } else resSnyc(category, name);
 *   wx.setStorageSync(`${name}UpdateTime`, Math.round(new Date() / 1000));
 * };
 */