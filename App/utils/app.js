"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_1 = require("./file");
var wx_1 = require("./wx");
var logger = wx.getLogManager({ level: 1 });
var appOption = {
    theme: 'iOS',
    themeNum: 0,
    nightmode: false,
    nightmodeAutoChange: true,
    dayBrightnessChange: false,
    nightBrightnessChange: false,
    dayBrightness: 70,
    nightBrightness: 30,
    nightmodeStartTime: '0-0',
    nightmodeEndTime: '5-0',
    functionResNotify: true,
    pageResNotify: true
};
var resDownload = function (list) {
    var listenNumber = list.length;
    list.forEach(function (name) {
        wx.downloadFile({
            url: "https://mp.nenuyouth.com/" + name + ".zip",
            success: function (res) {
                console.log(name + " statusCode is " + res.statusCode);
                if (res.statusCode === 200) {
                    file_1.default.saveFile(res.tempFilePath, name + "Zip");
                    console.log("save " + name + " success");
                    file_1.default.unzip(name + "Zip", '', function () {
                        console.log("unzip " + name + " sucess");
                        file_1.default.Delete(name + "Zip", false);
                        wx.setStorageSync(name + "Download", true);
                        console.log("delete " + name + " sucess");
                        listenNumber--;
                        if (!listenNumber)
                            wx.hideLoading();
                    });
                }
            },
            fail: function (failMsg) {
                wx_1.default.netReport();
                console.error("download " + name + " fail:", failMsg);
                logger.warn("\u521D\u59CB\u5316\u5C0F\u7A0B\u5E8F\u65F6\u4E0B\u8F7D" + name + "\u5931\u8D25");
            }
        });
    });
};
var appInit = function () {
    wx.showLoading({ title: '初始化中...', mask: true });
    console.info('初次启动');
    if (appOption.theme === 'auto') {
        var num = void 0;
        var theme = void 0;
        var platform = wx.getSystemInfoSync().platform;
        switch (platform) {
            case 'iOS':
                theme = 'iOS';
                num = 0;
                break;
            case 'Android':
                theme = 'Android';
                num = 1;
                break;
            default:
                theme = 'iOS';
                num = 0;
        }
        wx.setStorageSync('theme', theme);
        wx.setStorageSync('themeNum', num);
    }
    else {
        wx.setStorageSync('theme', appOption.theme);
        wx.setStorageSync('themeNum', appOption.themeNum);
    }
    for (var data in appOption)
        if (data !== 'theme')
            wx.setStorageSync(data, appOption[data]);
    var timeStamp = new Date().getTime();
    resDownload(['page', 'function']);
    wx.setStorageSync('pageUpdateTime', Math.round(timeStamp / 1000));
    wx.setStorageSync('functionUpdateTime', Math.round(timeStamp / 1000));
    wx.setStorageSync('inited', true);
};
var noticeCheck = function (version) {
    wx_1.default.request("config/" + version + "/notice", function (data) {
        var noticeList = data;
        var category = Object.keys(noticeList);
        category.forEach(function (page) {
            if (noticeList[page][3]) {
                wx.setStorageSync(page + "notice", [noticeList[page][0], noticeList[page][1]]);
                wx.setStorageSync(page + "Notify", true);
            }
            else if (noticeList[page][2] !== wx.getStorageSync(page + "noticeVersion")) {
                wx.setStorageSync(page + "notice", [noticeList[page][0], noticeList[page][1]]);
                wx.setStorageSync(page + "noticeVersion", noticeList[page][2]);
                wx.setStorageSync(page + "Notify", true);
            }
        });
        if ('app' in category)
            wx.showModal({
                title: noticeList.app[0], content: noticeList.app[1], showCancel: false,
                success: function () { return wx.removeStorageSync('appNotify'); }
            });
    }, function () {
        console.error('Get noticeList fail');
        logger.warn('noticeList error', 'Net Error');
        wx.reportMonitor('24', 1);
    }, function () {
        console.error('NoticeList address error');
        logger.warn('noticeList error', 'Address Error');
        wx.reportMonitor('24', 1);
    });
};
exports.nightmode = function () {
    var date = new Date();
    var time = date.getHours() * 100 + date.getMinutes();
    var nightModeCondition = wx.getStorageSync('nightmode');
    var nightmodeAutoChange = wx.getStorageSync('nightmodeAutoChange');
    var nightBrightness = wx.getStorageSync('nightBrightness');
    var dayBrightness = wx.getStorageSync('dayBrightness');
    var nightBrightnessChange = wx.getStorageSync('nightBrightnessChange');
    var dayBrightnessChange = wx.getStorageSync('dayBrightnessChange');
    var nmStart = wx.getStorageSync('nightmodeStartTime').split('-');
    var nmEnd = wx.getStorageSync('nightmodeEndTime').split('-');
    var nightmodeStartTime = Number(nmStart[0]) * 100 + Number(nmStart[1]);
    var nightmodeEndTime = Number(nmEnd[0]) * 100 + Number(nmEnd[1]);
    var currentNightModeStatus;
    if (nightmodeAutoChange) {
        currentNightModeStatus =
            nightmodeStartTime <= nightmodeEndTime
                ? time >= nightmodeStartTime && time <= nightmodeEndTime
                : !(time <= nightmodeStartTime && time >= nightmodeEndTime);
        if (currentNightModeStatus && nightBrightnessChange)
            wx.setScreenBrightness({ value: nightBrightness / 100 });
        else if (!currentNightModeStatus && dayBrightnessChange)
            wx.setScreenBrightness({ value: dayBrightness / 100 });
        wx.setStorageSync('nightmode', currentNightModeStatus);
    }
    else {
        if (nightModeCondition && nightBrightnessChange)
            wx.setScreenBrightness({ value: nightBrightness / 100 });
        else if (!nightModeCondition && dayBrightnessChange)
            wx.setScreenBrightness({ value: dayBrightness / 100 });
        currentNightModeStatus = nightModeCondition;
    }
    return currentNightModeStatus;
};
var appUpdate = function (localVersion) {
    var updateManager = wx.getUpdateManager();
    var version;
    var forceUpdate = true;
    var reset = false;
    updateManager.onCheckForUpdate(function (status) {
        if (status.hasUpdate)
            wx_1.default.tip('发现小程序更新，下载中...');
    });
    updateManager.onUpdateReady(function () {
        wx_1.default.request("config/" + localVersion + "/config", function (data) {
            var _a;
            (_a = data, forceUpdate = _a.forceUpdate, reset = _a.reset, version = _a.version);
            if (forceUpdate)
                wx.showModal({
                    title: '已找到新版本',
                    content: "\u65B0\u7248\u672C" + version + "\u5DF2\u4E0B\u8F7D\uFF0C\u8BF7\u91CD\u542F\u5E94\u7528\u66F4\u65B0\u3002" + (reset ? '该版本会初始化小程序。' : ''),
                    showCancel: !reset, confirmText: '应用', cancelText: '取消',
                    success: function (res) {
                        if (res.confirm) {
                            if (reset) {
                                wx.showLoading({ title: '初始化中', mask: true });
                                file_1.default.listFile('').forEach(function (filePath) {
                                    file_1.default.Delete(filePath);
                                });
                                wx.clearStorageSync();
                                wx.hideLoading();
                            }
                            updateManager.applyUpdate();
                        }
                    }
                });
        });
    });
    updateManager.onUpdateFailed(function () {
        wx_1.default.tip('小程序更新下载失败，请检查您的网络！');
        console.warn('Update failure');
        wx.reportMonitor('23', 1);
        logger.warn('Upate App error because of Net Error');
    });
};
var startup = function (version) {
    wx.onMemoryWarning(function (res) {
        wx_1.default.tip('内存不足');
        console.warn('onMemoryWarningReceive');
        wx.reportAnalytics('memory_warning', {
            memory_warning: res && res.level ? res.level : 0,
        });
    });
    wx.getNetworkType({
        success: function (res) {
            var networkType = res.networkType;
            if (networkType === 'none' || networkType === 'unknown')
                wx_1.default.tip('您的网络状态不佳');
        }
    });
    wx.onNetworkStatusChange(function (res) {
        if (!res.isConnected) {
            wx_1.default.tip('网络连接中断,部分小程序功能暂不可用');
            wx.setStorageSync('networkError', true);
        }
        else if (wx.getStorageSync('network')) {
            wx.setStorageSync('networkError', false);
            wx_1.default.tip('网络链接恢复');
        }
    });
    wx.onUserCaptureScreen(function () {
        wx_1.default.tip('您可以点击右上角——转发或点击页面右下角——保存二维码分享小程序');
    });
    noticeCheck(version);
    appUpdate(version);
};
exports.default = { appInit: appInit, appUpdate: appUpdate, nightmode: exports.nightmode, noticeCheck: noticeCheck, startup: startup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0JBQTJCO0FBQzNCLDJCQUF1QjtBQUN2QixJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFPOUMsSUFBTSxTQUFTLEdBQWM7SUFDM0IsS0FBSyxFQUFFLEtBQUs7SUFDWixRQUFRLEVBQUUsQ0FBQztJQUNYLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLG1CQUFtQixFQUFFLElBQUk7SUFDekIsbUJBQW1CLEVBQUUsS0FBSztJQUMxQixxQkFBcUIsRUFBRSxLQUFLO0lBQzVCLGFBQWEsRUFBRSxFQUFFO0lBQ2pCLGVBQWUsRUFBRSxFQUFFO0lBQ25CLGtCQUFrQixFQUFFLEtBQUs7SUFDekIsZ0JBQWdCLEVBQUUsS0FBSztJQUN2QixpQkFBaUIsRUFBRSxJQUFJO0lBQ3ZCLGFBQWEsRUFBRSxJQUFJO0NBQ3BCLENBQUM7QUFPRixJQUFNLFdBQVcsR0FBRyxVQUFDLElBQWM7SUFDakMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUUvQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtRQUVmLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDZCxHQUFHLEVBQUUsOEJBQTRCLElBQUksU0FBTTtZQUMzQyxPQUFPLEVBQUUsVUFBQSxHQUFHO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUksSUFBSSx1QkFBa0IsR0FBRyxDQUFDLFVBQVksQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO29CQUcxQixjQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUssSUFBSSxRQUFLLENBQUMsQ0FBQztvQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFRLElBQUksYUFBVSxDQUFDLENBQUM7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QyxDQUFDO0lBQzlDLENBQUMsQ0FBQyxDQUFDO0lBR0gsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUM7QUFFRixrQkFBZSxFQUFFLE9BQU8sU0FBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLFNBQVMsbUJBQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5Yid5aeL5YyW5paH5Lu2566h55CG5Zmo44CB5pel5b+X566h55CG5ZmoXG5pbXBvcnQgJGZpbGUgZnJvbSAnLi9maWxlJztcbmltcG9ydCAkbXkgZnJvbSAnLi93eCc7XG5jb25zdCBsb2dnZXIgPSB3eC5nZXRMb2dNYW5hZ2VyKHsgbGV2ZWw6IDEgfSk7XG5cbmludGVyZmFjZSBBcHBPcHRpb24ge1xuICBbcHJvcHM6IHN0cmluZ106IGFueTtcbn1cblxuLy8g5bCP56iL5bqP6YWN572uXG5jb25zdCBhcHBPcHRpb246IEFwcE9wdGlvbiA9IHtcbiAgdGhlbWU6ICdpT1MnLFxuICB0aGVtZU51bTogMCxcbiAgbmlnaHRtb2RlOiBmYWxzZSxcbiAgbmlnaHRtb2RlQXV0b0NoYW5nZTogdHJ1ZSxcbiAgZGF5QnJpZ2h0bmVzc0NoYW5nZTogZmFsc2UsXG4gIG5pZ2h0QnJpZ2h0bmVzc0NoYW5nZTogZmFsc2UsXG4gIGRheUJyaWdodG5lc3M6IDcwLFxuICBuaWdodEJyaWdodG5lc3M6IDMwLFxuICBuaWdodG1vZGVTdGFydFRpbWU6ICcwLTAnLFxuICBuaWdodG1vZGVFbmRUaW1lOiAnNS0wJyxcbiAgZnVuY3Rpb25SZXNOb3RpZnk6IHRydWUsXG4gIHBhZ2VSZXNOb3RpZnk6IHRydWVcbn07XG5cbi8qKlxuICog5LiL6L29bGlzdOS4reeahOWvueW6lOi1hOa6kFxuICpcbiAqIEBwYXJhbSBsaXN0IOmcgOimgeS4i+i9veeahOi1hOa6kOWIl+ihqFxuICovXG5jb25zdCByZXNEb3dubG9hZCA9IChsaXN0OiBzdHJpbmdbXSkgPT4ge1xuICBsZXQgbGlzdGVuTnVtYmVyID0gbGlzdC5sZW5ndGg7XG5cbiAgbGlzdC5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIC8vIOS4i+i9vXppcOWMhVxuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6IGBodHRwczovL21wLm5lbnV5b3V0aC5jb20vJHtuYW1lfS56aXBgLFxuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7bmFtZX0gc3RhdHVzQ29kZSBpcyAke3Jlcy5zdGF0dXNDb2RlfWApOy8vIOiwg+ivlVxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuXG4gICAgICAgICAgLy8g5L+d5a2Y5Y6L57yp5paH5Lu25Yiw5Y6L57yp55uu5b2VXG4gICAgICAgICAgJGZpbGUuc2F2ZUZpbGUocmVzLnRlbXBGaWxlUGF0aCwgYCR7bmFtZX1aaXBgKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgc2F2ZSAke25hbWV9IHN1Y2Nlc3NgKTsvLyDosIPor5VcblxuICAgICAgICAgIC8vIOino+WOi+aWh+S7tuWIsOagueebruW9lVxuICAgICAgICAgICRmaWxlLnVuemlwKGAke25hbWV9WmlwYCwgJycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGB1bnppcCAke25hbWV9IHN1Y2Vzc2ApOy8vIOiwg+ivlVxuXG4gICAgICAgICAgICAvLyDliKDpmaTljovnvKnnm67lvZXvvIzlubblsIbkuIvovb3miJDlip/kv6Hmga/lhpnlhaXlrZjlgqjjgIHliKTmlq3lj5bmtojmj5DnpLpcbiAgICAgICAgICAgICRmaWxlLkRlbGV0ZShgJHtuYW1lfVppcGAsIGZhbHNlKTtcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKGAke25hbWV9RG93bmxvYWRgLCB0cnVlKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYGRlbGV0ZSAke25hbWV9IHN1Y2Vzc2ApOy8vIOiwg+ivlVxuXG4gICAgICAgICAgICAvLyDmlLnlj5jnm5HlkKzmlbBcbiAgICAgICAgICAgIGxpc3Rlbk51bWJlci0tO1xuICAgICAgICAgICAgaWYgKCFsaXN0ZW5OdW1iZXIpIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIOS4i+i9veWksei0pVxuICAgICAgZmFpbDogZmFpbE1zZyA9PiB7XG4gICAgICAgICRteS5uZXRSZXBvcnQoKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihgZG93bmxvYWQgJHtuYW1lfSBmYWlsOmAsIGZhaWxNc2cpO1xuICAgICAgICBsb2dnZXIud2Fybihg5Yid5aeL5YyW5bCP56iL5bqP5pe25LiL6L29JHtuYW1lfeWksei0pWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKiDliJ3lp4vljJblsI/nqIvluo8gKi9cbmNvbnN0IGFwcEluaXQgPSAoKSA9PiB7XG4gIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfliJ3lp4vljJbkuK0uLi4nLCBtYXNrOiB0cnVlIH0pOy8vIOaPkOekuueUqOaIt+ato+WcqOWIneWni+WMllxuICBjb25zb2xlLmluZm8oJ+WIneasoeWQr+WKqCcpO1xuXG4gIC8vIOiuvue9ruS4u+mimFxuICBpZiAoYXBwT3B0aW9uLnRoZW1lID09PSAnYXV0bycpIHsgLy8g5Li76aKY5Li6YXV0b1xuICAgIGxldCBudW07XG4gICAgbGV0IHRoZW1lO1xuICAgIGNvbnN0IHsgcGxhdGZvcm0gfSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG5cbiAgICAvLyDmoLnmja7lubPlj7Dorr7nva7kuLvpophcbiAgICBzd2l0Y2ggKHBsYXRmb3JtKSB7XG4gICAgICBjYXNlICdpT1MnOlxuICAgICAgICB0aGVtZSA9ICdpT1MnO1xuICAgICAgICBudW0gPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0FuZHJvaWQnOlxuICAgICAgICB0aGVtZSA9ICdBbmRyb2lkJztcbiAgICAgICAgbnVtID0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGVtZSA9ICdpT1MnO1xuICAgICAgICBudW0gPSAwO1xuICAgIH1cblxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0aGVtZScsIHRoZW1lKTtcbiAgICB3eC5zZXRTdG9yYWdlU3luYygndGhlbWVOdW0nLCBudW0pO1xuXG4gIH0gZWxzZSB7XG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ3RoZW1lJywgYXBwT3B0aW9uLnRoZW1lKTtcbiAgICB3eC5zZXRTdG9yYWdlU3luYygndGhlbWVOdW0nLCBhcHBPcHRpb24udGhlbWVOdW0pO1xuICB9XG5cbiAgLy8g5YaZ5YWl6aKE6K6+5pWw5o2uXG4gIGZvciAoY29uc3QgZGF0YSBpbiBhcHBPcHRpb24pIGlmIChkYXRhICE9PSAndGhlbWUnKSB3eC5zZXRTdG9yYWdlU3luYyhkYXRhLCBhcHBPcHRpb25bZGF0YV0pO1xuXG4gIC8vIOS4i+i9vei1hOa6kOaWh+S7tuW5tuWGmeWFpeabtOaWsOaXtumXtFxuICBjb25zdCB0aW1lU3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICByZXNEb3dubG9hZChbJ3BhZ2UnLCAnZnVuY3Rpb24nXSk7XG4gIHd4LnNldFN0b3JhZ2VTeW5jKCdwYWdlVXBkYXRlVGltZScsIE1hdGgucm91bmQodGltZVN0YW1wIC8gMTAwMCkpO1xuICB3eC5zZXRTdG9yYWdlU3luYygnZnVuY3Rpb25VcGRhdGVUaW1lJywgTWF0aC5yb3VuZCh0aW1lU3RhbXAgLyAxMDAwKSk7XG5cbiAgLy8g5oiQ5Yqf5Yid5aeL5YyWXG4gIHd4LnNldFN0b3JhZ2VTeW5jKCdpbml0ZWQnLCB0cnVlKTtcbn07XG5pbnRlcmZhY2UgTm90aWNlTGlzdCB7XG4gIC8vIGFwcDogTm90aWNlO1xuICBbcHJvcHM6IHN0cmluZ106IHtcbiAgICAwOiBzdHJpbmc7XG4gICAgMTogc3RyaW5nO1xuICAgIDI6IG51bWJlcjtcbiAgICAzOiBib29sZWFuXG4gIH07XG59XG5cbi8qKlxuICog5by556qX6YCa55+l5qOA5p+lXG4gKlxuICogQHBhcmFtIHZlcnNpb24g5bCP56iL5bqP55qE54mI5pysXG4gKi9cbmNvbnN0IG5vdGljZUNoZWNrID0gKHZlcnNpb246IHN0cmluZykgPT4ge1xuXG4gICRteS5yZXF1ZXN0KGBjb25maWcvJHt2ZXJzaW9ufS9ub3RpY2VgLCBkYXRhID0+IHtcbiAgICBjb25zdCBub3RpY2VMaXN0ID0gZGF0YSBhcyBOb3RpY2VMaXN0XG4gICAgY29uc3QgY2F0ZWdvcnkgPSBPYmplY3Qua2V5cyhub3RpY2VMaXN0KTtcblxuICAgIGNhdGVnb3J5LmZvckVhY2gocGFnZSA9PiB7XG5cbiAgICAgIC8vIOWmguaenOivu+WPluWIsOW8uuWItumAmuefpeiuvue9ru+8jOavj+asoemDveimgemAmuefpe+8jOebtOaOpeWGmeWFpemAmuefpeS/oeaBr1xuICAgICAgaWYgKG5vdGljZUxpc3RbcGFnZV1bM10pIHtcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoYCR7cGFnZX1ub3RpY2VgLCBbbm90aWNlTGlzdFtwYWdlXVswXSwgbm90aWNlTGlzdFtwYWdlXVsxXV0pO1xuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhgJHtwYWdlfU5vdGlmeWAsIHRydWUpO1xuXG4gICAgICAgIC8vIOWmguaenOWcqOe6v+mAmuefpeeJiOacrOWPt+abtOmrmO+8jOWGmeWFpemAmuefpeWGheWuueOAgemAmuefpeaPkOekuuS4jumAmuefpeeJiOacrFxuICAgICAgfSBlbHNlIGlmIChub3RpY2VMaXN0W3BhZ2VdWzJdICE9PSB3eC5nZXRTdG9yYWdlU3luYyhgJHtwYWdlfW5vdGljZVZlcnNpb25gKSkge1xuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhgJHtwYWdlfW5vdGljZWAsIFtub3RpY2VMaXN0W3BhZ2VdWzBdLCBub3RpY2VMaXN0W3BhZ2VdWzFdXSk7XG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKGAke3BhZ2V9bm90aWNlVmVyc2lvbmAsIG5vdGljZUxpc3RbcGFnZV1bMl0pOyAvLyDlhpnlhaVcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoYCR7cGFnZX1Ob3RpZnlgLCB0cnVlKTsvLyDlhpnlhaVcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIOWmguaenOaJvuWIsEFQUOe6p+mAmuefpe+8jOeri+WNs+aPkOmGklxuICAgIGlmICgnYXBwJyBpbiBjYXRlZ29yeSkgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiBub3RpY2VMaXN0LmFwcFswXSwgY29udGVudDogbm90aWNlTGlzdC5hcHBbMV0sIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4gd3gucmVtb3ZlU3RvcmFnZVN5bmMoJ2FwcE5vdGlmeScpXG4gICAgfSk7XG4gIH0sICgpID0+IHsgLy8g6LCD6K+VXG4gICAgY29uc29sZS5lcnJvcignR2V0IG5vdGljZUxpc3QgZmFpbCcpO1xuICAgIGxvZ2dlci53YXJuKCdub3RpY2VMaXN0IGVycm9yJywgJ05ldCBFcnJvcicpO1xuICAgIHd4LnJlcG9ydE1vbml0b3IoJzI0JywgMSk7XG4gIH0sICgpID0+IHsgLy8g6LCD6K+VXG4gICAgY29uc29sZS5lcnJvcignTm90aWNlTGlzdCBhZGRyZXNzIGVycm9yJyk7XG4gICAgbG9nZ2VyLndhcm4oJ25vdGljZUxpc3QgZXJyb3InLCAnQWRkcmVzcyBFcnJvcicpO1xuICAgIHd4LnJlcG9ydE1vbml0b3IoJzI0JywgMSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiDlpJzpl7TmqKHlvI8gZm9yIGFwcC5qcyAmIHRoZW1lLmpzXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IOWknOmXtOaooeW8j+eKtuaAgVxuICovXG5leHBvcnQgY29uc3QgbmlnaHRtb2RlID0gKCkgPT4ge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgY29uc3QgdGltZSA9IGRhdGUuZ2V0SG91cnMoKSAqIDEwMCArIGRhdGUuZ2V0TWludXRlcygpOyAvLyDojrflvpflvZPliY3ml7bpl7RcbiAgY29uc3QgbmlnaHRNb2RlQ29uZGl0aW9uID0gd3guZ2V0U3RvcmFnZVN5bmMoJ25pZ2h0bW9kZScpO1xuICBjb25zdCBuaWdodG1vZGVBdXRvQ2hhbmdlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ25pZ2h0bW9kZUF1dG9DaGFuZ2UnKTsgLy8g6I635b6X5aSc6Ze05qih5byP44CB6Ieq5Yqo5byA5ZCv5aSc6Ze05qih5byP6K6+572uXG4gIGNvbnN0IG5pZ2h0QnJpZ2h0bmVzcyA9IHd4LmdldFN0b3JhZ2VTeW5jKCduaWdodEJyaWdodG5lc3MnKTtcbiAgY29uc3QgZGF5QnJpZ2h0bmVzcyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdkYXlCcmlnaHRuZXNzJyk7IC8vIOiOt+W+l+WknOmXtOaooeW8j+S6ruW6pu+8jOaXpea4kOaooeW8j+S6ruW6plxuICBjb25zdCBuaWdodEJyaWdodG5lc3NDaGFuZ2UgPSB3eC5nZXRTdG9yYWdlU3luYygnbmlnaHRCcmlnaHRuZXNzQ2hhbmdlJyk7XG4gIGNvbnN0IGRheUJyaWdodG5lc3NDaGFuZ2UgPSB3eC5nZXRTdG9yYWdlU3luYygnZGF5QnJpZ2h0bmVzc0NoYW5nZScpOyAvLyDojrflvpfml6XlpJzpl7TmqKHlvI/kuq7luqbmlLnlj5jnirbmgIFcbiAgY29uc3Qgbm1TdGFydCA9IHd4LmdldFN0b3JhZ2VTeW5jKCduaWdodG1vZGVTdGFydFRpbWUnKS5zcGxpdCgnLScpOyAvLyDojrflvpflpJzpl7TmqKHlvI/lvIDlp4vml7bpl7RcbiAgY29uc3Qgbm1FbmQgPSB3eC5nZXRTdG9yYWdlU3luYygnbmlnaHRtb2RlRW5kVGltZScpLnNwbGl0KCctJyk7IC8vIOiOt+W+l+WknOmXtOaooeW8j+e7k+adn+aXtumXtFxuICBjb25zdCBuaWdodG1vZGVTdGFydFRpbWUgPSBOdW1iZXIobm1TdGFydFswXSkgKiAxMDAgKyBOdW1iZXIobm1TdGFydFsxXSk7XG4gIGNvbnN0IG5pZ2h0bW9kZUVuZFRpbWUgPSBOdW1iZXIobm1FbmRbMF0pICogMTAwICsgTnVtYmVyKG5tRW5kWzFdKTtcbiAgbGV0IGN1cnJlbnROaWdodE1vZGVTdGF0dXM7XG5cbiAgLy8g5aaC5p6c5byA5ZCv5LqG6Ieq5Yqo5aSc6Ze05qih5byP77yM5Yik5pat5piv5ZCm5ZCv55So5aSc6Ze05qih5byP5Y+K5bqU55So5Lqu5bqmXG4gIGlmIChuaWdodG1vZGVBdXRvQ2hhbmdlKSB7XG4gICAgY3VycmVudE5pZ2h0TW9kZVN0YXR1cyA9XG4gICAgICBuaWdodG1vZGVTdGFydFRpbWUgPD0gbmlnaHRtb2RlRW5kVGltZVxuICAgICAgICA/IHRpbWUgPj0gbmlnaHRtb2RlU3RhcnRUaW1lICYmIHRpbWUgPD0gbmlnaHRtb2RlRW5kVGltZVxuICAgICAgICA6ICEodGltZSA8PSBuaWdodG1vZGVTdGFydFRpbWUgJiYgdGltZSA+PSBuaWdodG1vZGVFbmRUaW1lKTtcblxuICAgIGlmIChjdXJyZW50TmlnaHRNb2RlU3RhdHVzICYmIG5pZ2h0QnJpZ2h0bmVzc0NoYW5nZSkgd3guc2V0U2NyZWVuQnJpZ2h0bmVzcyh7IHZhbHVlOiBuaWdodEJyaWdodG5lc3MgLyAxMDAgfSk7XG4gICAgZWxzZSBpZiAoIWN1cnJlbnROaWdodE1vZGVTdGF0dXMgJiYgZGF5QnJpZ2h0bmVzc0NoYW5nZSkgd3guc2V0U2NyZWVuQnJpZ2h0bmVzcyh7IHZhbHVlOiBkYXlCcmlnaHRuZXNzIC8gMTAwIH0pO1xuXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ25pZ2h0bW9kZScsIGN1cnJlbnROaWdodE1vZGVTdGF0dXMpO1xuXG4gICAgLy8g5ZCm5YiZ5p+l55yL5aSc6Ze05qih5byP5byA5ZCv54q25oCB77yM5bm25qC55o2u54q25oCB5bqU55So5Yaz5a6a5piv5ZCm5bqU55So5Lqu5bqmXG4gIH0gZWxzZSB7XG4gICAgaWYgKG5pZ2h0TW9kZUNvbmRpdGlvbiAmJiBuaWdodEJyaWdodG5lc3NDaGFuZ2UpIHd4LnNldFNjcmVlbkJyaWdodG5lc3MoeyB2YWx1ZTogbmlnaHRCcmlnaHRuZXNzIC8gMTAwIH0pO1xuICAgIGVsc2UgaWYgKCFuaWdodE1vZGVDb25kaXRpb24gJiYgZGF5QnJpZ2h0bmVzc0NoYW5nZSkgd3guc2V0U2NyZWVuQnJpZ2h0bmVzcyh7IHZhbHVlOiBkYXlCcmlnaHRuZXNzIC8gMTAwIH0pO1xuXG4gICAgY3VycmVudE5pZ2h0TW9kZVN0YXR1cyA9IG5pZ2h0TW9kZUNvbmRpdGlvbjtcbiAgfVxuXG4gIHJldHVybiBjdXJyZW50TmlnaHRNb2RlU3RhdHVzOy8vIOi/lOWbnuWknOmXtOaooeW8j+eKtuaAgVxufTtcblxuaW50ZXJmYWNlIFZlcnNpb25JbmZvIHtcbiAgZm9yY2VVcGRhdGU6IGJvb2xlYW47XG4gIHJlc2V0OiBib29sZWFuO1xuICB2ZXJzaW9uOiBzdHJpbmc7XG59XG5cblxuLyoqXG4gKiDmo4Dmn6XlsI/nqIvluo/mm7TmlrDlubblupTnlKhcbiAqXG4gKiBAcGFyYW0gbG9jYWxWZXJzaW9uIOWwj+eoi+W6j+eahOacrOWcsOeJiOacrFxuICovXG5jb25zdCBhcHBVcGRhdGUgPSAobG9jYWxWZXJzaW9uOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgdXBkYXRlTWFuYWdlciA9IHd4LmdldFVwZGF0ZU1hbmFnZXIoKTtcbiAgbGV0IHZlcnNpb247XG4gIGxldCBmb3JjZVVwZGF0ZSA9IHRydWU7XG4gIGxldCByZXNldCA9IGZhbHNlO1xuXG4gIC8vIOajgOafpeabtOaWsFxuICB1cGRhdGVNYW5hZ2VyLm9uQ2hlY2tGb3JVcGRhdGUoc3RhdHVzID0+IHtcblxuICAgIC8vIOaJvuWIsOabtOaWsO+8jOaPkOekuueUqOaIt+iOt+WPluWIsOabtOaWsFxuICAgIGlmIChzdGF0dXMuaGFzVXBkYXRlKSAkbXkudGlwKCflj5HnjrDlsI/nqIvluo/mm7TmlrDvvIzkuIvovb3kuK0uLi4nKTtcbiAgfSk7XG5cbiAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZVJlYWR5KCgpID0+IHtcblxuICAgIC8vIOivt+axgumFjee9ruaWh+S7tlxuICAgICRteS5yZXF1ZXN0KGBjb25maWcvJHtsb2NhbFZlcnNpb259L2NvbmZpZ2AsIGRhdGEgPT4ge1xuICAgICAgKHsgZm9yY2VVcGRhdGUsIHJlc2V0LCB2ZXJzaW9uIH0gPSBkYXRhIGFzIFZlcnNpb25JbmZvKTtcblxuICAgICAgLy8g5pu05paw5LiL6L295bCx57uq77yM5o+Q56S655So5oi36YeN5paw5ZCv5YqoXG4gICAgICBpZiAoZm9yY2VVcGRhdGUpXG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICflt7Lmib7liLDmlrDniYjmnKwnLFxuICAgICAgICAgIGNvbnRlbnQ6IGDmlrDniYjmnKwke3ZlcnNpb2595bey5LiL6L2977yM6K+36YeN5ZCv5bqU55So5pu05paw44CCJHsocmVzZXQgPyAn6K+l54mI5pys5Lya5Yid5aeL5YyW5bCP56iL5bqP44CCJyA6ICcnKX1gLFxuICAgICAgICAgIHNob3dDYW5jZWw6ICFyZXNldCwgY29uZmlybVRleHQ6ICflupTnlKgnLCBjYW5jZWxUZXh0OiAn5Y+W5raIJyxcbiAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgLy8g55So5oi356Gu6K6k77yM5bqU55So5pu05pawXG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcblxuICAgICAgICAgICAgICAvLyDpnIDopoHliJ3lp4vljJZcbiAgICAgICAgICAgICAgaWYgKHJlc2V0KSB7XG4gICAgICAgICAgICAgICAgLy8g5pi+56S65o+Q56S6XG4gICAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+WIneWni+WMluS4rScsIG1hc2s6IHRydWUgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyDmuIXpmaTmlofku7bns7vnu5/mlofku7bkuI7mlbDmja7lrZjlgqhcbiAgICAgICAgICAgICAgICAkZmlsZS5saXN0RmlsZSgnJykuZm9yRWFjaChmaWxlUGF0aCA9PiB7XG4gICAgICAgICAgICAgICAgICAkZmlsZS5EZWxldGUoZmlsZVBhdGgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHd4LmNsZWFyU3RvcmFnZVN5bmMoKTtcblxuICAgICAgICAgICAgICAgIC8vIOmakOiXj+aPkOekulxuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyDlupTnlKjmm7TmlrBcbiAgICAgICAgICAgICAgdXBkYXRlTWFuYWdlci5hcHBseVVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIOabtOaWsOS4i+i9veWksei0pVxuICB1cGRhdGVNYW5hZ2VyLm9uVXBkYXRlRmFpbGVkKCgpID0+IHtcblxuICAgIC8vIOaPkOekuueUqOaIt+e9kee7nOWHuueOsOmXrumimFxuICAgICRteS50aXAoJ+Wwj+eoi+W6j+abtOaWsOS4i+i9veWksei0pe+8jOivt+ajgOafpeaCqOeahOe9kee7nO+8gScpO1xuXG4gICAgLy8g6LCD6K+VXG4gICAgY29uc29sZS53YXJuKCdVcGRhdGUgZmFpbHVyZScpO1xuICAgIHd4LnJlcG9ydE1vbml0b3IoJzIzJywgMSk7XG4gICAgbG9nZ2VyLndhcm4oJ1VwYXRlIEFwcCBlcnJvciBiZWNhdXNlIG9mIE5ldCBFcnJvcicpO1xuXG4gIH0pO1xufTtcblxuLyoqXG4gKiDlsI/nqIvluo/lkK/liqjml7bnmoTov5DooYzlh73mlbBcbiAqXG4gKiBAcGFyYW0gdmVyc2lvbiDlsI/nqIvluo/nmoTniYjmnKxcbiAqL1xuY29uc3Qgc3RhcnR1cCA9ICh2ZXJzaW9uOiBzdHJpbmcpID0+IHtcblxuICAvLyDorr7nva7lhoXlrZjkuI3otrPorablkYpcbiAgd3gub25NZW1vcnlXYXJuaW5nKHJlcyA9PiB7XG4gICAgJG15LnRpcCgn5YaF5a2Y5LiN6LazJyk7XG4gICAgY29uc29sZS53YXJuKCdvbk1lbW9yeVdhcm5pbmdSZWNlaXZlJyk7XG4gICAgd3gucmVwb3J0QW5hbHl0aWNzKCdtZW1vcnlfd2FybmluZycsIHtcbiAgICAgIG1lbW9yeV93YXJuaW5nOiByZXMgJiYgcmVzLmxldmVsID8gcmVzLmxldmVsIDogMCxcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8g6I635Y+W572R57uc5L+h5oGvXG4gIHd4LmdldE5ldHdvcmtUeXBlKHtcbiAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgY29uc3QgeyBuZXR3b3JrVHlwZSB9ID0gcmVzO1xuXG4gICAgICBpZiAobmV0d29ya1R5cGUgPT09ICdub25lJyB8fCBuZXR3b3JrVHlwZSA9PT0gJ3Vua25vd24nKSAkbXkudGlwKCfmgqjnmoTnvZHnu5znirbmgIHkuI3kvbMnKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIOebkeWQrOe9kee7nOeKtuaAgVxuICB3eC5vbk5ldHdvcmtTdGF0dXNDaGFuZ2UocmVzID0+IHtcblxuICAgIC8vIOaYvuekuuaPkOekulxuICAgIGlmICghcmVzLmlzQ29ubmVjdGVkKSB7XG4gICAgICAkbXkudGlwKCfnvZHnu5zov57mjqXkuK3mlq0s6YOo5YiG5bCP56iL5bqP5Yqf6IO95pqC5LiN5Y+v55SoJyk7XG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnbmV0d29ya0Vycm9yJywgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmICh3eC5nZXRTdG9yYWdlU3luYygnbmV0d29yaycpKSB7XG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnbmV0d29ya0Vycm9yJywgZmFsc2UpO1xuICAgICAgJG15LnRpcCgn572R57uc6ZO+5o6l5oGi5aSNJyk7XG4gICAgfVxuICB9KTtcblxuICAvLyDnm5HlkKznlKjmiLfmiKrlsY9cbiAgd3gub25Vc2VyQ2FwdHVyZVNjcmVlbigoKSA9PiB7XG4gICAgJG15LnRpcCgn5oKo5Y+v5Lul54K55Ye75Y+z5LiK6KeS4oCU4oCU6L2s5Y+R5oiW54K55Ye76aG16Z2i5Y+z5LiL6KeS4oCU4oCU5L+d5a2Y5LqM57u056CB5YiG5Lqr5bCP56iL5bqPJyk7XG4gIH0pO1xuXG4gIC8vIOajgOafpemAmuefpeabtOaWsOS4juWwj+eoi+W6j+abtOaWsFxuICBub3RpY2VDaGVjayh2ZXJzaW9uKTtcbiAgYXBwVXBkYXRlKHZlcnNpb24pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgeyBhcHBJbml0LCBhcHBVcGRhdGUsIG5pZ2h0bW9kZSwgbm90aWNlQ2hlY2ssIHN0YXJ0dXAgfTtcbiJdfQ==