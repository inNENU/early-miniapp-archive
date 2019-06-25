"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
wxpage_1.default('building', {
    onLoad: function (res) {
        var timeoutFunc = setTimeout(function () {
            wx.navigateBack({});
        }, 3000);
        var month = res && res.month ? res.month : 12;
        wx.showModal({
            title: '该功能尚未开放', content: "\u8BE5\u529F\u80FD\u5C06\u4E8E" + month + "\u6708\u4EFD\u5DE6\u53F3\u4E0A\u7EBF\uFF0C\u656C\u8BF7\u671F\u5F85\u3002", showCancel: false,
            success: function (res2) {
                if (res2.confirm) {
                    clearTimeout(timeoutFunc);
                    wx.navigateBack({});
                }
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWlsZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGlDQUErQjtBQUUvQixnQkFBUyxDQUFDLFVBQVUsRUFBRTtJQUNwQixNQUFNLFlBQUMsR0FBRztRQUNSLElBQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUM3QixFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNULElBQU0sS0FBSyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFaEQsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNYLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLG1DQUFRLEtBQUssNkVBQWMsRUFBRSxVQUFVLEVBQUUsS0FBSztZQUN6RSxPQUFPLEVBQUUsVUFBQSxJQUFJO2dCQUNYLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUMxQixFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNyQjtZQUNILENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHd4IFBhZ2UqL1xuaW1wb3J0ICRyZWdpc3RlciBmcm9tICd3eHBhZ2UnO1xuXG4kcmVnaXN0ZXIoJ2J1aWxkaW5nJywge1xuICBvbkxvYWQocmVzKSB7XG4gICAgY29uc3QgdGltZW91dEZ1bmMgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHd4Lm5hdmlnYXRlQmFjayh7fSk7XG4gICAgfSwgMzAwMCk7XG4gICAgY29uc3QgbW9udGggPSByZXMgJiYgcmVzLm1vbnRoID8gcmVzLm1vbnRoIDogMTI7XG5cbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfor6Xlip/og73lsJrmnKrlvIDmlL4nLCBjb250ZW50OiBg6K+l5Yqf6IO95bCG5LqOJHttb250aH3mnIjku73lt6blj7PkuIrnur/vvIzmlazor7fmnJ/lvoXjgIJgLCBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6IHJlczIgPT4ge1xuICAgICAgICBpZiAocmVzMi5jb25maXJtKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRGdW5jKTtcbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe30pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pO1xuIl19