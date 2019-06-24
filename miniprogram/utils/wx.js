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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVNBLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQVM5QyxJQUFNLEdBQUcsR0FBRyxVQUFDLElBQVksRUFBRSxRQUFpQixFQUFFLElBQTZDO0lBQTdDLHFCQUFBLEVBQUEsYUFBNkM7SUFDekYsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFBLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzVFLENBQUMsQ0FBQztBQU9GLElBQU0sYUFBYSxHQUFHO0lBR3BCLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFDaEIsT0FBTyxFQUFFLFVBQUEsR0FBRztZQUNGLElBQUEsNkJBQVcsQ0FBUztZQUU1QixJQUFJLFdBQVcsS0FBSyxJQUFJLElBQUksV0FBVyxLQUFLLElBQUk7Z0JBQzlDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDYixJQUFJLFdBQVcsS0FBSyxNQUFNLElBQUksV0FBVyxLQUFLLFNBQVM7Z0JBQzFELEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDYixJQUFJLFdBQVcsS0FBSyxNQUFNO2dCQUM3QixFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQ2xCLE9BQU8sRUFBRSxVQUFBLElBQUk7d0JBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHOzRCQUNoQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDM0IsQ0FBQztvQkFDRCxJQUFJLEVBQUU7d0JBQ0osR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNoQixDQUFDO2lCQUNGLENBQUMsQ0FBQzs7Z0JBQ0EsR0FB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LE9BQU8sQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FDRixDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsVUFBQSxHQUFHO1FBQzNCLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsdUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQUcsRUFBRSxDQUFDLENBQUE7SUFDOUQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixrQkFBZSxFQUFFLFFBQVEsVUFBQSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsT0FBTyxTQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBNci5Ib3BlXG4gKiBATGFzdEVkaXRvcnM6IE1yLkhvcGVcbiAqIEBEZXNjcmlwdGlvbjog5Lqk5LqS5qih5Z2XXG4gKiBARGF0ZTogMjAxOS0wNC0xMSAxNTo0ODo0NVxuICogQExhc3RFZGl0VGltZTogMjAxOS0wNi0yNSAwMDowMDozMFxuICovXG5cbi8vIOWIneWni+WMluaXpeW/l+euoeeQhuWZqFxuY29uc3QgbG9nZ2VyID0gd3guZ2V0TG9nTWFuYWdlcih7IGxldmVsOiAxIH0pO1xuXG4vKipcbiAqIOaYvuekuuaPkOekuuaWh+Wtl1xuICpcbiAqIEBwYXJhbSB0ZXh0IOaPkOekuuaWh+Wtl1xuICogQHBhcmFtIFtkdXJhdGlvbj0xNTAwXSDmj5DnpLrmjIHnu63ml7bpl7RcbiAqIEBwYXJhbSBbaWNvbj0nbm9uZSddIOaPkOekuuWbvuagh1xuICovXG5jb25zdCB0aXAgPSAodGV4dDogc3RyaW5nLCBkdXJhdGlvbj86IG51bWJlciwgaWNvbjogJ3N1Y2Nlc3MnIHwgJ2xvYWRpbmcnIHwgJ25vbmUnID0gJ25vbmUnKSA9PiB7XG4gIHd4LnNob3dUb2FzdCh7IHRpdGxlOiB0ZXh0LCBpY29uLCBkdXJhdGlvbjogZHVyYXRpb24gPyBkdXJhdGlvbiA6IDE1MDAgfSk7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbjog572R57uc54q25oCB5rGH5oqlXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IG5ldFdvcmtSZXBvcnQgPSAoKSA9PiB7XG5cbiAgLy8g6I635Y+W572R57uc5L+h5oGvXG4gIHd4LmdldE5ldHdvcmtUeXBlKHtcbiAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgY29uc3QgeyBuZXR3b3JrVHlwZSB9ID0gcmVzO1xuXG4gICAgICBpZiAobmV0d29ya1R5cGUgPT09ICcyZycgfHwgbmV0d29ya1R5cGUgPT09ICczZycpXG4gICAgICAgIHRpcCgn5oKo55qE572R57uc54q25oCB5LiN5L2zJyk7XG4gICAgICBlbHNlIGlmIChuZXR3b3JrVHlwZSA9PT0gJ25vbmUnIHx8IG5ldHdvcmtUeXBlID09PSAndW5rbm93bicpXG4gICAgICAgIHRpcCgn5oKo55qE572R57uc54q25oCB5LiN5L2zJyk7XG4gICAgICBlbHNlIGlmIChuZXR3b3JrVHlwZSA9PT0gJ3dpZmknKVxuICAgICAgICB3eC5nZXRDb25uZWN0ZWRXaWZpKHtcbiAgICAgICAgICBzdWNjZXNzOiBpbmZvID0+IHtcbiAgICAgICAgICAgIGlmIChpbmZvLndpZmkuc2lnbmFsU3RyZW5ndGggPCAwLjUpXG4gICAgICAgICAgICAgIHRpcCgnV2lmaeS/oeWPt+S4jeS9s++8jOe9kee7nOmTvuaOpeWksei0pScpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgdGlwKCfml6Dms5Xov57mjqXnvZHnu5wnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgZWxzZSB0aXAoJ+e9kee7nOi/nuaOpeWHuueOsOmXrumimO+8jOivt+eojeWQjumHjeivlScpO1xuXG4gICAgICBsb2dnZXIud2FybignUmVxdWVzdCBmYWlsIHdpdGgnLCBuZXR3b3JrVHlwZSk7XG4gICAgfSxcbiAgICBmYWlsOiAoKSA9PiB7XG4gICAgICB0aXAoJ+e9kee7nOi/nuaOpeWHuueOsOmXrumimO+8jOivt+eojeWQjumHjeivlScpO1xuXG4gICAgICBsb2dnZXIud2FybignUmVxdWVzdCBmYWlsIGFuZCBjYW5ub3QgZ2V0IG5ldHdvcmtUeXBlJyk7XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuICog5YyF6KOFd3gucmVxdWVzdFxuICpcbiAqIEBwYXJhbSBwYXRoIOivt+axgui3r+W+hFxuICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg+WHveaVsFxuICogQHBhcmFtIFtmYWlsRnVuY10g5aSx6LSl5Zue6LCD5Ye95pWwXG4gKiBAcGFyYW0gW2Vycm9yRnVuY10g6I635Y+W6ZSZ6K+v5Zue6LCD5Ye95pWwXG4gKi9cbmNvbnN0IHJlcXVlc3QgPSAoXG4gIHBhdGg6IHN0cmluZyxcbiAgY2FsbGJhY2s6IChkYXRhOiBvYmplY3QpID0+IHZvaWQsXG4gIGZhaWxGdW5jPzogKGVyck1zZzogd3guR2VuZXJhbENhbGxiYWNrUmVzdWx0KSA9PiB2b2lkLFxuICBlcnJvckZ1bmM/OiAoc3RhdHVzQ29kZTogbnVtYmVyKSA9PiB2b2lkXG4pID0+IHtcbiAgd3gucmVxdWVzdCh7XG4gICAgdXJsOiBgaHR0cHM6Ly9tcC5uZW51eW91dGguY29tLyR7cGF0aH0uanNvbmAsXG4gICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0IHN1Y2Nlc3M6JywgcmVzKTsvLyDosIPor5VcbiAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSByZXR1cm4gY2FsbGJhY2socmVzLmRhdGEgYXMgb2JqZWN0KTtcblxuICAgICAgdGlwKCfmnI3liqHlmajlh7rnjrDpl67popjvvIzor7fnqI3lkI7ph43or5UnKTtcbiAgICAgIC8vIOiwg+ivlVxuICAgICAgY29uc29sZS53YXJuKGBSZXF1ZXN0ICR7cGF0aH0gZmFpbDogJHtyZXMuc3RhdHVzQ29kZX1gKTtcbiAgICAgIGxvZ2dlci53YXJuKGBSZXF1ZXN0ICR7cGF0aH0gZmFpbDogJHtyZXMuc3RhdHVzQ29kZX1gKTtcbiAgICAgIHd4LnJlcG9ydE1vbml0b3IoJzMnLCAxKTtcblxuICAgICAgaWYgKGVycm9yRnVuYykgZXJyb3JGdW5jKHJlcy5zdGF0dXNDb2RlKTtcblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBmYWlsOiBmYWlsTXNnID0+IHtcbiAgICAgIGlmIChmYWlsRnVuYykgZmFpbEZ1bmMoZmFpbE1zZyk7XG4gICAgICBuZXRXb3JrUmVwb3J0KCk7XG5cbiAgICAgIC8vIOiwg+ivlVxuICAgICAgY29uc29sZS53YXJuKGBSZXF1ZXN0ICR7cGF0aH0gZmFpbDpgLCBmYWlsTXNnKTtcbiAgICAgIGxvZ2dlci53YXJuKGBSZXF1ZXN0ICR7cGF0aH0gZmFpbDpgLCBmYWlsTXNnKTtcbiAgICAgIHd4LnJlcG9ydE1vbml0b3IoJzQnLCAxKTtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiDljIXoo4V3eC5kb3dubG9hZEZpbGVcbiAqXG4gKiBAcGFyYW0gcGF0aCDkuIvovb3ot6/lvoRcbiAqIEBwYXJhbSBjYWxsYmFjayDmiJDlip/lm57osIPlh73mlbBcbiAqIEBwYXJhbSBbZmFpbEZ1bmNdIOWksei0peWbnuiwg+WHveaVsFxuICogQHBhcmFtIFtlcnJvckZ1bmNdIOeKtuaAgeeggemUmeivr+S4uuWbnuiwg+WHveaVsFxuICovXG5jb25zdCBkb3duTG9hZCA9IChcbiAgcGF0aDogc3RyaW5nLFxuICBjYWxsYmFjazogKHBhdGg6IHN0cmluZykgPT4gdm9pZCxcbiAgZmFpbEZ1bmM/OiAoZXJyTXNnOiB3eC5HZW5lcmFsQ2FsbGJhY2tSZXN1bHQpID0+IHZvaWQsXG4gIGVycm9yRnVuYz86IChzdGF0dXNDb2RlOiBudW1iZXIpID0+IHZvaWRcbikgPT4ge1xuICBjb25zdCBwcm9ncmVzcyA9IHd4LmRvd25sb2FkRmlsZSh7XG4gICAgdXJsOiBgaHR0cHM6Ly9tcC5uZW51eW91dGguY29tLyR7cGF0aH1gLFxuICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkgcmV0dXJuIGNhbGxiYWNrKHJlcy50ZW1wRmlsZVBhdGgpO1xuXG4gICAgICB0aXAoJ+acjeWKoeWZqOWHuueOsOmXrumimO+8jOivt+eojeWQjumHjeivlScpO1xuICAgICAgaWYgKGVycm9yRnVuYykgZXJyb3JGdW5jKHJlcy5zdGF0dXNDb2RlKTtcblxuICAgICAgLy8g6LCD6K+VXG4gICAgICBjb25zb2xlLndhcm4oYERvd25Mb2FkICR7cGF0aH0gZmFpbDogJHtyZXMuc3RhdHVzQ29kZX1gKTtcbiAgICAgIGxvZ2dlci53YXJuKGBEb3duTG9hZCAke3BhdGh9IGZhaWw6ICR7cmVzLnN0YXR1c0NvZGV9YCk7XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgZmFpbDogZmFpbE1zZyA9PiB7XG4gICAgICBpZiAoZmFpbEZ1bmMpIGZhaWxGdW5jKGZhaWxNc2cpO1xuICAgICAgbmV0V29ya1JlcG9ydCgpO1xuICAgICAgY29uc29sZS53YXJuKGBEb3duTG9hZCAke3BhdGh9IGZhaWw6YCwgZmFpbE1zZyk7XG4gICAgICBsb2dnZXIud2FybihgRG93bkxvYWQgJHtwYXRofSBmYWlsOmAsIGZhaWxNc2cpO1xuICAgIH1cbiAgfSk7XG5cbiAgcHJvZ3Jlc3Mub25Qcm9ncmVzc1VwZGF0ZShyZXMgPT4ge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6IGDkuIvovb3kuK0ke01hdGgucm91bmQocmVzLnByb2dyZXNzKX0lYCB9KVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHsgZG93bkxvYWQsIG5ldFJlcG9ydDogbmV0V29ya1JlcG9ydCwgcmVxdWVzdCwgdGlwIH07XG4iXX0=