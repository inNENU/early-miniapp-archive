"use strict";
var _a = getApp(), a = _a.globalData, _b = _a.lib, $component = _b.$component, $page = _b.$page, $register = _b.$register, $wx = _b.$wx;
$register('donate', {
    data: {
        T: a.T,
        nm: a.nm,
        page: [
            { tag: 'head', title: '捐赠', shareable: true, leftText: '返回' },
            {
                tag: 'p',
                head: '捐赠说明',
                text: '   目前，小程序服务器选用阿里云的轻量应用服务器，一天不足一元钱，在访问人数较多的时候可能会出现无应答或异常应答的情况。您可以选择捐赠来让小程序变得更好。\n    Mr.Hope向同学承诺，你打赏的每一分钱都会投入到小程序开发上来。'
            },
            { tag: 'title', text: '非常感谢' },
            {
                tag: 'p',
                text: '   非常感谢同学选择了捐赠。你可以 “点击下方二维码” 来将二维码保存至到相册并使用相应APP进行打赏。如果可以，Mr.Hope希望同学在打赏时注明“小程序打赏”并备注姓名，Mr.Hope会将同学的姓名和打赏金额显示在下方的列表中。再次感谢同学的支持。'
            }
        ]
    },
    onLoad: function () {
        var _this = this;
        this.setData({ 'page[0].statusBarHeight': a.info.statusBarHeight });
        $wx.request('config/donateList', function (donateList) {
            _this.setData({ donateList: donateList });
        });
    },
    onShow: function () {
        var _a = $page.color(this.data.page[0].grey), nc = _a[0], bc = _a[1];
        wx.setNavigationBarColor(nc);
        wx.setBackgroundColor(bc);
    },
    onReady: function () {
        $page.Notice('donate');
    },
    save: function (res) {
        console.log('Start QRCode download.');
        $wx.downLoad("img/donate/" + res.currentTarget.dataset.name + ".png", function (path) {
            wx.getSetting({
                success: function (res2) {
                    if (res2.authSetting['scope.writePhotosAlbum'])
                        wx.saveImageToPhotosAlbum({
                            filePath: path,
                            success: function () {
                                $wx.tip('保存成功');
                            }
                        });
                    else
                        wx.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success: function () {
                                wx.saveImageToPhotosAlbum({
                                    filePath: path,
                                    success: function () {
                                        $wx.tip('保存成功');
                                    }
                                });
                            },
                            fail: function () {
                                wx.showModal({
                                    title: '权限被拒', content: '您拒绝了相册写入权限，如果想要保存图片，请在小程序设置页允许权限',
                                    showCancel: false, confirmText: '确定', confirmColor: '#3CC51F',
                                    complete: function () {
                                        $wx.tip('二维码保存失败');
                                    }
                                });
                            }
                        });
                }
            });
        }, function () {
            $wx.tip('二维码下载失败');
        });
    },
    onPageScroll: function (e) {
        $component.nav(e, this);
    },
    cA: function (res) {
        $component.trigger(res, this);
    },
    onShareAppMessage: function () { return ({ title: '捐赠Mr.Hope', path: '/settings/donate' }); }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9uYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPTSxJQUFBLGFBQXdFLEVBQXRFLGlCQUFhLEVBQUUsV0FBMEMsRUFBbkMsMEJBQVUsRUFBRSxnQkFBSyxFQUFFLHdCQUFTLEVBQUUsWUFBa0IsQ0FBQztBQUUvRSxTQUFTLENBQUMsUUFBUSxFQUFFO0lBQ2xCLElBQUksRUFBRTtRQUNKLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNOLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtRQUNSLElBQUksRUFBRTtZQUNKLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtZQUM3RDtnQkFDRSxHQUFHLEVBQUUsR0FBRztnQkFDUixJQUFJLEVBQUUsTUFBTTtnQkFDWixJQUFJLEVBQUUsd0hBQXdIO2FBQy9IO1lBQ0QsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDOUI7Z0JBQ0UsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLGlJQUFpSTthQUN4STtTQUNGO0tBQ0Y7SUFDRCxNQUFNLEVBQU47UUFBQSxpQkFLQztRQUpDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSx5QkFBeUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7UUFDcEUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLFVBQWlCO1lBQ2pELEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTTtRQUVFLElBQUEsd0NBQThDLEVBQTdDLFVBQUUsRUFBRSxVQUF5QyxDQUFDO1FBRXJELEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELE9BQU87UUFDTCxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFJLEVBQUosVUFBSyxHQUFRO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3RDLEdBQUcsQ0FBQyxRQUFRLENBQUMsZ0JBQWMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFNLEVBQUUsVUFBQyxJQUFZO1lBRTVFLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ1osT0FBTyxFQUFFLFVBQUEsSUFBSTtvQkFDWCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsd0JBQXdCLENBQUM7d0JBRTVDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzs0QkFDeEIsUUFBUSxFQUFFLElBQUk7NEJBQ2QsT0FBTyxFQUFFO2dDQUNQLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ2xCLENBQUM7eUJBQ0YsQ0FBQyxDQUFDOzt3QkFDQSxFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUNoQixLQUFLLEVBQUUsd0JBQXdCOzRCQUMvQixPQUFPLEVBQUU7Z0NBQ1AsRUFBRSxDQUFDLHNCQUFzQixDQUFDO29DQUN4QixRQUFRLEVBQUUsSUFBSTtvQ0FDZCxPQUFPLEVBQUU7d0NBQ1AsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQ0FDbEIsQ0FBQztpQ0FDRixDQUFDLENBQUM7NEJBQ0wsQ0FBQzs0QkFDRCxJQUFJLEVBQUU7Z0NBQ0osRUFBRSxDQUFDLFNBQVMsQ0FBQztvQ0FDWCxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxrQ0FBa0M7b0NBQzFELFVBQVUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUztvQ0FDN0QsUUFBUSxFQUFFO3dDQUNSLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0NBQ3JCLENBQUM7aUNBQ0YsQ0FBQyxDQUFDOzRCQUNMLENBQUM7eUJBQ0YsQ0FBQyxDQUFDO2dCQUNMLENBQUM7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUU7WUFDRCxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELFlBQVksRUFBWixVQUFhLENBQU07UUFDakIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELEVBQUUsRUFBRixVQUFHLEdBQVE7UUFDVCxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsaUJBQWlCLEVBQUUsY0FBTSxPQUFBLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxDQUFDLEVBQWxELENBQWtEO0NBQzVFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBNci5Ib3BlXG4gKiBARGF0ZTogMjAxOS0wNi0yNCAyMTowMjo1MVxuICogQExhc3RFZGl0b3JzOiBNci5Ib3BlXG4gKiBATGFzdEVkaXRUaW1lOiAyMDE5LTA2LTI0IDIxOjA0OjE5XG4gKiBARGVzY3JpcHRpb246IOaNkOi1oFxuICovXG5jb25zdCB7IGdsb2JhbERhdGE6IGEsIGxpYjogeyAkY29tcG9uZW50LCAkcGFnZSwgJHJlZ2lzdGVyLCAkd3ggfSB9ID0gZ2V0QXBwKCk7XG5cbiRyZWdpc3RlcignZG9uYXRlJywge1xuICBkYXRhOiB7XG4gICAgVDogYS5ULFxuICAgIG5tOiBhLm5tLFxuICAgIHBhZ2U6IFtcbiAgICAgIHsgdGFnOiAnaGVhZCcsIHRpdGxlOiAn5o2Q6LWgJywgc2hhcmVhYmxlOiB0cnVlLCBsZWZ0VGV4dDogJ+i/lOWbnicgfSxcbiAgICAgIHtcbiAgICAgICAgdGFnOiAncCcsXG4gICAgICAgIGhlYWQ6ICfmjZDotaDor7TmmI4nLFxuICAgICAgICB0ZXh0OiAnICAg55uu5YmN77yM5bCP56iL5bqP5pyN5Yqh5Zmo6YCJ55So6Zi/6YeM5LqR55qE6L276YeP5bqU55So5pyN5Yqh5Zmo77yM5LiA5aSp5LiN6Laz5LiA5YWD6ZKx77yM5Zyo6K6/6Zeu5Lq65pWw6L6D5aSa55qE5pe25YCZ5Y+v6IO95Lya5Ye6546w5peg5bqU562U5oiW5byC5bi45bqU562U55qE5oOF5Ya144CC5oKo5Y+v5Lul6YCJ5oup5o2Q6LWg5p2l6K6p5bCP56iL5bqP5Y+Y5b6X5pu05aW944CCXFxuICAgIE1yLkhvcGXlkJHlkIzlrabmib/or7rvvIzkvaDmiZPotY/nmoTmr4/kuIDliIbpkrHpg73kvJrmipXlhaXliLDlsI/nqIvluo/lvIDlj5HkuIrmnaXjgIInXG4gICAgICB9LFxuICAgICAgeyB0YWc6ICd0aXRsZScsIHRleHQ6ICfpnZ7luLjmhJ/osKInIH0sXG4gICAgICB7XG4gICAgICAgIHRhZzogJ3AnLFxuICAgICAgICB0ZXh0OiAnICAg6Z2e5bi45oSf6LCi5ZCM5a2m6YCJ5oup5LqG5o2Q6LWg44CC5L2g5Y+v5LulIOKAnOeCueWHu+S4i+aWueS6jOe7tOeggeKAnSDmnaXlsIbkuoznu7TnoIHkv53lrZjoh7PliLDnm7jlhozlubbkvb/nlKjnm7jlupRBUFDov5vooYzmiZPotY/jgILlpoLmnpzlj6/ku6XvvIxNci5Ib3Bl5biM5pyb5ZCM5a2m5Zyo5omT6LWP5pe25rOo5piO4oCc5bCP56iL5bqP5omT6LWP4oCd5bm25aSH5rOo5aeT5ZCN77yMTXIuSG9wZeS8muWwhuWQjOWtpueahOWnk+WQjeWSjOaJk+i1j+mHkemineaYvuekuuWcqOS4i+aWueeahOWIl+ihqOS4reOAguWGjeasoeaEn+iwouWQjOWtpueahOaUr+aMgeOAgidcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLnNldERhdGEoeyAncGFnZVswXS5zdGF0dXNCYXJIZWlnaHQnOiBhLmluZm8uc3RhdHVzQmFySGVpZ2h0IH0pO1xuICAgICR3eC5yZXF1ZXN0KCdjb25maWcvZG9uYXRlTGlzdCcsIChkb25hdGVMaXN0OiBhbnlbXSkgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhKHsgZG9uYXRlTGlzdCB9KTtcbiAgICB9KTtcbiAgfSxcbiAgb25TaG93KCkge1xuICAgIC8vIOiuvue9ruiDtuWbiuWSjOiDjOaZr+minOiJslxuICAgIGNvbnN0IFtuYywgYmNdID0gJHBhZ2UuY29sb3IodGhpcy5kYXRhLnBhZ2VbMF0uZ3JleSk7XG5cbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyQ29sb3IobmMpO1xuICAgIHd4LnNldEJhY2tncm91bmRDb2xvcihiYyk7XG4gIH0sXG4gIG9uUmVhZHkoKSB7XG4gICAgJHBhZ2UuTm90aWNlKCdkb25hdGUnKTtcbiAgfSxcbiAgc2F2ZShyZXM6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKCdTdGFydCBRUkNvZGUgZG93bmxvYWQuJyk7Ly8g6LCD6K+VXG4gICAgJHd4LmRvd25Mb2FkKGBpbWcvZG9uYXRlLyR7cmVzLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lfS5wbmdgLCAocGF0aDogc3RyaW5nKSA9PiB7XG4gICAgICAvLyDojrflj5bnlKjmiLforr7nva5cbiAgICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgICBzdWNjZXNzOiByZXMyID0+IHtcbiAgICAgICAgICBpZiAocmVzMi5hdXRoU2V0dGluZ1snc2NvcGUud3JpdGVQaG90b3NBbGJ1bSddKVxuICAgICAgICAgICAgLy8g5aaC5p6c5bey57uP5o6I5p2D55u45YaM55u05o6l5YaZ5YWl5Zu+54mHXG4gICAgICAgICAgICB3eC5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcbiAgICAgICAgICAgICAgZmlsZVBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAkd3gudGlwKCfkv53lrZjmiJDlip8nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgZWxzZSB3eC5hdXRob3JpemUoey8vIOayoeacieaOiOadg+KAlOKAlD7mj5DnpLrnlKjmiLfmjojmnYNcbiAgICAgICAgICAgIHNjb3BlOiAnc2NvcGUud3JpdGVQaG90b3NBbGJ1bScsXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICAgICAgICAgIGZpbGVQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICR3eC50aXAoJ+S/neWtmOaIkOWKnycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKCkgPT4geyAvLyDnlKjmiLfmi5Lnu53mnYPpmZDvvIzmj5DnpLrnlKjmiLflvIDlkK/mnYPpmZBcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+adg+mZkOiiq+aLkicsIGNvbnRlbnQ6ICfmgqjmi5Lnu53kuobnm7jlhozlhpnlhaXmnYPpmZDvvIzlpoLmnpzmg7PopoHkv53lrZjlm77niYfvvIzor7flnKjlsI/nqIvluo/orr7nva7pobXlhYHorrjmnYPpmZAnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLCBjb25maXJtVGV4dDogJ+ehruWumicsIGNvbmZpcm1Db2xvcjogJyMzQ0M1MUYnLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAkd3gudGlwKCfkuoznu7TnoIHkv53lrZjlpLHotKUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAoKSA9PiB7XG4gICAgICAkd3gudGlwKCfkuoznu7TnoIHkuIvovb3lpLHotKUnKTtcbiAgICB9KTtcbiAgfSxcbiAgb25QYWdlU2Nyb2xsKGU6IGFueSkge1xuICAgICRjb21wb25lbnQubmF2KGUsIHRoaXMpO1xuICB9LFxuICBjQShyZXM6IGFueSkge1xuICAgICRjb21wb25lbnQudHJpZ2dlcihyZXMsIHRoaXMpO1xuICB9LFxuICBvblNoYXJlQXBwTWVzc2FnZTogKCkgPT4gKHsgdGl0bGU6ICfmjZDotaBNci5Ib3BlJywgcGF0aDogJy9zZXR0aW5ncy9kb25hdGUnIH0pXG59KTtcbiJdfQ==