"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
var component_1 = require("../utils/component");
var page_1 = require("../utils/page");
wxpage_1.default('sharePage', {
    onNavigate: function (res) {
        page_1.default.resolve(res);
    },
    onLoad: function (res) {
        if ('scene' in res) {
            res.From = '主页';
            res.aim = decodeURIComponent(res.scene);
            res.share = true;
            res.depth = 1;
            page_1.default.Online(res, this);
        }
        wx.reportMonitor('2', 1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVQYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmVQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQTJDO0FBQzNDLGdEQUE0QztBQUM1QyxzQ0FBa0M7QUFFbEMsZ0JBQVMsQ0FBQyxXQUFXLEVBQUU7SUFDckIsVUFBVSxFQUFWLFVBQVcsR0FBbUI7UUFDNUIsY0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTSxFQUFOLFVBQU8sR0FBUTtRQUNiLElBQUksT0FBTyxJQUFJLEdBQUcsRUFBRTtZQUNsQixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNqQixHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLGNBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELE1BQU07UUFFRSxJQUFBLGlEQUFnRCxFQUE5QyxVQUFFLEVBQUUsVUFBMEMsQ0FBQztRQUV2RCxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCxZQUFZLFlBQUMsR0FBRztRQUNkLG1CQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0QsRUFBRSxFQUFGLFVBQUcsR0FBUTtRQUNULG1CQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELGlCQUFpQjtRQUNmLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztZQUM5QixJQUFJLEVBQUUsZ0VBQW9ELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUs7U0FDbEYsQ0FBQztJQUNKLENBQUM7SUFDRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN4QixDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICRyZWdpc3RlciwgeyBXWFBhZ2UgfSBmcm9tICd3eHBhZ2UnO1xyXG5pbXBvcnQgJGNvbXBvbmVudCBmcm9tICcuLi91dGlscy9jb21wb25lbnQnO1xyXG5pbXBvcnQgJHBhZ2UgZnJvbSAnLi4vdXRpbHMvcGFnZSc7XHJcblxyXG4kcmVnaXN0ZXIoJ3NoYXJlUGFnZScsIHtcclxuICBvbk5hdmlnYXRlKHJlczogV1hQYWdlLlBhZ2VBcmcpIHtcclxuICAgICRwYWdlLnJlc29sdmUocmVzKTtcclxuICB9LFxyXG4gIG9uTG9hZChyZXM6IGFueSkge1xyXG4gICAgaWYgKCdzY2VuZScgaW4gcmVzKSB7XHJcbiAgICAgIHJlcy5Gcm9tID0gJ+S4u+mhtSc7XHJcbiAgICAgIHJlcy5haW0gPSBkZWNvZGVVUklDb21wb25lbnQocmVzLnNjZW5lKTtcclxuICAgICAgcmVzLnNoYXJlID0gdHJ1ZTtcclxuICAgICAgcmVzLmRlcHRoID0gMTtcclxuICAgICAgJHBhZ2UuT25saW5lKHJlcywgdGhpcyk7XHJcbiAgICB9XHJcbiAgICB3eC5yZXBvcnRNb25pdG9yKCcyJywgMSk7XHJcbiAgfSxcclxuICBvblNob3coKSB7XHJcbiAgICAvLyDorr7nva7og7blm4rlkozog4zmma/popzoibJcclxuICAgIGNvbnN0IHsgbmMsIGJjIH0gPSAkcGFnZS5jb2xvcih0aGlzLmRhdGEucGFnZVswXS5ncmV5KTtcclxuXHJcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyQ29sb3IobmMpO1xyXG4gICAgd3guc2V0QmFja2dyb3VuZENvbG9yKGJjKTtcclxuICB9LFxyXG4gIG9uUGFnZVNjcm9sbChyZXMpIHtcclxuICAgICRjb21wb25lbnQubmF2KHJlcywgdGhpcyk7XHJcbiAgfSxcclxuICBjQShyZXM6IGFueSkge1xyXG4gICAgJGNvbXBvbmVudC50cmlnZ2VyKHJlcywgdGhpcyk7XHJcbiAgfSxcclxuICByZWRpcmVjdCgpIHtcclxuICAgIHRoaXMuJGxhdW5jaCgnL3BhZ2UvbWFpbicpO1xyXG4gIH0sXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogdGhpcy5kYXRhLnBhZ2VbMF0udGl0bGUsXHJcbiAgICAgIHBhdGg6IGAvbW9kdWxlL3NoYXJlUGFnZT9Gcm9tPeS4u+mhtSZkZXB0aD0xJnNoYXJlPXRydWUmYWltPSR7dGhpcy5kYXRhLnBhZ2VbMF0uYWltfWBcclxuICAgIH07XHJcbiAgfSxcclxuICBvblVubG9hZCgpIHtcclxuICAgIGRlbGV0ZSB0aGlzLmRhdGEucGFnZTtcclxuICB9XHJcbn0pO1xyXG4iXX0=