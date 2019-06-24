"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = getApp(), a = _a.globalData, _b = _a.lib, $component = _b.$component, $page = _b.$page, $register = _b.$register;
$register('me', {
    data: {
        T: a.T,
        nm: a.nm,
        page: [
            { tag: 'head', title: '我的东师', aim: 'me', action: true, grey: true },
            {
                tag: 'list',
                content: [
                    { text: '设置', icon: '/icon/setting.svg', url: '/settings/setting?From=我的东师&aim=settings' },
                    { text: '关于', icon: '/icon/about.svg', url: '/settings/about?From=我的东师&aim=about', desc: a.version }
                ]
            },
            { tag: 'foot', desc: "\u5F53\u524D\u7248\u672C\uFF1A" + a.version + "\n\u5C0F\u7A0B\u5E8F\u7531Mr.Hope\u4E2A\u4EBA\u5236\u4F5C\uFF0C\u5982\u6709\u9519\u8BEF\u8FD8\u8BF7\u89C1\u8C05" }
        ]
    },
    onPreload: function (res) {
        $page.resolve(res, this.data.page);
        console.log("\u6211\u7684\u4E1C\u5E08\u9884\u52A0\u8F7D\u7528\u65F6" + (new Date().getTime() - a.date) + "ms");
    },
    onLoad: function () {
        $page.Set({ option: { aim: 'me' }, ctx: this });
        $page.Notice('me');
    },
    onShow: function () {
        var color = this.data.nm ? ['#000000', 'white'] : ['#ffffff', 'black'];
        var _a = $page.color(this.data.page[0].grey), nc = _a[0], bc = _a[1];
        wx.setNavigationBarColor(nc);
        wx.setBackgroundColor(bc);
        wx.setTabBarStyle({ backgroundColor: color[0], borderStyle: color[1] });
    },
    onReady: function () {
        var _this = this;
        this.$on('theme', function (T) {
            _this.setData({ T: T });
        });
        this.$on('nightmode', function (nm) {
            _this.setData({ nm: nm });
        });
    },
    onPageScroll: function (e) {
        $component.nav(e, this);
    },
    cA: function (e) {
        $component.trigger(e, this);
    },
    onShareAppMessage: function () { return ({ title: '我的东师', path: '/page/me' }); }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNNLElBQUEsYUFBbUUsRUFBakUsaUJBQWEsRUFBRSxXQUFxQyxFQUE5QiwwQkFBVSxFQUFFLGdCQUFLLEVBQUUsd0JBQXdCLENBQUM7QUFFMUUsU0FBUyxDQUFDLElBQUksRUFBRTtJQUNkLElBQUksRUFBRTtRQUNKLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNOLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtRQUNSLElBQUksRUFBRTtZQUNKLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO1lBQ25FO2dCQUNFLEdBQUcsRUFBRSxNQUFNO2dCQUNYLE9BQU8sRUFBRTtvQkFDUCxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsRUFBRSwwQ0FBMEMsRUFBRTtvQkFDMUYsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxHQUFHLEVBQUUscUNBQXFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUU7aUJBQ3JHO2FBQ0Y7WUFDRCxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLG1DQUFRLENBQUMsQ0FBQyxPQUFPLG9IQUE0QixFQUFFO1NBQ3JFO0tBQ0Y7SUFDRCxTQUFTLEVBQVQsVUFBVSxHQUFtQjtRQUMzQixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsNERBQVksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0QsTUFBTTtRQUNKLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTTtRQUNKLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkUsSUFBQSx3Q0FBOEMsRUFBN0MsVUFBRSxFQUFFLFVBQXlDLENBQUM7UUFHckQsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUsxRSxDQUFDO0lBQ0QsT0FBTyxFQUFQO1FBQUEsaUJBUUM7UUFOQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFDLENBQVM7WUFDMUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQUMsRUFBVztZQUNoQyxLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFBLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELFlBQVksRUFBWixVQUFhLENBQU07UUFDakIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELEVBQUUsRUFBRixVQUFHLENBQU07UUFDUCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsaUJBQWlCLEVBQUUsY0FBTSxPQUFBLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFyQyxDQUFxQztDQUMvRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXWFBhZ2UgfSBmcm9tICd3eHBhZ2UnO1xyXG5jb25zdCB7IGdsb2JhbERhdGE6IGEsIGxpYjogeyAkY29tcG9uZW50LCAkcGFnZSwgJHJlZ2lzdGVyIH0gfSA9IGdldEFwcCgpO1xyXG5cclxuJHJlZ2lzdGVyKCdtZScsIHtcclxuICBkYXRhOiB7XHJcbiAgICBUOiBhLlQsXHJcbiAgICBubTogYS5ubSxcclxuICAgIHBhZ2U6IFtcclxuICAgICAgeyB0YWc6ICdoZWFkJywgdGl0bGU6ICfmiJHnmoTkuJzluIgnLCBhaW06ICdtZScsIGFjdGlvbjogdHJ1ZSwgZ3JleTogdHJ1ZSB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGFnOiAnbGlzdCcsXHJcbiAgICAgICAgY29udGVudDogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAn6K6+572uJywgaWNvbjogJy9pY29uL3NldHRpbmcuc3ZnJywgdXJsOiAnL3NldHRpbmdzL3NldHRpbmc/RnJvbT3miJHnmoTkuJzluIgmYWltPXNldHRpbmdzJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAn5YWz5LqOJywgaWNvbjogJy9pY29uL2Fib3V0LnN2ZycsIHVybDogJy9zZXR0aW5ncy9hYm91dD9Gcm9tPeaIkeeahOS4nOW4iCZhaW09YWJvdXQnLCBkZXNjOiBhLnZlcnNpb24gfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgeyB0YWc6ICdmb290JywgZGVzYzogYOW9k+WJjeeJiOacrO+8miR7YS52ZXJzaW9ufVxcbuWwj+eoi+W6j+eUsU1yLkhvcGXkuKrkurrliLbkvZzvvIzlpoLmnInplJnor6/ov5jor7fop4HosIVgIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG9uUHJlbG9hZChyZXM6IFdYUGFnZS5QYWdlQXJnKSB7XHJcbiAgICAkcGFnZS5yZXNvbHZlKHJlcywgdGhpcy5kYXRhLnBhZ2UpO1xyXG4gICAgY29uc29sZS5sb2coYOaIkeeahOS4nOW4iOmihOWKoOi9veeUqOaXtiR7bmV3IERhdGUoKS5nZXRUaW1lKCkgLSBhLmRhdGV9bXNgKTtcclxuICB9LFxyXG4gIG9uTG9hZCgpIHtcclxuICAgICRwYWdlLlNldCh7IG9wdGlvbjogeyBhaW06ICdtZScgfSwgY3R4OiB0aGlzIH0pO1xyXG4gICAgJHBhZ2UuTm90aWNlKCdtZScpO1xyXG4gIH0sXHJcbiAgb25TaG93KCkge1xyXG4gICAgY29uc3QgY29sb3IgPSB0aGlzLmRhdGEubm0gPyBbJyMwMDAwMDAnLCAnd2hpdGUnXSA6IFsnI2ZmZmZmZicsICdibGFjayddO1xyXG4gICAgY29uc3QgW25jLCBiY10gPSAkcGFnZS5jb2xvcih0aGlzLmRhdGEucGFnZVswXS5ncmV5KTtcclxuXHJcbiAgICAvLyDorr7nva7og7blm4rjgIHog4zmma/popzoibLku6Xlj4p0YWLmoI/popzoibJcclxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJDb2xvcihuYyk7XHJcbiAgICB3eC5zZXRCYWNrZ3JvdW5kQ29sb3IoYmMpO1xyXG4gICAgd3guc2V0VGFiQmFyU3R5bGUoeyBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yWzBdLCBib3JkZXJTdHlsZTogY29sb3JbMV0gfSk7XHJcbiAgICAvKlxyXG4gICAgICogdGhpcy4kcHJlbG9hZCgnc2V0dGluZz9Gcm9tPeaIkeeahOS4nOW4iCZhaW09c2V0dGluZycpO1xyXG4gICAgICogdGhpcy4kcHJlbG9hZCgnYWJvdXQ/RnJvbT3miJHnmoTkuJzluIgmYWltPWFib3V0Jyk7XHJcbiAgICAgKi9cclxuICB9LFxyXG4gIG9uUmVhZHkoKSB7XHJcbiAgICAvLyDms6jlhozkuovku7bnm5HlkKzlmahcclxuICAgIHRoaXMuJG9uKCd0aGVtZScsIChUOiBzdHJpbmcpID0+IHtcclxuICAgICAgdGhpcy5zZXREYXRhKHsgVCB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy4kb24oJ25pZ2h0bW9kZScsIChubTogYm9vbGVhbikgPT4ge1xyXG4gICAgICB0aGlzLnNldERhdGEoeyBubSB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb25QYWdlU2Nyb2xsKGU6IGFueSkge1xyXG4gICAgJGNvbXBvbmVudC5uYXYoZSwgdGhpcyk7XHJcbiAgfSxcclxuICBjQShlOiBhbnkpIHtcclxuICAgICRjb21wb25lbnQudHJpZ2dlcihlLCB0aGlzKTtcclxuICB9LFxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiAoKSA9PiAoeyB0aXRsZTogJ+aIkeeahOS4nOW4iCcsIHBhdGg6ICcvcGFnZS9tZScgfSlcclxufSk7XHJcbiJdfQ==