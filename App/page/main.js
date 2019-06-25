"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
var component_1 = require("../utils/component");
var wx_1 = require("../utils/wx");
var setpage_1 = require("../utils/setpage");
var tab_1 = require("../utils/tab");
var a = getApp().globalData;
wxpage_1.default('main', {
    data: {
        T: a.T,
        nm: a.nm,
        page: [
            {
                tag: 'head', title: '首页', aim: 'main',
                action: true, aimStep: 1, aimDepth: 1, grey: true
            },
            {
                tag: 'grid',
                head: '新生你好',
                content: [
                    { text: '报到流程', icon: 'https://mp.nenuyouth.com/icon/module/list.svg', aim: 'check9' },
                    { text: '需带物品', icon: 'https://mp.nenuyouth.com/icon/module/good.svg', aim: 'check7' },
                    { text: '缴费相关', icon: 'https://mp.nenuyouth.com/icon/module/pay.svg', aim: 'check10' },
                    { text: '防盗防骗', icon: 'https://mp.nenuyouth.com/icon/module/safe.svg', aim: 'check14' }
                ]
            },
            {
                tag: 'list',
                head: '报到流程',
                content: [
                    {
                        text: '查看更多',
                        icon: '/icon/tabPage/check.svg',
                        aim: 'check0'
                    }
                ],
                foot: ' '
            }
        ]
    },
    onPageLaunch: function () {
        console.log('主页面启动：', new Date().getTime() - a.date, 'ms');
        var page = wx.getStorageSync('main');
        var color = a.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];
        setpage_1.default.resolve({ query: { aim: 'main' } }, page ? page : this.data.page);
        wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
    },
    onLoad: function () {
        setpage_1.default.Set({ option: { aim: 'main' }, ctx: this });
        tab_1.default.refresh('main', this, a);
        setpage_1.default.Notice('main');
    },
    onShow: function () {
        var _a = setpage_1.default.color(this.data.page[0].grey), nc = _a.nc, bc = _a.bc;
        wx.setNavigationBarColor(nc);
        wx.setBackgroundColor(bc);
    },
    onReady: function () {
        var _this = this;
        this.$on('theme', function (T) {
            _this.setData({ T: T });
        });
        this.$on('nightmode', function (nm) {
            _this.setData({ nm: nm });
        });
        ['guide', 'function'].forEach(function (x) {
            wx_1.default.request("config/" + a.version + "/" + x, function (data) {
                _this.$put(x, data);
                _this.$preload(x + "?aim=" + x);
                wx.setStorageSync(x, data);
            });
        });
        this.$preload('me?aim=me');
    },
    onPullDownRefresh: function () {
        tab_1.default.refresh('main', this, a);
        wx.stopPullDownRefresh();
    },
    onPageScroll: function (e) {
        component_1.default.nav(e, this);
    },
    cA: function (e) {
        component_1.default.trigger(e, this);
    },
    onShareAppMessage: function () { return ({ title: 'myNENU', path: '/page/main' }); }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSxpQ0FBK0I7QUFDL0IsZ0RBQTRDO0FBQzVDLGtDQUE4QjtBQUM5Qiw0Q0FBcUM7QUFDckMsb0NBQWdDO0FBQ3hCLElBQUEsdUJBQWEsQ0FBYztBQUVuQyxnQkFBUyxDQUFDLE1BQU0sRUFBRTtJQUNoQixJQUFJLEVBQUU7UUFDSixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDTixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7UUFDUixJQUFJLEVBQUU7WUFDSjtnQkFDRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU07Z0JBQ3JDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJO2FBQ2xEO1lBQ0Q7Z0JBQ0UsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFO29CQUNQLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsK0NBQStDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRTtvQkFDdEYsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSwrQ0FBK0MsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFO29CQUN0RixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLDhDQUE4QyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUU7b0JBQ3RGLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsK0NBQStDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRTtpQkFDeEY7YUFDRjtZQUNEO2dCQUNFLEdBQUcsRUFBRSxNQUFNO2dCQUNYLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRTtvQkFDUDt3QkFDRSxJQUFJ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M0IsQ0FBQztJQUNELFlBQVksRUFBWixVQUFhLENBQU07UUFDakIsbUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDRCxFQUFFLEVBQUYsVUFBRyxDQUFNO1FBQ1AsbUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxpQkFBaUIsRUFBRSxjQUFNLE9BQUEsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQXpDLENBQXlDO0NBQ25FLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIEBBdXRob3I6IE1yLkhvcGVcclxuICogQERhdGU6IDIwMTktMDQtMTUgMDg6MTg6MDZcclxuICogQExhc3RFZGl0b3JzOiBNci5Ib3BlXHJcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMTktMDYtMjQgMjM6NTM6NDZcclxuICogQERlc2NyaXB0aW9uOiDkuLvpobVcclxuICovXHJcbmltcG9ydCAkcmVnaXN0ZXIgZnJvbSAnd3hwYWdlJztcclxuaW1wb3J0ICRjb21wb25lbnQgZnJvbSAnLi4vdXRpbHMvY29tcG9uZW50JztcclxuaW1wb3J0ICRteSBmcm9tICcuLi91dGlscy93eCc7XHJcbmltcG9ydCAkcGFnZSBmcm9tICcuLi91dGlscy9zZXRwYWdlJztcclxuaW1wb3J0ICR0YWIgZnJvbSAnLi4vdXRpbHMvdGFiJztcclxuY29uc3QgeyBnbG9iYWxEYXRhOiBhIH0gPSBnZXRBcHAoKTtcclxuXHJcbiRyZWdpc3RlcignbWFpbicsIHtcclxuICBkYXRhOiB7XHJcbiAgICBUOiBhLlQsXHJcbiAgICBubTogYS5ubSxcclxuICAgIHBhZ2U6IFtcclxuICAgICAge1xyXG4gICAgICAgIHRhZzogJ2hlYWQnLCB0aXRsZTogJ+mmlumhtScsIGFpbTogJ21haW4nLFxyXG4gICAgICAgIGFjdGlvbjogdHJ1ZSwgYWltU3RlcDogMSwgYWltRGVwdGg6IDEsIGdyZXk6IHRydWVcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRhZzogJ2dyaWQnLFxyXG4gICAgICAgIGhlYWQ6ICfmlrDnlJ/kvaDlpb0nLFxyXG4gICAgICAgIGNvbnRlbnQ6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ+aKpeWIsOa1geeoiycsIGljb246ICdodHRwczovL21wLm5lbnV5b3V0aC5jb20vaWNvbi9tb2R1bGUvbGlzdC5zdmcnLCBhaW06ICdjaGVjazknIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICfpnIDluKbnianlk4EnLCBpY29uOiAnaHR0cHM6Ly9tcC5uZW51eW91dGguY29tL2ljb24vbW9kdWxlL2dvb2Quc3ZnJywgYWltOiAnY2hlY2s3JyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAn57y06LS555u45YWzJywgaWNvbjogJ2h0dHBzOi8vbXAubmVudXlvdXRoLmNvbS9pY29uL21vZHVsZS9wYXkuc3ZnJywgYWltOiAnY2hlY2sxMCcgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ+mYsuebl+mYsumqlycsIGljb246ICdodHRwczovL21wLm5lbnV5b3V0aC5jb20vaWNvbi9tb2R1bGUvc2FmZS5zdmcnLCBhaW06ICdjaGVjazE0JyB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGFnOiAnbGlzdCcsXHJcbiAgICAgICAgaGVhZDogJ+aKpeWIsOa1geeoiycsXHJcbiAgICAgICAgY29udGVudDogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiAn5p+l55yL5pu05aSaJyxcclxuICAgICAgICAgICAgaWNvbjogJy9pY29uL3RhYlBhZ2UvY2hlY2suc3ZnJyxcclxuICAgICAgICAgICAgYWltOiAnY2hlY2swJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZm9vdDogJyAnXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG9uUGFnZUxhdW5jaCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCfkuLvpobXpnaLlkK/liqjvvJonLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGEuZGF0ZSwgJ21zJyk7XHJcbiAgICBjb25zdCBwYWdlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21haW4nKTtcclxuICAgIGNvbnN0IGNvbG9yID0gYS5ubSA/IFsnIzAwMDAwMCcsICd3aGl0ZSddIDogWycjZmZmZmZmJywgJ2JsYWNrJ107XHJcblxyXG4gICAgJHBhZ2UucmVzb2x2ZSh7IHF1ZXJ5OiB7IGFpbTogJ21haW4nIH0gfSwgcGFnZSA/IHBhZ2UgOiB0aGlzLmRhdGEucGFnZSk7XHJcbiAgICB3eC5zZXRUYWJCYXJTdHlsZSh7IGJhY2tncm91bmRDb2xvcjogY29sb3JbMF0sIGJvcmRlclN0eWxlOiBjb2xvclsxXSB9KTtcclxuICB9LFxyXG4gIG9uTG9hZCgpIHtcclxuICAgICRwYWdlLlNldCh7IG9wdGlvbjogeyBhaW06ICdtYWluJyB9LCBjdHg6IHRoaXMgfSk7XHJcbiAgICAkdGFiLnJlZnJlc2goJ21haW4nLCB0aGlzLCBhKTtcclxuICAgICRwYWdlLk5vdGljZSgnbWFpbicpO1xyXG4gIH0sXHJcbiAgb25TaG93KCkge1xyXG4gICAgLy8g6K6+572u6IO25ZuK5ZKM6IOM5pmv6aKc6ImyXHJcbiAgICBjb25zdCB7IG5jLCBiYyB9ID0gJHBhZ2UuY29sb3IodGhpcy5kYXRhLnBhZ2VbMF0uZ3JleSk7XHJcblxyXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhckNvbG9yKG5jKTtcclxuICAgIHd4LnNldEJhY2tncm91bmRDb2xvcihiYyk7XHJcbiAgfSxcclxuICBvblJlYWR5KCkge1xyXG4gICAgLy8g5rOo5YaM5LqL5Lu255uR5ZCs5ZmoXHJcbiAgICB0aGlzLiRvbigndGhlbWUnLCAoVDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSEoeyBUIH0pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLiRvbignbmlnaHRtb2RlJywgKG5tOiBib29sZWFuKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSEoeyBubSB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIOaJp+ihjHRhYumhtemihOWKoOi9vVxyXG4gICAgWydndWlkZScsICdmdW5jdGlvbiddLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICRteS5yZXF1ZXN0KGBjb25maWcvJHthLnZlcnNpb259LyR7eH1gLCAoZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy4kcHV0KHgsIGRhdGEpO1xyXG4gICAgICAgIHRoaXMuJHByZWxvYWQoYCR7eH0/YWltPSR7eH1gKTtcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyh4LCBkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuJHByZWxvYWQoJ21lP2FpbT1tZScpO1xyXG4gIH0sXHJcbiAgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICAkdGFiLnJlZnJlc2goJ21haW4nLCB0aGlzLCBhKTtcclxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICB9LFxyXG4gIG9uUGFnZVNjcm9sbChlOiBhbnkpIHtcclxuICAgICRjb21wb25lbnQubmF2KGUsIHRoaXMpO1xyXG4gIH0sXHJcbiAgY0EoZTogYW55KSB7XHJcbiAgICAkY29tcG9uZW50LnRyaWdnZXIoZSwgdGhpcyk7XHJcbiAgfSxcclxuICBvblNoYXJlQXBwTWVzc2FnZTogKCkgPT4gKHsgdGl0bGU6ICdteU5FTlUnLCBwYXRoOiAnL3BhZ2UvbWFpbicgfSlcclxufSk7XHJcbiJdfQ==