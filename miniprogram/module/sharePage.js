"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = getApp().lib, $component = _a.$component, $page = _a.$page, $register = _a.$register;
$register('sharePage', {
    onNavigate: function (res) {
        $page.resolve(res);
    },
    onLoad: function (res) {
        if ('scene' in res) {
            res.From = '主页';
            res.aim = decodeURIComponent(res.scene);
            res.share = true;
            res.depth = 1;
            $page.Online(res, this);
        }
        wx.reportMonitor('2', 1);
    },
    onShow: function () {
        var _a = $page.color(a, this.data.page[0].grey), nc = _a[0], bc = _a[1];
        wx.setNavigationBarColor(nc);
        wx.setBackgroundColor(bc);
    },
    onPageScroll: function (res) {
        $component.nav(res, this);
    },
    cA: function (res) {
        $component.trigger(res, this);
    },
    redirect: function () {
        this.$launch('/page/main');
    },
    onShareAppMessage: function () {
        return {
            title: this.data.page[0].title,
            path: "/module/sharePage?From=\u4E3B\u9875&depth=1&share=true&aim=" + this.data.page[0].aim
        };
    },
    onUnload: function () {
        delete this.data.page;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVQYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmVQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ1EsSUFBQSxpQkFBcUMsRUFBOUIsMEJBQVUsRUFBRSxnQkFBSyxFQUFFLHdCQUFXLENBQWM7QUFFM0QsU0FBUyxDQUFDLFdBQVcsRUFBRTtJQUNyQixVQUFVLEVBQVYsVUFBVyxHQUFtQjtRQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxNQUFNLEVBQU4sVUFBTyxHQUFRO1FBQ2IsSUFBSSxPQUFPLElBQUksR0FBRyxFQUFFO1lBQ2xCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFDRCxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0QsTUFBTTtRQUVFLElBQUEsMkNBQWlELEVBQWhELFVBQUUsRUFBRSxVQUE0QyxDQUFDO1FBRXhELEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELFlBQVksRUFBWixVQUFhLEdBQVE7UUFDbkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELEVBQUUsRUFBRixVQUFHLEdBQVE7UUFDVCxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELGlCQUFpQjtRQUNmLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztZQUM5QixJQUFJLEVBQUUsZ0VBQW9ELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUs7U0FDbEYsQ0FBQztJQUNKLENBQUM7SUFDRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN4QixDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV1hQYWdlIH0gZnJvbSAnd3hwYWdlJztcclxuY29uc3QgeyBsaWI6IHsgJGNvbXBvbmVudCwgJHBhZ2UsICRyZWdpc3RlciB9IH0gPSBnZXRBcHAoKTtcclxuXHJcbiRyZWdpc3Rlcignc2hhcmVQYWdlJywge1xyXG4gIG9uTmF2aWdhdGUocmVzOiBXWFBhZ2UuUGFnZUFyZykge1xyXG4gICAgJHBhZ2UucmVzb2x2ZShyZXMpO1xyXG4gIH0sXHJcbiAgb25Mb2FkKHJlczogYW55KSB7XHJcbiAgICBpZiAoJ3NjZW5lJyBpbiByZXMpIHtcclxuICAgICAgcmVzLkZyb20gPSAn5Li76aG1JztcclxuICAgICAgcmVzLmFpbSA9IGRlY29kZVVSSUNvbXBvbmVudChyZXMuc2NlbmUpO1xyXG4gICAgICByZXMuc2hhcmUgPSB0cnVlO1xyXG4gICAgICByZXMuZGVwdGggPSAxO1xyXG4gICAgICAkcGFnZS5PbmxpbmUocmVzLCB0aGlzKTtcclxuICAgIH1cclxuICAgIHd4LnJlcG9ydE1vbml0b3IoJzInLCAxKTtcclxuICB9LFxyXG4gIG9uU2hvdygpIHtcclxuICAgIC8vIOiuvue9ruiDtuWbiuWSjOiDjOaZr+minOiJslxyXG4gICAgY29uc3QgW25jLCBiY10gPSAkcGFnZS5jb2xvcihhLCB0aGlzLmRhdGEucGFnZVswXS5ncmV5KTtcclxuXHJcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyQ29sb3IobmMpO1xyXG4gICAgd3guc2V0QmFja2dyb3VuZENvbG9yKGJjKTtcclxuICB9LFxyXG4gIG9uUGFnZVNjcm9sbChyZXM6IGFueSkge1xyXG4gICAgJGNvbXBvbmVudC5uYXYocmVzLCB0aGlzKTtcclxuICB9LFxyXG4gIGNBKHJlczogYW55KSB7XHJcbiAgICAkY29tcG9uZW50LnRyaWdnZXIocmVzLCB0aGlzKTtcclxuICB9LFxyXG4gIHJlZGlyZWN0KCkge1xyXG4gICAgdGhpcy4kbGF1bmNoKCcvcGFnZS9tYWluJyk7XHJcbiAgfSxcclxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRhdGEucGFnZVswXS50aXRsZSxcclxuICAgICAgcGF0aDogYC9tb2R1bGUvc2hhcmVQYWdlP0Zyb2095Li76aG1JmRlcHRoPTEmc2hhcmU9dHJ1ZSZhaW09JHt0aGlzLmRhdGEucGFnZVswXS5haW19YFxyXG4gICAgfTtcclxuICB9LFxyXG4gIG9uVW5sb2FkKCkge1xyXG4gICAgZGVsZXRlIHRoaXMuZGF0YS5wYWdlO1xyXG4gIH1cclxufSk7XHJcbiJdfQ==