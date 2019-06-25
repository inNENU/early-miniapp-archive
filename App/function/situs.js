"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
var component_1 = require("../utils/component");
var file_1 = require("../utils/file");
var page_1 = require("../utils/page");
var wx_1 = require("../utils/wx");
var a = getApp().globalData;
wxpage_1.default('situs', {
    data: {},
    onPreload: function (res) {
        page_1.default.resolve(res, file_1.default.readJson("function/" + res.query.xiaoqu + "/" + res.query.aim));
    },
    onLoad: function (option) {
        var _this = this;
        if (a.page.aim === option.aim)
            page_1.default.Set({ option: option, ctx: this });
        else {
            var pageData = file_1.default.readJson("function/" + option.xiaoqu + "/" + option.aim);
            if (pageData)
                page_1.default.Set({ option: option, ctx: this }, pageData);
            else
                wx_1.default.request("function/" + option.xiaoqu + "/" + option.aim, function (data) {
                    page_1.default.Set({ option: option, ctx: _this }, data);
                    if (!option.share) {
                        file_1.default.makeDir("function/" + option.xiaoqu);
                        file_1.default.writeJson("function/" + option.xiaoqu, option.aim, data);
                    }
                }, function () {
                    page_1.default.Set({ option: option, ctx: _this }, [{ tag: 'error', statusBarHeight: a.info.statusBarHeight }]);
                }, function () {
                    page_1.default.Set({ option: option, ctx: _this }, [{ tag: 'error', statusBarHeight: a.info.statusBarHeight }]);
                });
        }
    },
    onShow: function () {
        var _a = page_1.default.color(this.data.page[0].grey), nc = _a.nc, bc = _a.bc;
        wx.setNavigationBarColor(nc);
        wx.setBackgroundColor(bc);
    },
    onPageScroll: function (e) {
        component_1.default.nav(e, this);
    },
    cA: function (e) {
        component_1.default.trigger(e, this);
    },
    onShareAppMessage: function () {
        return {
            title: this.data.page[0].title,
            path: "/function/situs?From=\u4E3B\u9875&depth=1&share=true&xiaoqu=" + this.xiaoqu + "&id=" + this.id + "&aim=" + this.aim
        };
    },
    redirect: function () {
        this.$switch('/page/main');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0dXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLGlDQUEyQztBQUMzQyxnREFBNEM7QUFDNUMsc0NBQWtDO0FBQ2xDLHNDQUFrQztBQUNsQyxrQ0FBOEI7QUFDdEIsSUFBQSx1QkFBYSxDQUFjO0FBRW5DLGdCQUFTLENBQUMsT0FBTyxFQUFFO0lBQ2pCLElBQUksRUFBRSxFQUFFO0lBQ1IsU0FBUyxFQUFULFVBQVUsR0FBbUI7UUFDM0IsY0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsY0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFZLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxTQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBSyxDQUFDLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBQ0QsTUFBTSxFQUFOLFVBQU8sTUFBVztRQUFsQixpQkFxQkM7UUFwQkMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsR0FBRztZQUFFLGNBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUMzRDtZQUNILElBQU0sUUFBUSxHQUFHLGNBQUssQ0FBQyxRQUFRLENBQUMsY0FBWSxNQUFNLENBQUMsTUFBTSxTQUFJLE1BQU0sQ0FBQyxHQUFLLENBQUMsQ0FBQztZQUUzRSxJQUFJLFFBQVE7Z0JBQUUsY0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQzs7Z0JBRXZELFlBQUcsQ0FBQyxPQUFPLENBQUMsY0FBWSxNQUFNLENBQUMsTUFBTSxTQUFJLE1BQU0sQ0FBQyxHQUFLLEVBQUUsVUFBQyxJQUFZO29CQUNsRSxjQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsR0FBRyxFQUFFLEtBQUksRUFBRSxFQUFFLElBQWdCLENBQUMsQ0FBQztvQkFHbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7d0JBQ2pCLGNBQUssQ0FBQyxPQUFPLENBQUMsY0FBWSxNQUFNLENBQUMsTUFBUSxDQUFDLENBQUM7d0JBQzNDLGNBQUssQ0FBQyxTQUFTLENBQUMsY0FBWSxNQUFNLENBQUMsTUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ2hFO2dCQUNILENBQUMsRUFBRTtvQkFDRCxjQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsR0FBRyxFQUFFLEtBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEcsQ0FBQyxFQUFFO29CQUNELGNBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxHQUFHLEVBQUUsS0FBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoRyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQztJQUNELE1BQU07UUFFRSxJQUFBLGlEQUFnRCxFQUE5QyxVQUFFLEVBQUUsVUFBMEMsQ0FBQztRQUV2RCxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFpQkQsWUFBWSxZQUFDLENBQUM7UUFDWixtQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELEVBQUUsRUFBRixVQUFHLENBQU07UUFDUCxtQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELGlCQUFpQjtRQUNmLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztZQUM5QixJQUFJLEVBQUUsaUVBQXFELElBQUksQ0FBQyxNQUFNLFlBQU8sSUFBSSxDQUFDLEVBQUUsYUFBUSxJQUFJLENBQUMsR0FBSztTQUN2RyxDQUFDO0lBQ0osQ0FBQztJQUdELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQEF1dGhvcjogTXIuSG9wZVxuICogQERhdGU6IDIwMTktMDYtMjQgMjE6MzA6MjlcbiAqIEBMYXN0RWRpdG9yczogTXIuSG9wZVxuICogQExhc3RFZGl0VGltZTogMjAxOS0wNi0yNiAwMDowMzoyMFxuICogQERlc2NyaXB0aW9uOiDlnLDngrnor6bmg4VcbiAqL1xuaW1wb3J0ICRyZWdpc3RlciwgeyBXWFBhZ2UgfSBmcm9tICd3eHBhZ2UnO1xuaW1wb3J0ICRjb21wb25lbnQgZnJvbSAnLi4vdXRpbHMvY29tcG9uZW50JztcbmltcG9ydCAkZmlsZSBmcm9tICcuLi91dGlscy9maWxlJztcbmltcG9ydCAkcGFnZSBmcm9tICcuLi91dGlscy9wYWdlJztcbmltcG9ydCAkbXkgZnJvbSAnLi4vdXRpbHMvd3gnO1xuY29uc3QgeyBnbG9iYWxEYXRhOiBhIH0gPSBnZXRBcHAoKTtcblxuJHJlZ2lzdGVyKCdzaXR1cycsIHtcbiAgZGF0YToge30sXG4gIG9uUHJlbG9hZChyZXM6IFdYUGFnZS5QYWdlQXJnKSB7XG4gICAgJHBhZ2UucmVzb2x2ZShyZXMsICRmaWxlLnJlYWRKc29uKGBmdW5jdGlvbi8ke3Jlcy5xdWVyeS54aWFvcXV9LyR7cmVzLnF1ZXJ5LmFpbX1gKSk7XG4gIH0sXG4gIG9uTG9hZChvcHRpb246IGFueSkge1xuICAgIGlmIChhLnBhZ2UuYWltID09PSBvcHRpb24uYWltKSAkcGFnZS5TZXQoeyBvcHRpb24sIGN0eDogdGhpcyB9KTtcbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHBhZ2VEYXRhID0gJGZpbGUucmVhZEpzb24oYGZ1bmN0aW9uLyR7b3B0aW9uLnhpYW9xdX0vJHtvcHRpb24uYWltfWApO1xuXG4gICAgICBpZiAocGFnZURhdGEpICRwYWdlLlNldCh7IG9wdGlvbiwgY3R4OiB0aGlzIH0sIHBhZ2VEYXRhKTtcbiAgICAgIGVsc2UgLy8g5ZCR5pyN5Yqh5Zmo6K+35rGCanNvblxuICAgICAgICAkbXkucmVxdWVzdChgZnVuY3Rpb24vJHtvcHRpb24ueGlhb3F1fS8ke29wdGlvbi5haW19YCwgKGRhdGE6IG9iamVjdCkgPT4ge1xuICAgICAgICAgICRwYWdlLlNldCh7IG9wdGlvbiwgY3R4OiB0aGlzIH0sIGRhdGEgYXMgUGFnZURhdGEpO1xuXG4gICAgICAgICAgLy8g6Z2e5YiG5Lqr55WM6Z2i5LiL5bCG6aG16Z2i5pWw5o2u5YaZ5YWl5a2Y5YKoXG4gICAgICAgICAgaWYgKCFvcHRpb24uc2hhcmUpIHtcbiAgICAgICAgICAgICRmaWxlLm1ha2VEaXIoYGZ1bmN0aW9uLyR7b3B0aW9uLnhpYW9xdX1gKTtcbiAgICAgICAgICAgICRmaWxlLndyaXRlSnNvbihgZnVuY3Rpb24vJHtvcHRpb24ueGlhb3F1fWAsIG9wdGlvbi5haW0sIGRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICRwYWdlLlNldCh7IG9wdGlvbiwgY3R4OiB0aGlzIH0sIFt7IHRhZzogJ2Vycm9yJywgc3RhdHVzQmFySGVpZ2h0OiBhLmluZm8uc3RhdHVzQmFySGVpZ2h0IH1dKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICRwYWdlLlNldCh7IG9wdGlvbiwgY3R4OiB0aGlzIH0sIFt7IHRhZzogJ2Vycm9yJywgc3RhdHVzQmFySGVpZ2h0OiBhLmluZm8uc3RhdHVzQmFySGVpZ2h0IH1dKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBvblNob3coKSB7XG4gICAgLy8g6K6+572u6IO25ZuK5ZKM6IOM5pmv6aKc6ImyXG4gICAgY29uc3QgeyBuYywgYmMgfSA9ICRwYWdlLmNvbG9yKHRoaXMuZGF0YS5wYWdlWzBdLmdyZXkpO1xuXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhckNvbG9yKG5jKTtcbiAgICB3eC5zZXRCYWNrZ3JvdW5kQ29sb3IoYmMpO1xuICB9LFxuICAvKlxuICAgKiBPblJlYWR5KCkge1xuICAgKiAgIFRoaXMubWFya2VyID0gd3guZ2V0U3RvcmFnZVN5bmMoYCR7dGhpcy54aWFvcXV9LWFsbGApW3RoaXMuaWRdO1xuICAgKiB9LFxuICAgKi9cblxuICAvKlxuICAgKiBEZXRhaWwoKSB7XG4gICAqICAgbGV0IG1hcmtlcnMgPSB0aGlzLm1hcmtlcjtcbiAgICogICB3eC5vcGVuTG9jYXRpb24oe1xuICAgKiAgICAgbGF0aXR1ZGU6IG1hcmtlci5sYXRpdHVkZSxcbiAgICogICAgIGxvbmdpdHVkZTogbWFya2Vycy5sb25naXR1ZGUsXG4gICAqICAgICBuYW1lOiBtYXJrZXJzLnRpdGxlLFxuICAgKiAgIH0pO1xuICAgKiB9LFxuICAgKi9cbiAgb25QYWdlU2Nyb2xsKGUpIHtcbiAgICAkY29tcG9uZW50Lm5hdihlLCB0aGlzKTtcbiAgfSxcbiAgY0EoZTogYW55KSB7XG4gICAgJGNvbXBvbmVudC50cmlnZ2VyKGUsIHRoaXMpO1xuICB9LFxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMuZGF0YS5wYWdlWzBdLnRpdGxlLFxuICAgICAgcGF0aDogYC9mdW5jdGlvbi9zaXR1cz9Gcm9tPeS4u+mhtSZkZXB0aD0xJnNoYXJlPXRydWUmeGlhb3F1PSR7dGhpcy54aWFvcXV9JmlkPSR7dGhpcy5pZH0mYWltPSR7dGhpcy5haW19YFxuICAgIH07XG4gIH0sXG5cbiAgLy8g6KaG5YaZ6YeN5a6a5ZCR5Yiw5Li76aG1XG4gIHJlZGlyZWN0KCkge1xuICAgIHRoaXMuJHN3aXRjaCgnL3BhZ2UvbWFpbicpO1xuICB9XG59KTtcbiJdfQ==