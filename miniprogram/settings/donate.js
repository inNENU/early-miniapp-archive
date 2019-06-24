"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxpage_1 = require("wxpage");
var component_1 = require("../utils/component");
var setpage_1 = require("../utils/setpage");
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
        var _a = setpage_1.default.color(this.data.page[0].grey), nc = _a.nc, bc = _a.bc;
        wx.setNavigationBarColor(nc);
        wx.setBackgroundColor(bc);
    },
    onReady: function () {
        setpage_1.default.Notice('donate');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9uYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0EsaUNBQStCO0FBQy9CLGdEQUE0QztBQUM1Qyw0Q0FBcUM7QUFDckMsa0NBQThCO0FBQ3RCLElBQUEsdUJBQWEsQ0FBYztBQUVuQyxnQkFBUyxDQUFDLFFBQVEsRUFBRTtJQUNsQixJQUFJLEVBQUU7UUFDSixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDTixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7UUFDUixJQUFJLEVBQUU7WUFDSixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7WUFDN0Q7Z0JBQ0UsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osSUFBSSxFQUFFLHdIQUF3SDthQUMvSDtZQUNELEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQzlCO2dCQUNFLEdBQUcsRUFBRSxHQUFHO2dCQUNSLElBQUksRUFBRSxpSUFBaUk7YUFDeEk7U0FDRjtLQUNGO0lBQ0QsTUFBTSxFQUFOO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsT0FBUSxDQUFDLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLFlBQUcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsVUFBQSxVQUFVO1lBQ3pDLEtBQUksQ0FBQyxPQUFRLENBQUMsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTTtRQUVFLElBQUEsb0RBQWdELEVBQTlDLFVBQUUsRUFBRSxVQUEwQyxDQUFDO1FBRXZELEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELE9BQU87UUFDTCxpQkFBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBSSxFQUFKLFVBQUssR0FBUTtRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN0QyxZQUFHLENBQUMsUUFBUSxDQUFDLGdCQUFjLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksU0FBTSxFQUFFLFVBQUMsSUFBWTtZQUU1RSxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNaLE9BQU8sRUFBRSxVQUFBLElBQUk7b0JBQ1gsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLHdCQUF3QixDQUFDO3dCQUU1QyxFQUFFLENBQUMsc0JBQXNCLENBQUM7NEJBQ3hCLFFBQVEsRUFBRSxJQUFJOzRCQUNkLE9BQU8sRUFBRTtnQ0FDUCxZQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNsQixDQUFDO3lCQUNGLENBQUMsQ0FBQzs7d0JBQ0EsRUFBRSxDQUFDLFNBQVMsQ0FBQzs0QkFDaEIsS0FBSyxFQUFFLHdCQUF3Qjs0QkFDL0IsT0FBTyxFQUFFO2dDQUNQLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQ0FDeEIsUUFBUSxFQUFFLElBQUk7b0NBQ2QsT0FBTyxFQUFFO3dDQUNQLFlBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7b0NBQ2xCLENBQUM7aUNBQ0YsQ0FBQyxDQUFDOzRCQUNMLENBQUM7NEJBQ0QsSUFBSSxFQUFFO2dDQUNKLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0NBQ1gsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsa0NBQWtDO29DQUMxRCxVQUFVLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFNBQVM7b0NBQzdELFFBQVEsRUFBRTt3Q0FDUixZQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29DQUNyQixDQUFDO2lDQUNGLENBQUMsQ0FBQzs0QkFDTCxDQUFDO3lCQUNGLENBQUMsQ0FBQztnQkFDTCxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFFO1lBQ0QsWUFBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxZQUFZLEVBQVosVUFBYSxDQUFNO1FBQ2pCLG1CQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsRUFBRSxFQUFGLFVBQUcsR0FBUTtRQUNULG1CQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsaUJBQWlCLEVBQUUsY0FBTSxPQUFBLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxDQUFDLEVBQWxELENBQWtEO0NBQzVFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBNci5Ib3BlXG4gKiBARGF0ZTogMjAxOS0wNi0yNCAyMTowMjo1MVxuICogQExhc3RFZGl0b3JzOiBNci5Ib3BlXG4gKiBATGFzdEVkaXRUaW1lOiAyMDE5LTA2LTI0IDIzOjUzOjAzXG4gKiBARGVzY3JpcHRpb246IOaNkOi1oFxuICovXG5pbXBvcnQgJHJlZ2lzdGVyIGZyb20gJ3d4cGFnZSc7XG5pbXBvcnQgJGNvbXBvbmVudCBmcm9tICcuLi91dGlscy9jb21wb25lbnQnO1xuaW1wb3J0ICRwYWdlIGZyb20gJy4uL3V0aWxzL3NldHBhZ2UnO1xuaW1wb3J0ICRteSBmcm9tICcuLi91dGlscy93eCc7XG5jb25zdCB7IGdsb2JhbERhdGE6IGEgfSA9IGdldEFwcCgpO1xuXG4kcmVnaXN0ZXIoJ2RvbmF0ZScsIHtcbiAgZGF0YToge1xuICAgIFQ6IGEuVCxcbiAgICBubTogYS5ubSxcbiAgICBwYWdlOiBbXG4gICAgICB7IHRhZzogJ2hlYWQnLCB0aXRsZTogJ+aNkOi1oCcsIHNoYXJlYWJsZTogdHJ1ZSwgbGVmdFRleHQ6ICfov5Tlm54nIH0sXG4gICAgICB7XG4gICAgICAgIHRhZzogJ3AnLFxuICAgICAgICBoZWFkOiAn5o2Q6LWg6K+05piOJyxcbiAgICAgICAgdGV4dDogJyAgIOebruWJje+8jOWwj+eoi+W6j+acjeWKoeWZqOmAieeUqOmYv+mHjOS6keeahOi9u+mHj+W6lOeUqOacjeWKoeWZqO+8jOS4gOWkqeS4jei2s+S4gOWFg+mSse+8jOWcqOiuv+mXruS6uuaVsOi+g+WkmueahOaXtuWAmeWPr+iDveS8muWHuueOsOaXoOW6lOetlOaIluW8guW4uOW6lOetlOeahOaDheWGteOAguaCqOWPr+S7pemAieaLqeaNkOi1oOadpeiuqeWwj+eoi+W6j+WPmOW+l+abtOWlveOAglxcbiAgICBNci5Ib3Bl5ZCR5ZCM5a2m5om/6K+677yM5L2g5omT6LWP55qE5q+P5LiA5YiG6ZKx6YO95Lya5oqV5YWl5Yiw5bCP56iL5bqP5byA5Y+R5LiK5p2l44CCJ1xuICAgICAgfSxcbiAgICAgIHsgdGFnOiAndGl0bGUnLCB0ZXh0OiAn6Z2e5bi45oSf6LCiJyB9LFxuICAgICAge1xuICAgICAgICB0YWc6ICdwJyxcbiAgICAgICAgdGV4dDogJyAgIOmdnuW4uOaEn+iwouWQjOWtpumAieaLqeS6huaNkOi1oOOAguS9oOWPr+S7pSDigJzngrnlh7vkuIvmlrnkuoznu7TnoIHigJ0g5p2l5bCG5LqM57u056CB5L+d5a2Y6Iez5Yiw55u45YaM5bm25L2/55So55u45bqUQVBQ6L+b6KGM5omT6LWP44CC5aaC5p6c5Y+v5Lul77yMTXIuSG9wZeW4jOacm+WQjOWtpuWcqOaJk+i1j+aXtuazqOaYjuKAnOWwj+eoi+W6j+aJk+i1j+KAneW5tuWkh+azqOWnk+WQje+8jE1yLkhvcGXkvJrlsIblkIzlrabnmoTlp5PlkI3lkozmiZPotY/ph5Hpop3mmL7npLrlnKjkuIvmlrnnmoTliJfooajkuK3jgILlho3mrKHmhJ/osKLlkIzlrabnmoTmlK/mjIHjgIInXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5zZXREYXRhISh7ICdwYWdlWzBdLnN0YXR1c0JhckhlaWdodCc6IGEuaW5mby5zdGF0dXNCYXJIZWlnaHQgfSk7XG4gICAgJG15LnJlcXVlc3QoJ2NvbmZpZy9kb25hdGVMaXN0JywgZG9uYXRlTGlzdCA9PiB7XG4gICAgICB0aGlzLnNldERhdGEhKHsgZG9uYXRlTGlzdCB9KTtcbiAgICB9KTtcbiAgfSxcbiAgb25TaG93KCkge1xuICAgIC8vIOiuvue9ruiDtuWbiuWSjOiDjOaZr+minOiJslxuICAgIGNvbnN0IHsgbmMsIGJjIH0gPSAkcGFnZS5jb2xvcih0aGlzLmRhdGEucGFnZVswXS5ncmV5KTtcblxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJDb2xvcihuYyk7XG4gICAgd3guc2V0QmFja2dyb3VuZENvbG9yKGJjKTtcbiAgfSxcbiAgb25SZWFkeSgpIHtcbiAgICAkcGFnZS5Ob3RpY2UoJ2RvbmF0ZScpO1xuICB9LFxuICBzYXZlKHJlczogYW55KSB7XG4gICAgY29uc29sZS5sb2coJ1N0YXJ0IFFSQ29kZSBkb3dubG9hZC4nKTsvLyDosIPor5VcbiAgICAkbXkuZG93bkxvYWQoYGltZy9kb25hdGUvJHtyZXMuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWV9LnBuZ2AsIChwYXRoOiBzdHJpbmcpID0+IHtcbiAgICAgIC8vIOiOt+WPlueUqOaIt+iuvue9rlxuICAgICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICAgIHN1Y2Nlc3M6IHJlczIgPT4ge1xuICAgICAgICAgIGlmIChyZXMyLmF1dGhTZXR0aW5nWydzY29wZS53cml0ZVBob3Rvc0FsYnVtJ10pXG4gICAgICAgICAgICAvLyDlpoLmnpzlt7Lnu4/mjojmnYPnm7jlhoznm7TmjqXlhpnlhaXlm77niYdcbiAgICAgICAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICAgICAgICBmaWxlUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgICRteS50aXAoJ+S/neWtmOaIkOWKnycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBlbHNlIHd4LmF1dGhvcml6ZSh7Ly8g5rKh5pyJ5o6I5p2D4oCU4oCUPuaPkOekuueUqOaIt+aOiOadg1xuICAgICAgICAgICAgc2NvcGU6ICdzY29wZS53cml0ZVBob3Rvc0FsYnVtJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgd3guc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgJG15LnRpcCgn5L+d5a2Y5oiQ5YqfJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7IC8vIOeUqOaIt+aLkue7neadg+mZkO+8jOaPkOekuueUqOaIt+W8gOWQr+adg+mZkFxuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5p2D6ZmQ6KKr5ouSJywgY29udGVudDogJ+aCqOaLkue7neS6huebuOWGjOWGmeWFpeadg+mZkO+8jOWmguaenOaDs+imgeS/neWtmOWbvueJh++8jOivt+WcqOWwj+eoi+W6j+iuvue9rumhteWFgeiuuOadg+mZkCcsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsIGNvbmZpcm1UZXh0OiAn56Gu5a6aJywgY29uZmlybUNvbG9yOiAnIzNDQzUxRicsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICRteS50aXAoJ+S6jOe7tOeggeS/neWtmOWksei0pScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sICgpID0+IHtcbiAgICAgICRteS50aXAoJ+S6jOe7tOeggeS4i+i9veWksei0pScpO1xuICAgIH0pO1xuICB9LFxuICBvblBhZ2VTY3JvbGwoZTogYW55KSB7XG4gICAgJGNvbXBvbmVudC5uYXYoZSwgdGhpcyk7XG4gIH0sXG4gIGNBKHJlczogYW55KSB7XG4gICAgJGNvbXBvbmVudC50cmlnZ2VyKHJlcywgdGhpcyk7XG4gIH0sXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiAoKSA9PiAoeyB0aXRsZTogJ+aNkOi1oE1yLkhvcGUnLCBwYXRoOiAnL3NldHRpbmdzL2RvbmF0ZScgfSlcbn0pO1xuIl19