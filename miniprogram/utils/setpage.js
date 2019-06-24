"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_1 = require("./file");
var wx_1 = require("./wx");
var logger = wx.getLogManager({ level: 1 });
var globalData = {};
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
    if (page === void 0) { page = null; }
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
    var option = _a.option, ctx = _a.ctx, set = _a.set;
    if (page === void 0) { page = null; }
    if (preload === void 0) { preload = true; }
    if (page)
        ctx.setData({
            T: globalData.T,
            nm: globalData.nm,
            page: set ? page : disposePage(page, option)
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
            page: set ? ctx.data.page : disposePage(ctx.data.page, option)
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
    preGet: preGetPage,
    resolve: resolvePage,
    Set: setPage,
    Online: setOnlinePage,
    Notice: popNotice,
    color: color,
    loadFont: loadFont
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0cGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSwrQkFBMkI7QUFDM0IsMkJBQXVCO0FBR3ZCLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUc5QyxJQUFJLFVBQVUsR0FBUSxFQUFFLENBQUM7QUFPekIsSUFBTSxJQUFJLEdBQUcsVUFBQyxJQUFTO0lBQ3JCLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBU0YsSUFBTSxXQUFXLEdBQUcsVUFBQyxJQUFTLEVBQUUsTUFBVztJQUN6QyxJQUFJLElBQUk7UUFDTixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssTUFBTSxFQUFFO1lBRzFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDMUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFFakIsSUFBSSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUM3QixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzNELElBQUksTUFBTSxJQUFJLE1BQU07b0JBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNyRCxJQUFJLE9BQU8sSUFBSSxNQUFNO29CQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFD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QU0sRUFBRSxhQUFhO0lBQ3JCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLEtBQUssT0FBQTtJQUNMLFFBQVEsVUFBQTtDQUNULENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgd3gqL1xuXG4vLyDlvJXlhaXmlofku7bnrqHnkIZcbmltcG9ydCAkZmlsZSBmcm9tICcuL2ZpbGUnO1xuaW1wb3J0ICRteSBmcm9tICcuL3d4JztcblxuLy8g5aOw5piO5pel5b+X566h55CG5ZmoXG5jb25zdCBsb2dnZXIgPSB3eC5nZXRMb2dNYW5hZ2VyKHsgbGV2ZWw6IDEgfSk7XG5cbi8vIOWjsOaYjuWFqOWxgOaVsOaNrlxubGV0IGdsb2JhbERhdGE6IGFueSA9IHt9O1xuXG4vKipcbiAqIOWcqOiEmuacrOWGheWIneWni+WMluWFqOWxgOaVsOaNrlxuICpcbiAqIEBwYXJhbSBkYXRhIOWFqOWxgOaVsOaNrlxuICovXG5jb25zdCBpbml0ID0gKGRhdGE6IGFueSkgPT4ge1xuICBnbG9iYWxEYXRhID0gZGF0YTtcbn07XG5cbi8qKlxuICog6I635b6X55WM6Z2i5pWw5o2u77yM55Sf5oiQ5q2j56Gu55qE55WM6Z2i5pWw5o2uXG4gKlxuICogQHBhcmFtIHsqfSBwYWdlIOmhtemdouaVsOaNrlxuICogQHBhcmFtIHsqfSBvcHRpb24g6aG16Z2i5Lyg5Y+CXG4gKiBAcmV0dXJucyB7Kn0g5aSE55CG5LmL5ZCO55qEcGFnZVxuICovXG5jb25zdCBkaXNwb3NlUGFnZSA9IChwYWdlOiBhbnksIG9wdGlvbjogYW55KSA9PiB7XG4gIGlmIChwYWdlKSAgLy8g5aaC5p6ccGFnZeWPguaVsOS8oOWFpVxuICAgIGlmIChwYWdlWzBdLnRhZyA9PT0gJ2hlYWQnKSB7XG5cbiAgICAgIC8vIOWvuXBhZ2XkuK1oZWFk5qCH562+5omn6KGM5Yid5aeL5YyWXG4gICAgICBwYWdlWzBdLnN0YXR1c0JhckhlaWdodCA9IGdsb2JhbERhdGEuaW5mby5zdGF0dXNCYXJIZWlnaHQ7XG4gICAgICBwYWdlWzBdLnVybCA9IFtdO1xuXG4gICAgICBpZiAob3B0aW9uICYmICFwYWdlWzBdLmFjdGlvbikge1xuICAgICAgICBwYWdlWzBdLmFpbSA9ICdhaW0nIGluIG9wdGlvbiA/IG9wdGlvbi5haW0gOiBwYWdlWzBdLnRpdGxlOyAvLyDorr7nva7nlYzpnaLlkI3np7BcbiAgICAgICAgaWYgKCdGcm9tJyBpbiBvcHRpb24pIHBhZ2VbMF0ubGVmdFRleHQgPSBvcHRpb24uRnJvbTsgLy8g6K6+572u6aG16Z2i5p2l5rqQXG4gICAgICAgIGlmICgnZGVwdGgnIGluIG9wdGlvbikgcGFnZVswXS5haW1EZXB0aCA9IE51bWJlcihvcHRpb24uZGVwdGgpICsgMTsgLy8g6K6+572u55WM6Z2i6Lev5b6E5rex5bqmXG5cbiAgICAgICAgLy8g5Yik5pat5piv5ZCm5p2l6Ieq5YiG5Lqr77yM5YiG5Lqr6aG15bem5LiK6KeS5Yqo5L2c6buY6K6k5Li66YeN5a6a5ZCRXG4gICAgICAgIGlmICgnc2hhcmUnIGluIG9wdGlvbikge1xuICAgICAgICAgIHBhZ2VbMF0uYWN0aW9uID0gJ3JlZGlyZWN0JztcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ3JlZGlyZWN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDmt7vliqDov5Tlm57mloflrZdcbiAgICAgICAgaWYgKCFwYWdlWzBdLmxlZnRUZXh0KSBwYWdlWzBdLmxlZnRUZXh0ID0gJ+i/lOWbnic7XG4gICAgICB9XG4gICAgICBwYWdlLmZvckVhY2goKGVsZW1lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBlbGVtZW50LmlkID0gaW5kZXg7IC8vIOWvuXBhZ2Xmr4/pobnlhYPntKDmt7vliqBpZFxuXG4gICAgICAgIC8vIOWkhOeQhuWbvueJh1xuICAgICAgICBpZiAoZWxlbWVudC5zcmMpIHtcbiAgICAgICAgICBpZiAoZWxlbWVudC5yZXMpIHBhZ2VbMF0udXJsLnB1c2goZWxlbWVudC5yZXMpO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFnZVswXS51cmwucHVzaChlbGVtZW50LnNyYyk7XG4gICAgICAgICAgICBlbGVtZW50LnJlcyA9IGVsZW1lbnQuc3JjO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWVsZW1lbnQuaW1nTW9kZSkgZWxlbWVudC5pbWdNb2RlID0gJ3dpZHRoRml4JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWkhOeQhuaWh+aho1xuICAgICAgICBpZiAoZWxlbWVudC5kb2NOYW1lKSB7XG4gICAgICAgICAgY29uc3QgeyAxOiB0ZW1wIH0gPSBlbGVtZW50LmRvY05hbWUuc3BsaXQoJy4nKTtcblxuICAgICAgICAgIGVsZW1lbnQuZG9jTmFtZSA9IGVsZW1lbnQuZG9jTmFtZS5zcGxpdCgnLicpWzBdO1xuICAgICAgICAgIGVsZW1lbnQuZG9jVHlwZSA9IHRlbXAgPT09ICdkb2N4JyB8fCB0ZW1wID09PSAnZG9jJ1xuICAgICAgICAgICAgPyAnZG9jJ1xuICAgICAgICAgICAgOiB0ZW1wID09PSAncHB0eCcgfHwgdGVtcCA9PT0gJ3BwdCdcbiAgICAgICAgICAgICAgPyAncHB0J1xuICAgICAgICAgICAgICA6IHRlbXAgPT09ICd4bHN4JyB8fCB0ZW1wID09PSAneGxzJ1xuICAgICAgICAgICAgICAgID8gJ3hscydcbiAgICAgICAgICAgICAgICA6IHRlbXAgPT09ICdqcGcnIHx8IHRlbXAgPT09ICdqcGVnJ1xuICAgICAgICAgICAgICAgICAgPyAnanBnJ1xuICAgICAgICAgICAgICAgICAgOiB0ZW1wID09PSAnbXA0JyB8fCB0ZW1wID09PSAnbW92JyB8fCB0ZW1wID09PSAnYXZpJyB8fCB0ZW1wID09PSAncm12YidcbiAgICAgICAgICAgICAgICAgICAgPyAndmlkZW8nXG4gICAgICAgICAgICAgICAgICAgIDogdGVtcCA9PT0gJ3BkZidcbiAgICAgICAgICAgICAgICAgICAgICA/ICdwZGYnXG4gICAgICAgICAgICAgICAgICAgICAgOiB0ZW1wID09PSAncG5nJyB8fCB0ZW1wID09PSAnZ2lmJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyB0ZW1wXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdkb2N1bWVudCc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDorr7nva5saXN057uE5Lu2XG4gICAgICAgIGlmICgnY29udGVudCcgaW4gZWxlbWVudCkgZWxlbWVudC5jb250ZW50LmZvckVhY2goKGxpc3RFbGVtZW50OiBhbnksIGxpc3RJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgbGlzdEVsZW1lbnQuaWQgPSBgJHtpbmRleH0tJHtsaXN0SW5kZXh9YDsgLy8g5YiX6KGo5q+P6aG55re75YqgaWRcblxuICAgICAgICAgIC8vIOiuvue9ruWIl+ihqOWvvOiIqlxuICAgICAgICAgIGlmICgndXJsJyBpbiBsaXN0RWxlbWVudCkgbGlzdEVsZW1lbnQudXJsICs9IGA/RnJvbT0ke3BhZ2VbMF0udGl0bGV9YDtcbiAgICAgICAgICBpZiAoJ2FpbScgaW4gbGlzdEVsZW1lbnQpXG4gICAgICAgICAgICBsaXN0RWxlbWVudC51cmwgPVxuICAgICAgICAgICAgICBgbW9kdWxlJHtwYWdlWzBdLmFpbURlcHRofT9Gcm9tPSR7cGFnZVswXS50aXRsZX0mYWltPSR7bGlzdEVsZW1lbnQuYWltfSZkZXB0aD0ke3BhZ2VbMF0uYWltRGVwdGh9YDtcblxuICAgICAgICAgIC8vIOiuvue9ruWIl+ihqOW8gOWFs+S4jua7keWdl1xuICAgICAgICAgIGlmICgnc3dpS2V5JyBpbiBsaXN0RWxlbWVudCkgbGlzdEVsZW1lbnQuc3RhdHVzID0gd3guZ2V0U3RvcmFnZVN5bmMobGlzdEVsZW1lbnQuc3dpS2V5KTtcbiAgICAgICAgICBpZiAoJ3NsaUtleScgaW4gbGlzdEVsZW1lbnQpIGxpc3RFbGVtZW50LnZhbHVlID0gd3guZ2V0U3RvcmFnZVN5bmMobGlzdEVsZW1lbnQuc2xpS2V5KTtcblxuICAgICAgICAgIC8vIOiuvue9ruWIl+ihqOmAieaLqeWZqFxuICAgICAgICAgIGlmICgncGlja2VyVmFsdWUnIGluIGxpc3RFbGVtZW50KVxuICAgICAgICAgICAgaWYgKGxpc3RFbGVtZW50LnNpbmdsZSkgeyAvLyDljZXliJfpgInmi6nlmahcbiAgICAgICAgICAgICAgY29uc3QgcGlja2VyVmFsdWUgPSB3eC5nZXRTdG9yYWdlU3luYyhsaXN0RWxlbWVudC5rZXkpO1xuXG4gICAgICAgICAgICAgIGxpc3RFbGVtZW50LnZhbHVlID0gbGlzdEVsZW1lbnQucGlja2VyVmFsdWVbcGlja2VyVmFsdWVdO1xuICAgICAgICAgICAgICBsaXN0RWxlbWVudC5jdXJyZW50VmFsdWUgPSBbcGlja2VyVmFsdWVdO1xuICAgICAgICAgICAgfSBlbHNlIHsgLy8g5aSa5YiX6YCJ5oup5ZmoXG4gICAgICAgICAgICAgIGNvbnN0IHBpY2tlclZhbHVlcyA9IHd4LmdldFN0b3JhZ2VTeW5jKGxpc3RFbGVtZW50LmtleSkuc3BsaXQoJy0nKTtcblxuICAgICAgICAgICAgICBsaXN0RWxlbWVudC5jdXJyZW50VmFsdWUgPSBbXTtcbiAgICAgICAgICAgICAgbGlzdEVsZW1lbnQudmFsdWUgPSBbXTtcbiAgICAgICAgICAgICAgcGlja2VyVmFsdWVzLmZvckVhY2goKGs6IHN0cmluZywgbDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGlzdEVsZW1lbnQudmFsdWVbbF0gPSBsaXN0RWxlbWVudC5waWNrZXJWYWx1ZVtsXVtOdW1iZXIoayldO1xuICAgICAgICAgICAgICAgIGxpc3RFbGVtZW50LmN1cnJlbnRWYWx1ZVtsXSA9IE51bWJlcihrKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIC8vIOiwg+ivlVxuICAgICAgY29uc29sZS5pbmZvKGAke3BhZ2VbMF0uYWltfeWkhOeQhuWujOavlWApO1xuXG4gICAgICAvLyDosIPor5XvvJrmnKrmib7liLBoZWFkIHRhZ1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ05vIGhlYWQgdGFnIGluIHBhZ2UhJyk7XG4gICAgICBsb2dnZXIud2FybignTm8gaGVhZCB0YWcnKTtcbiAgICAgIHd4LnJlcG9ydE1vbml0b3IoJzE0JywgMSk7XG4gICAgfVxuICAvLyDosIPor5XvvJrmnKrkvKDlhaVwYWdlXG4gIGVsc2Uge1xuICAgIGNvbnNvbGUud2FybignTm8gcGFnZURhdGEhJyk7XG4gICAgd3gucmVwb3J0TW9uaXRvcignMTUnLCAxKTtcbiAgfVxuXG4gIHJldHVybiBwYWdlOyAvLyDov5Tlm57lpITnkIblkI7nmoRwYWdlXG59O1xuXG4vKipcbiAqIOiOt+WPluaWh+S7tuWkueS4jui3r+W+hOWQjeensFxuICpcbiAqIEBwYXJhbSBhaW0g6aG16Z2i5ZCN56ewXG4gKi9cbmNvbnN0IHJlc29sdmVBaW0gPSAoYWltOiBzdHJpbmcpID0+IHtcbiAgbGV0IHsgbGVuZ3RoIH0gPSBhaW07XG5cbiAgd2hpbGUgKCFpc05hTihOdW1iZXIoYWltLmNoYXJBdChsZW5ndGgpKSkpIGxlbmd0aC0tO1xuICBjb25zdCBmb2xkZXIgPSBhaW0uc3Vic3RyaW5nKDAsIGxlbmd0aCArIDEpO1xuXG4gIHJldHVybiB7IGZvbGRlciwgcGF0aDogYCR7Zm9sZGVyfS8ke2FpbX1gIH07XG59O1xuXG4vKipcbiAqIOaPkOWJjeiOt+W+l+WtkOeVjOmdouOAguWcqOeVjOmdouWKoOi9veWujOavleaXtu+8jOajgOafpeeVjOmdouWMheWQq+eahOaJgOaciemTvuaOpeaYr+WQpuW3suWtmOWcqOacrOWcsGpzb27vvIzlpoLmnpzmsqHmnInnq4vljbPojrflj5blubblpITnkIblkI7lhpnlhaXlrZjlgqhcbiAqXG4gKiBAcGFyYW0gcGFnZSDpobXpnaLmlbDmja5cbiAqL1xuY29uc3QgcHJlR2V0UGFnZSA9IChwYWdlOiBhbnkpID0+IHtcbiAgaWYgKHBhZ2UpIHBhZ2UuZm9yRWFjaCgoY29tcG9uZW50OiBhbnkpID0+IHtcbiAgICBpZiAoJ2NvbnRlbnQnIGluIGNvbXBvbmVudCkgLy8g6K+l57uE5Lu25piv5YiX6KGo77yM6ZyA6KaB6aKE5Yqg6L2955WM6Z2i77yM5o+Q5YmN6I635Y+W55WM6Z2i5Yiw5a2Y5YKoXG4gICAgICBjb21wb25lbnQuY29udGVudC5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCdhaW0nIGluIGVsZW1lbnQpIHtcbiAgICAgICAgICBjb25zdCB7IHBhdGggfSA9IHJlc29sdmVBaW0oZWxlbWVudC5haW0pO1xuXG4gICAgICAgICAgJGZpbGUuZ2V0SnNvbihgcGFnZS8ke3BhdGh9YCwgKCkgPT4gbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9KTtcbiAgd3gucmVwb3J0TW9uaXRvcignMScsIDEpOyAvLyDnu5/orqHmiqXlkYpcbn07XG5cbi8qKlxuICog6K6+572u55WM6Z2i77yM5Zyob25OYXZpZ2F0ZeaXtuiwg+eUqO+8jOmihOWkhOeQhnBhZ2XmlbDmja7lhpnlhaXlhajlsYDmlbDmja5cbiAqXG4gKiBAcGFyYW0gb3B0aW9uIOmhtemdouS8oOWPglxuICogQHBhcmFtIHBhZ2UgcGFnZeaVsOe7hFxuICovXG5jb25zdCByZXNvbHZlUGFnZSA9IChvcHRpb246IGFueSwgcGFnZSA9IG51bGwpID0+IHtcbiAgY29uc29sZS5pbmZvKCflsIbopoHot7PovazvvJonLCBvcHRpb24pOyAvLyDmjqfliLblj7DovpPlh7rlj4LmlbBcbiAgY29uc3QgeyBhaW0gfSA9IG9wdGlvbi5xdWVyeTtcblxuICBpZiAocGFnZSkgZ2xvYmFsRGF0YS5wYWdlLmRhdGEgPSBkaXNwb3NlUGFnZShwYWdlLCBvcHRpb24ucXVlcnkpO1xuICBlbHNlIHtcbiAgICBjb25zdCB7IHBhdGggfSA9IHJlc29sdmVBaW0oYWltKTtcblxuICAgICRmaWxlLmdldEpzb24oYHBhZ2UvJHtwYXRofWAsIHBhZ2VEYXRhID0+IHtcbiAgICAgIGlmIChwYWdlRGF0YSkgZ2xvYmFsRGF0YS5wYWdlLmRhdGEgPSBkaXNwb3NlUGFnZShwYWdlRGF0YSwgb3B0aW9uLnF1ZXJ5KTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBnbG9iYWxEYXRhLnBhZ2UuZGF0YSA9IGRpc3Bvc2VQYWdlKFxuICAgICAgICAgIFt7IHRhZzogJ2Vycm9yJywgc3RhdHVzQmFySGVpZ2h0OiBnbG9iYWxEYXRhLmluZm8uc3RhdHVzQmFySGVpZ2h0IH1dLFxuICAgICAgICAgIG9wdGlvbi5xdWVyeVxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLndhcm4oYCR7YWltfei9veWFpeWksei0pWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8vIOiuvue9rmFpbeWAvFxuICBnbG9iYWxEYXRhLnBhZ2UuYWltID0gYWltO1xuXG4gIHJldHVybiBnbG9iYWxEYXRhLnBhZ2UuZGF0YTtcbn07XG5cbmludGVyZmFjZSBTZXRQYWdlT3B0aW9uIHtcbiAgb3B0aW9uOiBhbnk7XG4gIGN0eDogYW55O1xuICBzZXQ/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIOiuvue9ruacrOWcsOeVjOmdouaVsOaNru+8jOWcqOeVjOmdom9uTG9hZOaXtuS9v+eUqFxuICpcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uIOmhtemdouS8oOWPglxuICogQHBhcmFtIHsqfSBbcGFnZV0gcGFnZeaVsOe7hFxuICogQHBhcmFtIHtib29sZWFufSBbcHJlbG9hZD10cnVlXSBwYWdl5pWw57uEXG4gKi9cbmNvbnN0IHNldFBhZ2UgPSAoeyBvcHRpb24sIGN0eCwgc2V0IH06IFNldFBhZ2VPcHRpb24sIHBhZ2U6IGFueSA9IG51bGwsIHByZWxvYWQgPSB0cnVlKSA9PiB7XG4gIC8vIOiuvue9rumhtemdouaVsOaNrlxuICBpZiAocGFnZSlcbiAgICBjdHguc2V0RGF0YSh7XG4gICAgICBUOiBnbG9iYWxEYXRhLlQsXG4gICAgICBubTogZ2xvYmFsRGF0YS5ubSxcbiAgICAgIHBhZ2U6IHNldCA/IHBhZ2UgOiBkaXNwb3NlUGFnZShwYWdlLCBvcHRpb24pXG4gICAgfSk7XG4gIC8vIOmhtemdouW3sue7j+mihOWkhOeQhuWujOavle+8jOeri+WNs+WGmeWFpXBhZ2XkuaborrDlubbmiafooYzmnKznlYzpnaLnmoTpooTliqDovb1cbiAgZWxzZSBpZiAoZ2xvYmFsRGF0YS5wYWdlLmFpbSA9PT0gb3B0aW9uLmFpbSkge1xuICAgIGNvbnNvbGUubG9nKGAke29wdGlvbi5haW195bey5aSE55CGYCk7XG4gICAgY3R4LnNldERhdGEoeyBUOiBnbG9iYWxEYXRhLlQsIG5tOiBnbG9iYWxEYXRhLm5tLCBwYWdlOiBnbG9iYWxEYXRhLnBhZ2UuZGF0YSB9LCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgJHtvcHRpb24uYWltfeW3suWGmeWFpWApO1xuICAgICAgaWYgKHByZWxvYWQpIHtcbiAgICAgICAgcHJlR2V0UGFnZShjdHguZGF0YS5wYWdlKTtcbiAgICAgICAgY29uc29sZS5sb2coYCR7b3B0aW9uLmFpbX3pooTliqDovb3lrZDpobXpnaLlrozmiJBgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhgJHtvcHRpb24uYWltfeacquWkhOeQhmApO1xuICAgIC8vIOiuvue9rumhtemdouaVsOaNrlxuICAgIGN0eC5zZXREYXRhKHtcbiAgICAgIFQ6IGdsb2JhbERhdGEuVCxcbiAgICAgIG5tOiBnbG9iYWxEYXRhLm5tLFxuICAgICAgcGFnZTogc2V0ID8gY3R4LmRhdGEucGFnZSA6IGRpc3Bvc2VQYWdlKGN0eC5kYXRhLnBhZ2UsIG9wdGlvbilcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiDlvLnlh7rpgJrnn6XvvIzlnKhvbkxvYWTml7booqvosIPnlKhcbiAqXG4gKiBAcGFyYW0gYWltIOW9k+WJjeeVjOmdoueahGFpbeWAvFxuICovXG5jb25zdCBwb3BOb3RpY2UgPSAoYWltOiBzdHJpbmcpID0+IHtcbiAgaWYgKHd4LmdldFN0b3JhZ2VTeW5jKGAke2FpbX1Ob3RpZnlgKSkgeyAvLyDliKTmlq3mmK/lkKbpnIDopoHlvLnnqpdcblxuICAgIC8vIOS7juWtmOWCqOS4reiOt+WPlumAmuefpeWGheWuueW5tuWxleekulxuICAgIGNvbnN0IG5vdGljZSA9IHd4LmdldFN0b3JhZ2VTeW5jKGAke2FpbX1ub3RpY2VgKTtcblxuICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogbm90aWNlWzBdLCBjb250ZW50OiBub3RpY2VbMV0sIHNob3dDYW5jZWw6IGZhbHNlLFxuXG4gICAgICAvLyDpmLLmraLkuozmrKHlvLnnqpdcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgd3gucmVtb3ZlU3RvcmFnZVN5bmMoYCR7YWltfU5vdGlmeWApO1xuICAgICAgfVxuXG4gICAgfSk7XG4gICAgY29uc29sZS5pbmZvKCflvLnlh7rpgJrnn6UnKTsvLyDosIPor5VcbiAgfVxuICB3eC5yZXBvcnRBbmFseXRpY3MoJ3BhZ2VfYWltX2NvdW50JywgeyBhaW0gfSk7Ly8gQWlt57uf6K6h5YiG5p6QXG59O1xuXG4vKipcbiAqIOiuvue9ruWcqOe6v+eVjOmdouaVsOaNru+8jOWcqOeVjOmdouWIneWni+WMluS5i+WQjuS9v+eUqFxuICpcbiAqIEBwYXJhbSBvcHRpb24g6aG16Z2i5Lyg5Y+CXG4gKiBAcGFyYW0gY3R4IOmhtemdouaMh+mSiFxuICogQHBhcmFtIHByZWxvYWQg5piv5ZCm6ZyA6KaB6aKE5Yqg6L29KOm7mOiupOmcgOimgSlcbiAqL1xuY29uc3Qgc2V0T25saW5lUGFnZSA9IChvcHRpb246IGFueSwgY3R4OiBhbnksIHByZWxvYWQgPSB0cnVlKSA9PiB7XG5cbiAgLy8g6aG16Z2i5bey57uP6aKE5aSE55CG5a6M5q+V77yM56uL5Y2z5YaZ5YWlcGFnZeS5puiusOW5tuaJp+ihjOacrOeVjOmdoueahOmihOWKoOi9vVxuICBpZiAoZ2xvYmFsRGF0YS5wYWdlLmFpbSA9PT0gb3B0aW9uLmFpbSkge1xuICAgIGNvbnNvbGUubG9nKGAke29wdGlvbi5haW195bey5aSE55CGYCk7XG4gICAgY3R4LnNldERhdGEoeyBUOiBnbG9iYWxEYXRhLlQsIG5tOiBnbG9iYWxEYXRhLm5tLCBwYWdlOiBnbG9iYWxEYXRhLnBhZ2UuZGF0YSB9LCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgJHtvcHRpb24uYWltfeW3suWGmeWFpWApO1xuICAgICAgaWYgKHByZWxvYWQpIHtcbiAgICAgICAgcHJlR2V0UGFnZShjdHguZGF0YS5wYWdlKTtcbiAgICAgICAgY29uc29sZS5sb2coYCR7b3B0aW9uLmFpbX3pooTliqDovb3lrZDpobXpnaLlrozmiJBgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIOmcgOimgemHjeaWsOi9veWFpeeVjOmdolxuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuaW5mbyhgJHtvcHRpb24uYWltfW9uTG9hZOW8gOWni++8jOWPguaVsOS4uu+8mmAsIG9wdGlvbik7XG4gICAgY29uc3QgeyBmb2xkZXIsIHBhdGggfSA9IHJlc29sdmVBaW0ob3B0aW9uLmFpbSk7XG5cbiAgICBjdHguYWltID0gb3B0aW9uLmFpbTtcblxuICAgIGNvbnN0IHBhZ2UgPSAkZmlsZS5yZWFkSnNvbihgcGFnZS8ke3BhdGh9YCk7XG5cbiAgICAvLyDlpoLmnpzmnKzlnLDlrZjlgqjkuK3lkKvmnIlwYWdl55u05o6l5aSE55CGXG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHNldFBhZ2UoeyBvcHRpb24sIGN0eCB9LCBwYWdlKTtcbiAgICAgIHBvcE5vdGljZShvcHRpb24uYWltKTtcbiAgICAgIGNvbnNvbGUuaW5mbyhgJHtvcHRpb24uYWltfW9uTG9hZOaIkOWKn++8mmAsIGN0eC5kYXRhKTtcbiAgICAgIHd4LnJlcG9ydE1vbml0b3IoJzAnLCAxKTtcblxuICAgICAgLy8g5aaC5p6c6ZyA6KaB5omn6KGM6aKE5Yqg6L2977yM5YiZ5omn6KGMXG4gICAgICBpZiAocHJlbG9hZCkge1xuICAgICAgICBwcmVHZXRQYWdlKGN0eC5kYXRhLnBhZ2UpO1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtvcHRpb24uYWltfeeVjOmdoumihOWKoOi9veWujOaIkGApO1xuICAgICAgfVxuICAgIH0gZWxzZVxuICAgICAgLy8g6K+35rGC6aG16Z2iSnNvblxuICAgICAgJG15LnJlcXVlc3QoYHBhZ2UvJHtwYXRofWAsIGRhdGEgPT4ge1xuICAgICAgICAvLyDorr7nva7nlYzpnaJcbiAgICAgICAgc2V0UGFnZSh7IG9wdGlvbiwgY3R4IH0sIGRhdGEpO1xuXG4gICAgICAgIC8vIOmdnuWIhuS6q+eVjOmdouS4i+WwhumhtemdouaVsOaNruWGmeWFpeWtmOWCqFxuICAgICAgICBpZiAoIW9wdGlvbi5zaGFyZSkgJGZpbGUud3JpdGVKc29uKGBwYWdlLyR7Zm9sZGVyfWAsIGAke29wdGlvbi5haW19YCwgZGF0YSk7XG5cbiAgICAgICAgLy8g5aaC5p6c6ZyA6KaB5omn6KGM6aKE5Yqg6L2977yM5YiZ5omn6KGMXG4gICAgICAgIGlmIChwcmVsb2FkKSB7XG4gICAgICAgICAgcHJlR2V0UGFnZShjdHguZGF0YS5wYWdlKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtvcHRpb24uYWltfeeVjOmdoumihOWKoOi9veWujOaIkGApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5by55Ye66YCa55+lXG4gICAgICAgIHBvcE5vdGljZShvcHRpb24uYWltKTtcblxuICAgICAgICAvLyDosIPor5VcbiAgICAgICAgY29uc29sZS5pbmZvKGAke29wdGlvbi5haW19b25Mb2Fk5oiQ5YqfYCk7XG4gICAgICAgIHd4LnJlcG9ydE1vbml0b3IoJzAnLCAxKTtcbiAgICAgIH0sIHJlcyA9PiB7XG4gICAgICAgIC8vIOiuvue9rmVycm9y6aG16Z2i5bm25by55Ye66YCa55+lXG4gICAgICAgIHNldFBhZ2UoeyBvcHRpb24sIGN0eCB9LCBbeyB0YWc6ICdlcnJvcicsIHN0YXR1c0JhckhlaWdodDogZ2xvYmFsRGF0YS5pbmZvLnN0YXR1c0JhckhlaWdodCB9XSk7XG4gICAgICAgIHBvcE5vdGljZShvcHRpb24uYWltKTtcblxuICAgICAgICAvLyDosIPor5VcbiAgICAgICAgY29uc29sZS53YXJuKGAke29wdGlvbi5haW19b25Mb2Fk5aSx6LSl77yM6ZSZ6K+v5Li6YCwgcmVzKTtcbiAgICAgICAgbG9nZ2VyLndhcm4oYCR7b3B0aW9uLmFpbX1vbkxvYWTlpLHotKXvvIzplJnor6/kuLpgLCByZXMpO1xuICAgICAgICB3eC5yZXBvcnRNb25pdG9yKCcxMycsIDEpO1xuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAvLyDorr7nva5lcnJvcueVjOmdolxuICAgICAgICBzZXRQYWdlKHsgb3B0aW9uLCBjdHggfSwgW3sgdGFnOiAnZXJyb3InLCBzdGF0dXNCYXJIZWlnaHQ6IGdsb2JhbERhdGEuaW5mby5zdGF0dXNCYXJIZWlnaHQgfV0pO1xuXG4gICAgICAgIC8vIOiwg+ivlVxuICAgICAgICBjb25zb2xlLndhcm4oYCR7b3B0aW9uLmFpbX3otYTmupDplJnor69gKTtcbiAgICAgICAgd3gucmVwb3J0TW9uaXRvcignMTInLCAxKTtcbiAgICAgICAgY29uc29sZS5pbmZvKGAke29wdGlvbi5haW19b25Mb2Fk5oiQ5YqfYCk7XG4gICAgICAgIHd4LnJlcG9ydE1vbml0b3IoJzAnLCAxKTtcbiAgICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIOiuvue9ruiDtuWbiuS4juiDjOaZr+minOiJslxuICpcbiAqIEBwYXJhbSBncmV5IOmhtemdouaYr+WQpuS4uueBsOiJsuiDjOaZr1xuICovXG5jb25zdCBjb2xvciA9IChncmV5OiBib29sZWFuKSA9PiB7XG4gIGNvbnN0IFtmcm9udENvbG9yLCBiYWNrZ3JvdW5kQ29sb3JdID0gZ2xvYmFsRGF0YS5ubSA/IFsnI2ZmZmZmZicsICcjMDAwMDAwJ10gOiBbJyMwMDAwMDAnLCAnI2ZmZmZmZiddO1xuICBsZXQgdGVtcDtcblxuICBpZiAoZ2xvYmFsRGF0YS5ubSAmJiBncmV5KVxuICAgIHN3aXRjaCAoZ2xvYmFsRGF0YS5UKSB7XG4gICAgICBjYXNlICdBbmRyaW9kJzogdGVtcCA9IFsnIzEwMTEwYicsICcjMTAxMTBiJywgJyMxMDExMGInXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpT1MnOiB0ZW1wID0gWycjMTAxMTBiJywgJyMwYTBhMDgnLCAnIzEwMTEwYiddO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ05FTlUnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGVtcCA9IFsnIzA3MDcwNycsICcjMDcwNzA3JywgJyMwNzA3MDcnXTtcbiAgICB9XG4gIGVsc2UgaWYgKGdsb2JhbERhdGEubm0gJiYgIWdyZXkpXG4gICAgc3dpdGNoIChnbG9iYWxEYXRhLlQpIHtcbiAgICAgIGNhc2UgJ2lPUyc6IHRlbXAgPSBbJyMwMDAwMDAnLCAnIzBhMGEwOCcsICcjMDAwMDAwJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQW5kcmlvZCc6XG4gICAgICBjYXNlICdORU5VJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRlbXAgPSBbJyMwMDAwMDAnLCAnIzAwMDAwMCcsICcjMDAwMDAwJ107XG4gICAgfVxuICBlbHNlIGlmICghZ2xvYmFsRGF0YS5ubSAmJiBncmV5KVxuICAgIHN3aXRjaCAoZ2xvYmFsRGF0YS5UKSB7XG4gICAgICBjYXNlICdBbmRyaW9kJzogdGVtcCA9IFsnI2Y4ZjhmOCcsICcjZjhmOGY4JywgJyNmOGY4ZjgnXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdORU5VJzogdGVtcCA9IFsnI2YwZjBmMCcsICcjZjBmMGYwJywgJyNmMGYwZjAnXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpT1MnOlxuICAgICAgZGVmYXVsdDogdGVtcCA9IFsnI2Y0ZjRmNCcsICcjZWZlZWY0JywgJyNlZmVlZjQnXTtcbiAgICB9XG4gIGVsc2VcbiAgICBzd2l0Y2ggKGdsb2JhbERhdGEuVCkge1xuICAgICAgY2FzZSAnQW5kcmlvZCc6IHRlbXAgPSBbJyNmOGY4ZjgnLCAnI2Y4ZjhmOCcsICcjZjhmOGY4J107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTkVOVSc6IHRlbXAgPSBbJ2ZmZmZmZicsICdmZmZmZmYnLCAnZmZmZmZmJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaU9TJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRlbXAgPSBbJyNmNGY0ZjQnLCAnZmZmZmZmJywgJ2ZmZmZmZiddO1xuICAgIH1cblxuICByZXR1cm4ge1xuICAgIG5jOiB7IGZyb250Q29sb3IsIGJhY2tncm91bmRDb2xvciB9LFxuICAgIGJjOiB7IGJhY2tncm91bmRDb2xvclRvcDogdGVtcFswXSwgYmFja2dyb3VuZENvbG9yOiB0ZW1wWzFdLCBiYWNrZ3JvdW5kQ29sb3JCb3R0b206IHRlbXBbMl0gfVxuICB9O1xufTtcblxuLyoqXG4gKiDliqDovb3lrZfkvZNcbiAqXG4gKiBAcGFyYW0gdGhlbWUg5Li76aKYXG4gKi9cbmNvbnN0IGxvYWRGb250ID0gKHRoZW1lOiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAodGhlbWUgPT09ICdBbmRyb2lkJylcbiAgICAgIHd4LmxvYWRGb250RmFjZSh7XG4gICAgICAgIGZhbWlseTogJ0ZaS1RKVycsIHNvdXJjZTogJ3VybChcImh0dHBzOi8vbXAubmVudXlvdXRoLmNvbS9mb250cy9GWktUSlcudHRmXCIpJyxcbiAgICAgICAgY29tcGxldGU6IHJlcyA9PiB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCfmpbfkvZPlrZfkvZMnLCByZXMpOy8vIOiwg+ivlVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBlbHNlIGlmICh0aGVtZSA9PT0gJ05FTlUnKVxuICAgICAgd3gubG9hZEZvbnRGYWNlKHtcbiAgICAgICAgZmFtaWx5OiAnRlpTU0pXJywgc291cmNlOiAndXJsKFwiaHR0cHM6Ly9tcC5uZW51eW91dGguY29tL2ZvbnRzL0ZaU1NKVy50dGZcIiknLFxuICAgICAgICBjb21wbGV0ZTogcmVzID0+IHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ+Wui+S9k+Wtl+S9kycsIHJlcyk7Ly8g6LCD6K+VXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIGVsc2UgdGhyb3cgdGhlbWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oYFRoZW1lICR7ZX0gY2Fubm90IGJlIGhhbmRsZWQuYCk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdCxcbiAgcHJlR2V0OiBwcmVHZXRQYWdlLFxuICByZXNvbHZlOiByZXNvbHZlUGFnZSxcbiAgU2V0OiBzZXRQYWdlLFxuICBPbmxpbmU6IHNldE9ubGluZVBhZ2UsXG4gIE5vdGljZTogcG9wTm90aWNlLFxuICBjb2xvcixcbiAgbG9hZEZvbnRcbn07XG4iXX0=