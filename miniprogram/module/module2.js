"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
var component_1 = require("../utils/component");
var setpage_1 = require("../utils/setpage");
wxpage_1.default('module2', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlMi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vZHVsZTIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBMkM7QUFDM0MsZ0RBQTRDO0FBQzVDLDRDQUFxQztBQUVyQyxnQkFBUyxDQUFDLFNBQVMsRUFBRTtJQUNuQixVQUFVLEVBQVYsVUFBVyxHQUFtQjtRQUM1QixpQkFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTSxFQUFOLFVBQU8sR0FBUTtRQUNiLGlCQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsTUFBTTtRQUVFLElBQUEsb0RBQThDLEVBQTdDLFVBQUUsRUFBRSxVQUF5QyxDQUFDO1FBRXJELEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELFlBQVksRUFBWixVQUFhLEdBQVE7UUFDbkIsbUJBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCxFQUFFLEVBQUYsVUFBRyxHQUFRO1FBQ1QsbUJBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxpQkFBaUI7UUFDZixPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDOUIsSUFBSSxFQUFFLGdFQUFvRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFLO1NBQ2xGLENBQUM7SUFDSixDQUFDO0lBQ0QsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkcmVnaXN0ZXIsIHsgV1hQYWdlIH0gZnJvbSAnd3hwYWdlJztcbmltcG9ydCAkY29tcG9uZW50IGZyb20gJy4uL3V0aWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgJHBhZ2UgZnJvbSAnLi4vdXRpbHMvc2V0cGFnZSc7XG5cbiRyZWdpc3RlcignbW9kdWxlMicsIHtcbiAgb25OYXZpZ2F0ZShyZXM6IFdYUGFnZS5QYWdlQXJnKSB7XG4gICAgJHBhZ2UucmVzb2x2ZShyZXMpO1xuICB9LFxuICBvbkxvYWQocmVzOiBhbnkpIHtcbiAgICAkcGFnZS5PbmxpbmUocmVzLCB0aGlzKTtcbiAgfSxcbiAgb25TaG93KCkge1xuICAgIC8vIOiuvue9ruiDtuWbiuWSjOiDjOaZr+minOiJslxuICAgIGNvbnN0IHtuYywgYmN9ID0gJHBhZ2UuY29sb3IodGhpcy5kYXRhLnBhZ2VbMF0uZ3JleSk7XG5cbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyQ29sb3IobmMpO1xuICAgIHd4LnNldEJhY2tncm91bmRDb2xvcihiYyk7XG4gIH0sXG4gIG9uUGFnZVNjcm9sbChyZXM6IGFueSkge1xuICAgICRjb21wb25lbnQubmF2KHJlcywgdGhpcyk7XG4gIH0sXG4gIGNBKHJlczogYW55KSB7XG4gICAgJGNvbXBvbmVudC50cmlnZ2VyKHJlcywgdGhpcyk7XG4gIH0sXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy5kYXRhLnBhZ2VbMF0udGl0bGUsXG4gICAgICBwYXRoOiBgL21vZHVsZS9zaGFyZVBhZ2U/RnJvbT3kuLvpobUmZGVwdGg9MSZzaGFyZT10cnVlJmFpbT0ke3RoaXMuZGF0YS5wYWdlWzBdLmFpbX1gXG4gICAgfTtcbiAgfSxcbiAgb25VbmxvYWQoKSB7XG4gICAgZGVsZXRlIHRoaXMuZGF0YS5wYWdlO1xuICB9XG59KTtcbiJdfQ==