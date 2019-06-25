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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0dXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLGlDQUEyQztBQUMzQyxnREFBNEM7QUFDNUMsc0NBQWtDO0FBQ2xDLHNDQUFrQztBQUNsQyxrQ0FBOEI7QUFDdEIsSUFBQSx1QkFBYSxDQUFjO0FBRW5DLGdCQUFTLENBQUMsT0FBTyxFQUFFO0lBQ2pCLElBQUksRUFBRSxFQUFFO0lBQ1IsU0FBUyxFQUFULFVBQVUsR0FBbUI7UUFDM0IsY0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsY0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFZLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxTQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBSyxDQUFDLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBQ0QsTUFBTSxFQUFOLFVBQU8sTUFBVztRQUFsQixpQkFxQkM7UUFwQkMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsR0FBRztZQUFFLGNBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUMzRDtZQUNILElBQU0sUUFBUSxHQUFHLGNBQUssQ0FBQyxRQUFRLENBQUMsY0FBWSxNQUFNLENBQUMsTUFBTSxTQUFJLE1BQU0sQ0FBQyxHQUFLLENBQUMsQ0FBQztZQUUzRSxJQUFJLFFBQVE7Z0JBQUUsY0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQzs7Z0JBRXZELFlBQUcsQ0FBQyxPQUFPLENBQUMsY0FBWSxNQUFNLENBQUMsTUFBTSxTQUFJLE1BQU0sQ0FBQyxHQUFLLEVBQUUsVUFBQyxJQUFZO29CQUNsRSxjQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsR0FBRyxFQUFFLEtBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUd2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTt3QkFDakIsY0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFZLE1BQU0sQ0FBQyxNQUFRLENBQUMsQ0FBQzt3QkFDM0MsY0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFZLE1BQU0sQ0FBQyxNQUFRLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDaEU7Z0JBQ0gsQ0FBQyxFQUFFO29CQUNELGNBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxHQUFHLEVBQUUsS0FBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoRyxDQUFDLEVBQUU7b0JBQ0QsY0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLEdBQUcsRUFBRSxLQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hHLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDSCxDQUFDO0lBQ0QsTUFBTTtRQUVFLElBQUEsaURBQWdELEVBQTlDLFVBQUUsRUFBRSxVQUEwQyxDQUFDO1FBRXZELEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQWlCRCxZQUFZLEVBQVosVUFBYSxDQUFNO1FBQ2pCLG1CQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsRUFBRSxFQUFGLFVBQUcsQ0FBTTtRQUNQLG1CQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsaUJBQWlCO1FBQ2YsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQzlCLElBQUksRUFBRSxpRUFBcUQsSUFBSSxDQUFDLE1BQU0sWUFBTyxJQUFJLENBQUMsRUFBRSxhQUFRLElBQUksQ0FBQyxHQUFLO1NBQ3ZHLENBQUM7SUFDSixDQUFDO0lBR0QsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBNci5Ib3BlXG4gKiBARGF0ZTogMjAxOS0wNi0yNCAyMTozMDoyOVxuICogQExhc3RFZGl0b3JzOiBNci5Ib3BlXG4gKiBATGFzdEVkaXRUaW1lOiAyMDE5LTA2LTI0IDIzOjQ2OjQwXG4gKiBARGVzY3JpcHRpb246IOWcsOeCueivpuaDhVxuICovXG5pbXBvcnQgJHJlZ2lzdGVyLCB7IFdYUGFnZSB9IGZyb20gJ3d4cGFnZSc7XG5pbXBvcnQgJGNvbXBvbmVudCBmcm9tICcuLi91dGlscy9jb21wb25lbnQnO1xuaW1wb3J0ICRmaWxlIGZyb20gJy4uL3V0aWxzL2ZpbGUnO1xuaW1wb3J0ICRwYWdlIGZyb20gJy4uL3V0aWxzL3BhZ2UnO1xuaW1wb3J0ICRteSBmcm9tICcuLi91dGlscy93eCc7XG5jb25zdCB7IGdsb2JhbERhdGE6IGEgfSA9IGdldEFwcCgpO1xuXG4kcmVnaXN0ZXIoJ3NpdHVzJywge1xuICBkYXRhOiB7fSxcbiAgb25QcmVsb2FkKHJlczogV1hQYWdlLlBhZ2VBcmcpIHtcbiAgICAkcGFnZS5yZXNvbHZlKHJlcywgJGZpbGUucmVhZEpzb24oYGZ1bmN0aW9uLyR7cmVzLnF1ZXJ5LnhpYW9xdX0vJHtyZXMucXVlcnkuYWltfWApKTtcbiAgfSxcbiAgb25Mb2FkKG9wdGlvbjogYW55KSB7XG4gICAgaWYgKGEucGFnZS5haW0gPT09IG9wdGlvbi5haW0pICRwYWdlLlNldCh7IG9wdGlvbiwgY3R4OiB0aGlzIH0pO1xuICAgIGVsc2Uge1xuICAgICAgY29uc3QgcGFnZURhdGEgPSAkZmlsZS5yZWFkSnNvbihgZnVuY3Rpb24vJHtvcHRpb24ueGlhb3F1fS8ke29wdGlvbi5haW19YCk7XG5cbiAgICAgIGlmIChwYWdlRGF0YSkgJHBhZ2UuU2V0KHsgb3B0aW9uLCBjdHg6IHRoaXMgfSwgcGFnZURhdGEpO1xuICAgICAgZWxzZSAvLyDlkJHmnI3liqHlmajor7fmsYJqc29uXG4gICAgICAgICRteS5yZXF1ZXN0KGBmdW5jdGlvbi8ke29wdGlvbi54aWFvcXV9LyR7b3B0aW9uLmFpbX1gLCAoZGF0YTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgJHBhZ2UuU2V0KHsgb3B0aW9uLCBjdHg6IHRoaXMgfSwgZGF0YSk7XG5cbiAgICAgICAgICAvLyDpnZ7liIbkuqvnlYzpnaLkuIvlsIbpobXpnaLmlbDmja7lhpnlhaXlrZjlgqhcbiAgICAgICAgICBpZiAoIW9wdGlvbi5zaGFyZSkge1xuICAgICAgICAgICAgJGZpbGUubWFrZURpcihgZnVuY3Rpb24vJHtvcHRpb24ueGlhb3F1fWApO1xuICAgICAgICAgICAgJGZpbGUud3JpdGVKc29uKGBmdW5jdGlvbi8ke29wdGlvbi54aWFvcXV9YCwgb3B0aW9uLmFpbSwgZGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgJHBhZ2UuU2V0KHsgb3B0aW9uLCBjdHg6IHRoaXMgfSwgW3sgdGFnOiAnZXJyb3InLCBzdGF0dXNCYXJIZWlnaHQ6IGEuaW5mby5zdGF0dXNCYXJIZWlnaHQgfV0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgJHBhZ2UuU2V0KHsgb3B0aW9uLCBjdHg6IHRoaXMgfSwgW3sgdGFnOiAnZXJyb3InLCBzdGF0dXNCYXJIZWlnaHQ6IGEuaW5mby5zdGF0dXNCYXJIZWlnaHQgfV0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIG9uU2hvdygpIHtcbiAgICAvLyDorr7nva7og7blm4rlkozog4zmma/popzoibJcbiAgICBjb25zdCB7IG5jLCBiYyB9ID0gJHBhZ2UuY29sb3IodGhpcy5kYXRhLnBhZ2VbMF0uZ3JleSk7XG5cbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyQ29sb3IobmMpO1xuICAgIHd4LnNldEJhY2tncm91bmRDb2xvcihiYyk7XG4gIH0sXG4gIC8qXG4gICAqIE9uUmVhZHkoKSB7XG4gICAqICAgVGhpcy5tYXJrZXIgPSB3eC5nZXRTdG9yYWdlU3luYyhgJHt0aGlzLnhpYW9xdX0tYWxsYClbdGhpcy5pZF07XG4gICAqIH0sXG4gICAqL1xuXG4gIC8qXG4gICAqIERldGFpbCgpIHtcbiAgICogICBsZXQgbWFya2VycyA9IHRoaXMubWFya2VyO1xuICAgKiAgIHd4Lm9wZW5Mb2NhdGlvbih7XG4gICAqICAgICBsYXRpdHVkZTogbWFya2VyLmxhdGl0dWRlLFxuICAgKiAgICAgbG9uZ2l0dWRlOiBtYXJrZXJzLmxvbmdpdHVkZSxcbiAgICogICAgIG5hbWU6IG1hcmtlcnMudGl0bGUsXG4gICAqICAgfSk7XG4gICAqIH0sXG4gICAqL1xuICBvblBhZ2VTY3JvbGwoZTogYW55KSB7XG4gICAgJGNvbXBvbmVudC5uYXYoZSwgdGhpcyk7XG4gIH0sXG4gIGNBKGU6IGFueSkge1xuICAgICRjb21wb25lbnQudHJpZ2dlcihlLCB0aGlzKTtcbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLmRhdGEucGFnZVswXS50aXRsZSxcbiAgICAgIHBhdGg6IGAvZnVuY3Rpb24vc2l0dXM/RnJvbT3kuLvpobUmZGVwdGg9MSZzaGFyZT10cnVlJnhpYW9xdT0ke3RoaXMueGlhb3F1fSZpZD0ke3RoaXMuaWR9JmFpbT0ke3RoaXMuYWltfWBcbiAgICB9O1xuICB9LFxuXG4gIC8vIOimhuWGmemHjeWumuWQkeWIsOS4u+mhtVxuICByZWRpcmVjdCgpIHtcbiAgICB0aGlzLiRzd2l0Y2goJy9wYWdlL21haW4nKTtcbiAgfVxufSk7XG4iXX0=