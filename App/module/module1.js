"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
var component_1 = require("../utils/component");
var page_1 = require("../utils/page");
wxpage_1.default('module1', {
    onNavigate: function (res) {
        page_1.default.resolve(res);
    },
    onLoad: function (res) {
        page_1.default.Online(res, this);
    },
    onShow: function () {
        var _a = page_1.default.color(this.data.page[0].grey), nc = _a.nc, bc = _a.bc;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vZHVsZTEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBMkM7QUFDM0MsZ0RBQTRDO0FBQzVDLHNDQUFrQztBQUVsQyxnQkFBUyxDQUFDLFNBQVMsRUFBRTtJQUNuQixVQUFVLEVBQVYsVUFBVyxHQUFtQjtRQUM1QixjQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxNQUFNLEVBQU4sVUFBTyxHQUFRO1FBQ2IsY0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELE1BQU07UUFFRSxJQUFBLGlEQUFnRCxFQUE5QyxVQUFFLEVBQUUsVUFBMEMsQ0FBQztRQUV2RCxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCxZQUFZLEVBQVosVUFBYSxHQUFRO1FBQ25CLG1CQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0QsRUFBRSxFQUFGLFVBQUcsR0FBUTtRQUNULG1CQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsaUJBQWlCO1FBQ2YsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQzlCLElBQUksRUFBRSxnRUFBb0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBSztTQUNsRixDQUFDO0lBQ0osQ0FBQztJQUNELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJHJlZ2lzdGVyLCB7IFdYUGFnZSB9IGZyb20gJ3d4cGFnZSc7XG5pbXBvcnQgJGNvbXBvbmVudCBmcm9tICcuLi91dGlscy9jb21wb25lbnQnO1xuaW1wb3J0ICRwYWdlIGZyb20gJy4uL3V0aWxzL3BhZ2UnO1xuXG4kcmVnaXN0ZXIoJ21vZHVsZTEnLCB7XG4gIG9uTmF2aWdhdGUocmVzOiBXWFBhZ2UuUGFnZUFyZykge1xuICAgICRwYWdlLnJlc29sdmUocmVzKTtcbiAgfSxcbiAgb25Mb2FkKHJlczogYW55KSB7XG4gICAgJHBhZ2UuT25saW5lKHJlcywgdGhpcyk7XG4gIH0sXG4gIG9uU2hvdygpIHtcbiAgICAvLyDorr7nva7og7blm4rlkozog4zmma/popzoibJcbiAgICBjb25zdCB7IG5jLCBiYyB9ID0gJHBhZ2UuY29sb3IodGhpcy5kYXRhLnBhZ2VbMF0uZ3JleSk7XG5cbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyQ29sb3IobmMpO1xuICAgIHd4LnNldEJhY2tncm91bmRDb2xvcihiYyk7XG4gIH0sXG4gIG9uUGFnZVNjcm9sbChyZXM6IGFueSkge1xuICAgICRjb21wb25lbnQubmF2KHJlcywgdGhpcyk7XG4gIH0sXG4gIGNBKHJlczogYW55KSB7XG4gICAgJGNvbXBvbmVudC50cmlnZ2VyKHJlcywgdGhpcyk7XG4gIH0sXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy5kYXRhLnBhZ2VbMF0udGl0bGUsXG4gICAgICBwYXRoOiBgL21vZHVsZS9zaGFyZVBhZ2U/RnJvbT3kuLvpobUmZGVwdGg9MSZzaGFyZT10cnVlJmFpbT0ke3RoaXMuZGF0YS5wYWdlWzBdLmFpbX1gXG4gICAgfTtcbiAgfSxcbiAgb25VbmxvYWQoKSB7XG4gICAgZGVsZXRlIHRoaXMuZGF0YS5wYWdlO1xuICB9XG59KTtcbiJdfQ==