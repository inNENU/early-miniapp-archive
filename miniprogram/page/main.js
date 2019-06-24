"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tab_1 = require("../utils/tab");
var _a = getApp(), a = _a.globalData, _b = _a.lib, $component = _b.$component, $page = _b.$page, $register = _b.$register, $wx = _b.$wx;
$register('main', {
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
        $page.resolve({ query: { aim: 'main' } }, page ? page : this.data.page);
        wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
    },
    onLoad: function () {
        $page.Set({ option: { aim: 'main' }, ctx: this });
        tab_1.default.refresh('main', this, a);
        $page.Notice('main');
    },
    onShow: function () {
        var _a = $page.color(this.data.page[0].grey), nc = _a[0], bc = _a[1];
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
            $wx.request("config/" + a.version + "/" + x, function (data) {
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
        $component.nav(e, this);
    },
    cA: function (e) {
        $component.trigger(e, this);
    },
    onShareAppMessage: function () { return ({ title: 'myNENU', path: '/page/main' }); }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSxvQ0FBZ0M7QUFDMUIsSUFBQSxhQUF3RSxFQUF0RSxpQkFBYSxFQUFFLFdBQTBDLEVBQW5DLDBCQUFVLEVBQUUsZ0JBQUssRUFBRSx3QkFBUyxFQUFFLFlBQWtCLENBQUM7QUFFL0UsU0FBUyxDQUFDLE1BQU0sRUFBRTtJQUNoQixJQUFJLEVBQUU7UUFDSixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDTixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7UUFDUixJQUFJLEVBQUU7WUFDSjtnQkFDRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU07Z0JBQ3JDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJO2FBQ2xEO1lBQ0Q7Z0JBQ0UsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFO29CQUNQLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsK0NBQStDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRTtvQkFDdEYsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSwrQ0FBK0MsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFO29CQUN0RixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLDhDQUE4QyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUU7b0JBQ3RGLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsK0NBQStDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRTtpQkFDeEY7YUFDRjtZQUNEO2dCQUNFLEdBQUcsRUFBRSxNQUFNO2dCQUNYLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRTtv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QUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELFlBQVksRUFBWixVQUFhLENBQU07UUFDakIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELEVBQUUsRUFBRixVQUFHLENBQU07UUFDUCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsaUJBQWlCLEVBQUUsY0FBTSxPQUFBLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUF6QyxDQUF5QztDQUNuRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBAQXV0aG9yOiBNci5Ib3BlXHJcbiAqIEBEYXRlOiAyMDE5LTA0LTE1IDA4OjE4OjA2XHJcbiAqIEBMYXN0RWRpdG9yczogTXIuSG9wZVxyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDE5LTA2LTI0IDIwOjQzOjQ3XHJcbiAqIEBEZXNjcmlwdGlvbjog5Li76aG1XHJcbiAqL1xyXG5pbXBvcnQgJHRhYiBmcm9tICcuLi91dGlscy90YWInO1xyXG5jb25zdCB7IGdsb2JhbERhdGE6IGEsIGxpYjogeyAkY29tcG9uZW50LCAkcGFnZSwgJHJlZ2lzdGVyLCAkd3ggfSB9ID0gZ2V0QXBwKCk7XHJcblxyXG4kcmVnaXN0ZXIoJ21haW4nLCB7XHJcbiAgZGF0YToge1xyXG4gICAgVDogYS5ULFxyXG4gICAgbm06IGEubm0sXHJcbiAgICBwYWdlOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0YWc6ICdoZWFkJywgdGl0bGU6ICfpppbpobUnLCBhaW06ICdtYWluJyxcclxuICAgICAgICBhY3Rpb246IHRydWUsIGFpbVN0ZXA6IDEsIGFpbURlcHRoOiAxLCBncmV5OiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0YWc6ICdncmlkJyxcclxuICAgICAgICBoZWFkOiAn5paw55Sf5L2g5aW9JyxcclxuICAgICAgICBjb250ZW50OiBbXHJcbiAgICAgICAgICB7IHRleHQ6ICfmiqXliLDmtYHnqIsnLCBpY29uOiAnaHR0cHM6Ly9tcC5uZW51eW91dGguY29tL2ljb24vbW9kdWxlL2xpc3Quc3ZnJywgYWltOiAnY2hlY2s5JyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAn6ZyA5bim54mp5ZOBJywgaWNvbjogJ2h0dHBzOi8vbXAubmVudXlvdXRoLmNvbS9pY29uL21vZHVsZS9nb29kLnN2ZycsIGFpbTogJ2NoZWNrNycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ+e8tOi0ueebuOWFsycsIGljb246ICdodHRwczovL21wLm5lbnV5b3V0aC5jb20vaWNvbi9tb2R1bGUvcGF5LnN2ZycsIGFpbTogJ2NoZWNrMTAnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICfpmLLnm5fpmLLpqpcnLCBpY29uOiAnaHR0cHM6Ly9tcC5uZW51eW91dGguY29tL2ljb24vbW9kdWxlL3NhZmUuc3ZnJywgYWltOiAnY2hlY2sxNCcgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRhZzogJ2xpc3QnLFxyXG4gICAgICAgIGhlYWQ6ICfmiqXliLDmtYHnqIsnLFxyXG4gICAgICAgIGNvbnRlbnQ6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dDogJ+afpeeci+abtOWkmicsXHJcbiAgICAgICAgICAgIGljb246ICcvaWNvbi90YWJQYWdlL2NoZWNrLnN2ZycsXHJcbiAgICAgICAgICAgIGFpbTogJ2NoZWNrMCdcclxuICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGZvb3Q6ICcgJ1xyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBvblBhZ2VMYXVuY2goKSB7XHJcbiAgICBjb25zb2xlLmxvZygn5Li76aG16Z2i5ZCv5Yqo77yaJywgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBhLmRhdGUsICdtcycpO1xyXG4gICAgY29uc3QgcGFnZSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtYWluJyk7XHJcbiAgICBjb25zdCBjb2xvciA9IGEubm0gPyBbJyMwMDAwMDAnLCAnd2hpdGUnXSA6IFsnI2ZmZmZmZicsICdibGFjayddO1xyXG5cclxuICAgICRwYWdlLnJlc29sdmUoeyBxdWVyeTogeyBhaW06ICdtYWluJyB9IH0sIHBhZ2UgPyBwYWdlIDogdGhpcy5kYXRhLnBhZ2UpO1xyXG4gICAgd3guc2V0VGFiQmFyU3R5bGUoeyBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yWzBdLCBib3JkZXJTdHlsZTogY29sb3JbMV0gfSk7XHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICAkcGFnZS5TZXQoeyBvcHRpb246IHsgYWltOiAnbWFpbicgfSwgY3R4OiB0aGlzIH0pO1xyXG4gICAgJHRhYi5yZWZyZXNoKCdtYWluJywgdGhpcywgYSk7XHJcbiAgICAkcGFnZS5Ob3RpY2UoJ21haW4nKTtcclxuICB9LFxyXG4gIG9uU2hvdygpIHtcclxuICAgIC8vIOiuvue9ruiDtuWbiuWSjOiDjOaZr+minOiJslxyXG4gICAgY29uc3QgW25jLCBiY10gPSAkcGFnZS5jb2xvcih0aGlzLmRhdGEucGFnZVswXS5ncmV5KTtcclxuXHJcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyQ29sb3IobmMpO1xyXG4gICAgd3guc2V0QmFja2dyb3VuZENvbG9yKGJjKTtcclxuICB9LFxyXG4gIG9uUmVhZHkoKSB7XHJcbiAgICAvLyDms6jlhozkuovku7bnm5HlkKzlmahcclxuICAgIHRoaXMuJG9uKCd0aGVtZScsIChUOiBzdHJpbmcpID0+IHtcclxuICAgICAgdGhpcy5zZXREYXRhKHsgVCB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy4kb24oJ25pZ2h0bW9kZScsIChubTogYm9vbGVhbikgPT4ge1xyXG4gICAgICB0aGlzLnNldERhdGEoeyBubSB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIOaJp+ihjHRhYumhtemihOWKoOi9vVxyXG4gICAgWydndWlkZScsICdmdW5jdGlvbiddLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICR3eC5yZXF1ZXN0KGBjb25maWcvJHthLnZlcnNpb259LyR7eH1gLCAoZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy4kcHV0KHgsIGRhdGEpO1xyXG4gICAgICAgIHRoaXMuJHByZWxvYWQoYCR7eH0/YWltPSR7eH1gKTtcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyh4LCBkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuJHByZWxvYWQoJ21lP2FpbT1tZScpO1xyXG4gIH0sXHJcbiAgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICAkdGFiLnJlZnJlc2goJ21haW4nLCB0aGlzLCBhKTtcclxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICB9LFxyXG4gIG9uUGFnZVNjcm9sbChlOiBhbnkpIHtcclxuICAgICRjb21wb25lbnQubmF2KGUsIHRoaXMpO1xyXG4gIH0sXHJcbiAgY0EoZTogYW55KSB7XHJcbiAgICAkY29tcG9uZW50LnRyaWdnZXIoZSwgdGhpcyk7XHJcbiAgfSxcclxuICBvblNoYXJlQXBwTWVzc2FnZTogKCkgPT4gKHsgdGl0bGU6ICdteU5FTlUnLCBwYXRoOiAnL3BhZ2UvbWFpbicgfSlcclxufSk7XHJcbiJdfQ==