"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = getApp().lib, $component = _a.$component, $page = _a.$page, $register = _a.$register;
$register('module4', {
    onNavigate: function (res) {
        $page.resolve(res);
    },
    onLoad: function (res) {
        $page.Online(res, this);
    },
    onShow: function () {
        var _a = $page.color(this.data.page[0].grey), nc = _a[0], bc = _a[1];
        wx.setNavigationBarColor(nc);
        wx.setBackgroundColor(bc);
    },
    onPageScroll: function (res) {
        $component.nav(res, this);
    },
    cA: function (res) {
        $component.trigger(res, this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlNC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vZHVsZTQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDUSxJQUFBLGlCQUFxQyxFQUE5QiwwQkFBVSxFQUFFLGdCQUFLLEVBQUUsd0JBQVcsQ0FBYztBQUUzRCxTQUFTLENBQUMsU0FBUyxFQUFFO0lBQ25CLFVBQVUsRUFBVixVQUFXLEdBQW1CO1FBQzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNELE1BQU0sRUFBTixVQUFPLEdBQVE7UUFDYixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsTUFBTTtRQUVFLElBQUEsd0NBQThDLEVBQTdDLFVBQUUsRUFBRSxVQUF5QyxDQUFDO1FBRXJELEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELFlBQVksRUFBWixVQUFhLEdBQVE7UUFDbkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELEVBQUUsRUFBRixVQUFHLEdBQVE7UUFDVCxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsaUJBQWlCO1FBQ2YsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQzlCLElBQUksRUFBRSxnRUFBb0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBSztTQUNsRixDQUFDO0lBQ0osQ0FBQztJQUNELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXWFBhZ2UgfSBmcm9tICd3eHBhZ2UnO1xuY29uc3QgeyBsaWI6IHsgJGNvbXBvbmVudCwgJHBhZ2UsICRyZWdpc3RlciB9IH0gPSBnZXRBcHAoKTtcblxuJHJlZ2lzdGVyKCdtb2R1bGU0Jywge1xuICBvbk5hdmlnYXRlKHJlczogV1hQYWdlLlBhZ2VBcmcpIHtcbiAgICAkcGFnZS5yZXNvbHZlKHJlcyk7XG4gIH0sXG4gIG9uTG9hZChyZXM6IGFueSkge1xuICAgICRwYWdlLk9ubGluZShyZXMsIHRoaXMpO1xuICB9LFxuICBvblNob3coKSB7XG4gICAgLy8g6K6+572u6IO25ZuK5ZKM6IOM5pmv6aKc6ImyXG4gICAgY29uc3QgW25jLCBiY10gPSAkcGFnZS5jb2xvcih0aGlzLmRhdGEucGFnZVswXS5ncmV5KTtcblxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJDb2xvcihuYyk7XG4gICAgd3guc2V0QmFja2dyb3VuZENvbG9yKGJjKTtcbiAgfSxcbiAgb25QYWdlU2Nyb2xsKHJlczogYW55KSB7XG4gICAgJGNvbXBvbmVudC5uYXYocmVzLCB0aGlzKTtcbiAgfSxcbiAgY0EocmVzOiBhbnkpIHtcbiAgICAkY29tcG9uZW50LnRyaWdnZXIocmVzLCB0aGlzKTtcbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLmRhdGEucGFnZVswXS50aXRsZSxcbiAgICAgIHBhdGg6IGAvbW9kdWxlL3NoYXJlUGFnZT9Gcm9tPeS4u+mhtSZkZXB0aD0xJnNoYXJlPXRydWUmYWltPSR7dGhpcy5kYXRhLnBhZ2VbMF0uYWltfWBcbiAgICB9O1xuICB9LFxuICBvblVubG9hZCgpIHtcbiAgICBkZWxldGUgdGhpcy5kYXRhLnBhZ2U7XG4gIH1cbn0pO1xuIl19