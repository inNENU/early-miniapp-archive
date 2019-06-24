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
    return [
        { frontColor: frontColor, backgroundColor: backgroundColor },
        { backgroundColorTop: temp[0], backgroundColor: temp[1], backgroundColorBottom: temp[2] }
    ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0cGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSwrQkFBMkI7QUFDM0IsMkJBQXVCO0FBR3ZCLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUc5QyxJQUFJLFVBQVUsR0FBUSxFQUFFLENBQUM7QUFPekIsSUFBTSxJQUFJLEdBQUcsVUFBQyxJQUFTO0lBQ3JCLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBU0YsSUFBTSxXQUFXLEdBQUcsVUFBQyxJQUFTLEVBQUUsTUFBVztJQUN6QyxJQUFJLElBQUk7UUFDTixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssTUFBTSxFQUFFO1lBRzFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDMUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFFakIsSUFBSSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUM3QixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzNELElBQUksTUFBTSxJQUFJLE1BQU07b0JBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNyRCxJQUFJLE9BQU8sSUFBSSxNQUFNO29CQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFD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QUFNLEVBQUUsU0FBUztJQUNqQixLQUFLLE9BQUE7SUFDTCxRQUFRLFVBQUE7Q0FDVCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHd4Ki9cblxuLy8g5byV5YWl5paH5Lu2566h55CGXG5pbXBvcnQgJGZpbGUgZnJvbSAnLi9maWxlJztcbmltcG9ydCAkd3ggZnJvbSAnLi93eCc7XG5cbi8vIOWjsOaYjuaXpeW/l+euoeeQhuWZqFxuY29uc3QgbG9nZ2VyID0gd3guZ2V0TG9nTWFuYWdlcih7IGxldmVsOiAxIH0pO1xuXG4vLyDlo7DmmI7lhajlsYDmlbDmja5cbmxldCBnbG9iYWxEYXRhOiBhbnkgPSB7fTtcblxuLyoqXG4gKiDlnKjohJrmnKzlhoXliJ3lp4vljJblhajlsYDmlbDmja5cbiAqXG4gKiBAcGFyYW0gZGF0YSDlhajlsYDmlbDmja5cbiAqL1xuY29uc3QgaW5pdCA9IChkYXRhOiBhbnkpID0+IHtcbiAgZ2xvYmFsRGF0YSA9IGRhdGE7XG59O1xuXG4vKipcbiAqIOiOt+W+l+eVjOmdouaVsOaNru+8jOeUn+aIkOato+ehrueahOeVjOmdouaVsOaNrlxuICpcbiAqIEBwYXJhbSB7Kn0gcGFnZSDpobXpnaLmlbDmja5cbiAqIEBwYXJhbSB7Kn0gb3B0aW9uIOmhtemdouS8oOWPglxuICogQHJldHVybnMgeyp9IOWkhOeQhuS5i+WQjueahHBhZ2VcbiAqL1xuY29uc3QgZGlzcG9zZVBhZ2UgPSAocGFnZTogYW55LCBvcHRpb246IGFueSkgPT4ge1xuICBpZiAocGFnZSkgIC8vIOWmguaenHBhZ2Xlj4LmlbDkvKDlhaVcbiAgICBpZiAocGFnZVswXS50YWcgPT09ICdoZWFkJykge1xuXG4gICAgICAvLyDlr7lwYWdl5LitaGVhZOagh+etvuaJp+ihjOWIneWni+WMllxuICAgICAgcGFnZVswXS5zdGF0dXNCYXJIZWlnaHQgPSBnbG9iYWxEYXRhLmluZm8uc3RhdHVzQmFySGVpZ2h0O1xuICAgICAgcGFnZVswXS51cmwgPSBbXTtcblxuICAgICAgaWYgKG9wdGlvbiAmJiAhcGFnZVswXS5hY3Rpb24pIHtcbiAgICAgICAgcGFnZVswXS5haW0gPSAnYWltJyBpbiBvcHRpb24gPyBvcHRpb24uYWltIDogcGFnZVswXS50aXRsZTsgLy8g6K6+572u55WM6Z2i5ZCN56ewXG4gICAgICAgIGlmICgnRnJvbScgaW4gb3B0aW9uKSBwYWdlWzBdLmxlZnRUZXh0ID0gb3B0aW9uLkZyb207IC8vIOiuvue9rumhtemdouadpea6kFxuICAgICAgICBpZiAoJ2RlcHRoJyBpbiBvcHRpb24pIHBhZ2VbMF0uYWltRGVwdGggPSBOdW1iZXIob3B0aW9uLmRlcHRoKSArIDE7IC8vIOiuvue9rueVjOmdoui3r+W+hOa3seW6plxuXG4gICAgICAgIC8vIOWIpOaWreaYr+WQpuadpeiHquWIhuS6q++8jOWIhuS6q+mhteW3puS4iuinkuWKqOS9nOm7mOiupOS4uumHjeWumuWQkVxuICAgICAgICBpZiAoJ3NoYXJlJyBpbiBvcHRpb24pIHtcbiAgICAgICAgICBwYWdlWzBdLmFjdGlvbiA9ICdyZWRpcmVjdCc7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdyZWRpcmVjdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5re75Yqg6L+U5Zue5paH5a2XXG4gICAgICAgIGlmICghcGFnZVswXS5sZWZ0VGV4dCkgcGFnZVswXS5sZWZ0VGV4dCA9ICfov5Tlm54nO1xuICAgICAgfVxuICAgICAgcGFnZS5mb3JFYWNoKChlbGVtZW50OiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgZWxlbWVudC5pZCA9IGluZGV4OyAvLyDlr7lwYWdl5q+P6aG55YWD57Sg5re75YqgaWRcblxuICAgICAgICAvLyDlpITnkIblm77niYdcbiAgICAgICAgaWYgKGVsZW1lbnQuc3JjKSB7XG4gICAgICAgICAgaWYgKGVsZW1lbnQucmVzKSBwYWdlWzBdLnVybC5wdXNoKGVsZW1lbnQucmVzKTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhZ2VbMF0udXJsLnB1c2goZWxlbWVudC5zcmMpO1xuICAgICAgICAgICAgZWxlbWVudC5yZXMgPSBlbGVtZW50LnNyYztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFlbGVtZW50LmltZ01vZGUpIGVsZW1lbnQuaW1nTW9kZSA9ICd3aWR0aEZpeCc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDlpITnkIbmlofmoaNcbiAgICAgICAgaWYgKGVsZW1lbnQuZG9jTmFtZSkge1xuICAgICAgICAgIGNvbnN0IHsgMTogdGVtcCB9ID0gZWxlbWVudC5kb2NOYW1lLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRvY05hbWUgPSBlbGVtZW50LmRvY05hbWUuc3BsaXQoJy4nKVswXTtcbiAgICAgICAgICBlbGVtZW50LmRvY1R5cGUgPSB0ZW1wID09PSAnZG9jeCcgfHwgdGVtcCA9PT0gJ2RvYydcbiAgICAgICAgICAgID8gJ2RvYydcbiAgICAgICAgICAgIDogdGVtcCA9PT0gJ3BwdHgnIHx8IHRlbXAgPT09ICdwcHQnXG4gICAgICAgICAgICAgID8gJ3BwdCdcbiAgICAgICAgICAgICAgOiB0ZW1wID09PSAneGxzeCcgfHwgdGVtcCA9PT0gJ3hscydcbiAgICAgICAgICAgICAgICA/ICd4bHMnXG4gICAgICAgICAgICAgICAgOiB0ZW1wID09PSAnanBnJyB8fCB0ZW1wID09PSAnanBlZydcbiAgICAgICAgICAgICAgICAgID8gJ2pwZydcbiAgICAgICAgICAgICAgICAgIDogdGVtcCA9PT0gJ21wNCcgfHwgdGVtcCA9PT0gJ21vdicgfHwgdGVtcCA9PT0gJ2F2aScgfHwgdGVtcCA9PT0gJ3JtdmInXG4gICAgICAgICAgICAgICAgICAgID8gJ3ZpZGVvJ1xuICAgICAgICAgICAgICAgICAgICA6IHRlbXAgPT09ICdwZGYnXG4gICAgICAgICAgICAgICAgICAgICAgPyAncGRmJ1xuICAgICAgICAgICAgICAgICAgICAgIDogdGVtcCA9PT0gJ3BuZycgfHwgdGVtcCA9PT0gJ2dpZidcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGVtcFxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnZG9jdW1lbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g6K6+572ubGlzdOe7hOS7tlxuICAgICAgICBpZiAoJ2NvbnRlbnQnIGluIGVsZW1lbnQpIGVsZW1lbnQuY29udGVudC5mb3JFYWNoKChsaXN0RWxlbWVudDogYW55LCBsaXN0SW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxpc3RFbGVtZW50LmlkID0gYCR7aW5kZXh9LSR7bGlzdEluZGV4fWA7IC8vIOWIl+ihqOavj+mhuea3u+WKoGlkXG5cbiAgICAgICAgICAvLyDorr7nva7liJfooajlr7zoiKpcbiAgICAgICAgICBpZiAoJ3VybCcgaW4gbGlzdEVsZW1lbnQpIGxpc3RFbGVtZW50LnVybCArPSBgP0Zyb209JHtwYWdlWzBdLnRpdGxlfWA7XG4gICAgICAgICAgaWYgKCdhaW0nIGluIGxpc3RFbGVtZW50KVxuICAgICAgICAgICAgbGlzdEVsZW1lbnQudXJsID1cbiAgICAgICAgICAgICAgYG1vZHVsZSR7cGFnZVswXS5haW1EZXB0aH0/RnJvbT0ke3BhZ2VbMF0udGl0bGV9JmFpbT0ke2xpc3RFbGVtZW50LmFpbX0mZGVwdGg9JHtwYWdlWzBdLmFpbURlcHRofWA7XG5cbiAgICAgICAgICAvLyDorr7nva7liJfooajlvIDlhbPkuI7mu5HlnZdcbiAgICAgICAgICBpZiAoJ3N3aUtleScgaW4gbGlzdEVsZW1lbnQpIGxpc3RFbGVtZW50LnN0YXR1cyA9IHd4LmdldFN0b3JhZ2VTeW5jKGxpc3RFbGVtZW50LnN3aUtleSk7XG4gICAgICAgICAgaWYgKCdzbGlLZXknIGluIGxpc3RFbGVtZW50KSBsaXN0RWxlbWVudC52YWx1ZSA9IHd4LmdldFN0b3JhZ2VTeW5jKGxpc3RFbGVtZW50LnNsaUtleSk7XG5cbiAgICAgICAgICAvLyDorr7nva7liJfooajpgInmi6nlmahcbiAgICAgICAgICBpZiAoJ3BpY2tlclZhbHVlJyBpbiBsaXN0RWxlbWVudClcbiAgICAgICAgICAgIGlmIChsaXN0RWxlbWVudC5zaW5nbGUpIHsgLy8g5Y2V5YiX6YCJ5oup5ZmoXG4gICAgICAgICAgICAgIGNvbnN0IHBpY2tlclZhbHVlID0gd3guZ2V0U3RvcmFnZVN5bmMobGlzdEVsZW1lbnQua2V5KTtcblxuICAgICAgICAgICAgICBsaXN0RWxlbWVudC52YWx1ZSA9IGxpc3RFbGVtZW50LnBpY2tlclZhbHVlW3BpY2tlclZhbHVlXTtcbiAgICAgICAgICAgICAgbGlzdEVsZW1lbnQuY3VycmVudFZhbHVlID0gW3BpY2tlclZhbHVlXTtcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIOWkmuWIl+mAieaLqeWZqFxuICAgICAgICAgICAgICBjb25zdCBwaWNrZXJWYWx1ZXMgPSB3eC5nZXRTdG9yYWdlU3luYyhsaXN0RWxlbWVudC5rZXkpLnNwbGl0KCctJyk7XG5cbiAgICAgICAgICAgICAgbGlzdEVsZW1lbnQuY3VycmVudFZhbHVlID0gW107XG4gICAgICAgICAgICAgIGxpc3RFbGVtZW50LnZhbHVlID0gW107XG4gICAgICAgICAgICAgIHBpY2tlclZhbHVlcy5mb3JFYWNoKChrOiBzdHJpbmcsIGw6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxpc3RFbGVtZW50LnZhbHVlW2xdID0gbGlzdEVsZW1lbnQucGlja2VyVmFsdWVbbF1bTnVtYmVyKGspXTtcbiAgICAgICAgICAgICAgICBsaXN0RWxlbWVudC5jdXJyZW50VmFsdWVbbF0gPSBOdW1iZXIoayk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvLyDosIPor5VcbiAgICAgIGNvbnNvbGUuaW5mbyhgJHtwYWdlWzBdLmFpbX3lpITnkIblrozmr5VgKTtcblxuICAgICAgLy8g6LCD6K+V77ya5pyq5om+5YiwaGVhZCB0YWdcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdObyBoZWFkIHRhZyBpbiBwYWdlIScpO1xuICAgICAgbG9nZ2VyLndhcm4oJ05vIGhlYWQgdGFnJyk7XG4gICAgICB3eC5yZXBvcnRNb25pdG9yKCcxNCcsIDEpO1xuICAgIH1cbiAgLy8g6LCD6K+V77ya5pyq5Lyg5YWlcGFnZVxuICBlbHNlIHtcbiAgICBjb25zb2xlLndhcm4oJ05vIHBhZ2VEYXRhIScpO1xuICAgIHd4LnJlcG9ydE1vbml0b3IoJzE1JywgMSk7XG4gIH1cblxuICByZXR1cm4gcGFnZTsgLy8g6L+U5Zue5aSE55CG5ZCO55qEcGFnZVxufTtcblxuLyoqXG4gKiDojrflj5bmlofku7blpLnkuI7ot6/lvoTlkI3np7BcbiAqXG4gKiBAcGFyYW0gYWltIOmhtemdouWQjeensFxuICovXG5jb25zdCByZXNvbHZlQWltID0gKGFpbTogc3RyaW5nKSA9PiB7XG4gIGxldCB7IGxlbmd0aCB9ID0gYWltO1xuXG4gIHdoaWxlICghaXNOYU4oTnVtYmVyKGFpbS5jaGFyQXQobGVuZ3RoKSkpKSBsZW5ndGgtLTtcbiAgY29uc3QgZm9sZGVyID0gYWltLnN1YnN0cmluZygwLCBsZW5ndGggKyAxKTtcblxuICByZXR1cm4geyBmb2xkZXIsIHBhdGg6IGAke2ZvbGRlcn0vJHthaW19YCB9O1xufTtcblxuLyoqXG4gKiDmj5DliY3ojrflvpflrZDnlYzpnaLjgILlnKjnlYzpnaLliqDovb3lrozmr5Xml7bvvIzmo4Dmn6XnlYzpnaLljIXlkKvnmoTmiYDmnInpk77mjqXmmK/lkKblt7LlrZjlnKjmnKzlnLBqc29u77yM5aaC5p6c5rKh5pyJ56uL5Y2z6I635Y+W5bm25aSE55CG5ZCO5YaZ5YWl5a2Y5YKoXG4gKlxuICogQHBhcmFtIHBhZ2Ug6aG16Z2i5pWw5o2uXG4gKi9cbmNvbnN0IHByZUdldFBhZ2UgPSAocGFnZTogYW55KSA9PiB7XG4gIGlmIChwYWdlKSBwYWdlLmZvckVhY2goKGNvbXBvbmVudDogYW55KSA9PiB7XG4gICAgaWYgKCdjb250ZW50JyBpbiBjb21wb25lbnQpIC8vIOivpee7hOS7tuaYr+WIl+ihqO+8jOmcgOimgemihOWKoOi9veeVjOmdou+8jOaPkOWJjeiOt+WPlueVjOmdouWIsOWtmOWCqFxuICAgICAgY29tcG9uZW50LmNvbnRlbnQuZm9yRWFjaCgoZWxlbWVudDogYW55KSA9PiB7XG4gICAgICAgIGlmICgnYWltJyBpbiBlbGVtZW50KSB7XG4gICAgICAgICAgY29uc3QgeyBwYXRoIH0gPSByZXNvbHZlQWltKGVsZW1lbnQuYWltKTtcblxuICAgICAgICAgICRmaWxlLmdldEpzb24oYHBhZ2UvJHtwYXRofWAsICgpID0+IG51bGwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfSk7XG4gIHd4LnJlcG9ydE1vbml0b3IoJzEnLCAxKTsgLy8g57uf6K6h5oql5ZGKXG59O1xuXG4vKipcbiAqIOiuvue9rueVjOmdou+8jOWcqG9uTmF2aWdhdGXml7bosIPnlKjvvIzpooTlpITnkIZwYWdl5pWw5o2u5YaZ5YWl5YWo5bGA5pWw5o2uXG4gKlxuICogQHBhcmFtIG9wdGlvbiDpobXpnaLkvKDlj4JcbiAqIEBwYXJhbSBwYWdlIHBhZ2XmlbDnu4RcbiAqL1xuY29uc3QgcmVzb2x2ZVBhZ2UgPSAob3B0aW9uOiBhbnksIHBhZ2UgPSBudWxsKSA9PiB7XG4gIGNvbnNvbGUuaW5mbygn5bCG6KaB6Lez6L2s77yaJywgb3B0aW9uKTsgLy8g5o6n5Yi25Y+w6L6T5Ye65Y+C5pWwXG4gIGNvbnN0IHsgYWltIH0gPSBvcHRpb24ucXVlcnk7XG5cbiAgaWYgKHBhZ2UpIGdsb2JhbERhdGEucGFnZS5kYXRhID0gZGlzcG9zZVBhZ2UocGFnZSwgb3B0aW9uLnF1ZXJ5KTtcbiAgZWxzZSB7XG4gICAgY29uc3QgeyBwYXRoIH0gPSByZXNvbHZlQWltKGFpbSk7XG5cbiAgICAkZmlsZS5nZXRKc29uKGBwYWdlLyR7cGF0aH1gLCBwYWdlRGF0YSA9PiB7XG4gICAgICBpZiAocGFnZURhdGEpIGdsb2JhbERhdGEucGFnZS5kYXRhID0gZGlzcG9zZVBhZ2UocGFnZURhdGEsIG9wdGlvbi5xdWVyeSk7XG4gICAgICBlbHNlIHtcbiAgICAgICAgZ2xvYmFsRGF0YS5wYWdlLmRhdGEgPSBkaXNwb3NlUGFnZShcbiAgICAgICAgICBbeyB0YWc6ICdlcnJvcicsIHN0YXR1c0JhckhlaWdodDogZ2xvYmFsRGF0YS5pbmZvLnN0YXR1c0JhckhlaWdodCB9XSxcbiAgICAgICAgICBvcHRpb24ucXVlcnlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS53YXJuKGAke2FpbX3ovb3lhaXlpLHotKVgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvLyDorr7nva5haW3lgLxcbiAgZ2xvYmFsRGF0YS5wYWdlLmFpbSA9IGFpbTtcblxuICByZXR1cm4gZ2xvYmFsRGF0YS5wYWdlLmRhdGE7XG59O1xuXG5pbnRlcmZhY2UgU2V0UGFnZU9wdGlvbiB7XG4gIG9wdGlvbjogYW55O1xuICBjdHg6IGFueTtcbiAgc2V0PzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiDorr7nva7mnKzlnLDnlYzpnaLmlbDmja7vvIzlnKjnlYzpnaJvbkxvYWTml7bkvb/nlKhcbiAqXG4gKiBAcGFyYW0geyp9IG9wdGlvbiDpobXpnaLkvKDlj4JcbiAqIEBwYXJhbSB7Kn0gW3BhZ2VdIHBhZ2XmlbDnu4RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZWxvYWQ9dHJ1ZV0gcGFnZeaVsOe7hFxuICovXG5jb25zdCBzZXRQYWdlID0gKHsgb3B0aW9uLCBjdHgsIHNldCB9OiBTZXRQYWdlT3B0aW9uLCBwYWdlOiBhbnkgPSBudWxsLCBwcmVsb2FkID0gdHJ1ZSkgPT4ge1xuICAvLyDorr7nva7pobXpnaLmlbDmja5cbiAgaWYgKHBhZ2UpXG4gICAgY3R4LnNldERhdGEoe1xuICAgICAgVDogZ2xvYmFsRGF0YS5ULFxuICAgICAgbm06IGdsb2JhbERhdGEubm0sXG4gICAgICBwYWdlOiBzZXQgPyBwYWdlIDogZGlzcG9zZVBhZ2UocGFnZSwgb3B0aW9uKVxuICAgIH0pO1xuICAvLyDpobXpnaLlt7Lnu4/pooTlpITnkIblrozmr5XvvIznq4vljbPlhpnlhaVwYWdl5Lmm6K6w5bm25omn6KGM5pys55WM6Z2i55qE6aKE5Yqg6L29XG4gIGVsc2UgaWYgKGdsb2JhbERhdGEucGFnZS5haW0gPT09IG9wdGlvbi5haW0pIHtcbiAgICBjb25zb2xlLmxvZyhgJHtvcHRpb24uYWltfeW3suWkhOeQhmApO1xuICAgIGN0eC5zZXREYXRhKHsgVDogZ2xvYmFsRGF0YS5ULCBubTogZ2xvYmFsRGF0YS5ubSwgcGFnZTogZ2xvYmFsRGF0YS5wYWdlLmRhdGEgfSwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYCR7b3B0aW9uLmFpbX3lt7LlhpnlhaVgKTtcbiAgICAgIGlmIChwcmVsb2FkKSB7XG4gICAgICAgIHByZUdldFBhZ2UoY3R4LmRhdGEucGFnZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke29wdGlvbi5haW196aKE5Yqg6L295a2Q6aG16Z2i5a6M5oiQYCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coYCR7b3B0aW9uLmFpbX3mnKrlpITnkIZgKTtcbiAgICAvLyDorr7nva7pobXpnaLmlbDmja5cbiAgICBjdHguc2V0RGF0YSh7XG4gICAgICBUOiBnbG9iYWxEYXRhLlQsXG4gICAgICBubTogZ2xvYmFsRGF0YS5ubSxcbiAgICAgIHBhZ2U6IHNldCA/IGN0eC5kYXRhLnBhZ2UgOiBkaXNwb3NlUGFnZShjdHguZGF0YS5wYWdlLCBvcHRpb24pXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICog5by55Ye66YCa55+l77yM5Zyob25Mb2Fk5pe26KKr6LCD55SoXG4gKlxuICogQHBhcmFtIGFpbSDlvZPliY3nlYzpnaLnmoRhaW3lgLxcbiAqL1xuY29uc3QgcG9wTm90aWNlID0gKGFpbTogc3RyaW5nKSA9PiB7XG4gIGlmICh3eC5nZXRTdG9yYWdlU3luYyhgJHthaW19Tm90aWZ5YCkpIHsgLy8g5Yik5pat5piv5ZCm6ZyA6KaB5by556qXXG5cbiAgICAvLyDku47lrZjlgqjkuK3ojrflj5bpgJrnn6XlhoXlrrnlubblsZXnpLpcbiAgICBjb25zdCBub3RpY2UgPSB3eC5nZXRTdG9yYWdlU3luYyhgJHthaW19bm90aWNlYCk7XG5cbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6IG5vdGljZVswXSwgY29udGVudDogbm90aWNlWzFdLCBzaG93Q2FuY2VsOiBmYWxzZSxcblxuICAgICAgLy8g6Ziy5q2i5LqM5qyh5by556qXXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgIHd4LnJlbW92ZVN0b3JhZ2VTeW5jKGAke2FpbX1Ob3RpZnlgKTtcbiAgICAgIH1cblxuICAgIH0pO1xuICAgIGNvbnNvbGUuaW5mbygn5by55Ye66YCa55+lJyk7Ly8g6LCD6K+VXG4gIH1cbiAgd3gucmVwb3J0QW5hbHl0aWNzKCdwYWdlX2FpbV9jb3VudCcsIHsgYWltIH0pOy8vIEFpbee7n+iuoeWIhuaekFxufTtcblxuLyoqXG4gKiDorr7nva7lnKjnur/nlYzpnaLmlbDmja7vvIzlnKjnlYzpnaLliJ3lp4vljJbkuYvlkI7kvb/nlKhcbiAqXG4gKiBAcGFyYW0gb3B0aW9uIOmhtemdouS8oOWPglxuICogQHBhcmFtIGN0eCDpobXpnaLmjIfpkohcbiAqIEBwYXJhbSBwcmVsb2FkIOaYr+WQpumcgOimgemihOWKoOi9vSjpu5jorqTpnIDopoEpXG4gKi9cbmNvbnN0IHNldE9ubGluZVBhZ2UgPSAob3B0aW9uOiBhbnksIGN0eDogYW55LCBwcmVsb2FkID0gdHJ1ZSkgPT4ge1xuXG4gIC8vIOmhtemdouW3sue7j+mihOWkhOeQhuWujOavle+8jOeri+WNs+WGmeWFpXBhZ2XkuaborrDlubbmiafooYzmnKznlYzpnaLnmoTpooTliqDovb1cbiAgaWYgKGdsb2JhbERhdGEucGFnZS5haW0gPT09IG9wdGlvbi5haW0pIHtcbiAgICBjb25zb2xlLmxvZyhgJHtvcHRpb24uYWltfeW3suWkhOeQhmApO1xuICAgIGN0eC5zZXREYXRhKHsgVDogZ2xvYmFsRGF0YS5ULCBubTogZ2xvYmFsRGF0YS5ubSwgcGFnZTogZ2xvYmFsRGF0YS5wYWdlLmRhdGEgfSwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYCR7b3B0aW9uLmFpbX3lt7LlhpnlhaVgKTtcbiAgICAgIGlmIChwcmVsb2FkKSB7XG4gICAgICAgIHByZUdldFBhZ2UoY3R4LmRhdGEucGFnZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke29wdGlvbi5haW196aKE5Yqg6L295a2Q6aG16Z2i5a6M5oiQYCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDpnIDopoHph43mlrDovb3lhaXnlYzpnaJcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmluZm8oYCR7b3B0aW9uLmFpbX1vbkxvYWTlvIDlp4vvvIzlj4LmlbDkuLrvvJpgLCBvcHRpb24pO1xuICAgIGNvbnN0IHsgZm9sZGVyLCBwYXRoIH0gPSByZXNvbHZlQWltKG9wdGlvbi5haW0pO1xuXG4gICAgY3R4LmFpbSA9IG9wdGlvbi5haW07XG5cbiAgICBjb25zdCBwYWdlID0gJGZpbGUucmVhZEpzb24oYHBhZ2UvJHtwYXRofWApO1xuXG4gICAgLy8g5aaC5p6c5pys5Zyw5a2Y5YKo5Lit5ZCr5pyJcGFnZeebtOaOpeWkhOeQhlxuICAgIGlmIChwYWdlKSB7XG4gICAgICBzZXRQYWdlKHsgb3B0aW9uLCBjdHggfSwgcGFnZSk7XG4gICAgICBwb3BOb3RpY2Uob3B0aW9uLmFpbSk7XG4gICAgICBjb25zb2xlLmluZm8oYCR7b3B0aW9uLmFpbX1vbkxvYWTmiJDlip/vvJpgLCBjdHguZGF0YSk7XG4gICAgICB3eC5yZXBvcnRNb25pdG9yKCcwJywgMSk7XG5cbiAgICAgIC8vIOWmguaenOmcgOimgeaJp+ihjOmihOWKoOi9ve+8jOWImeaJp+ihjFxuICAgICAgaWYgKHByZWxvYWQpIHtcbiAgICAgICAgcHJlR2V0UGFnZShjdHguZGF0YS5wYWdlKTtcbiAgICAgICAgY29uc29sZS5sb2coYCR7b3B0aW9uLmFpbX3nlYzpnaLpooTliqDovb3lrozmiJBgKTtcbiAgICAgIH1cbiAgICB9IGVsc2VcbiAgICAgIC8vIOivt+axgumhtemdokpzb25cbiAgICAgICR3eC5yZXF1ZXN0KGBwYWdlLyR7cGF0aH1gLCBkYXRhID0+IHtcbiAgICAgICAgLy8g6K6+572u55WM6Z2iXG4gICAgICAgIHNldFBhZ2UoeyBvcHRpb24sIGN0eCB9LCBkYXRhKTtcblxuICAgICAgICAvLyDpnZ7liIbkuqvnlYzpnaLkuIvlsIbpobXpnaLmlbDmja7lhpnlhaXlrZjlgqhcbiAgICAgICAgaWYgKCFvcHRpb24uc2hhcmUpICRmaWxlLndyaXRlSnNvbihgcGFnZS8ke2ZvbGRlcn1gLCBgJHtvcHRpb24uYWltfWAsIGRhdGEpO1xuXG4gICAgICAgIC8vIOWmguaenOmcgOimgeaJp+ihjOmihOWKoOi9ve+8jOWImeaJp+ihjFxuICAgICAgICBpZiAocHJlbG9hZCkge1xuICAgICAgICAgIHByZUdldFBhZ2UoY3R4LmRhdGEucGFnZSk7XG4gICAgICAgICAgY29uc29sZS5sb2coYCR7b3B0aW9uLmFpbX3nlYzpnaLpooTliqDovb3lrozmiJBgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOW8ueWHuumAmuefpVxuICAgICAgICBwb3BOb3RpY2Uob3B0aW9uLmFpbSk7XG5cbiAgICAgICAgLy8g6LCD6K+VXG4gICAgICAgIGNvbnNvbGUuaW5mbyhgJHtvcHRpb24uYWltfW9uTG9hZOaIkOWKn2ApO1xuICAgICAgICB3eC5yZXBvcnRNb25pdG9yKCcwJywgMSk7XG4gICAgICB9LCByZXMgPT4ge1xuICAgICAgICAvLyDorr7nva5lcnJvcumhtemdouW5tuW8ueWHuumAmuefpVxuICAgICAgICBzZXRQYWdlKHsgb3B0aW9uLCBjdHggfSwgW3sgdGFnOiAnZXJyb3InLCBzdGF0dXNCYXJIZWlnaHQ6IGdsb2JhbERhdGEuaW5mby5zdGF0dXNCYXJIZWlnaHQgfV0pO1xuICAgICAgICBwb3BOb3RpY2Uob3B0aW9uLmFpbSk7XG5cbiAgICAgICAgLy8g6LCD6K+VXG4gICAgICAgIGNvbnNvbGUud2FybihgJHtvcHRpb24uYWltfW9uTG9hZOWksei0pe+8jOmUmeivr+S4umAsIHJlcyk7XG4gICAgICAgIGxvZ2dlci53YXJuKGAke29wdGlvbi5haW19b25Mb2Fk5aSx6LSl77yM6ZSZ6K+v5Li6YCwgcmVzKTtcbiAgICAgICAgd3gucmVwb3J0TW9uaXRvcignMTMnLCAxKTtcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgLy8g6K6+572uZXJyb3LnlYzpnaJcbiAgICAgICAgc2V0UGFnZSh7IG9wdGlvbiwgY3R4IH0sIFt7IHRhZzogJ2Vycm9yJywgc3RhdHVzQmFySGVpZ2h0OiBnbG9iYWxEYXRhLmluZm8uc3RhdHVzQmFySGVpZ2h0IH1dKTtcblxuICAgICAgICAvLyDosIPor5VcbiAgICAgICAgY29uc29sZS53YXJuKGAke29wdGlvbi5haW196LWE5rqQ6ZSZ6K+vYCk7XG4gICAgICAgIHd4LnJlcG9ydE1vbml0b3IoJzEyJywgMSk7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhgJHtvcHRpb24uYWltfW9uTG9hZOaIkOWKn2ApO1xuICAgICAgICB3eC5yZXBvcnRNb25pdG9yKCcwJywgMSk7XG4gICAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiDorr7nva7og7blm4rkuI7og4zmma/popzoibJcbiAqXG4gKiBAcGFyYW0gZ3JleSDpobXpnaLmmK/lkKbkuLrngbDoibLog4zmma9cbiAqL1xuY29uc3QgY29sb3IgPSAoZ3JleTogYm9vbGVhbikgPT4ge1xuICBjb25zdCBbZnJvbnRDb2xvciwgYmFja2dyb3VuZENvbG9yXSA9IGdsb2JhbERhdGEubm0gPyBbJyNmZmZmZmYnLCAnIzAwMDAwMCddIDogWycjMDAwMDAwJywgJyNmZmZmZmYnXTtcbiAgbGV0IHRlbXA7XG5cbiAgaWYgKGdsb2JhbERhdGEubm0gJiYgZ3JleSlcbiAgICBzd2l0Y2ggKGdsb2JhbERhdGEuVCkge1xuICAgICAgY2FzZSAnQW5kcmlvZCc6IHRlbXAgPSBbJyMxMDExMGInLCAnIzEwMTEwYicsICcjMTAxMTBiJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaU9TJzogdGVtcCA9IFsnIzEwMTEwYicsICcjMGEwYTA4JywgJyMxMDExMGInXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdORU5VJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRlbXAgPSBbJyMwNzA3MDcnLCAnIzA3MDcwNycsICcjMDcwNzA3J107XG4gICAgfVxuICBlbHNlIGlmIChnbG9iYWxEYXRhLm5tICYmICFncmV5KVxuICAgIHN3aXRjaCAoZ2xvYmFsRGF0YS5UKSB7XG4gICAgICBjYXNlICdpT1MnOiB0ZW1wID0gWycjMDAwMDAwJywgJyMwYTBhMDgnLCAnIzAwMDAwMCddO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0FuZHJpb2QnOlxuICAgICAgY2FzZSAnTkVOVSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0ZW1wID0gWycjMDAwMDAwJywgJyMwMDAwMDAnLCAnIzAwMDAwMCddO1xuICAgIH1cbiAgZWxzZSBpZiAoIWdsb2JhbERhdGEubm0gJiYgZ3JleSlcbiAgICBzd2l0Y2ggKGdsb2JhbERhdGEuVCkge1xuICAgICAgY2FzZSAnQW5kcmlvZCc6IHRlbXAgPSBbJyNmOGY4ZjgnLCAnI2Y4ZjhmOCcsICcjZjhmOGY4J107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTkVOVSc6IHRlbXAgPSBbJyNmMGYwZjAnLCAnI2YwZjBmMCcsICcjZjBmMGYwJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaU9TJzpcbiAgICAgIGRlZmF1bHQ6IHRlbXAgPSBbJyNmNGY0ZjQnLCAnI2VmZWVmNCcsICcjZWZlZWY0J107XG4gICAgfVxuICBlbHNlXG4gICAgc3dpdGNoIChnbG9iYWxEYXRhLlQpIHtcbiAgICAgIGNhc2UgJ0FuZHJpb2QnOiB0ZW1wID0gWycjZjhmOGY4JywgJyNmOGY4ZjgnLCAnI2Y4ZjhmOCddO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ05FTlUnOiB0ZW1wID0gWydmZmZmZmYnLCAnZmZmZmZmJywgJ2ZmZmZmZiddO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2lPUyc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0ZW1wID0gWycjZjRmNGY0JywgJ2ZmZmZmZicsICdmZmZmZmYnXTtcbiAgICB9XG5cbiAgcmV0dXJuIFtcbiAgICB7IGZyb250Q29sb3IsIGJhY2tncm91bmRDb2xvciB9LFxuICAgIHsgYmFja2dyb3VuZENvbG9yVG9wOiB0ZW1wWzBdLCBiYWNrZ3JvdW5kQ29sb3I6IHRlbXBbMV0sIGJhY2tncm91bmRDb2xvckJvdHRvbTogdGVtcFsyXSB9XG4gIF07XG59O1xuXG4vKipcbiAqIOWKoOi9veWtl+S9k1xuICpcbiAqIEBwYXJhbSB0aGVtZSDkuLvpophcbiAqL1xuY29uc3QgbG9hZEZvbnQgPSAodGhlbWU6IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGlmICh0aGVtZSA9PT0gJ0FuZHJvaWQnKVxuICAgICAgd3gubG9hZEZvbnRGYWNlKHtcbiAgICAgICAgZmFtaWx5OiAnRlpLVEpXJywgc291cmNlOiAndXJsKFwiaHR0cHM6Ly9tcC5uZW51eW91dGguY29tL2ZvbnRzL0ZaS1RKVy50dGZcIiknLFxuICAgICAgICBjb21wbGV0ZTogcmVzID0+IHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ+alt+S9k+Wtl+S9kycsIHJlcyk7Ly8g6LCD6K+VXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIGVsc2UgaWYgKHRoZW1lID09PSAnTkVOVScpXG4gICAgICB3eC5sb2FkRm9udEZhY2Uoe1xuICAgICAgICBmYW1pbHk6ICdGWlNTSlcnLCBzb3VyY2U6ICd1cmwoXCJodHRwczovL21wLm5lbnV5b3V0aC5jb20vZm9udHMvRlpTU0pXLnR0ZlwiKScsXG4gICAgICAgIGNvbXBsZXRlOiByZXMgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygn5a6L5L2T5a2X5L2TJywgcmVzKTsvLyDosIPor5VcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgZWxzZSB0aHJvdyB0aGVtZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUud2FybihgVGhlbWUgJHtlfSBjYW5ub3QgYmUgaGFuZGxlZC5gKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0LFxuICBwcmVHZXQ6IHByZUdldFBhZ2UsXG4gIHJlc29sdmU6IHJlc29sdmVQYWdlLFxuICBTZXQ6IHNldFBhZ2UsXG4gIE9ubGluZTogc2V0T25saW5lUGFnZSxcbiAgTm90aWNlOiBwb3BOb3RpY2UsXG4gIGNvbG9yLFxuICBsb2FkRm9udFxufTtcbiJdfQ==