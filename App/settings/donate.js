"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
var component_1 = require("../utils/component");
var page_1 = require("../utils/page");
var wx_1 = require("../utils/wx");
var a = getApp().globalData;
wxpage_1.default('donate', {
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
        wx_1.default.request('config/donateList', function (donateList) {
            _this.setData({ donateList: donateList });
        });
    },
    onShow: function () {
        var _a = page_1.default.color(this.data.page[0].grey), nc = _a.nc, bc = _a.bc;
        wx.setNavigationBarColor(nc);
        wx.setBackgroundColor(bc);
    },
    onReady: function () {
        page_1.default.Notice('donate');
    },
    save: function (res) {
        console.log('Start QRCode download.');
        wx_1.default.downLoad("img/donate/" + res.currentTarget.dataset.name + ".png", function (path) {
            wx.getSetting({
                success: function (res2) {
                    if (res2.authSetting['scope.writePhotosAlbum'])
                        wx.saveImageToPhotosAlbum({
                            filePath: path,
                            success: function () {
                                wx_1.default.tip('保存成功');
                            }
                        });
                    else
                        wx.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success: function () {
                                wx.saveImageToPhotosAlbum({
                                    filePath: path,
                                    success: function () {
                                        wx_1.default.tip('保存成功');
                                    }
                                });
                            },
                            fail: function () {
                                wx.showModal({
                                    title: '权限被拒', content: '您拒绝了相册写入权限，如果想要保存图片，请在小程序设置页允许权限',
                                    showCancel: false, confirmText: '确定', confirmColor: '#3CC51F',
                                    complete: function () {
                                        wx_1.default.tip('二维码保存失败');
                                    }
                                });
                            }
                        });
                }
            });
        }, function () {
            wx_1.default.tip('二维码下载失败');
        });
    },
    onPageScroll: function (e) {
        component_1.default.nav(e, this);
    },
    cA: function (res) {
        component_1.default.trigger(res, this);
    },
    onShareAppMessage: function () { return ({ title: '捐赠Mr.Hope', path: '/settings/donate' }); }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9uYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0EsaUNBQStCO0FBQy9CLGdEQUE0QztBQUM1QyxzQ0FBa0M7QUFDbEMsa0NBQThCO0FBQ3RCLElBQUEsdUJBQWEsQ0FBYztBQUVuQyxnQkFBUyxDQUFDLFFBQVEsRUFBRTtJQUNsQixJQUFJLEVBQUU7UUFDSixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDTixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7UUFDUixJQUFJLEVBQUU7WUFDSixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7WUFDN0Q7Z0JBQ0UsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osSUFBSSxFQUFFLHdIQUF3SDthQUMvSDtZQUNELEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQzlCO2dCQUNFLEdBQUcsRUFBRSxHQUFHO2dCQUNSLElBQUksRUFBRSxpSUFBaUk7YUFDeEk7U0FDRjtLQUNGO0lBQ0QsTUFBTSxFQUFOO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsT0FBUSxDQUFDLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLFlBQUcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsVUFBQSxVQUFVO1lBQ3pDLEtBQUksQ0FBQyxPQUFRLENBQUMsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTTtRQUVFLElBQUEsaURBQWdELEVBQTlDLFVBQUUsRUFBRSxVQUEwQyxDQUFDO1FBRXZELEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELE9BQU87UUFDTCxjQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFJLEVBQUosVUFBSyxHQUFRO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3RDLFlBQUcsQ0FBQyxRQUFRLENBQUMsZ0JBQWMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFNLEVBQUUsVUFBQyxJQUFZO1lBRTVFLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ1osT0FBTyxFQUFFLFVBQUEsSUFBSTtvQkFDWCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsd0JBQXdCLENBQUM7d0JBRTVDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzs0QkFDeEIsUUFBUSxFQUFFLElBQUk7NEJBQ2QsT0FBTyxFQUFFO2dDQUNQLFlBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ2xCLENBQUM7eUJBQ0YsQ0FBQyxDQUFDOzt3QkFDQSxFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUNoQixLQUFLLEVBQUUsd0JBQXdCOzRCQUMvQixPQUFPLEVBQUU7Z0NBQ1AsRUFBRSxDQUFDLHNCQUFzQixDQUFDO29DQUN4QixRQUFRLEVBQUUsSUFBSTtvQ0FDZCxPQUFPLEVBQUU7d0NBQ1AsWUFBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQ0FDbEIsQ0FBQztpQ0FDRixDQUFDLENBQUM7NEJBQ0wsQ0FBQzs0QkFDRCxJQUFJLEVBQUU7Z0NBQ0osRUFBRSxDQUFDLFNBQVMsQ0FBQztvQ0FDWCxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxrQ0FBa0M7b0NBQzFELFVBQVUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUztvQ0FDN0QsUUFBUSxFQUFFO3dDQUNSLFlBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0NBQ3JCLENBQUM7aUNBQ0YsQ0FBQyxDQUFDOzRCQUNMLENBQUM7eUJBQ0YsQ0FBQyxDQUFDO2dCQUNMLENBQUM7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUU7WUFDRCxZQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELFlBQVksWUFBQyxDQUFDO1FBQ1osbUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDRCxFQUFFLEVBQUYsVUFBRyxHQUFRO1FBQ1QsbUJBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxpQkFBaUIsRUFBRSxjQUFNLE9BQUEsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLENBQUMsRUFBbEQsQ0FBa0Q7Q0FDNUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBBdXRob3I6IE1yLkhvcGVcbiAqIEBEYXRlOiAyMDE5LTA2LTI0IDIxOjAyOjUxXG4gKiBATGFzdEVkaXRvcnM6IE1yLkhvcGVcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMTktMDYtMjQgMjM6NTM6MDNcbiAqIEBEZXNjcmlwdGlvbjog5o2Q6LWgXG4gKi9cbmltcG9ydCAkcmVnaXN0ZXIgZnJvbSAnd3hwYWdlJztcbmltcG9ydCAkY29tcG9uZW50IGZyb20gJy4uL3V0aWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgJHBhZ2UgZnJvbSAnLi4vdXRpbHMvcGFnZSc7XG5pbXBvcnQgJG15IGZyb20gJy4uL3V0aWxzL3d4JztcbmNvbnN0IHsgZ2xvYmFsRGF0YTogYSB9ID0gZ2V0QXBwKCk7XG5cbiRyZWdpc3RlcignZG9uYXRlJywge1xuICBkYXRhOiB7XG4gICAgVDogYS5ULFxuICAgIG5tOiBhLm5tLFxuICAgIHBhZ2U6IFtcbiAgICAgIHsgdGFnOiAnaGVhZCcsIHRpdGxlOiAn5o2Q6LWgJywgc2hhcmVhYmxlOiB0cnVlLCBsZWZ0VGV4dDogJ+i/lOWbnicgfSxcbiAgICAgIHtcbiAgICAgICAgdGFnOiAncCcsXG4gICAgICAgIGhlYWQ6ICfmjZDotaDor7TmmI4nLFxuICAgICAgICB0ZXh0OiAnICAg55uu5YmN77yM5bCP56iL5bqP5pyN5Yqh5Zmo6YCJ55So6Zi/6YeM5LqR55qE6L276YeP5bqU55So5pyN5Yqh5Zmo77yM5LiA5aSp5LiN6Laz5LiA5YWD6ZKx77yM5Zyo6K6/6Zeu5Lq65pWw6L6D5aSa55qE5pe25YCZ5Y+v6IO95Lya5Ye6546w5peg5bqU562U5oiW5byC5bi45bqU562U55qE5oOF5Ya144CC5oKo5Y+v5Lul6YCJ5oup5o2Q6LWg5p2l6K6p5bCP56iL5bqP5Y+Y5b6X5pu05aW944CCXFxuICAgIE1yLkhvcGXlkJHlkIzlrabmib/or7rvvIzkvaDmiZPotY/nmoTmr4/kuIDliIbpkrHpg73kvJrmipXlhaXliLDlsI/nqIvluo/lvIDlj5HkuIrmnaXjgIInXG4gICAgICB9LFxuICAgICAgeyB0YWc6ICd0aXRsZScsIHRleHQ6ICfpnZ7luLjmhJ/osKInIH0sXG4gICAgICB7XG4gICAgICAgIHRhZzogJ3AnLFxuICAgICAgICB0ZXh0OiAnICAg6Z2e5bi45oSf6LCi5ZCM5a2m6YCJ5oup5LqG5o2Q6LWg44CC5L2g5Y+v5LulIOKAnOeCueWHu+S4i+aWueS6jOe7tOeggeKAnSDmnaXlsIbkuoznu7TnoIHkv53lrZjoh7PliLDnm7jlhozlubbkvb/nlKjnm7jlupRBUFDov5vooYzmiZPotY/jgILlpoLmnpzlj6/ku6XvvIxNci5Ib3Bl5biM5pyb5ZCM5a2m5Zyo5omT6LWP5pe25rOo5piO4oCc5bCP56iL5bqP5omT6LWP4oCd5bm25aSH5rOo5aeT5ZCN77yMTXIuSG9wZeS8muWwhuWQjOWtpueahOWnk+WQjeWSjOaJk+i1j+mHkemineaYvuekuuWcqOS4i+aWueeahOWIl+ihqOS4reOAguWGjeasoeaEn+iwouWQjOWtpueahOaUr+aMgeOAgidcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLnNldERhdGEhKHsgJ3BhZ2VbMF0uc3RhdHVzQmFySGVpZ2h0JzogYS5pbmZvLnN0YXR1c0JhckhlaWdodCB9KTtcbiAgICAkbXkucmVxdWVzdCgnY29uZmlnL2RvbmF0ZUxpc3QnLCBkb25hdGVMaXN0ID0+IHtcbiAgICAgIHRoaXMuc2V0RGF0YSEoeyBkb25hdGVMaXN0IH0pO1xuICAgIH0pO1xuICB9LFxuICBvblNob3coKSB7XG4gICAgLy8g6K6+572u6IO25ZuK5ZKM6IOM5pmv6aKc6ImyXG4gICAgY29uc3QgeyBuYywgYmMgfSA9ICRwYWdlLmNvbG9yKHRoaXMuZGF0YS5wYWdlWzBdLmdyZXkpO1xuXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhckNvbG9yKG5jKTtcbiAgICB3eC5zZXRCYWNrZ3JvdW5kQ29sb3IoYmMpO1xuICB9LFxuICBvblJlYWR5KCkge1xuICAgICRwYWdlLk5vdGljZSgnZG9uYXRlJyk7XG4gIH0sXG4gIHNhdmUocmVzOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZygnU3RhcnQgUVJDb2RlIGRvd25sb2FkLicpOy8vIOiwg+ivlVxuICAgICRteS5kb3duTG9hZChgaW1nL2RvbmF0ZS8ke3Jlcy5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZX0ucG5nYCwgKHBhdGg6IHN0cmluZykgPT4ge1xuICAgICAgLy8g6I635Y+W55So5oi36K6+572uXG4gICAgICB3eC5nZXRTZXR0aW5nKHtcbiAgICAgICAgc3VjY2VzczogcmVzMiA9PiB7XG4gICAgICAgICAgaWYgKHJlczIuYXV0aFNldHRpbmdbJ3Njb3BlLndyaXRlUGhvdG9zQWxidW0nXSlcbiAgICAgICAgICAgIC8vIOWmguaenOW3sue7j+aOiOadg+ebuOWGjOebtOaOpeWGmeWFpeWbvueJh1xuICAgICAgICAgICAgd3guc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XG4gICAgICAgICAgICAgIGZpbGVQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgJG15LnRpcCgn5L+d5a2Y5oiQ5YqfJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsc2Ugd3guYXV0aG9yaXplKHsvLyDmsqHmnInmjojmnYPigJTigJQ+5o+Q56S655So5oi35o6I5p2DXG4gICAgICAgICAgICBzY29wZTogJ3Njb3BlLndyaXRlUGhvdG9zQWxidW0nLFxuICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICB3eC5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcbiAgICAgICAgICAgICAgICBmaWxlUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAkbXkudGlwKCfkv53lrZjmiJDlip8nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6ICgpID0+IHsgLy8g55So5oi35ouS57ud5p2D6ZmQ77yM5o+Q56S655So5oi35byA5ZCv5p2D6ZmQXG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmnYPpmZDooqvmi5InLCBjb250ZW50OiAn5oKo5ouS57ud5LqG55u45YaM5YaZ5YWl5p2D6ZmQ77yM5aaC5p6c5oOz6KaB5L+d5a2Y5Zu+54mH77yM6K+35Zyo5bCP56iL5bqP6K6+572u6aG15YWB6K645p2D6ZmQJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSwgY29uZmlybVRleHQ6ICfnoa7lrponLCBjb25maXJtQ29sb3I6ICcjM0NDNTFGJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgJG15LnRpcCgn5LqM57u056CB5L+d5a2Y5aSx6LSlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgJG15LnRpcCgn5LqM57u056CB5LiL6L295aSx6LSlJyk7XG4gICAgfSk7XG4gIH0sXG4gIG9uUGFnZVNjcm9sbChlKSB7XG4gICAgJGNvbXBvbmVudC5uYXYoZSwgdGhpcyk7XG4gIH0sXG4gIGNBKHJlczogYW55KSB7XG4gICAgJGNvbXBvbmVudC50cmlnZ2VyKHJlcywgdGhpcyk7XG4gIH0sXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiAoKSA9PiAoeyB0aXRsZTogJ+aNkOi1oE1yLkhvcGUnLCBwYXRoOiAnL3NldHRpbmdzL2RvbmF0ZScgfSlcbn0pO1xuIl19