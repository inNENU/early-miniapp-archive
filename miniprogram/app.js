"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./utils/app");
var component_1 = require("./utils/component");
var file_1 = require("./utils/file");
var setpage_1 = require("./utils/setpage");
var wxpage_1 = require("wxpage");
var wx_1 = require("./utils/wx");
var $App = wxpage_1.default.A;
$App({
    globalData: {
        version: 'V 2.0.0',
        music: { play: false, played: false, index: 0 },
        page: {
            data: [],
            aim: ''
        }
    },
    lib: { $component: component_1.default, $file: file_1.default, $page: setpage_1.default, $register: wxpage_1.default, $wx: wx_1.default },
    config: {
        route: ['/page/$page', '/module/$page', '/function/$page', '/settings/$page'],
        resolvePath: function (name) { return ['main', 'function', 'guide', 'me'].includes(name)
            ? "/page/" + name
            : ['setting', '2.0', 'about'].includes(name) ? "/settings/" + name : "/module/" + name; }
    },
    onLaunch: function (opts) {
        console.info('小程序启动，参数为', opts);
        this.globalData.date = new Date();
        this.lib.$page.init(this.globalData);
        if (!wx.getStorageSync('inited'))
            app_1.default.appInit();
        this.globalData.T = wx.getStorageSync('theme');
        this.globalData.nm = app_1.default.nightmode();
        this.globalData.info = wx.getSystemInfoSync();
        console.info('设备信息为', this.globalData.info);
        app_1.default.startup(this.globalData.version);
    },
    onAwake: function (time) {
        console.log('小程序在', time, 'ms之后被唤醒');
        this.logger.debug("\"onAwake after " + time + "ms");
        this.globalData.nm = app_1.default.nightmode();
        app_1.default.noticeCheck(this.globalData.version);
        app_1.default.appUpdate();
    },
    onError: function (errorMsg) {
        console.error('出错信息为：', errorMsg);
        this.logger.warn('Error ocurred', errorMsg);
    },
    onPageNotFound: function (msg) {
        wx.switchTab({ url: 'pages/main' });
        console.warn('未找到界面:', msg);
        this.logger.warn('未找到界面', msg);
    },
    logger: wx.getLogManager({ level: 1 })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQThCO0FBQzlCLCtDQUEyQztBQUMzQyxxQ0FBaUM7QUFDakMsMkNBQW9DO0FBQ3BDLGlDQUErQjtBQUMvQixpQ0FBNkI7QUFFN0IsSUFBTSxJQUFJLEdBQUcsZ0JBQVMsQ0FBQyxDQUFDLENBQUM7QUFJekIsSUFBSSxDQUFDO0lBR0gsVUFBVSxFQUFFO1FBQ1YsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7UUFDL0MsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLEVBQUU7WUFDUixHQUFHLEVBQUUsRUFBRTtTQUNSO0tBRUY7SUFHRCxHQUFHLEVBQUUsRUFBRSxVQUFVLHFCQUFBLEVBQUUsS0FBSyxnQkFBQSxFQUFFLEtBQUssbUJBQUEsRUFBRSxTQUFTLGtCQUFBLEVBQUUsR0FBRyxjQUFBLEVBQUU7SUFHakQsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztRQUU3RSxXQUFXLEVBQUUsVUFBQyxJQUFZLElBQUssT0FBQSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDL0UsQ0FBQyxDQUFDLFdBQVMsSUFBTTtZQUNqQixDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBYSxJQUFNLENBQUMsQ0FBQyxDQUFDLGFBQVcsSUFBTSxFQUZ6RCxDQUV5RDtLQUN6RjtJQUVELFFBQVEsWUFBQyxJQUFJO1FBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFPaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUdsQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBR3JDLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztZQUFFLGFBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUdoRCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLGFBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUU5QyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVDLGFBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsT0FBTyxFQUFQLFVBQVEsSUFBWTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMscUJBQWtCLElBQUksT0FBSSxDQUFDLENBQUM7UUFHOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsYUFBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXJDLGFBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxhQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUlELE9BQU8sWUFBQyxRQUFRO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDRCxjQUFjLFlBQUMsR0FBRztRQUdoQixFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFFcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFHRCxNQUFNLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztDQUN2QyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgd3gqL1xuaW1wb3J0IGFwcCBmcm9tICcuL3V0aWxzL2FwcCc7XG5pbXBvcnQgJGNvbXBvbmVudCBmcm9tICcuL3V0aWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgJGZpbGUgZnJvbSAnLi91dGlscy9maWxlJztcbmltcG9ydCAkcGFnZSBmcm9tICcuL3V0aWxzL3NldHBhZ2UnO1xuaW1wb3J0ICRyZWdpc3RlciBmcm9tICd3eHBhZ2UnO1xuaW1wb3J0ICR3eCBmcm9tICcuL3V0aWxzL3d4JztcblxuY29uc3QgJEFwcCA9ICRyZWdpc3Rlci5BO1xuXG4vLyBWYXIgd29ya2VyID0gd3guY3JlYXRlV29ya2VyKFwid29ya2VyL3dvcmtlci5qc1wiKSAvL3dvcmtlciB0ZXN0XG5cbiRBcHAoe1xuXG4gIC8vIOWwj+eoi+W6j+WFqOWxgOaVsOaNrlxuICBnbG9iYWxEYXRhOiB7XG4gICAgdmVyc2lvbjogJ1YgMi4wLjAnLFxuICAgIG11c2ljOiB7IHBsYXk6IGZhbHNlLCBwbGF5ZWQ6IGZhbHNlLCBpbmRleDogMCB9LFxuICAgIHBhZ2U6IHtcbiAgICAgIGRhdGE6IFtdLFxuICAgICAgYWltOiAnJ1xuICAgIH1cbiAgICAvLyBULCBubSwgZGF0ZSwgaW5mb+S5n+WcqGdsb2JhbERhdGHkuK1cbiAgfSxcblxuICAvLyDlnKhBUFDkuK3lsIHoo4Vqc+W6k+WvueixoVxuICBsaWI6IHsgJGNvbXBvbmVudCwgJGZpbGUsICRwYWdlLCAkcmVnaXN0ZXIsICR3eCB9LFxuXG4gIC8vIOi3r+W+hOino+aekOmFjee9rlxuICBjb25maWc6IHtcbiAgICByb3V0ZTogWycvcGFnZS8kcGFnZScsICcvbW9kdWxlLyRwYWdlJywgJy9mdW5jdGlvbi8kcGFnZScsICcvc2V0dGluZ3MvJHBhZ2UnXSxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uZnVzaW5nLWFycm93XG4gICAgcmVzb2x2ZVBhdGg6IChuYW1lOiBzdHJpbmcpID0+IFsnbWFpbicsICdmdW5jdGlvbicsICdndWlkZScsICdtZSddLmluY2x1ZGVzKG5hbWUpXG4gICAgICA/IGAvcGFnZS8ke25hbWV9YFxuICAgICAgOiBbJ3NldHRpbmcnLCAnMi4wJywgJ2Fib3V0J10uaW5jbHVkZXMobmFtZSkgPyBgL3NldHRpbmdzLyR7bmFtZX1gIDogYC9tb2R1bGUvJHtuYW1lfWBcbiAgfSxcblxuICBvbkxhdW5jaChvcHRzKSB7XG4gICAgY29uc29sZS5pbmZvKCflsI/nqIvluo/lkK/liqjvvIzlj4LmlbDkuLonLCBvcHRzKTsgLy8g6LCD6K+VXG5cbiAgICAvLyBDb25zdCBjYXBzdWxlID0gd3guZ2V0TWVudUJ1dHRvbkJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gQ29uc29sZS5sb2coY2Fwc3VsZSk7XG5cbiAgICAvLyDkv53lrZjlkK/liqjml7bpl7RcbiAgICB0aGlzLmdsb2JhbERhdGEuZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAvLyDliJ3lp4vljJblupNcbiAgICB0aGlzLmxpYi4kcGFnZS5pbml0KHRoaXMuZ2xvYmFsRGF0YSk7XG5cbiAgICAvLyDlpoLmnpzliJ3mrKHlkK/liqjmiafooYzliJ3lp4vljJZcbiAgICBpZiAoIXd4LmdldFN0b3JhZ2VTeW5jKCdpbml0ZWQnKSkgYXBwLmFwcEluaXQoKTtcblxuICAgIC8vIOiOt+WPluS4u+mimOOAgeWknOmXtOaooeW8j+OAgeiuvuWkh+S/oeaBr1xuICAgIHRoaXMuZ2xvYmFsRGF0YS5UID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3RoZW1lJyk7XG4gICAgdGhpcy5nbG9iYWxEYXRhLm5tID0gYXBwLm5pZ2h0bW9kZSgpO1xuICAgIHRoaXMuZ2xvYmFsRGF0YS5pbmZvID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcblxuICAgIGNvbnNvbGUuaW5mbygn6K6+5aSH5L+h5oGv5Li6JywgdGhpcy5nbG9iYWxEYXRhLmluZm8pOyAvLyDosIPor5VcblxuICAgIGFwcC5zdGFydHVwKHRoaXMuZ2xvYmFsRGF0YS52ZXJzaW9uKTtcbiAgfSxcbiAgb25Bd2FrZSh0aW1lOiBudW1iZXIpIHtcbiAgICBjb25zb2xlLmxvZygn5bCP56iL5bqP5ZyoJywgdGltZSwgJ21z5LmL5ZCO6KKr5ZSk6YaSJyk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFwib25Bd2FrZSBhZnRlciAke3RpbWV9bXNgKTsvLyDosIPor5VcblxuICAgIC8vIOmHjeaWsOW6lOeUqOWknOmXtOaooeW8j+OAgVxuICAgIHRoaXMuZ2xvYmFsRGF0YS5ubSA9IGFwcC5uaWdodG1vZGUoKTtcblxuICAgIGFwcC5ub3RpY2VDaGVjayh0aGlzLmdsb2JhbERhdGEudmVyc2lvbik7XG4gICAgYXBwLmFwcFVwZGF0ZSgpO1xuICB9LFxuXG4gIC8vIE9uU2hvdzogZnVuY3Rpb24gKCkgeyB9LFxuXG4gIG9uRXJyb3IoZXJyb3JNc2cpIHtcbiAgICBjb25zb2xlLmVycm9yKCflh7rplJnkv6Hmga/kuLrvvJonLCBlcnJvck1zZyk7XG4gICAgdGhpcy5sb2dnZXIud2FybignRXJyb3Igb2N1cnJlZCcsIGVycm9yTXNnKTsgLy8g6LCD6K+VXG4gIH0sXG4gIG9uUGFnZU5vdEZvdW5kKG1zZykge1xuXG4gICAgLy8g6YeN5a6a5ZCR5Yiw5Li755WM6Z2iXG4gICAgd3guc3dpdGNoVGFiKHsgdXJsOiAncGFnZXMvbWFpbicgfSk7XG5cbiAgICBjb25zb2xlLndhcm4oJ+acquaJvuWIsOeVjOmdojonLCBtc2cpO1xuICAgIHRoaXMubG9nZ2VyLndhcm4oJ+acquaJvuWIsOeVjOmdoicsIG1zZyk7IC8vIOiwg+ivlVxuICB9LFxuXG4gIC8vIOaXpeW/l+euoeeQhuWZqOWvueixoVxuICBsb2dnZXI6IHd4LmdldExvZ01hbmFnZXIoeyBsZXZlbDogMSB9KVxufSk7XG4iXX0=