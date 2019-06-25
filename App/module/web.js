"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
var page_1 = require("../utils/page");
wxpage_1.default('web', {
    onLoad: function (res) {
        var title = res.title;
        wx.setNavigationBarTitle({ title: title });
        this.setData({ url: res.url, title: title });
    },
    onShow: function () {
        var _a = page_1.default.color(this.data.page[0].grey), nc = _a.nc, bc = _a.bc;
        wx.setNavigationBarColor(nc);
        wx.setBackgroundColor(bc);
    },
    onShareAppMessage: function () {
        return { title: this.data.title, path: "/module/web?url=" + this.data.url };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2ViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUNBQStCO0FBQy9CLHNDQUFrQztBQUVsQyxnQkFBUyxDQUFDLEtBQUssRUFBRTtJQUNmLE1BQU0sRUFBTixVQUFPLEdBQVE7UUFDTCxJQUFBLGlCQUFLLENBQVM7UUFFdEIsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNELE1BQU07UUFFRSxJQUFBLGlEQUFnRCxFQUE5QyxVQUFFLEVBQUUsVUFBMEMsQ0FBQztRQUV2RCxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCxpQkFBaUI7UUFDZixPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxxQkFBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFLLEVBQUUsQ0FBQztJQUM5RSxDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIGdldEFwcCB3eCovXHJcbmltcG9ydCAkcmVnaXN0ZXIgZnJvbSAnd3hwYWdlJztcclxuaW1wb3J0ICRwYWdlIGZyb20gJy4uL3V0aWxzL3BhZ2UnO1xyXG5cclxuJHJlZ2lzdGVyKCd3ZWInLCB7XHJcbiAgb25Mb2FkKHJlczogYW55KSB7XHJcbiAgICBjb25zdCB7IHRpdGxlIH0gPSByZXM7XHJcblxyXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgdGl0bGUgfSk7XHJcbiAgICB0aGlzLnNldERhdGEhKHsgdXJsOiByZXMudXJsLCB0aXRsZSB9KTtcclxuICB9LFxyXG4gIG9uU2hvdygpIHtcclxuICAgIC8vIOiuvue9ruiDtuWbiuWSjOiDjOaZr+minOiJslxyXG4gICAgY29uc3QgeyBuYywgYmMgfSA9ICRwYWdlLmNvbG9yKHRoaXMuZGF0YS5wYWdlWzBdLmdyZXkpO1xyXG5cclxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJDb2xvcihuYyk7XHJcbiAgICB3eC5zZXRCYWNrZ3JvdW5kQ29sb3IoYmMpO1xyXG4gIH0sXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICByZXR1cm4geyB0aXRsZTogdGhpcy5kYXRhLnRpdGxlLCBwYXRoOiBgL21vZHVsZS93ZWI/dXJsPSR7dGhpcy5kYXRhLnVybH1gIH07XHJcbiAgfVxyXG59KTtcclxuIl19