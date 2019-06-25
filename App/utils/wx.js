"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = wx.getLogManager({ level: 1 });
var tip = function (text, duration, icon) {
    if (icon === void 0) { icon = 'none'; }
    wx.showToast({ title: text, icon: icon, duration: duration ? duration : 1500 });
};
var netWorkReport = function () {
    wx.getNetworkType({
        success: function (res) {
            var networkType = res.networkType;
            if (networkType === '2g' || networkType === '3g')
                tip('您的网络状态不佳');
            else if (networkType === 'none' || networkType === 'unknown')
                tip('您的网络状态不佳');
            else if (networkType === 'wifi')
                wx.getConnectedWifi({
                    success: function (info) {
                        if (info.wifi.signalStrength < 0.5)
                            tip('Wifi信号不佳，网络链接失败');
                    },
                    fail: function () {
                        tip('无法连接网络');
                    }
                });
            else
                tip('网络连接出现问题，请稍后重试');
            logger.warn('Request fail with', networkType);
        },
        fail: function () {
            tip('网络连接出现问题，请稍后重试');
            logger.warn('Request fail and cannot get networkType');
        }
    });
};
var request = function (path, callback, failFunc, errorFunc) {
    wx.request({
        url: "https://mp.nenuyouth.com/" + path + ".json",
        success: function (res) {
            console.log('Request success:', res);
            if (res.statusCode === 200)
                return callback(res.data);
            tip('服务器出现问题，请稍后重试');
            console.warn("Request " + path + " fail: " + res.statusCode);
            logger.warn("Request " + path + " fail: " + res.statusCode);
            wx.reportMonitor('3', 1);
            if (errorFunc)
                errorFunc(res.statusCode);
            return null;
        },
        fail: function (failMsg) {
            if (failFunc)
                failFunc(failMsg);
            netWorkReport();
            console.warn("Request " + path + " fail:", failMsg);
            logger.warn("Request " + path + " fail:", failMsg);
            wx.reportMonitor('4', 1);
        }
    });
};
var downLoad = function (path, callback, failFunc, errorFunc) {
    var progress = wx.downloadFile({
        url: "https://mp.nenuyouth.com/" + path,
        success: function (res) {
            if (res.statusCode === 200)
                return callback(res.tempFilePath);
            tip('服务器出现问题，请稍后重试');
            if (errorFunc)
                errorFunc(res.statusCode);
            console.warn("DownLoad " + path + " fail: " + res.statusCode);
            logger.warn("DownLoad " + path + " fail: " + res.statusCode);
            return null;
        },
        fail: function (failMsg) {
            if (failFunc)
                failFunc(failMsg);
            netWorkReport();
            console.warn("DownLoad " + path + " fail:", failMsg);
            logger.warn("DownLoad " + path + " fail:", failMsg);
        }
    });
    progress.onProgressUpdate(function (res) {
        wx.showLoading({ title: "\u4E0B\u8F7D\u4E2D" + Math.round(res.progress) + "%" });
    });
};
exports.default = { downLoad: downLoad, netReport: netWorkReport, request: request, tip: tip };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVNBLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQVM5QyxJQUFNLEdBQUcsR0FBRyxVQUFDLElBQVksRUFBRSxRQUFpQixFQUFFLElBQTZDO0lBQTdDLHFCQUFBLEVBQUEsYUFBNkM7SUFDekYsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFBLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzVFLENBQUMsQ0FBQztBQU9GLElBQU0sYUFBYSxHQUFHO0lBR3BCLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFDaEIsT0FBTyxFQUFFLFVBQUEsR0FBRztZQUNGLElBQUEsNkJBQVcsQ0FBUztZQUU1QixJQUFJLFdBQVcsS0FBSyxJQUFJLElBQUksV0FBVyxLQUFLLElBQUk7Z0JBQzlDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDYixJQUFJLFdBQVcsS0FBSyxNQUFNLElBQUksV0FBVyxLQUFLLFNBQVM7Z0JBQzFELEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDYixJQUFJLFdBQVcsS0FBSyxNQUFNO2dCQUM3QixFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQ2xCLE9BQU8sRUFBRSxVQUFBLElBQUk7d0JBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHOzRCQUNoQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDM0IsQ0FBQztvQkFDRCxJQUFJLEVBQUU7d0JBQ0osR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNoQixDQUFDO2lCQUNGLENBQUMsQ0FBQzs7Z0JBQ0EsR0FB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LE9BQU8sQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FDRixDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsVUFBQSxHQUFHO1FBQzNCLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsdUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQUcsRUFBRSxDQUFDLENBQUE7SUFDOUQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixrQkFBZSxFQUFFLFFBQVEsVUFBQSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsT0FBTyxTQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBNci5Ib3BlXG4gKiBATGFzdEVkaXRvcnM6IE1yLkhvcGVcbiAqIEBEZXNjcmlwdGlvbjog5Lqk5LqS5qih5Z2XXG4gKiBARGF0ZTogMjAxOS0wNC0xMSAxNTo0ODo0NVxuICogQExhc3RFZGl0VGltZTogMjAxOS0wNi0yNSAxOTo0MzoyNlxuICovXG5cbi8vIOWIneWni+WMluaXpeW/l+euoeeQhuWZqFxuY29uc3QgbG9nZ2VyID0gd3guZ2V0TG9nTWFuYWdlcih7IGxldmVsOiAxIH0pO1xuXG4vKipcbiAqIOaYvuekuuaPkOekuuaWh+Wtl1xuICpcbiAqIEBwYXJhbSB0ZXh0IOaPkOekuuaWh+Wtl1xuICogQHBhcmFtIFtkdXJhdGlvbj0xNTAwXSDmj5DnpLrmjIHnu63ml7bpl7RcbiAqIEBwYXJhbSBbaWNvbj0nbm9uZSddIOaPkOekuuWbvuagh1xuICovXG5jb25zdCB0aXAgPSAodGV4dDogc3RyaW5nLCBkdXJhdGlvbj86IG51bWJlciwgaWNvbjogJ3N1Y2Nlc3MnIHwgJ2xvYWRpbmcnIHwgJ25vbmUnID0gJ25vbmUnKSA9PiB7XG4gIHd4LnNob3dUb2FzdCh7IHRpdGxlOiB0ZXh0LCBpY29uLCBkdXJhdGlvbjogZHVyYXRpb24gPyBkdXJhdGlvbiA6IDE1MDAgfSk7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbjog572R57uc54q25oCB5rGH5oqlXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IG5ldFdvcmtSZXBvcnQgPSAoKSA9PiB7XG5cbiAgLy8g6I635Y+W572R57uc5L+h5oGvXG4gIHd4LmdldE5ldHdvcmtUeXBlKHtcbiAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgY29uc3QgeyBuZXR3b3JrVHlwZSB9ID0gcmVzO1xuXG4gICAgICBpZiAobmV0d29ya1R5cGUgPT09ICcyZycgfHwgbmV0d29ya1R5cGUgPT09ICczZycpXG4gICAgICAgIHRpcCgn5oKo55qE572R57uc54q25oCB5LiN5L2zJyk7XG4gICAgICBlbHNlIGlmIChuZXR3b3JrVHlwZSA9PT0gJ25vbmUnIHx8IG5ldHdvcmtUeXBlID09PSAndW5rbm93bicpXG4gICAgICAgIHRpcCgn5oKo55qE572R57uc54q25oCB5LiN5L2zJyk7XG4gICAgICBlbHNlIGlmIChuZXR3b3JrVHlwZSA9PT0gJ3dpZmknKVxuICAgICAgICB3eC5nZXRDb25uZWN0ZWRXaWZpKHtcbiAgICAgICAgICBzdWNjZXNzOiBpbmZvID0+IHtcbiAgICAgICAgICAgIGlmIChpbmZvLndpZmkuc2lnbmFsU3RyZW5ndGggPCAwLjUpXG4gICAgICAgICAgICAgIHRpcCgnV2lmaeS/oeWPt+S4jeS9s++8jOe9kee7nOmTvuaOpeWksei0pScpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgdGlwKCfml6Dms5Xov57mjqXnvZHnu5wnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgZWxzZSB0aXAoJ+e9kee7nOi/nuaOpeWHuueOsOmXrumimO+8jOivt+eojeWQjumHjeivlScpO1xuXG4gICAgICBsb2dnZXIud2FybignUmVxdWVzdCBmYWlsIHdpdGgnLCBuZXR3b3JrVHlwZSk7XG4gICAgfSxcbiAgICBmYWlsOiAoKSA9PiB7XG4gICAgICB0aXAoJ+e9kee7nOi/nuaOpeWHuueOsOmXrumimO+8jOivt+eojeWQjumHjeivlScpO1xuXG4gICAgICBsb2dnZXIud2FybignUmVxdWVzdCBmYWlsIGFuZCBjYW5ub3QgZ2V0IG5ldHdvcmtUeXBlJyk7XG4gICAgfVxuICB9KTtcbn07XG5cbmludGVyZmFjZSBOb3JtYWxPYmplY3Qge1xuICBbcHJvcHM6IHN0cmluZ106IGFueTtcbn1cblxuLyoqXG4gKiDljIXoo4V3eC5yZXF1ZXN0XG4gKlxuICogQHBhcmFtIHBhdGgg6K+35rGC6Lev5b6EXG4gKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCD5Ye95pWwXG4gKiBAcGFyYW0gW2ZhaWxGdW5jXSDlpLHotKXlm57osIPlh73mlbBcbiAqIEBwYXJhbSBbZXJyb3JGdW5jXSDojrflj5bplJnor6/lm57osIPlh73mlbBcbiAqL1xuY29uc3QgcmVxdWVzdCA9IChcbiAgcGF0aDogc3RyaW5nLFxuICBjYWxsYmFjazogKGRhdGE6IE5vcm1hbE9iamVjdCkgPT4gdm9pZCxcbiAgZmFpbEZ1bmM/OiAoZXJyTXNnOiB3eC5HZW5lcmFsQ2FsbGJhY2tSZXN1bHQpID0+IHZvaWQsXG4gIGVycm9yRnVuYz86IChzdGF0dXNDb2RlOiBudW1iZXIpID0+IHZvaWRcbikgPT4ge1xuICB3eC5yZXF1ZXN0KHtcbiAgICB1cmw6IGBodHRwczovL21wLm5lbnV5b3V0aC5jb20vJHtwYXRofS5qc29uYCxcbiAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1JlcXVlc3Qgc3VjY2VzczonLCByZXMpOy8vIOiwg+ivlVxuICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHJldHVybiBjYWxsYmFjayhyZXMuZGF0YSBhcyBvYmplY3QpO1xuXG4gICAgICB0aXAoJ+acjeWKoeWZqOWHuueOsOmXrumimO+8jOivt+eojeWQjumHjeivlScpO1xuICAgICAgLy8g6LCD6K+VXG4gICAgICBjb25zb2xlLndhcm4oYFJlcXVlc3QgJHtwYXRofSBmYWlsOiAke3Jlcy5zdGF0dXNDb2RlfWApO1xuICAgICAgbG9nZ2VyLndhcm4oYFJlcXVlc3QgJHtwYXRofSBmYWlsOiAke3Jlcy5zdGF0dXNDb2RlfWApO1xuICAgICAgd3gucmVwb3J0TW9uaXRvcignMycsIDEpO1xuXG4gICAgICBpZiAoZXJyb3JGdW5jKSBlcnJvckZ1bmMocmVzLnN0YXR1c0NvZGUpO1xuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIGZhaWw6IGZhaWxNc2cgPT4ge1xuICAgICAgaWYgKGZhaWxGdW5jKSBmYWlsRnVuYyhmYWlsTXNnKTtcbiAgICAgIG5ldFdvcmtSZXBvcnQoKTtcblxuICAgICAgLy8g6LCD6K+VXG4gICAgICBjb25zb2xlLndhcm4oYFJlcXVlc3QgJHtwYXRofSBmYWlsOmAsIGZhaWxNc2cpO1xuICAgICAgbG9nZ2VyLndhcm4oYFJlcXVlc3QgJHtwYXRofSBmYWlsOmAsIGZhaWxNc2cpO1xuICAgICAgd3gucmVwb3J0TW9uaXRvcignNCcsIDEpO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqIOWMheijhXd4LmRvd25sb2FkRmlsZVxuICpcbiAqIEBwYXJhbSBwYXRoIOS4i+i9vei3r+W+hFxuICogQHBhcmFtIGNhbGxiYWNrIOaIkOWKn+Wbnuiwg+WHveaVsFxuICogQHBhcmFtIFtmYWlsRnVuY10g5aSx6LSl5Zue6LCD5Ye95pWwXG4gKiBAcGFyYW0gW2Vycm9yRnVuY10g54q25oCB56CB6ZSZ6K+v5Li65Zue6LCD5Ye95pWwXG4gKi9cbmNvbnN0IGRvd25Mb2FkID0gKFxuICBwYXRoOiBzdHJpbmcsXG4gIGNhbGxiYWNrOiAocGF0aDogc3RyaW5nKSA9PiB2b2lkLFxuICBmYWlsRnVuYz86IChlcnJNc2c6IHd4LkdlbmVyYWxDYWxsYmFja1Jlc3VsdCkgPT4gdm9pZCxcbiAgZXJyb3JGdW5jPzogKHN0YXR1c0NvZGU6IG51bWJlcikgPT4gdm9pZFxuKSA9PiB7XG4gIGNvbnN0IHByb2dyZXNzID0gd3guZG93bmxvYWRGaWxlKHtcbiAgICB1cmw6IGBodHRwczovL21wLm5lbnV5b3V0aC5jb20vJHtwYXRofWAsXG4gICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSByZXR1cm4gY2FsbGJhY2socmVzLnRlbXBGaWxlUGF0aCk7XG5cbiAgICAgIHRpcCgn5pyN5Yqh5Zmo5Ye6546w6Zeu6aKY77yM6K+356iN5ZCO6YeN6K+VJyk7XG4gICAgICBpZiAoZXJyb3JGdW5jKSBlcnJvckZ1bmMocmVzLnN0YXR1c0NvZGUpO1xuXG4gICAgICAvLyDosIPor5VcbiAgICAgIGNvbnNvbGUud2FybihgRG93bkxvYWQgJHtwYXRofSBmYWlsOiAke3Jlcy5zdGF0dXNDb2RlfWApO1xuICAgICAgbG9nZ2VyLndhcm4oYERvd25Mb2FkICR7cGF0aH0gZmFpbDogJHtyZXMuc3RhdHVzQ29kZX1gKTtcblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBmYWlsOiBmYWlsTXNnID0+IHtcbiAgICAgIGlmIChmYWlsRnVuYykgZmFpbEZ1bmMoZmFpbE1zZyk7XG4gICAgICBuZXRXb3JrUmVwb3J0KCk7XG4gICAgICBjb25zb2xlLndhcm4oYERvd25Mb2FkICR7cGF0aH0gZmFpbDpgLCBmYWlsTXNnKTtcbiAgICAgIGxvZ2dlci53YXJuKGBEb3duTG9hZCAke3BhdGh9IGZhaWw6YCwgZmFpbE1zZyk7XG4gICAgfVxuICB9KTtcblxuICBwcm9ncmVzcy5vblByb2dyZXNzVXBkYXRlKHJlcyA9PiB7XG4gICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogYOS4i+i9veS4rSR7TWF0aC5yb3VuZChyZXMucHJvZ3Jlc3MpfSVgIH0pXG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgeyBkb3duTG9hZCwgbmV0UmVwb3J0OiBuZXRXb3JrUmVwb3J0LCByZXF1ZXN0LCB0aXAgfTtcbiJdfQ==