"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
var component_1 = require("../utils/component");
var page_1 = require("../utils/page");
wxpage_1.default('module3', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vZHVsZTMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBMkM7QUFDM0MsZ0RBQTRDO0FBQzVDLHNDQUFrQztBQUVsQyxnQkFBUyxDQUFDLFNBQVMsRUFBRTtJQUNuQixVQUFVLEVBQVYsVUFBVyxHQUFtQjtRQUM1QixjQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxNQUFNLEVBQU4sVUFBTyxHQUFRO1FBQ2IsY0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELE1BQU07UUFFRSxJQUFBLGlEQUE4QyxFQUE3QyxVQUFFLEVBQUUsVUFBeUMsQ0FBQztRQUVyRCxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCxZQUFZLEVBQVosVUFBYSxHQUFRO1FBQ25CLG1CQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0QsRUFBRSxFQUFGLFVBQUcsR0FBUTtRQUNULG1CQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsaUJBQWlCO1FBQ2YsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQzlCLElBQUksRUFBRSxnRUFBb0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBSztTQUNsRixDQUFDO0lBQ0osQ0FBQztJQUNELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJHJlZ2lzdGVyLCB7IFdYUGFnZSB9IGZyb20gJ3d4cGFnZSc7XG5pbXBvcnQgJGNvbXBvbmVudCBmcm9tICcuLi91dGlscy9jb21wb25lbnQnO1xuaW1wb3J0ICRwYWdlIGZyb20gJy4uL3V0aWxzL3BhZ2UnO1xuXG4kcmVnaXN0ZXIoJ21vZHVsZTMnLCB7XG4gIG9uTmF2aWdhdGUocmVzOiBXWFBhZ2UuUGFnZUFyZykge1xuICAgICRwYWdlLnJlc29sdmUocmVzKTtcbiAgfSxcbiAgb25Mb2FkKHJlczogYW55KSB7XG4gICAgJHBhZ2UuT25saW5lKHJlcywgdGhpcyk7XG4gIH0sXG4gIG9uU2hvdygpIHtcbiAgICAvLyDorr7nva7og7blm4rlkozog4zmma/popzoibJcbiAgICBjb25zdCB7bmMsIGJjfSA9ICRwYWdlLmNvbG9yKHRoaXMuZGF0YS5wYWdlWzBdLmdyZXkpO1xuXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhckNvbG9yKG5jKTtcbiAgICB3eC5zZXRCYWNrZ3JvdW5kQ29sb3IoYmMpO1xuICB9LFxuICBvblBhZ2VTY3JvbGwocmVzOiBhbnkpIHtcbiAgICAkY29tcG9uZW50Lm5hdihyZXMsIHRoaXMpO1xuICB9LFxuICBjQShyZXM6IGFueSkge1xuICAgICRjb21wb25lbnQudHJpZ2dlcihyZXMsIHRoaXMpO1xuICB9LFxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMuZGF0YS5wYWdlWzBdLnRpdGxlLFxuICAgICAgcGF0aDogYC9tb2R1bGUvc2hhcmVQYWdlP0Zyb2095Li76aG1JmRlcHRoPTEmc2hhcmU9dHJ1ZSZhaW09JHt0aGlzLmRhdGEucGFnZVswXS5haW19YFxuICAgIH07XG4gIH0sXG4gIG9uVW5sb2FkKCkge1xuICAgIGRlbGV0ZSB0aGlzLmRhdGEucGFnZTtcbiAgfVxufSk7XG4iXX0=