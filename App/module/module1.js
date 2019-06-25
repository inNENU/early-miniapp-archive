"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
var component_1 = require("../utils/component");
var setpage_1 = require("../utils/setpage");
wxpage_1.default('module1', {
    onNavigate: function (res) {
        setpage_1.default.resolve(res);
    },
    onLoad: function (res) {
        setpage_1.default.Online(res, this);
    },
    onShow: function () {
        var _a = setpage_1.default.color(this.data.page[0].grey), nc = _a.nc, bc = _a.bc;
        wx.setNavigationBarColor(nc);
        wx.setBackgroundColor(bc);
    },
    onPageScroll: function (res) {
        component_1.default.nav(res, this);
    },
    cA: function (res) {
        component_1.default.trigger(res, this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vZHVsZTEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBMkM7QUFDM0MsZ0RBQTRDO0FBQzVDLDRDQUFxQztBQUVyQyxnQkFBUyxDQUFDLFNBQVMsRUFBRTtJQUNuQixVQUFVLEVBQVYsVUFBVyxHQUFtQjtRQUM1QixpQkFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTSxFQUFOLFVBQU8sR0FBUTtRQUNiLGlCQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsTUFBTTtRQUVFLElBQUEsb0RBQWdELEVBQTlDLFVBQUUsRUFBRSxVQUEwQyxDQUFDO1FBRXZELEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELFlBQVksRUFBWixVQUFhLEdBQVE7UUFDbkIsbUJBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCxFQUFFLEVBQUYsVUFBRyxHQUFRO1FBQ1QsbUJBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxpQkFBaUI7UUFDZixPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDOUIsSUFBSSxFQUFFLGdFQUFvRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFLO1NBQ2xGLENBQUM7SUFDSixDQUFDO0lBQ0QsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkcmVnaXN0ZXIsIHsgV1hQYWdlIH0gZnJvbSAnd3hwYWdlJztcbmltcG9ydCAkY29tcG9uZW50IGZyb20gJy4uL3V0aWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgJHBhZ2UgZnJvbSAnLi4vdXRpbHMvc2V0cGFnZSc7XG5cbiRyZWdpc3RlcignbW9kdWxlMScsIHtcbiAgb25OYXZpZ2F0ZShyZXM6IFdYUGFnZS5QYWdlQXJnKSB7XG4gICAgJHBhZ2UucmVzb2x2ZShyZXMpO1xuICB9LFxuICBvbkxvYWQocmVzOiBhbnkpIHtcbiAgICAkcGFnZS5PbmxpbmUocmVzLCB0aGlzKTtcbiAgfSxcbiAgb25TaG93KCkge1xuICAgIC8vIOiuvue9ruiDtuWbiuWSjOiDjOaZr+minOiJslxuICAgIGNvbnN0IHsgbmMsIGJjIH0gPSAkcGFnZS5jb2xvcih0aGlzLmRhdGEucGFnZVswXS5ncmV5KTtcblxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJDb2xvcihuYyk7XG4gICAgd3guc2V0QmFja2dyb3VuZENvbG9yKGJjKTtcbiAgfSxcbiAgb25QYWdlU2Nyb2xsKHJlczogYW55KSB7XG4gICAgJGNvbXBvbmVudC5uYXYocmVzLCB0aGlzKTtcbiAgfSxcbiAgY0EocmVzOiBhbnkpIHtcbiAgICAkY29tcG9uZW50LnRyaWdnZXIocmVzLCB0aGlzKTtcbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLmRhdGEucGFnZVswXS50aXRsZSxcbiAgICAgIHBhdGg6IGAvbW9kdWxlL3NoYXJlUGFnZT9Gcm9tPeS4u+mhtSZkZXB0aD0xJnNoYXJlPXRydWUmYWltPSR7dGhpcy5kYXRhLnBhZ2VbMF0uYWltfWBcbiAgICB9O1xuICB9LFxuICBvblVubG9hZCgpIHtcbiAgICBkZWxldGUgdGhpcy5kYXRhLnBhZ2U7XG4gIH1cbn0pO1xuIl19