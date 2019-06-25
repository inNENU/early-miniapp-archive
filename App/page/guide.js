"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
var component_1 = require("../utils/component");
var page_1 = require("../utils/page");
var tab_1 = require("../utils/tab");
var a = getApp().globalData;
wxpage_1.default('guide', {
    data: {
        T: a.T,
        nm: a.nm,
        page: [
            { tag: 'head', title: '东师指南', action: true, aimDepth: 1, grey: true },
            {
                tag: 'grid',
                head: '新生你好',
                content: [
                    { text: '新生报到', icon: '/icon/tabPage/check.svg', aim: 'check0' },
                    { text: '报到流程', icon: 'https://mp.nenuyouth.com/icon/module/list.svg', aim: 'check9' },
                    { text: '需带物品', icon: 'https://mp.nenuyouth.com/icon/module/good.svg', aim: 'check7' },
                    { text: '缴费相关', icon: 'https://mp.nenuyouth.com/icon/module/pay.svg', aim: 'check10' }
                ]
            },
            {
                tag: 'grid',
                head: '学在东师',
                content: [
                    { text: '学习', icon: '/icon/tabPage/study.svg', aim: 'study0' },
                    { text: '课程', icon: '/icon/tabPage/course.svg', aim: 'course0' },
                    { text: '图书馆', icon: '/icon/tabPage/library.svg', aim: 'library0' },
                    { text: '考试', icon: '/icon/tabPage/test.svg', aim: 'test0' }
                ]
            },
            {
                tag: 'grid',
                head: '行在东师',
                content: [
                    { text: '食堂', icon: '/icon/tabPage/dining.svg', aim: 'dining0' },
                    { text: '校园卡', icon: '/icon/tabPage/card.svg', aim: 'card0' },
                    { text: '生活', icon: '/icon/tabPage/life.svg', aim: 'life0' },
                    { text: '寝室', icon: '/icon/tabPage/dorm.svg', aim: 'dorm0' },
                    { text: '校园网', icon: '/icon/tabPage/network.svg', aim: 'network0' },
                    { text: '资助', icon: '/icon/tabPage/subsidize.svg', aim: 'subsidize0' }
                ]
            },
            {
                tag: 'grid',
                head: '乐在东师',
                content: [
                    { text: '学生组织', icon: '/icon/tabPage/studentOrg.svg', aim: 'studentOrg0' },
                    { text: '社团', icon: '/icon/tabPage/corporation.svg', aim: 'corporation0' },
                    { text: '交通', icon: '/icon/tabPage/traffic.svg', aim: 'traffic0' },
                    { text: '吃喝玩乐', icon: '/icon/tabPage/nearby.svg', aim: 'nearby0' }
                ],
                foot: ' '
            }
        ]
    },
    onPreload: function (res) {
        var pageData = this.$take('guide');
        page_1.default.resolve(res, pageData ? pageData : wx.getStorageSync('guide'));
        console.log("\u4E1C\u5E08\u6307\u5357\u9884\u52A0\u8F7D\u7528\u65F6" + (new Date().getTime() - a.date) + "ms");
    },
    onLoad: function () {
        page_1.default.Set({ option: { aim: 'guide' }, ctx: this });
        page_1.default.Notice('guide');
        tab_1.default.update('page', '150K');
    },
    onShow: function () {
        var _a = page_1.default.color(this.data.page[0].grey), nc = _a.nc, bc = _a.bc;
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
    },
    onPullDownRefresh: function () {
        tab_1.default.refresh('guide', this, a);
        tab_1.default.update('page', '145K');
        wx.stopPullDownRefresh();
    },
    onPageScroll: function (e) {
        component_1.default.nav(e, this);
    },
    cA: function (e) {
        component_1.default.trigger(e, this);
    },
    onShareAppMessage: function () { return ({ title: '东师指南', path: '/page/guide' }); }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJndWlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLGlDQUEyQztBQUMzQyxnREFBNEM7QUFDNUMsc0NBQWtDO0FBQ2xDLG9DQUFnQztBQUN4QixJQUFBLHVCQUFhLENBQWM7QUFFbkMsZ0JBQVMsQ0FBQyxPQUFPLEVBQUU7SUFDakIsSUFBSSxFQUFFO1FBQ0osQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ04sRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQ1IsSUFBSSxFQUFFO1lBQ0osRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7WUFDckU7Z0JBQ0UsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFO29CQUNQLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRTtvQkFDaEUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSwrQ0FBK0MsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFO29CQUN0RixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLCtDQUErQyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUU7b0JBQ3RGLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsOENBQThDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRTtpQkFDdkY7YUFDRjtZQUNEO2dCQUNFLEdBQUcsRUFBRSxNQUFNO2dCQUNYLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRTtvQkFDUCxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLEdBQUcsRUFBRSxRQUFRLEVB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RUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELE9BQU8sRUFBUDtRQUFBLGlCQVFDO1FBTkMsSUFBSSxDQUFDLEdBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFTO1lBQzNCLEtBQUksQ0FBQyxPQUFRLENBQUMsRUFBRSxDQUFDLEdBQUEsRUFBRSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBSSxDQUFDLFdBQVcsRUFBRSxVQUFDLEVBQVc7WUFDakMsS0FBSSxDQUFDLE9BQVEsQ0FBQyxFQUFFLEVBQUUsSUFBQSxFQUFFLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxpQkFBaUI7UUFDZixhQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsYUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELFlBQVksWUFBQyxDQUFDO1FBQ1osbUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDRCxFQUFFLEVBQUYsVUFBRyxDQUFNO1FBQ1AsbUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxpQkFBaUIsRUFBRSxjQUFNLE9BQUEsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQXhDLENBQXdDO0NBQ2xFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIEBBdXRob3I6IE1yLkhvcGVcclxuICogQERhdGU6IDIwMTktMDYtMjQgMjA6NDg6MzlcclxuICogQExhc3RFZGl0b3JzOiBNci5Ib3BlXHJcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMTktMDYtMjUgMTk6MjE6MTlcclxuICogQERlc2NyaXB0aW9uOiDkuJzluIjmjIfljZdcclxuICovXHJcbmltcG9ydCAkcmVnaXN0ZXIsIHsgV1hQYWdlIH0gZnJvbSAnd3hwYWdlJztcclxuaW1wb3J0ICRjb21wb25lbnQgZnJvbSAnLi4vdXRpbHMvY29tcG9uZW50JztcclxuaW1wb3J0ICRwYWdlIGZyb20gJy4uL3V0aWxzL3BhZ2UnO1xyXG5pbXBvcnQgJHRhYiBmcm9tICcuLi91dGlscy90YWInO1xyXG5jb25zdCB7IGdsb2JhbERhdGE6IGEgfSA9IGdldEFwcCgpO1xyXG5cclxuJHJlZ2lzdGVyKCdndWlkZScsIHtcclxuICBkYXRhOiB7XHJcbiAgICBUOiBhLlQsXHJcbiAgICBubTogYS5ubSxcclxuICAgIHBhZ2U6IFtcclxuICAgICAgeyB0YWc6ICdoZWFkJywgdGl0bGU6ICfkuJzluIjmjIfljZcnLCBhY3Rpb246IHRydWUsIGFpbURlcHRoOiAxLCBncmV5OiB0cnVlIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0YWc6ICdncmlkJyxcclxuICAgICAgICBoZWFkOiAn5paw55Sf5L2g5aW9JyxcclxuICAgICAgICBjb250ZW50OiBbXHJcbiAgICAgICAgICB7IHRleHQ6ICfmlrDnlJ/miqXliLAnLCBpY29uOiAnL2ljb24vdGFiUGFnZS9jaGVjay5zdmcnLCBhaW06ICdjaGVjazAnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICfmiqXliLDmtYHnqIsnLCBpY29uOiAnaHR0cHM6Ly9tcC5uZW51eW91dGguY29tL2ljb24vbW9kdWxlL2xpc3Quc3ZnJywgYWltOiAnY2hlY2s5JyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAn6ZyA5bim54mp5ZOBJywgaWNvbjogJ2h0dHBzOi8vbXAubmVudXlvdXRoLmNvbS9pY29uL21vZHVsZS9nb29kLnN2ZycsIGFpbTogJ2NoZWNrNycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ+e8tOi0ueebuOWFsycsIGljb246ICdodHRwczovL21wLm5lbnV5b3V0aC5jb20vaWNvbi9tb2R1bGUvcGF5LnN2ZycsIGFpbTogJ2NoZWNrMTAnIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0YWc6ICdncmlkJyxcclxuICAgICAgICBoZWFkOiAn5a2m5Zyo5Lic5biIJyxcclxuICAgICAgICBjb250ZW50OiBbXHJcbiAgICAgICAgICB7IHRleHQ6ICflrabkuaAnLCBpY29uOiAnL2ljb24vdGFiUGFnZS9zdHVkeS5zdmcnLCBhaW06ICdzdHVkeTAnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICfor77nqIsnLCBpY29uOiAnL2ljb24vdGFiUGFnZS9jb3Vyc2Uuc3ZnJywgYWltOiAnY291cnNlMCcgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ+WbvuS5pummhicsIGljb246ICcvaWNvbi90YWJQYWdlL2xpYnJhcnkuc3ZnJywgYWltOiAnbGlicmFyeTAnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICfogIPor5UnLCBpY29uOiAnL2ljb24vdGFiUGFnZS90ZXN0LnN2ZycsIGFpbTogJ3Rlc3QwJyB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGFnOiAnZ3JpZCcsXHJcbiAgICAgICAgaGVhZDogJ+ihjOWcqOS4nOW4iCcsXHJcbiAgICAgICAgY29udGVudDogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAn6aOf5aCCJywgaWNvbjogJy9pY29uL3RhYlBhZ2UvZGluaW5nLnN2ZycsIGFpbTogJ2RpbmluZzAnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICfmoKHlm63ljaEnLCBpY29uOiAnL2ljb24vdGFiUGFnZS9jYXJkLnN2ZycsIGFpbTogJ2NhcmQwJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAn55Sf5rS7JywgaWNvbjogJy9pY29uL3RhYlBhZ2UvbGlmZS5zdmcnLCBhaW06ICdsaWZlMCcgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ+WvneWupCcsIGljb246ICcvaWNvbi90YWJQYWdlL2Rvcm0uc3ZnJywgYWltOiAnZG9ybTAnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICfmoKHlm63nvZEnLCBpY29uOiAnL2ljb24vdGFiUGFnZS9uZXR3b3JrLnN2ZycsIGFpbTogJ25ldHdvcmswJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAn6LWE5YqpJywgaWNvbjogJy9pY29uL3RhYlBhZ2Uvc3Vic2lkaXplLnN2ZycsIGFpbTogJ3N1YnNpZGl6ZTAnIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0YWc6ICdncmlkJyxcclxuICAgICAgICBoZWFkOiAn5LmQ5Zyo5Lic5biIJyxcclxuICAgICAgICBjb250ZW50OiBbXHJcbiAgICAgICAgICB7IHRleHQ6ICflrabnlJ/nu4Tnu4cnLCBpY29uOiAnL2ljb24vdGFiUGFnZS9zdHVkZW50T3JnLnN2ZycsIGFpbTogJ3N0dWRlbnRPcmcwJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAn56S+5ZuiJywgaWNvbjogJy9pY29uL3RhYlBhZ2UvY29ycG9yYXRpb24uc3ZnJywgYWltOiAnY29ycG9yYXRpb24wJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAn5Lqk6YCaJywgaWNvbjogJy9pY29uL3RhYlBhZ2UvdHJhZmZpYy5zdmcnLCBhaW06ICd0cmFmZmljMCcgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ+WQg+WWneeOqeS5kCcsIGljb246ICcvaWNvbi90YWJQYWdlL25lYXJieS5zdmcnLCBhaW06ICduZWFyYnkwJyB9XHJcbiAgICAgICAgICAvKlxyXG4gICAgICAgICAgICogeyB0ZXh0OiAn5paw55Sf5oql5YiwJywgaWNvbjogJy9pY29uL2d1aWRlL2NoZWNrLnN2ZycsIGFpbTogJ2NoZWNrMCcgfSxcclxuICAgICAgICAgICAqIHsgdGV4dDogJ1NJTeWNoScsIGljb246ICcvaWNvbi9ndWlkZS9zaW0uc3ZnJywgYWltOiAnc2ltMCcgfVxyXG4gICAgICAgICAgICovXHJcblxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZm9vdDogJyAnXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG9uUHJlbG9hZChyZXM6IFdYUGFnZS5QYWdlQXJnKSB7XHJcbiAgICBjb25zdCBwYWdlRGF0YSA9IHRoaXMuJHRha2UoJ2d1aWRlJyk7XHJcblxyXG4gICAgJHBhZ2UucmVzb2x2ZShyZXMsIHBhZ2VEYXRhID8gcGFnZURhdGEgOiB3eC5nZXRTdG9yYWdlU3luYygnZ3VpZGUnKSk7XHJcbiAgICBjb25zb2xlLmxvZyhg5Lic5biI5oyH5Y2X6aKE5Yqg6L2955So5pe2JHtuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGEuZGF0ZX1tc2ApO1xyXG4gIH0sXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgJHBhZ2UuU2V0KHsgb3B0aW9uOiB7IGFpbTogJ2d1aWRlJyB9LCBjdHg6IHRoaXMgfSk7XHJcbiAgICAkcGFnZS5Ob3RpY2UoJ2d1aWRlJyk7XHJcbiAgICAkdGFiLnVwZGF0ZSgncGFnZScsICcxNTBLJyk7XHJcbiAgfSxcclxuICBvblNob3coKSB7XHJcbiAgICAvLyDorr7nva7og7blm4rlkozog4zmma/popzoibJcclxuICAgIGNvbnN0IHsgbmMsIGJjIH0gPSAkcGFnZS5jb2xvcih0aGlzLmRhdGEucGFnZVswXS5ncmV5KTtcclxuXHJcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyQ29sb3IobmMpO1xyXG4gICAgd3guc2V0QmFja2dyb3VuZENvbG9yKGJjKTtcclxuICB9LFxyXG4gIG9uUmVhZHkoKSB7XHJcbiAgICAvLyDms6jlhozkuovku7bnm5HlkKzlmahcclxuICAgIHRoaXMuJG9uISgndGhlbWUnLCAoVDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSEoeyBUIH0pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLiRvbiEoJ25pZ2h0bW9kZScsIChubTogYm9vbGVhbikgPT4ge1xyXG4gICAgICB0aGlzLnNldERhdGEhKHsgbm0gfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xyXG4gICAgJHRhYi5yZWZyZXNoKCdndWlkZScsIHRoaXMsIGEpO1xyXG4gICAgJHRhYi51cGRhdGUoJ3BhZ2UnLCAnMTQ1SycpO1xyXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xyXG4gIH0sXHJcbiAgb25QYWdlU2Nyb2xsKGUpIHtcclxuICAgICRjb21wb25lbnQubmF2KGUsIHRoaXMpO1xyXG4gIH0sXHJcbiAgY0EoZTogYW55KSB7XHJcbiAgICAkY29tcG9uZW50LnRyaWdnZXIoZSwgdGhpcyk7XHJcbiAgfSxcclxuICBvblNoYXJlQXBwTWVzc2FnZTogKCkgPT4gKHsgdGl0bGU6ICfkuJzluIjmjIfljZcnLCBwYXRoOiAnL3BhZ2UvZ3VpZGUnIH0pXHJcbn0pO1xyXG4iXX0=