"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_1 = require("./file");
var wx_1 = require("./wx");
var logger = wx.getLogManager({ level: 1 });
var globalData;
var init = function (data) {
    globalData = data;
};
var disposePage = function (page, option) {
    if (page)
        if (page[0].tag === 'head') {
            page[0].statusBarHeight = globalData.info.statusBarHeight;
            page[0].url = [];
            if (option && !page[0].action) {
                page[0].aim = 'aim' in option ? option.aim : page[0].title;
                if ('From' in option)
                    page[0].leftText = option.From;
                if ('depth' in option)
                    page[0].aimDepth = Number(option.depth) + 1;
                if ('share' in option) {
                    page[0].action = 'redirect';
                    console.info('redirect');
                }
                if (!page[0].leftText)
                    page[0].leftText = '返回';
            }
            page.forEach(function (element, index) {
                element.id = index;
                if (element.src) {
                    if (element.res)
                        page[0].url.push(element.res);
                    else {
                        page[0].url.push(element.src);
                        element.res = element.src;
                    }
                    if (!element.imgMode)
                        element.imgMode = 'widthFix';
                }
                if (element.docName) {
                    var temp = element.docName.split('.')[1];
                    element.docName = element.docName.split('.')[0];
                    element.docType = temp === 'docx' || temp === 'doc'
                        ? 'doc'
                        : temp === 'pptx' || temp === 'ppt'
                            ? 'ppt'
                            : temp === 'xlsx' || temp === 'xls'
                                ? 'xls'
                                : temp === 'jpg' || temp === 'jpeg'
                                    ? 'jpg'
                                    : temp === 'mp4' || temp === 'mov' || temp === 'avi' || temp === 'rmvb'
                                        ? 'video'
                                        : temp === 'pdf'
                                            ? 'pdf'
                                            : temp === 'png' || temp === 'gif'
                                                ? temp
                                                : 'document';
                }
                if ('content' in element)
                    element.content.forEach(function (listElement, listIndex) {
                        listElement.id = index + "-" + listIndex;
                        if ('url' in listElement)
                            listElement.url += "?From=" + page[0].title;
                        if ('aim' in listElement)
                            listElement.url =
                                "module" + page[0].aimDepth + "?From=" + page[0].title + "&aim=" + listElement.aim + "&depth=" + page[0].aimDepth;
                        if ('swiKey' in listElement)
                            listElement.status = wx.getStorageSync(listElement.swiKey);
                        if ('sliKey' in listElement)
                            listElement.value = wx.getStorageSync(listElement.sliKey);
                        if ('pickerValue' in listElement)
                            if (listElement.single) {
                                var pickerValue = wx.getStorageSync(listElement.key);
                                listElement.value = listElement.pickerValue[pickerValue];
                                listElement.currentValue = [pickerValue];
                            }
                            else {
                                var pickerValues = wx.getStorageSync(listElement.key).split('-');
                                listElement.currentValue = [];
                                listElement.value = [];
                                pickerValues.forEach(function (k, l) {
                                    listElement.value[l] = listElement.pickerValue[l][Number(k)];
                                    listElement.currentValue[l] = Number(k);
                                });
                            }
                    });
            });
            console.info(page[0].aim + "\u5904\u7406\u5B8C\u6BD5");
        }
        else {
            console.warn('No head tag in page!');
            logger.warn('No head tag');
            wx.reportMonitor('14', 1);
        }
    else {
        console.warn('No pageData!');
        wx.reportMonitor('15', 1);
    }
    return page;
};
var resolveAim = function (aim) {
    var length = aim.length;
    while (!isNaN(Number(aim.charAt(length))))
        length--;
    var folder = aim.substring(0, length + 1);
    return { folder: folder, path: folder + "/" + aim };
};
var preGetPage = function (page) {
    if (page)
        page.forEach(function (component) {
            if ('content' in component)
                component.content.forEach(function (element) {
                    if ('aim' in element) {
                        var path = resolveAim(element.aim).path;
                        file_1.default.getJson("page/" + path, function () { return null; });
                    }
                });
        });
    wx.reportMonitor('1', 1);
};
var resolvePage = function (option, page) {
    console.info('将要跳转：', option);
    var aim = option.query.aim;
    if (page)
        globalData.page.data = disposePage(page, option.query);
    else {
        var path = resolveAim(aim).path;
        file_1.default.getJson("page/" + path, function (pageData) {
            if (pageData)
                globalData.page.data = disposePage(pageData, option.query);
            else {
                globalData.page.data = disposePage([{ tag: 'error', statusBarHeight: globalData.info.statusBarHeight }], option.query);
                console.warn(aim + "\u8F7D\u5165\u5931\u8D25");
            }
        });
    }
    globalData.page.aim = aim;
    return globalData.page.data;
};
var setPage = function (_a, page, preload) {
    var option = _a.option, ctx = _a.ctx, _b = _a.handle, handle = _b === void 0 ? false : _b;
    if (preload === void 0) { preload = true; }
    if (page)
        ctx.setData({
            T: globalData.T,
            nm: globalData.nm,
            page: handle ? page : disposePage(page, option)
        });
    else if (globalData.page.aim === option.aim) {
        console.log(option.aim + "\u5DF2\u5904\u7406");
        ctx.setData({ T: globalData.T, nm: globalData.nm, page: globalData.page.data }, function () {
            console.log(option.aim + "\u5DF2\u5199\u5165");
            if (preload) {
                preGetPage(ctx.data.page);
                console.log(option.aim + "\u9884\u52A0\u8F7D\u5B50\u9875\u9762\u5B8C\u6210");
            }
        });
    }
    else {
        console.log(option.aim + "\u672A\u5904\u7406");
        ctx.setData({
            T: globalData.T,
            nm: globalData.nm,
            page: handle ? ctx.data.page : disposePage(ctx.data.page, option)
        });
    }
};
var popNotice = function (aim) {
    if (wx.getStorageSync(aim + "Notify")) {
        var notice = wx.getStorageSync(aim + "notice");
        wx.showModal({
            title: notice[0], content: notice[1], showCancel: false,
            success: function () {
                wx.removeStorageSync(aim + "Notify");
            }
        });
        console.info('弹出通知');
    }
    wx.reportAnalytics('page_aim_count', { aim: aim });
};
var setOnlinePage = function (option, ctx, preload) {
    if (preload === void 0) { preload = true; }
    if (globalData.page.aim === option.aim) {
        console.log(option.aim + "\u5DF2\u5904\u7406");
        ctx.setData({ T: globalData.T, nm: globalData.nm, page: globalData.page.data }, function () {
            console.log(option.aim + "\u5DF2\u5199\u5165");
            if (preload) {
                preGetPage(ctx.data.page);
                console.log(option.aim + "\u9884\u52A0\u8F7D\u5B50\u9875\u9762\u5B8C\u6210");
            }
        });
    }
    else {
        console.info(option.aim + "onLoad\u5F00\u59CB\uFF0C\u53C2\u6570\u4E3A\uFF1A", option);
        var _a = resolveAim(option.aim), folder_1 = _a.folder, path = _a.path;
        ctx.aim = option.aim;
        var page = file_1.default.readJson("page/" + path);
        if (page) {
            setPage({ option: option, ctx: ctx }, page);
            popNotice(option.aim);
            console.info(option.aim + "onLoad\u6210\u529F\uFF1A", ctx.data);
            wx.reportMonitor('0', 1);
            if (preload) {
                preGetPage(ctx.data.page);
                console.log(option.aim + "\u754C\u9762\u9884\u52A0\u8F7D\u5B8C\u6210");
            }
        }
        else
            wx_1.default.request("page/" + path, function (data) {
                setPage({ option: option, ctx: ctx }, data);
                if (!option.share)
                    file_1.default.writeJson("page/" + folder_1, "" + option.aim, data);
                if (preload) {
                    preGetPage(ctx.data.page);
                    console.log(option.aim + "\u754C\u9762\u9884\u52A0\u8F7D\u5B8C\u6210");
                }
                popNotice(option.aim);
                console.info(option.aim + "onLoad\u6210\u529F");
                wx.reportMonitor('0', 1);
            }, function (res) {
                setPage({ option: option, ctx: ctx }, [{ tag: 'error', statusBarHeight: globalData.info.statusBarHeight }]);
                popNotice(option.aim);
                console.warn(option.aim + "onLoad\u5931\u8D25\uFF0C\u9519\u8BEF\u4E3A", res);
                logger.warn(option.aim + "onLoad\u5931\u8D25\uFF0C\u9519\u8BEF\u4E3A", res);
                wx.reportMonitor('13', 1);
            }, function () {
                setPage({ option: option, ctx: ctx }, [{ tag: 'error', statusBarHeight: globalData.info.statusBarHeight }]);
                console.warn(option.aim + "\u8D44\u6E90\u9519\u8BEF");
                wx.reportMonitor('12', 1);
                console.info(option.aim + "onLoad\u6210\u529F");
                wx.reportMonitor('0', 1);
            });
    }
};
var color = function (grey) {
    var _a = globalData.nm ? ['#ffffff', '#000000'] : ['#000000', '#ffffff'], frontColor = _a[0], backgroundColor = _a[1];
    var temp;
    if (globalData.nm && grey)
        switch (globalData.T) {
            case 'Andriod':
                temp = ['#10110b', '#10110b', '#10110b'];
                break;
            case 'iOS':
                temp = ['#10110b', '#0a0a08', '#10110b'];
                break;
            case 'NENU':
            default:
                temp = ['#070707', '#070707', '#070707'];
        }
    else if (globalData.nm && !grey)
        switch (globalData.T) {
            case 'iOS':
                temp = ['#000000', '#0a0a08', '#000000'];
                break;
            case 'Andriod':
            case 'NENU':
            default:
                temp = ['#000000', '#000000', '#000000'];
        }
    else if (!globalData.nm && grey)
        switch (globalData.T) {
            case 'Andriod':
                temp = ['#f8f8f8', '#f8f8f8', '#f8f8f8'];
                break;
            case 'NENU':
                temp = ['#f0f0f0', '#f0f0f0', '#f0f0f0'];
                break;
            case 'iOS':
            default: temp = ['#f4f4f4', '#efeef4', '#efeef4'];
        }
    else
        switch (globalData.T) {
            case 'Andriod':
                temp = ['#f8f8f8', '#f8f8f8', '#f8f8f8'];
                break;
            case 'NENU':
                temp = ['ffffff', 'ffffff', 'ffffff'];
                break;
            case 'iOS':
            default:
                temp = ['#f4f4f4', 'ffffff', 'ffffff'];
        }
    return {
        nc: { frontColor: frontColor, backgroundColor: backgroundColor },
        bc: { backgroundColorTop: temp[0], backgroundColor: temp[1], backgroundColorBottom: temp[2] }
    };
};
var loadFont = function (theme) {
    try {
        if (theme === 'Android')
            wx.loadFontFace({
                family: 'FZKTJW', source: 'url("https://mp.nenuyouth.com/fonts/FZKTJW.ttf")',
                complete: function (res) {
                    console.info('楷体字体', res);
                }
            });
        else if (theme === 'NENU')
            wx.loadFontFace({
                family: 'FZSSJW', source: 'url("https://mp.nenuyouth.com/fonts/FZSSJW.ttf")',
                complete: function (res) {
                    console.info('宋体字体', res);
                }
            });
        else
            throw theme;
    }
    catch (e) {
        console.warn("Theme " + e + " cannot be handled.");
    }
};
exports.default = {
    init: init,
    resolve: resolvePage,
    Set: setPage,
    Online: setOnlinePage,
    Notice: popNotice,
    color: color,
    loadFont: loadFont
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSwrQkFBMkI7QUFDM0IsMkJBQXVCO0FBSXZCLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUc5QyxJQUFJLFVBQXNCLENBQUM7QUFPM0IsSUFBTSxJQUFJLEdBQUcsVUFBQyxJQUFnQjtJQUM1QixVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQVNGLElBQU0sV0FBVyxHQUFHLFVBQUMsSUFBYyxFQUFFLE1BQWU7SUFDbEQsSUFBSSxJQUFJO1FBQ04sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLE1BQU0sRUFBRTtZQUcxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzFELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBRWpCLElBQUksTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDN0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUMzRCxJQUFJLE1BQU0sSUFBSSxNQUFNO29CQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDckQsSUFBSSxPQUFPLElBQUksTUFBTTtvQkFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FB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QTtDQUNULENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgd3gqL1xuXG4vLyDlvJXlhaXmlofku7bnrqHnkIZcbmltcG9ydCAkZmlsZSBmcm9tICcuL2ZpbGUnO1xuaW1wb3J0ICRteSBmcm9tICcuL3d4JztcbmltcG9ydCB7IFdYUGFnZSB9IGZyb20gJ3d4cGFnZSc7XG5cbi8vIOWjsOaYjuaXpeW/l+euoeeQhuWZqFxuY29uc3QgbG9nZ2VyID0gd3guZ2V0TG9nTWFuYWdlcih7IGxldmVsOiAxIH0pO1xuXG4vLyDlo7DmmI7lhajlsYDmlbDmja5cbmxldCBnbG9iYWxEYXRhOiBHbG9iYWxEYXRhO1xuXG4vKipcbiAqIOWcqOiEmuacrOWGheWIneWni+WMluWFqOWxgOaVsOaNrlxuICpcbiAqIEBwYXJhbSBkYXRhIOWFqOWxgOaVsOaNrlxuICovXG5jb25zdCBpbml0ID0gKGRhdGE6IEdsb2JhbERhdGEpID0+IHtcbiAgZ2xvYmFsRGF0YSA9IGRhdGE7XG59O1xuXG4vKipcbiAqIOiOt+W+l+eVjOmdouaVsOaNru+8jOeUn+aIkOato+ehrueahOeVjOmdouaVsOaNrlxuICpcbiAqIEBwYXJhbSBwYWdlIOmhtemdouaVsOaNrlxuICogQHBhcmFtIG9wdGlvbiDpobXpnaLkvKDlj4JcbiAqIEByZXR1cm5zIOWkhOeQhuS5i+WQjueahHBhZ2VcbiAqL1xuY29uc3QgZGlzcG9zZVBhZ2UgPSAocGFnZTogUGFnZURhdGEsIG9wdGlvbjogUGFnZUFyZykgPT4ge1xuICBpZiAocGFnZSkgIC8vIOWmguaenHBhZ2Xlj4LmlbDkvKDlhaVcbiAgICBpZiAocGFnZVswXS50YWcgPT09ICdoZWFkJykge1xuXG4gICAgICAvLyDlr7lwYWdl5LitaGVhZOagh+etvuaJp+ihjOWIneWni+WMllxuICAgICAgcGFnZVswXS5zdGF0dXNCYXJIZWlnaHQgPSBnbG9iYWxEYXRhLmluZm8uc3RhdHVzQmFySGVpZ2h0O1xuICAgICAgcGFnZVswXS51cmwgPSBbXTtcblxuICAgICAgaWYgKG9wdGlvbiAmJiAhcGFnZVswXS5hY3Rpb24pIHtcbiAgICAgICAgcGFnZVswXS5haW0gPSAnYWltJyBpbiBvcHRpb24gPyBvcHRpb24uYWltIDogcGFnZVswXS50aXRsZTsgLy8g6K6+572u55WM6Z2i5ZCN56ewXG4gICAgICAgIGlmICgnRnJvbScgaW4gb3B0aW9uKSBwYWdlWzBdLmxlZnRUZXh0ID0gb3B0aW9uLkZyb207IC8vIOiuvue9rumhtemdouadpea6kFxuICAgICAgICBpZiAoJ2RlcHRoJyBpbiBvcHRpb24pIHBhZ2VbMF0uYWltRGVwdGggPSBOdW1iZXIob3B0aW9uLmRlcHRoKSArIDE7IC8vIOiuvue9rueVjOmdoui3r+W+hOa3seW6plxuXG4gICAgICAgIC8vIOWIpOaWreaYr+WQpuadpeiHquWIhuS6q++8jOWIhuS6q+mhteW3puS4iuinkuWKqOS9nOm7mOiupOS4uumHjeWumuWQkVxuICAgICAgICBpZiAoJ3NoYXJlJyBpbiBvcHRpb24pIHtcbiAgICAgICAgICBwYWdlWzBdLmFjdGlvbiA9ICdyZWRpcmVjdCc7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdyZWRpcmVjdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5re75Yqg6L+U5Zue5paH5a2XXG4gICAgICAgIGlmICghcGFnZVswXS5sZWZ0VGV4dCkgcGFnZVswXS5sZWZ0VGV4dCA9ICfov5Tlm54nO1xuICAgICAgfVxuICAgICAgcGFnZS5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICBlbGVtZW50LmlkID0gaW5kZXg7IC8vIOWvuXBhZ2Xmr4/pobnlhYPntKDmt7vliqBpZFxuXG4gICAgICAgIC8vIOWkhOeQhuWbvueJh1xuICAgICAgICBpZiAoZWxlbWVudC5zcmMpIHtcbiAgICAgICAgICBpZiAoZWxlbWVudC5yZXMpIHBhZ2VbMF0udXJsLnB1c2goZWxlbWVudC5yZXMpO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFnZVswXS51cmwucHVzaChlbGVtZW50LnNyYyk7XG4gICAgICAgICAgICBlbGVtZW50LnJlcyA9IGVsZW1lbnQuc3JjO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWVsZW1lbnQuaW1nTW9kZSkgZWxlbWVudC5pbWdNb2RlID0gJ3dpZHRoRml4JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWkhOeQhuaWh+aho1xuICAgICAgICBpZiAoZWxlbWVudC5kb2NOYW1lKSB7XG4gICAgICAgICAgY29uc3QgeyAxOiB0ZW1wIH0gPSBlbGVtZW50LmRvY05hbWUuc3BsaXQoJy4nKTtcblxuICAgICAgICAgIGVsZW1lbnQuZG9jTmFtZSA9IGVsZW1lbnQuZG9jTmFtZS5zcGxpdCgnLicpWzBdO1xuICAgICAgICAgIGVsZW1lbnQuZG9jVHlwZSA9IHRlbXAgPT09ICdkb2N4JyB8fCB0ZW1wID09PSAnZG9jJ1xuICAgICAgICAgICAgPyAnZG9jJ1xuICAgICAgICAgICAgOiB0ZW1wID09PSAncHB0eCcgfHwgdGVtcCA9PT0gJ3BwdCdcbiAgICAgICAgICAgICAgPyAncHB0J1xuICAgICAgICAgICAgICA6IHRlbXAgPT09ICd4bHN4JyB8fCB0ZW1wID09PSAneGxzJ1xuICAgICAgICAgICAgICAgID8gJ3hscydcbiAgICAgICAgICAgICAgICA6IHRlbXAgPT09ICdqcGcnIHx8IHRlbXAgPT09ICdqcGVnJ1xuICAgICAgICAgICAgICAgICAgPyAnanBnJ1xuICAgICAgICAgICAgICAgICAgOiB0ZW1wID09PSAnbXA0JyB8fCB0ZW1wID09PSAnbW92JyB8fCB0ZW1wID09PSAnYXZpJyB8fCB0ZW1wID09PSAncm12YidcbiAgICAgICAgICAgICAgICAgICAgPyAndmlkZW8nXG4gICAgICAgICAgICAgICAgICAgIDogdGVtcCA9PT0gJ3BkZidcbiAgICAgICAgICAgICAgICAgICAgICA/ICdwZGYnXG4gICAgICAgICAgICAgICAgICAgICAgOiB0ZW1wID09PSAncG5nJyB8fCB0ZW1wID09PSAnZ2lmJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyB0ZW1wXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdkb2N1bWVudCc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDorr7nva5saXN057uE5Lu2XG4gICAgICAgIGlmICgnY29udGVudCcgaW4gZWxlbWVudCkgZWxlbWVudC5jb250ZW50LmZvckVhY2goKGxpc3RFbGVtZW50OiBhbnksIGxpc3RJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgbGlzdEVsZW1lbnQuaWQgPSBgJHtpbmRleH0tJHtsaXN0SW5kZXh9YDsgLy8g5YiX6KGo5q+P6aG55re75YqgaWRcblxuICAgICAgICAgIC8vIOiuvue9ruWIl+ihqOWvvOiIqlxuICAgICAgICAgIGlmICgndXJsJyBpbiBsaXN0RWxlbWVudCkgbGlzdEVsZW1lbnQudXJsICs9IGA/RnJvbT0ke3BhZ2VbMF0udGl0bGV9YDtcbiAgICAgICAgICBpZiAoJ2FpbScgaW4gbGlzdEVsZW1lbnQpXG4gICAgICAgICAgICBsaXN0RWxlbWVudC51cmwgPVxuICAgICAgICAgICAgICBgbW9kdWxlJHtwYWdlWzBdLmFpbURlcHRofT9Gcm9tPSR7cGFnZVswXS50aXRsZX0mYWltPSR7bGlzdEVsZW1lbnQuYWltfSZkZXB0aD0ke3BhZ2VbMF0uYWltRGVwdGh9YDtcblxuICAgICAgICAgIC8vIOiuvue9ruWIl+ihqOW8gOWFs+S4jua7keWdl1xuICAgICAgICAgIGlmICgnc3dpS2V5JyBpbiBsaXN0RWxlbWVudCkgbGlzdEVsZW1lbnQuc3RhdHVzID0gd3guZ2V0U3RvcmFnZVN5bmMobGlzdEVsZW1lbnQuc3dpS2V5KTtcbiAgICAgICAgICBpZiAoJ3NsaUtleScgaW4gbGlzdEVsZW1lbnQpIGxpc3RFbGVtZW50LnZhbHVlID0gd3guZ2V0U3RvcmFnZVN5bmMobGlzdEVsZW1lbnQuc2xpS2V5KTtcblxuICAgICAgICAgIC8vIOiuvue9ruWIl+ihqOmAieaLqeWZqFxuICAgICAgICAgIGlmICgncGlja2VyVmFsdWUnIGluIGxpc3RFbGVtZW50KVxuICAgICAgICAgICAgaWYgKGxpc3RFbGVtZW50LnNpbmdsZSkgeyAvLyDljZXliJfpgInmi6nlmahcbiAgICAgICAgICAgICAgY29uc3QgcGlja2VyVmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHd4LmdldFN0b3JhZ2VTeW5jKGxpc3RFbGVtZW50LmtleSk7XG5cbiAgICAgICAgICAgICAgbGlzdEVsZW1lbnQudmFsdWUgPSBsaXN0RWxlbWVudC5waWNrZXJWYWx1ZVtwaWNrZXJWYWx1ZV07XG4gICAgICAgICAgICAgIGxpc3RFbGVtZW50LmN1cnJlbnRWYWx1ZSA9IFtwaWNrZXJWYWx1ZV07XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyDlpJrliJfpgInmi6nlmahcbiAgICAgICAgICAgICAgY29uc3QgcGlja2VyVmFsdWVzOiBzdHJpbmdbXSA9IHd4LmdldFN0b3JhZ2VTeW5jKGxpc3RFbGVtZW50LmtleSkuc3BsaXQoJy0nKTtcblxuICAgICAgICAgICAgICBsaXN0RWxlbWVudC5jdXJyZW50VmFsdWUgPSBbXTtcbiAgICAgICAgICAgICAgbGlzdEVsZW1lbnQudmFsdWUgPSBbXTtcbiAgICAgICAgICAgICAgcGlja2VyVmFsdWVzLmZvckVhY2goKGssIGwpID0+IHtcbiAgICAgICAgICAgICAgICBsaXN0RWxlbWVudC52YWx1ZVtsXSA9IGxpc3RFbGVtZW50LnBpY2tlclZhbHVlW2xdW051bWJlcihrKV07XG4gICAgICAgICAgICAgICAgbGlzdEVsZW1lbnQuY3VycmVudFZhbHVlW2xdID0gTnVtYmVyKGspO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgLy8g6LCD6K+VXG4gICAgICBjb25zb2xlLmluZm8oYCR7cGFnZVswXS5haW195aSE55CG5a6M5q+VYCk7XG5cbiAgICAgIC8vIOiwg+ivle+8muacquaJvuWIsGhlYWQgdGFnXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybignTm8gaGVhZCB0YWcgaW4gcGFnZSEnKTtcbiAgICAgIGxvZ2dlci53YXJuKCdObyBoZWFkIHRhZycpO1xuICAgICAgd3gucmVwb3J0TW9uaXRvcignMTQnLCAxKTtcbiAgICB9XG4gIC8vIOiwg+ivle+8muacquS8oOWFpXBhZ2VcbiAgZWxzZSB7XG4gICAgY29uc29sZS53YXJuKCdObyBwYWdlRGF0YSEnKTtcbiAgICB3eC5yZXBvcnRNb25pdG9yKCcxNScsIDEpO1xuICB9XG5cbiAgcmV0dXJuIHBhZ2U7IC8vIOi/lOWbnuWkhOeQhuWQjueahHBhZ2Vcbn07XG5cbi8qKlxuICog6I635Y+W5paH5Lu25aS55LiO6Lev5b6E5ZCN56ewXG4gKlxuICogQHBhcmFtIGFpbSDpobXpnaLlkI3np7BcbiAqL1xuY29uc3QgcmVzb2x2ZUFpbSA9IChhaW06IHN0cmluZykgPT4ge1xuICBsZXQgeyBsZW5ndGggfSA9IGFpbTtcblxuICB3aGlsZSAoIWlzTmFOKE51bWJlcihhaW0uY2hhckF0KGxlbmd0aCkpKSkgbGVuZ3RoLS07XG4gIGNvbnN0IGZvbGRlciA9IGFpbS5zdWJzdHJpbmcoMCwgbGVuZ3RoICsgMSk7XG5cbiAgcmV0dXJuIHsgZm9sZGVyLCBwYXRoOiBgJHtmb2xkZXJ9LyR7YWltfWAgfTtcbn07XG5cbi8qKlxuICog5o+Q5YmN6I635b6X5a2Q55WM6Z2i44CC5Zyo55WM6Z2i5Yqg6L295a6M5q+V5pe277yM5qOA5p+l55WM6Z2i5YyF5ZCr55qE5omA5pyJ6ZO+5o6l5piv5ZCm5bey5a2Y5Zyo5pys5ZywanNvbu+8jOWmguaenOayoeacieeri+WNs+iOt+WPluW5tuWkhOeQhuWQjuWGmeWFpeWtmOWCqFxuICpcbiAqIEBwYXJhbSBwYWdlIOmhtemdouaVsOaNrlxuICovXG5jb25zdCBwcmVHZXRQYWdlID0gKHBhZ2U6IFBhZ2VEYXRhKSA9PiB7XG4gIGlmIChwYWdlKSBwYWdlLmZvckVhY2goY29tcG9uZW50ID0+IHtcbiAgICBpZiAoJ2NvbnRlbnQnIGluIGNvbXBvbmVudCkgLy8g6K+l57uE5Lu25piv5YiX6KGo77yM6ZyA6KaB6aKE5Yqg6L2955WM6Z2i77yM5o+Q5YmN6I635Y+W55WM6Z2i5Yiw5a2Y5YKoXG4gICAgICBjb21wb25lbnQuY29udGVudC5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCdhaW0nIGluIGVsZW1lbnQpIHtcbiAgICAgICAgICBjb25zdCB7IHBhdGggfSA9IHJlc29sdmVBaW0oZWxlbWVudC5haW0pO1xuXG4gICAgICAgICAgJGZpbGUuZ2V0SnNvbihgcGFnZS8ke3BhdGh9YCwgKCkgPT4gbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9KTtcbiAgd3gucmVwb3J0TW9uaXRvcignMScsIDEpOyAvLyDnu5/orqHmiqXlkYpcbn07XG5cbi8qKlxuICogKirnroDku4s6KipcbiAqIFxuICogLSDmj4/ov7DvvJrpooTlpITnkIbpobXpnaLmlbDmja7lhpnlhaXlhajlsYDmlbDmja5cbiAqIFxuICogLSDnlKjms5XvvJrlnKjpobXpnaJvbk5hdmlnYXRl5pe26LCD55So77yMXG4gKiBcbiAqIC0g5oCn6LSo77ya5ZCM5q2l5Ye95pWwXG4gKiBcbiAqIEBwYXJhbSBvcHRpb24g6aG16Z2i6Lez6L2s5Y+C5pWwXG4gKiBAcGFyYW0gcGFnZSBwYWdl5pWw57uEXG4gKi9cbmNvbnN0IHJlc29sdmVQYWdlID0gKG9wdGlvbjogV1hQYWdlLlBhZ2VBcmcsIHBhZ2U/OiBQYWdlRGF0YSkgPT4ge1xuICBjb25zb2xlLmluZm8oJ+Wwhuimgei3s+i9rO+8micsIG9wdGlvbik7IC8vIOaOp+WItuWPsOi+k+WHuuWPguaVsFxuICBjb25zdCB7IGFpbSB9ID0gb3B0aW9uLnF1ZXJ5O1xuXG4gIGlmIChwYWdlKSBnbG9iYWxEYXRhLnBhZ2UuZGF0YSA9IGRpc3Bvc2VQYWdlKHBhZ2UsIG9wdGlvbi5xdWVyeSk7XG4gIGVsc2Uge1xuICAgIGNvbnN0IHsgcGF0aCB9ID0gcmVzb2x2ZUFpbShhaW0pO1xuXG4gICAgJGZpbGUuZ2V0SnNvbihgcGFnZS8ke3BhdGh9YCwgcGFnZURhdGEgPT4ge1xuICAgICAgaWYgKHBhZ2VEYXRhKSBnbG9iYWxEYXRhLnBhZ2UuZGF0YSA9IGRpc3Bvc2VQYWdlKHBhZ2VEYXRhIGFzIFBhZ2VEYXRhLCBvcHRpb24ucXVlcnkpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGdsb2JhbERhdGEucGFnZS5kYXRhID0gZGlzcG9zZVBhZ2UoXG4gICAgICAgICAgW3sgdGFnOiAnZXJyb3InLCBzdGF0dXNCYXJIZWlnaHQ6IGdsb2JhbERhdGEuaW5mby5zdGF0dXNCYXJIZWlnaHQgfV0sXG4gICAgICAgICAgb3B0aW9uLnF1ZXJ5XG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUud2FybihgJHthaW196L295YWl5aSx6LSlYCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgLy8g6K6+572uYWlt5YC8XG4gIGdsb2JhbERhdGEucGFnZS5haW0gPSBhaW07XG5cbiAgcmV0dXJuIGdsb2JhbERhdGEucGFnZS5kYXRhO1xufTtcblxuaW50ZXJmYWNlIFNldFBhZ2VPcHRpb24ge1xuICBvcHRpb246IFBhZ2VBcmc7XG4gIGN0eDogYW55O1xuICBoYW5kbGU/OiBib29sZWFuO1xufVxuXG4vKipcbiAqICAqKueugOS7izoqKlxuICpcbiAqIC0g5o+P6L+w77ya6K6+572u5pys5Zyw55WM6Z2i5pWw5o2u77yM5aaC5p6c5Lyg5YWlYHBhZ2Vg5Y+C5pWw77yM5YiZ5qC55o2uYGhhbmRsZWDnmoTlgLzlhrPlrprmmK/lkKblnKhgc2V0RGF0YWDliY3lpITnkIZgcGFnZWDjgIJcbiAqIOWmguaenOayoeacieS8oOWFpWBwYWdlYO+8jOWImeS9v+eUqGBQYWdlT3B0aW9uLmRhdGEucGFnZWDjgILkuYvlkI7moLnmja5gcHJlbG9hZGDnmoTlgLzlhrPlrprmmK/lkKblr7npobXpnaLpk77mjqXov5vooYzpooTliqDovb3jgIJcbiAqXG4gKiAtIOeUqOazle+8muWcqOmhtemdom9uTG9hZOaXtuiwg+eUqO+8jFxuICpcbiAqIC0g5oCn6LSo77ya5ZCM5q2l5Ye95pWwXG4gKiBcbiAqIEBwYXJhbSBvcHRpb24g6aG16Z2i5Lyg5Y+CXG4gKiBAcGFyYW0gY3R4IOmhtemdouaMh+mSiFxuICogQHBhcmFtIFtoYW5kbGU9ZmFsc2VdIOmhtemdouaYr+WQpuW3sue7j+iiq+WkhOeQhlxuICogQHBhcmFtIFtwYWdlXSDpobXpnaLmlbDmja5cbiAqIEBwYXJhbSBbcHJlbG9hZD10cnVlXSDmmK/lkKbpooTliqDovb3lrZDpobXpnaJcbiAqL1xuY29uc3Qgc2V0UGFnZSA9ICh7IG9wdGlvbiwgY3R4LCBoYW5kbGUgPSBmYWxzZSB9OiBTZXRQYWdlT3B0aW9uLCBwYWdlPzogUGFnZURhdGEsIHByZWxvYWQgPSB0cnVlKSA9PiB7XG4gIC8vIOiuvue9rumhtemdouaVsOaNrlxuICBpZiAocGFnZSlcbiAgICBjdHguc2V0RGF0YSh7XG4gICAgICBUOiBnbG9iYWxEYXRhLlQsXG4gICAgICBubTogZ2xvYmFsRGF0YS5ubSxcbiAgICAgIHBhZ2U6IGhhbmRsZSA/IHBhZ2UgOiBkaXNwb3NlUGFnZShwYWdlLCBvcHRpb24pXG4gICAgfSk7XG4gIC8vIOmhtemdouW3sue7j+mihOWkhOeQhuWujOavle+8jOeri+WNs+WGmeWFpXBhZ2XkuaborrDlubbmiafooYzmnKznlYzpnaLnmoTpooTliqDovb1cbiAgZWxzZSBpZiAoZ2xvYmFsRGF0YS5wYWdlLmFpbSA9PT0gb3B0aW9uLmFpbSkge1xuICAgIGNvbnNvbGUubG9nKGAke29wdGlvbi5haW195bey5aSE55CGYCk7XG4gICAgY3R4LnNldERhdGEoeyBUOiBnbG9iYWxEYXRhLlQsIG5tOiBnbG9iYWxEYXRhLm5tLCBwYWdlOiBnbG9iYWxEYXRhLnBhZ2UuZGF0YSB9LCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgJHtvcHRpb24uYWltfeW3suWGmeWFpWApO1xuICAgICAgaWYgKHByZWxvYWQpIHtcbiAgICAgICAgcHJlR2V0UGFnZShjdHguZGF0YS5wYWdlKTtcbiAgICAgICAgY29uc29sZS5sb2coYCR7b3B0aW9uLmFpbX3pooTliqDovb3lrZDpobXpnaLlrozmiJBgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhgJHtvcHRpb24uYWltfeacquWkhOeQhmApO1xuICAgIC8vIOiuvue9rumhtemdouaVsOaNrlxuICAgIGN0eC5zZXREYXRhKHtcbiAgICAgIFQ6IGdsb2JhbERhdGEuVCxcbiAgICAgIG5tOiBnbG9iYWxEYXRhLm5tLFxuICAgICAgcGFnZTogaGFuZGxlID8gY3R4LmRhdGEucGFnZSA6IGRpc3Bvc2VQYWdlKGN0eC5kYXRhLnBhZ2UsIG9wdGlvbilcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiAqKueugOS7izoqKlxuICogXG4gKiAtIOaPj+i/sO+8muW8ueWHuumAmuefpVxuICogXG4gKiAtIOeUqOazle+8muWcqOmhtemdom9uTG9hZOaXtuiwg+eUqO+8jFxuICogXG4gKiAtIOaAp+i0qO+8muWQjOatpeWHveaVsFxuICpcbiAqIEBwYXJhbSBhaW0g5b2T5YmN55WM6Z2i55qEYWlt5YC8XG4gKi9cbmNvbnN0IHBvcE5vdGljZSA9IChhaW06IHN0cmluZykgPT4ge1xuICBpZiAod3guZ2V0U3RvcmFnZVN5bmMoYCR7YWltfU5vdGlmeWApKSB7IC8vIOWIpOaWreaYr+WQpumcgOimgeW8ueeql1xuXG4gICAgLy8g5LuO5a2Y5YKo5Lit6I635Y+W6YCa55+l5YaF5a655bm25bGV56S6XG4gICAgY29uc3Qgbm90aWNlID0gd3guZ2V0U3RvcmFnZVN5bmMoYCR7YWltfW5vdGljZWApO1xuXG4gICAgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiBub3RpY2VbMF0sIGNvbnRlbnQ6IG5vdGljZVsxXSwgc2hvd0NhbmNlbDogZmFsc2UsXG5cbiAgICAgIC8vIOmYsuatouS6jOasoeW8ueeql1xuICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICB3eC5yZW1vdmVTdG9yYWdlU3luYyhgJHthaW19Tm90aWZ5YCk7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgICBjb25zb2xlLmluZm8oJ+W8ueWHuumAmuefpScpOy8vIOiwg+ivlVxuICB9XG4gIHd4LnJlcG9ydEFuYWx5dGljcygncGFnZV9haW1fY291bnQnLCB7IGFpbSB9KTsvLyBBaW3nu5/orqHliIbmnpBcbn07XG5cbi8qKlxuICogKirnroDku4s6KipcbiAqIFxuICogLSDmj4/ov7DvvJrorr7nva7lnKjnur/nlYzpnaLmlbDmja5cbiAqIFxuICogLSDnlKjms5XvvJrlnKjpobXpnaJvbkxvYWTml7bosIPnlKjvvIxcbiAqIFxuICogLSDmgKfotKjvvJrlkIzmraXlh73mlbBcbiAqXG4gKiBAcGFyYW0gb3B0aW9uIOmhtemdouS8oOWPglxuICogQHBhcmFtIGN0eCDpobXpnaLmjIfpkohcbiAqIEBwYXJhbSBwcmVsb2FkIOaYr+WQpumcgOimgemihOWKoOi9vSjpu5jorqTpnIDopoEpXG4gKi9cbmNvbnN0IHNldE9ubGluZVBhZ2UgPSAob3B0aW9uOiBQYWdlQXJnLCBjdHg6IGFueSwgcHJlbG9hZCA9IHRydWUpID0+IHtcblxuICAvLyDpobXpnaLlt7Lnu4/pooTlpITnkIblrozmr5XvvIznq4vljbPlhpnlhaVwYWdl5Lmm6K6w5bm25omn6KGM5pys55WM6Z2i55qE6aKE5Yqg6L29XG4gIGlmIChnbG9iYWxEYXRhLnBhZ2UuYWltID09PSBvcHRpb24uYWltKSB7XG4gICAgY29uc29sZS5sb2coYCR7b3B0aW9uLmFpbX3lt7LlpITnkIZgKTtcbiAgICBjdHguc2V0RGF0YSh7IFQ6IGdsb2JhbERhdGEuVCwgbm06IGdsb2JhbERhdGEubm0sIHBhZ2U6IGdsb2JhbERhdGEucGFnZS5kYXRhIH0sICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGAke29wdGlvbi5haW195bey5YaZ5YWlYCk7XG4gICAgICBpZiAocHJlbG9hZCkge1xuICAgICAgICBwcmVHZXRQYWdlKGN0eC5kYXRhLnBhZ2UpO1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtvcHRpb24uYWltfemihOWKoOi9veWtkOmhtemdouWujOaIkGApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g6ZyA6KaB6YeN5paw6L295YWl55WM6Z2iXG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5pbmZvKGAke29wdGlvbi5haW19b25Mb2Fk5byA5aeL77yM5Y+C5pWw5Li677yaYCwgb3B0aW9uKTtcbiAgICBjb25zdCB7IGZvbGRlciwgcGF0aCB9ID0gcmVzb2x2ZUFpbShvcHRpb24uYWltKTtcblxuICAgIGN0eC5haW0gPSBvcHRpb24uYWltO1xuXG4gICAgY29uc3QgcGFnZSA9ICRmaWxlLnJlYWRKc29uKGBwYWdlLyR7cGF0aH1gKTtcblxuICAgIC8vIOWmguaenOacrOWcsOWtmOWCqOS4reWQq+aciXBhZ2Xnm7TmjqXlpITnkIZcbiAgICBpZiAocGFnZSkge1xuICAgICAgc2V0UGFnZSh7IG9wdGlvbiwgY3R4IH0sIHBhZ2UpO1xuICAgICAgcG9wTm90aWNlKG9wdGlvbi5haW0pO1xuICAgICAgY29uc29sZS5pbmZvKGAke29wdGlvbi5haW19b25Mb2Fk5oiQ5Yqf77yaYCwgY3R4LmRhdGEpO1xuICAgICAgd3gucmVwb3J0TW9uaXRvcignMCcsIDEpO1xuXG4gICAgICAvLyDlpoLmnpzpnIDopoHmiafooYzpooTliqDovb3vvIzliJnmiafooYxcbiAgICAgIGlmIChwcmVsb2FkKSB7XG4gICAgICAgIHByZUdldFBhZ2UoY3R4LmRhdGEucGFnZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke29wdGlvbi5haW1955WM6Z2i6aKE5Yqg6L295a6M5oiQYCk7XG4gICAgICB9XG4gICAgfSBlbHNlXG4gICAgICAvLyDor7fmsYLpobXpnaJKc29uXG4gICAgICAkbXkucmVxdWVzdChgcGFnZS8ke3BhdGh9YCwgZGF0YSA9PiB7XG4gICAgICAgIC8vIOiuvue9rueVjOmdolxuICAgICAgICBzZXRQYWdlKHsgb3B0aW9uLCBjdHggfSwgZGF0YSBhcyBQYWdlRGF0YSk7XG5cbiAgICAgICAgLy8g6Z2e5YiG5Lqr55WM6Z2i5LiL5bCG6aG16Z2i5pWw5o2u5YaZ5YWl5a2Y5YKoXG4gICAgICAgIGlmICghb3B0aW9uLnNoYXJlKSAkZmlsZS53cml0ZUpzb24oYHBhZ2UvJHtmb2xkZXJ9YCwgYCR7b3B0aW9uLmFpbX1gLCBkYXRhKTtcblxuICAgICAgICAvLyDlpoLmnpzpnIDopoHmiafooYzpooTliqDovb3vvIzliJnmiafooYxcbiAgICAgICAgaWYgKHByZWxvYWQpIHtcbiAgICAgICAgICBwcmVHZXRQYWdlKGN0eC5kYXRhLnBhZ2UpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAke29wdGlvbi5haW1955WM6Z2i6aKE5Yqg6L295a6M5oiQYCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDlvLnlh7rpgJrnn6VcbiAgICAgICAgcG9wTm90aWNlKG9wdGlvbi5haW0pO1xuXG4gICAgICAgIC8vIOiwg+ivlVxuICAgICAgICBjb25zb2xlLmluZm8oYCR7b3B0aW9uLmFpbX1vbkxvYWTmiJDlip9gKTtcbiAgICAgICAgd3gucmVwb3J0TW9uaXRvcignMCcsIDEpO1xuICAgICAgfSwgcmVzID0+IHtcbiAgICAgICAgLy8g6K6+572uZXJyb3LpobXpnaLlubblvLnlh7rpgJrnn6VcbiAgICAgICAgc2V0UGFnZSh7IG9wdGlvbiwgY3R4IH0sIFt7IHRhZzogJ2Vycm9yJywgc3RhdHVzQmFySGVpZ2h0OiBnbG9iYWxEYXRhLmluZm8uc3RhdHVzQmFySGVpZ2h0IH1dKTtcbiAgICAgICAgcG9wTm90aWNlKG9wdGlvbi5haW0pO1xuXG4gICAgICAgIC8vIOiwg+ivlVxuICAgICAgICBjb25zb2xlLndhcm4oYCR7b3B0aW9uLmFpbX1vbkxvYWTlpLHotKXvvIzplJnor6/kuLpgLCByZXMpO1xuICAgICAgICBsb2dnZXIud2FybihgJHtvcHRpb24uYWltfW9uTG9hZOWksei0pe+8jOmUmeivr+S4umAsIHJlcyk7XG4gICAgICAgIHd4LnJlcG9ydE1vbml0b3IoJzEzJywgMSk7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIC8vIOiuvue9rmVycm9y55WM6Z2iXG4gICAgICAgIHNldFBhZ2UoeyBvcHRpb24sIGN0eCB9LCBbeyB0YWc6ICdlcnJvcicsIHN0YXR1c0JhckhlaWdodDogZ2xvYmFsRGF0YS5pbmZvLnN0YXR1c0JhckhlaWdodCB9XSk7XG5cbiAgICAgICAgLy8g6LCD6K+VXG4gICAgICAgIGNvbnNvbGUud2FybihgJHtvcHRpb24uYWltfei1hOa6kOmUmeivr2ApO1xuICAgICAgICB3eC5yZXBvcnRNb25pdG9yKCcxMicsIDEpO1xuICAgICAgICBjb25zb2xlLmluZm8oYCR7b3B0aW9uLmFpbX1vbkxvYWTmiJDlip9gKTtcbiAgICAgICAgd3gucmVwb3J0TW9uaXRvcignMCcsIDEpO1xuICAgICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogKirnroDku4s6KipcbiAqXG4gKiAtIOaPj+i/sO+8muiuvue9ruiDtuWbiuS4juiDjOaZr+minOiJslxuICpcbiAqIC0g55So5rOV77ya5Zyo6aG16Z2ib25TaG935pe26LCD55So77yMXG4gKlxuICogLSDmgKfotKjvvJrlkIzmraXlh73mlbBcbiAqXG4gKiBAcGFyYW0gZ3JleSDpobXpnaLmmK/lkKbkuLrngbDoibLog4zmma9cbiAqL1xuY29uc3QgY29sb3IgPSAoZ3JleTogYm9vbGVhbikgPT4ge1xuICBjb25zdCBbZnJvbnRDb2xvciwgYmFja2dyb3VuZENvbG9yXSA9IGdsb2JhbERhdGEubm0gPyBbJyNmZmZmZmYnLCAnIzAwMDAwMCddIDogWycjMDAwMDAwJywgJyNmZmZmZmYnXTtcbiAgbGV0IHRlbXA7XG5cbiAgaWYgKGdsb2JhbERhdGEubm0gJiYgZ3JleSlcbiAgICBzd2l0Y2ggKGdsb2JhbERhdGEuVCkge1xuICAgICAgY2FzZSAnQW5kcmlvZCc6IHRlbXAgPSBbJyMxMDExMGInLCAnIzEwMTEwYicsICcjMTAxMTBiJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaU9TJzogdGVtcCA9IFsnIzEwMTEwYicsICcjMGEwYTA4JywgJyMxMDExMGInXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdORU5VJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRlbXAgPSBbJyMwNzA3MDcnLCAnIzA3MDcwNycsICcjMDcwNzA3J107XG4gICAgfVxuICBlbHNlIGlmIChnbG9iYWxEYXRhLm5tICYmICFncmV5KVxuICAgIHN3aXRjaCAoZ2xvYmFsRGF0YS5UKSB7XG4gICAgICBjYXNlICdpT1MnOiB0ZW1wID0gWycjMDAwMDAwJywgJyMwYTBhMDgnLCAnIzAwMDAwMCddO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0FuZHJpb2QnOlxuICAgICAgY2FzZSAnTkVOVSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0ZW1wID0gWycjMDAwMDAwJywgJyMwMDAwMDAnLCAnIzAwMDAwMCddO1xuICAgIH1cbiAgZWxzZSBpZiAoIWdsb2JhbERhdGEubm0gJiYgZ3JleSlcbiAgICBzd2l0Y2ggKGdsb2JhbERhdGEuVCkge1xuICAgICAgY2FzZSAnQW5kcmlvZCc6IHRlbXAgPSBbJyNmOGY4ZjgnLCAnI2Y4ZjhmOCcsICcjZjhmOGY4J107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTkVOVSc6IHRlbXAgPSBbJyNmMGYwZjAnLCAnI2YwZjBmMCcsICcjZjBmMGYwJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaU9TJzpcbiAgICAgIGRlZmF1bHQ6IHRlbXAgPSBbJyNmNGY0ZjQnLCAnI2VmZWVmNCcsICcjZWZlZWY0J107XG4gICAgfVxuICBlbHNlXG4gICAgc3dpdGNoIChnbG9iYWxEYXRhLlQpIHtcbiAgICAgIGNhc2UgJ0FuZHJpb2QnOiB0ZW1wID0gWycjZjhmOGY4JywgJyNmOGY4ZjgnLCAnI2Y4ZjhmOCddO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ05FTlUnOiB0ZW1wID0gWydmZmZmZmYnLCAnZmZmZmZmJywgJ2ZmZmZmZiddO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2lPUyc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0ZW1wID0gWycjZjRmNGY0JywgJ2ZmZmZmZicsICdmZmZmZmYnXTtcbiAgICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYzogeyBmcm9udENvbG9yLCBiYWNrZ3JvdW5kQ29sb3IgfSxcbiAgICBiYzogeyBiYWNrZ3JvdW5kQ29sb3JUb3A6IHRlbXBbMF0sIGJhY2tncm91bmRDb2xvcjogdGVtcFsxXSwgYmFja2dyb3VuZENvbG9yQm90dG9tOiB0ZW1wWzJdIH1cbiAgfTtcbn07XG5cbi8qKlxuICog5Yqg6L295a2X5L2TXG4gKlxuICogQHBhcmFtIHRoZW1lIOS4u+mimFxuICovXG5jb25zdCBsb2FkRm9udCA9ICh0aGVtZTogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKHRoZW1lID09PSAnQW5kcm9pZCcpXG4gICAgICB3eC5sb2FkRm9udEZhY2Uoe1xuICAgICAgICBmYW1pbHk6ICdGWktUSlcnLCBzb3VyY2U6ICd1cmwoXCJodHRwczovL21wLm5lbnV5b3V0aC5jb20vZm9udHMvRlpLVEpXLnR0ZlwiKScsXG4gICAgICAgIGNvbXBsZXRlOiByZXMgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygn5qW35L2T5a2X5L2TJywgcmVzKTsvLyDosIPor5VcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgZWxzZSBpZiAodGhlbWUgPT09ICdORU5VJylcbiAgICAgIHd4LmxvYWRGb250RmFjZSh7XG4gICAgICAgIGZhbWlseTogJ0ZaU1NKVycsIHNvdXJjZTogJ3VybChcImh0dHBzOi8vbXAubmVudXlvdXRoLmNvbS9mb250cy9GWlNTSlcudHRmXCIpJyxcbiAgICAgICAgY29tcGxldGU6IHJlcyA9PiB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCflrovkvZPlrZfkvZMnLCByZXMpOy8vIOiwg+ivlVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBlbHNlIHRocm93IHRoZW1lO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKGBUaGVtZSAke2V9IGNhbm5vdCBiZSBoYW5kbGVkLmApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQsXG4gIHJlc29sdmU6IHJlc29sdmVQYWdlLFxuICBTZXQ6IHNldFBhZ2UsXG4gIE9ubGluZTogc2V0T25saW5lUGFnZSxcbiAgTm90aWNlOiBwb3BOb3RpY2UsXG4gIGNvbG9yLFxuICBsb2FkRm9udFxufTtcbiJdfQ==