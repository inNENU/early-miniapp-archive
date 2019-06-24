"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
var component_1 = require("../utils/component");
var setpage_1 = require("../utils/setpage");
wxpage_1.default('sharePage', {
    onNavigate: function (res) {
        setpage_1.default.resolve(res);
    },
    onLoad: function (res) {
        if ('scene' in res) {
            res.From = '主页';
            res.aim = decodeURIComponent(res.scene);
            res.share = true;
            res.depth = 1;
            setpage_1.default.Online(res, this);
        }
        wx.reportMonitor('2', 1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVQYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmVQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQTJDO0FBQzNDLGdEQUE0QztBQUM1Qyw0Q0FBcUM7QUFFckMsZ0JBQVMsQ0FBQyxXQUFXLEVBQUU7SUFDckIsVUFBVSxFQUFWLFVBQVcsR0FBbUI7UUFDNUIsaUJBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNELE1BQU0sRUFBTixVQUFPLEdBQVE7UUFDYixJQUFJLE9BQU8sSUFBSSxHQUFHLEVBQUU7WUFDbEIsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDakIsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxpQkFBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFDRCxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0QsTUFBTTtRQUVFLElBQUEsb0RBQWdELEVBQTlDLFVBQUUsRUFBRSxVQUEwQyxDQUFDO1FBRXZELEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELFlBQVksRUFBWixVQUFhLEdBQVE7UUFDbkIsbUJBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCxFQUFFLEVBQUYsVUFBRyxHQUFRO1FBQ1QsbUJBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsaUJBQWlCO1FBQ2YsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQzlCLElBQUksRUFBRSxnRUFBb0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBSztTQUNsRixDQUFDO0lBQ0osQ0FBQztJQUNELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJHJlZ2lzdGVyLCB7IFdYUGFnZSB9IGZyb20gJ3d4cGFnZSc7XHJcbmltcG9ydCAkY29tcG9uZW50IGZyb20gJy4uL3V0aWxzL2NvbXBvbmVudCc7XHJcbmltcG9ydCAkcGFnZSBmcm9tICcuLi91dGlscy9zZXRwYWdlJztcclxuXHJcbiRyZWdpc3Rlcignc2hhcmVQYWdlJywge1xyXG4gIG9uTmF2aWdhdGUocmVzOiBXWFBhZ2UuUGFnZUFyZykge1xyXG4gICAgJHBhZ2UucmVzb2x2ZShyZXMpO1xyXG4gIH0sXHJcbiAgb25Mb2FkKHJlczogYW55KSB7XHJcbiAgICBpZiAoJ3NjZW5lJyBpbiByZXMpIHtcclxuICAgICAgcmVzLkZyb20gPSAn5Li76aG1JztcclxuICAgICAgcmVzLmFpbSA9IGRlY29kZVVSSUNvbXBvbmVudChyZXMuc2NlbmUpO1xyXG4gICAgICByZXMuc2hhcmUgPSB0cnVlO1xyXG4gICAgICByZXMuZGVwdGggPSAxO1xyXG4gICAgICAkcGFnZS5PbmxpbmUocmVzLCB0aGlzKTtcclxuICAgIH1cclxuICAgIHd4LnJlcG9ydE1vbml0b3IoJzInLCAxKTtcclxuICB9LFxyXG4gIG9uU2hvdygpIHtcclxuICAgIC8vIOiuvue9ruiDtuWbiuWSjOiDjOaZr+minOiJslxyXG4gICAgY29uc3QgeyBuYywgYmMgfSA9ICRwYWdlLmNvbG9yKHRoaXMuZGF0YS5wYWdlWzBdLmdyZXkpO1xyXG5cclxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJDb2xvcihuYyk7XHJcbiAgICB3eC5zZXRCYWNrZ3JvdW5kQ29sb3IoYmMpO1xyXG4gIH0sXHJcbiAgb25QYWdlU2Nyb2xsKHJlczogYW55KSB7XHJcbiAgICAkY29tcG9uZW50Lm5hdihyZXMsIHRoaXMpO1xyXG4gIH0sXHJcbiAgY0EocmVzOiBhbnkpIHtcclxuICAgICRjb21wb25lbnQudHJpZ2dlcihyZXMsIHRoaXMpO1xyXG4gIH0sXHJcbiAgcmVkaXJlY3QoKSB7XHJcbiAgICB0aGlzLiRsYXVuY2goJy9wYWdlL21haW4nKTtcclxuICB9LFxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGF0YS5wYWdlWzBdLnRpdGxlLFxyXG4gICAgICBwYXRoOiBgL21vZHVsZS9zaGFyZVBhZ2U/RnJvbT3kuLvpobUmZGVwdGg9MSZzaGFyZT10cnVlJmFpbT0ke3RoaXMuZGF0YS5wYWdlWzBdLmFpbX1gXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgb25VbmxvYWQoKSB7XHJcbiAgICBkZWxldGUgdGhpcy5kYXRhLnBhZ2U7XHJcbiAgfVxyXG59KTtcclxuIl19