"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fileManager = wx.getFileSystemManager();
var userPath = wx.env.USER_DATA_PATH;
var logger = wx.getLogManager({ level: 1 });
var Delete = function (path, isDir) {
    if (isDir === void 0) { isDir = false; }
    if (isDir === null)
        try {
            if (fileManager.statSync(userPath + "/" + path).isFile())
                fileManager.unlinkSync(userPath + "/" + path);
            else
                fileManager.rmdirSync(userPath + "/" + path, true);
        }
        catch (err) {
            console.error("\u5220\u9664" + path + "\u51FA\u9519,\u9519\u8BEF\u4E3A:", err);
            logger.warn("\u5220\u9664" + path + "\u51FA\u9519,\u9519\u8BEF\u4E3A:", err);
        }
    else if (isDir)
        try {
            fileManager.rmdirSync(userPath + "/" + path, true);
        }
        catch (err) {
            console.error("\u5220\u9664" + path + "\u51FA\u9519,\u9519\u8BEF\u4E3A:", err);
            logger.warn("\u5220\u9664" + path + "\u51FA\u9519,\u9519\u8BEF\u4E3A:", err);
        }
    else
        try {
            fileManager.unlinkSync(userPath + "/" + path);
        }
        catch (err) {
            console.error("\u5220\u9664" + path + "\u51FA\u9519,\u9519\u8BEF\u4E3A:", err);
            logger.warn("\u5220\u9664" + path + "\u51FA\u9519,\u9519\u8BEF\u4E3A:", err);
        }
};
var listFile = function (path) {
    try {
        var fileList = fileManager.readdirSync(userPath + "/" + path);
        console.info(path + "\u6587\u4EF6\u5939\u4E0B\u6587\u4EF6\u4E3A\uFF1A", fileList);
        return fileList;
    }
    catch (err) {
        console.error("\u5217\u51FA" + path + "\u6587\u4EF6\u5939\u4E0B\u6587\u4EF6\u9519\u8BEF\uFF1A", err);
        logger.warn("\u5217\u51FA" + path + "\u6587\u4EF6\u5939\u4E0B\u6587\u4EF6\u9519\u8BEF\uFF1A", err);
        return [];
    }
};
var readFile = function (path, encoding) {
    if (encoding === void 0) { encoding = 'utf-8'; }
    try {
        return fileManager.readFileSync(userPath + "/" + path, encoding);
    }
    catch (err) {
        console.warn(path + "\u4E0D\u5B58\u5728");
        logger.debug(path + "\u4E0D\u5B58\u5728");
        return null;
    }
};
var readJson = function (path, encoding) {
    if (encoding === void 0) { encoding = 'utf-8'; }
    var fileContent;
    var data;
    try {
        fileContent = fileManager.readFileSync(userPath + "/" + path + ".json", encoding);
        try {
            data = JSON.parse(fileContent);
            console.log("read " + path + ".json\u6210\u529F\uFF1A", data);
        }
        catch (err) {
            data = null;
            console.warn(path + "\u89E3\u6790\u5931\u8D25");
            logger.debug(path + "\u89E3\u6790\u5931\u8D25");
        }
    }
    catch (err) {
        data = null;
        console.warn(path + "\u4E0D\u5B58\u5728");
        logger.debug(path + "\u4E0D\u5B58\u5728");
    }
    return data;
};
var makeDir = function (path, recursive) {
    if (recursive === void 0) { recursive = true; }
    try {
        fileManager.mkdirSync(userPath + "/" + path, recursive);
    }
    catch (err) {
        console.info(path + "\u76EE\u5F55\u5DF2\u5B58\u5728", err);
        logger.debug(path + "\u76EE\u5F55\u5DF2\u5B58\u5728", err);
    }
};
var saveFile = function (tempFilePath, path) {
    try {
        fileManager.saveFileSync(tempFilePath, userPath + "/" + path);
    }
    catch (err) {
        console.error("\u4FDD\u5B58\u6587\u4EF6\u5230" + path + "\u5931\u8D25\uFF1A", err);
        logger.warn("\u4FDD\u5B58\u6587\u4EF6\u5230" + path + "\u5931\u8D25\uFF1A", err);
    }
};
var saveOnlineFile = function (_a, successFunc, failFunc, errorFunc) {
    var onlinePath = _a[0], savePath = _a[1], fileName = _a[2];
    makeDir(savePath);
    wx.downloadFile({
        url: "https://mp.nenuyouth.com/" + onlinePath,
        filePath: userPath + "/" + savePath + "/" + fileName,
        success: function (res) {
            if (res.statusCode === 200) {
                console.info("save " + onlinePath + " success");
                successFunc(res.tempFilePath);
            }
            else {
                if (errorFunc)
                    errorFunc(res.statusCode);
                console.warn("\u4E0B\u8F7D" + onlinePath + "\u5931\u8D25\uFF0C\u72B6\u6001\u7801\u4E3A" + res.statusCode);
                logger.warn("\u4E0B\u8F7D" + onlinePath + "\u5931\u8D25\uFF0C\u72B6\u6001\u7801\u4E3A" + res.statusCode);
            }
        },
        fail: function (failMsg) {
            if (failFunc)
                failFunc(failMsg);
            console.warn("\u4E0B\u8F7D" + onlinePath + "\u5931\u8D25\uFF0C\u9519\u8BEF\u4E3A", failMsg);
            logger.warn("\u4E0B\u8F7D" + onlinePath + "\u5931\u8D25\uFF0C\u9519\u8BEF\u4E3A", failMsg);
        }
    });
};
var writeFile = function (path, fileName, data, encoding) {
    if (encoding === void 0) { encoding = 'utf-8'; }
    var jsonString = JSON.stringify(data);
    makeDir(path);
    fileManager.writeFileSync(userPath + "/" + path + "/" + fileName, jsonString, encoding);
};
var writeJson = function (path, fileName, data, encoding) {
    if (encoding === void 0) { encoding = 'utf-8'; }
    var jsonString = JSON.stringify(data);
    makeDir(path);
    fileManager.writeFileSync(userPath + "/" + path + "/" + fileName + ".json", jsonString, encoding);
};
var getJson = function (path, callback, failFunc) {
    var data = readJson(path);
    if (data)
        return callback(data);
    var temp = path.split('/');
    var fileName = temp.pop();
    var folder = temp.join('/');
    makeDir(folder);
    wx.downloadFile({
        url: "https://mp.nenuyouth.com/" + path + ".json",
        filePath: userPath + "/" + folder + "/" + fileName,
        success: function (res) {
            if (res.statusCode === 200) {
                console.info("Save " + path + ".json success");
                data = readJson(path);
                return callback(data);
            }
            console.warn("\u83B7\u53D6" + path + ".json\u5931\u8D25\uFF0C\u72B6\u6001\u7801\u4E3A" + res.statusCode);
            logger.warn("\u83B7\u53D6" + path + ".json\u5931\u8D25\uFF0C\u72B6\u6001\u7801\u4E3A" + res.statusCode);
            if (failFunc)
                return failFunc();
            return null;
        },
        fail: function (failMsg) {
            console.warn("\u4E0B\u8F7D" + path + ".json\u5931\u8D25\uFF0C\u9519\u8BEF\u4E3A", failMsg);
            logger.warn("\u4E0B\u8F7D" + path + ".json\u5931\u8D25\uFF0C\u9519\u8BEF\u4E3A", failMsg);
            if (failFunc)
                return failFunc();
            return null;
        }
    });
    return null;
};
var unzip = function (path, unzipPath, callback) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    fileManager.unzip({
        zipFilePath: userPath + "/" + path, targetPath: userPath + "/" + unzipPath,
        success: function () {
            if (callback)
                return callback.apply(void 0, args);
            return null;
        },
        fail: function (failMsg) {
            console.error("unzip " + path + " fail:", failMsg);
            logger.warn("unzip " + path + " fail:", failMsg);
        }
    });
};
exports.default = {
    Delete: Delete, getJson: getJson, Manager: fileManager, listFile: listFile, readFile: readFile, readJson: readJson,
    makeDir: makeDir, saveFile: saveFile, saveOnlineFile: saveOnlineFile, writeFile: writeFile, writeJson: writeJson, unzip: unzip
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFTQSxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztBQUM5QyxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztBQUN2QyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFPOUMsSUFBTSxNQUFNLEdBQUcsVUFBQyxJQUFZLEVBQUUsS0FBYTtJQUFiLHNCQUFBLEVBQUEsYUFBYTtJQUN6QyxJQUFJLEtBQUssS0FBSyxJQUFJO1FBQ2hCLElBQUk7WUFFRixJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUksUUFBUSxTQUFJLElBQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDdEQsV0FBVyxDQUFDLFVBQVUsQ0FBSSxRQUFRLFNBQUksSUFBTSxDQUFDLENBQUM7O2dCQUMzQyxXQUFXLENBQUMsU0FBUyxDQUFJLFFBQVEsU0FBSSxJQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FFekQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQUssSUFBSSxxQ0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQUssSUFBSSxxQ0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3RDO1NBRUUsSUFBSSxLQUFLO1FBQUUsSUFBSTtZQUVsQixXQUFXLENBQUMsU0FBUyxDQUFJLFFBQVEsU0FBSSxJQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FFcEQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQUssSUFBSSxxQ0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENB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LypcbiAqIEBBdXRob3I6IE1yLkhvcGVcbiAqIEBMYXN0RWRpdG9yczogTXIuSG9wZVxuICogQERlc2NyaXB0aW9uOiDmlofku7bnrqHnkIbmqKHlnZdcbiAqIEBEYXRlOiAyMDE5LTAyLTEyIDE2OjQ1OjQ0XG4gKiBATGFzdEVkaXRUaW1lOiAyMDE5LTA2LTI1IDIzOjM3OjQ5XG4gKi9cblxuLy8g5Yid5aeL5YyW5paH5Lu2566h55CG5Zmo44CB55So5oi36Lev5b6E5LiO5pel5b+X566h55CG5ZmoXG5jb25zdCBmaWxlTWFuYWdlciA9IHd4LmdldEZpbGVTeXN0ZW1NYW5hZ2VyKCk7XG5jb25zdCB1c2VyUGF0aCA9IHd4LmVudi5VU0VSX0RBVEFfUEFUSDtcbmNvbnN0IGxvZ2dlciA9IHd4LmdldExvZ01hbmFnZXIoeyBsZXZlbDogMSB9KTtcblxuLyoqXG4gKiDliKDpmaTmlofku7bmiJbmlofku7blpLlcbiAqIEBwYXJhbSBwYXRoIOimgeWIoOmZpOeahOaWh+S7tuaIluaWh+S7tuWkuei3r+W+hFxuICogQHBhcmFtIGlzRGlyIOimgeWIoOmZpOeahOaYr+WQpuaYr+aWh+S7tuWkuVxuICovXG5jb25zdCBEZWxldGUgPSAocGF0aDogc3RyaW5nLCBpc0RpciA9IGZhbHNlKSA9PiB7XG4gIGlmIChpc0RpciA9PT0gbnVsbClcbiAgICB0cnkge1xuICAgICAgLy8g5Yik5pat6Lev5b6E5piv5ZCm5piv5paH5Lu277yM5bm25omn6KGM5a+55bqU5Yig6Zmk5pON5L2cXG4gICAgICBpZiAoZmlsZU1hbmFnZXIuc3RhdFN5bmMoYCR7dXNlclBhdGh9LyR7cGF0aH1gKS5pc0ZpbGUoKSlcbiAgICAgICAgZmlsZU1hbmFnZXIudW5saW5rU3luYyhgJHt1c2VyUGF0aH0vJHtwYXRofWApO1xuICAgICAgZWxzZSBmaWxlTWFuYWdlci5ybWRpclN5bmMoYCR7dXNlclBhdGh9LyR7cGF0aH1gLCB0cnVlKTtcblxuICAgIH0gY2F0Y2ggKGVycikgeyAvLyDosIPor5VcbiAgICAgIGNvbnNvbGUuZXJyb3IoYOWIoOmZpCR7cGF0aH3lh7rplJks6ZSZ6K+v5Li6OmAsIGVycik7XG4gICAgICBsb2dnZXIud2Fybihg5Yig6ZmkJHtwYXRofeWHuumUmSzplJnor6/kuLo6YCwgZXJyKTtcbiAgICB9XG4gIC8vIOaYr+ebruW9lVxuICBlbHNlIGlmIChpc0RpcikgdHJ5IHtcblxuICAgIGZpbGVNYW5hZ2VyLnJtZGlyU3luYyhgJHt1c2VyUGF0aH0vJHtwYXRofWAsIHRydWUpO1xuXG4gIH0gY2F0Y2ggKGVycikgeyAvLyDosIPor5VcbiAgICBjb25zb2xlLmVycm9yKGDliKDpmaQke3BhdGh95Ye66ZSZLOmUmeivr+S4ujpgLCBlcnIpO1xuICAgIGxvZ2dlci53YXJuKGDliKDpmaQke3BhdGh95Ye66ZSZLOmUmeivr+S4ujpgLCBlcnIpO1xuICB9XG4gIC8vIOaYr+aWh+S7tlxuICBlbHNlIHRyeSB7XG5cbiAgICBmaWxlTWFuYWdlci51bmxpbmtTeW5jKGAke3VzZXJQYXRofS8ke3BhdGh9YCk7XG5cbiAgfSBjYXRjaCAoZXJyKSB7IC8vIOiwg+ivlVxuICAgIGNvbnNvbGUuZXJyb3IoYOWIoOmZpCR7cGF0aH3lh7rplJks6ZSZ6K+v5Li6OmAsIGVycik7XG4gICAgbG9nZ2VyLndhcm4oYOWIoOmZpCR7cGF0aH3lh7rplJks6ZSZ6K+v5Li6OmAsIGVycik7XG4gIH1cbn07XG5cbi8qKlxuICog5YiX5Ye655uu5b2V5LiL5paH5Lu2XG4gKiBAcGFyYW0gcGF0aCDopoHmn6XnnIvnmoTmlofku7blpLnot6/lvoRcbiAqIEByZXR1cm4ge3N0cmluZ1tdfSDmjIflrprnm67lvZXkuIvnmoTmlofku7blkI3mlbDnu4RcbiAqL1xuY29uc3QgbGlzdEZpbGUgPSAocGF0aDogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZUxpc3QgPSBmaWxlTWFuYWdlci5yZWFkZGlyU3luYyhgJHt1c2VyUGF0aH0vJHtwYXRofWApO1xuXG4gICAgY29uc29sZS5pbmZvKGAke3BhdGh95paH5Lu25aS55LiL5paH5Lu25Li677yaYCwgZmlsZUxpc3QpOy8vIOiwg+ivlVxuXG4gICAgcmV0dXJuIGZpbGVMaXN0O1xuICB9IGNhdGNoIChlcnIpIHsgLy8g6LCD6K+VXG4gICAgY29uc29sZS5lcnJvcihg5YiX5Ye6JHtwYXRofeaWh+S7tuWkueS4i+aWh+S7tumUmeivr++8mmAsIGVycik7XG4gICAgbG9nZ2VyLndhcm4oYOWIl+WHuiR7cGF0aH3mlofku7blpLnkuIvmlofku7bplJnor6/vvJpgLCBlcnIpO1xuXG4gICAgcmV0dXJuIFtdO1xuICB9XG59O1xuXG4vKipcbiAqIOaWh+S7tueuoeeQhuWZqOivu+WPluaWh+S7tuWMheijhVxuICogQHBhcmFtIHBhdGgg5b6F6K+75Y+W5paH5Lu255u45a+555So5oi35paH5Lu25aS555qE6Lev5b6EXG4gKiBAcGFyYW0gZW5jb2Rpbmcg5paH5Lu255qE57yW56CB5qC85byPXG4gKiBAcmV0dXJuIHtzdHJpbmd9IOaWh+S7tuWGheWuuVxuICovXG5jb25zdCByZWFkRmlsZSA9IChwYXRoOiBzdHJpbmcsIGVuY29kaW5nID0gJ3V0Zi04JykgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBmaWxlTWFuYWdlci5yZWFkRmlsZVN5bmMoYCR7dXNlclBhdGh9LyR7cGF0aH1gLCBlbmNvZGluZyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUud2FybihgJHtwYXRofeS4jeWtmOWcqGApO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwYXRofeS4jeWtmOWcqGApO1xuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICog6K+75Y+W5bm26Kej5p6QSnNvbuaWh+S7tlxuICogQHBhcmFtIHBhdGggSnNvbuaWh+S7tuebuOWvueeUqOaIt+aWh+S7tuWkueeahOi3r+W+hFxuICogQHBhcmFtIGVuY29kaW5nIOaWh+S7tueahOe8lueggeagvOW8j1xuICogQHJldHVybiB7b2JqZWN0fSDop6PmnpDlkI7nmoRqc29uXG4gKi9cbmNvbnN0IHJlYWRKc29uID0gKHBhdGg6IHN0cmluZywgZW5jb2RpbmcgPSAndXRmLTgnKSA9PiB7XG4gIGxldCBmaWxlQ29udGVudDtcbiAgbGV0IGRhdGE7XG5cbiAgdHJ5IHtcbiAgICBmaWxlQ29udGVudCA9IGZpbGVNYW5hZ2VyLnJlYWRGaWxlU3luYyhgJHt1c2VyUGF0aH0vJHtwYXRofS5qc29uYCwgZW5jb2RpbmcpO1xuICAgIHRyeSB7XG4gICAgICBkYXRhID0gSlNPTi5wYXJzZShmaWxlQ29udGVudCk7XG5cbiAgICAgIGNvbnNvbGUubG9nKGByZWFkICR7cGF0aH0uanNvbuaIkOWKn++8mmAsIGRhdGEpO1xuXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBkYXRhID0gbnVsbDtcblxuICAgICAgLy8g6LCD6K+VXG4gICAgICBjb25zb2xlLndhcm4oYCR7cGF0aH3op6PmnpDlpLHotKVgKTtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgJHtwYXRofeino+aekOWksei0pWApO1xuICAgIH1cblxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkYXRhID0gbnVsbDtcblxuICAgIC8vIOiwg+ivlVxuICAgIGNvbnNvbGUud2FybihgJHtwYXRofeS4jeWtmOWcqGApO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwYXRofeS4jeWtmOWcqGApO1xuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG4vKipcbiAqIOWIm+W7uuebruW9lVxuICogQHBhcmFtIHBhdGgg6KaB5Yib5bu655qE55uu5b2V6Lev5b6EXG4gKiBAcGFyYW0gcmVjdXJzaXZlIOaYr+WQpumAkuW9kuWIm+W7uuebruW9lVxuICovXG5jb25zdCBtYWtlRGlyID0gKHBhdGg6IHN0cmluZywgcmVjdXJzaXZlID0gdHJ1ZSkgPT4ge1xuICB0cnkge1xuICAgIGZpbGVNYW5hZ2VyLm1rZGlyU3luYyhgJHt1c2VyUGF0aH0vJHtwYXRofWAsIHJlY3Vyc2l2ZSk7XG5cbiAgfSBjYXRjaCAoZXJyKSB7IC8vIOiwg+ivlVxuICAgIGNvbnNvbGUuaW5mbyhgJHtwYXRofeebruW9leW3suWtmOWcqGAsIGVycik7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3BhdGh955uu5b2V5bey5a2Y5ZyoYCwgZXJyKTtcbiAgfVxuXG59O1xuXG4vKipcbiAqIOS/neWtmOaWh+S7tlxuICogQHBhcmFtIHRlbXBGaWxlUGF0aCDnvJPlrZjmlofku7bot6/lvoRcbiAqIEBwYXJhbSBwYXRoIOS/neWtmOaWh+S7tui3r+W+hFxuICovXG5jb25zdCBzYXZlRmlsZSA9ICh0ZW1wRmlsZVBhdGg6IHN0cmluZywgcGF0aDogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgZmlsZU1hbmFnZXIuc2F2ZUZpbGVTeW5jKHRlbXBGaWxlUGF0aCwgYCR7dXNlclBhdGh9LyR7cGF0aH1gKTtcblxuICB9IGNhdGNoIChlcnIpIHsgLy8g6LCD6K+VXG4gICAgY29uc29sZS5lcnJvcihg5L+d5a2Y5paH5Lu25YiwJHtwYXRofeWksei0pe+8mmAsIGVycik7XG4gICAgbG9nZ2VyLndhcm4oYOS/neWtmOaWh+S7tuWIsCR7cGF0aH3lpLHotKXvvJpgLCBlcnIpO1xuICB9XG59O1xuXG4vKipcbiAqIOS/neWtmOWcqOe6v+aWh+S7tlxuICogQHBhcmFtIG9ubGluZVBhdGgg5Zyo57q/5paH5Lu26Lev5b6EXG4gKiBAcGFyYW0gc2F2ZVBhdGgg5pys5Zyw5L+d5a2Y6Lev5b6EXG4gKiBAcGFyYW0gZmlsZU5hbWUg5pys5Zyw5L+d5a2Y5paH5Lu25ZCNXG4gKiBAcGFyYW0gc3VjY2Vzc0Z1bmMg5oiQ5Yqf5Zue6LCD5Ye95pWwXG4gKiBAcGFyYW0gZmFpbEZ1bmMgIOWksei0peWbnuiwg+WHveaVsFxuICogQHBhcmFtIGVycm9yRnVuYyDlpLHotKXlm57osIPlh73mlbBcbiAqL1xuY29uc3Qgc2F2ZU9ubGluZUZpbGUgPSAoXG4gIFtvbmxpbmVQYXRoLCBzYXZlUGF0aCwgZmlsZU5hbWVdOiBzdHJpbmdbXSxcbiAgc3VjY2Vzc0Z1bmM6IChwYXRoOiBzdHJpbmcpID0+IHZvaWQsXG4gIGZhaWxGdW5jPzogKGVyck1zZzogd3guR2VuZXJhbENhbGxiYWNrUmVzdWx0KSA9PiB2b2lkLFxuICBlcnJvckZ1bmM/OiAoc3RhdHVzQ29kZTogbnVtYmVyKSA9PiB2b2lkXG4pID0+IHtcbiAgbWFrZURpcihzYXZlUGF0aCk7XG4gIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgdXJsOiBgaHR0cHM6Ly9tcC5uZW51eW91dGguY29tLyR7b25saW5lUGF0aH1gLFxuICAgIGZpbGVQYXRoOiBgJHt1c2VyUGF0aH0vJHtzYXZlUGF0aH0vJHtmaWxlTmFtZX1gLFxuICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICBjb25zb2xlLmluZm8oYHNhdmUgJHtvbmxpbmVQYXRofSBzdWNjZXNzYCk7XG4gICAgICAgIHN1Y2Nlc3NGdW5jKHJlcy50ZW1wRmlsZVBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVycm9yRnVuYykgZXJyb3JGdW5jKHJlcy5zdGF0dXNDb2RlKTtcbiAgICAgICAgY29uc29sZS53YXJuKGDkuIvovb0ke29ubGluZVBhdGh95aSx6LSl77yM54q25oCB56CB5Li6JHtyZXMuc3RhdHVzQ29kZX1gKTtcbiAgICAgICAgbG9nZ2VyLndhcm4oYOS4i+i9vSR7b25saW5lUGF0aH3lpLHotKXvvIznirbmgIHnoIHkuLoke3Jlcy5zdGF0dXNDb2RlfWApO1xuICAgICAgfVxuICAgIH0sXG4gICAgZmFpbDogZmFpbE1zZyA9PiB7XG4gICAgICBpZiAoZmFpbEZ1bmMpIGZhaWxGdW5jKGZhaWxNc2cpO1xuICAgICAgY29uc29sZS53YXJuKGDkuIvovb0ke29ubGluZVBhdGh95aSx6LSl77yM6ZSZ6K+v5Li6YCwgZmFpbE1zZyk7XG4gICAgICBsb2dnZXIud2Fybihg5LiL6L29JHtvbmxpbmVQYXRofeWksei0pe+8jOmUmeivr+S4umAsIGZhaWxNc2cpO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqIOWGmeWFpeaWh+S7tlxuICogQHBhcmFtIHBhdGgg5YaZ5YWl5paH5Lu255qE6Lev5b6EXG4gKiBAcGFyYW0gZmlsZU5hbWUg5YaZ5YWl5paH5Lu255qE5paH5Lu25ZCNXG4gKiBAcGFyYW0gZGF0YSDlhpnlhaXmlofku7bnmoTmlbDmja5cbiAqIEBwYXJhbSBlbmNvZGluZyDmlofku7bnvJbnoIHpgInpoblcbiAqL1xuY29uc3Qgd3JpdGVGaWxlID0gKHBhdGg6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZywgZGF0YTogb2JqZWN0IHwgQXJyYXlCdWZmZXIgfCBzdHJpbmcsIGVuY29kaW5nID0gJ3V0Zi04JykgPT4ge1xuICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG5cbiAgbWFrZURpcihwYXRoKTtcbiAgZmlsZU1hbmFnZXIud3JpdGVGaWxlU3luYyhgJHt1c2VyUGF0aH0vJHtwYXRofS8ke2ZpbGVOYW1lfWAsIGpzb25TdHJpbmcsIGVuY29kaW5nKTtcbn07XG5cbi8qKlxuICog5YaZ5YWlSnNvbuaWh+S7tlxuICogQHBhcmFtIHBhdGgg5YaZ5YWl5paH5Lu255qE6Lev5b6EXG4gKiBAcGFyYW0gZmlsZU5hbWUg5YaZ5YWl5paH5Lu255qE5paH5Lu25ZCNXG4gKiBAcGFyYW0gZGF0YSDlhpnlhaXmlofku7bnmoTmlbDmja5cbiAqIEBwYXJhbSBlbmNvZGluZyDmlofku7bnvJbnoIHpgInpoblcbiAqL1xuY29uc3Qgd3JpdGVKc29uID0gKHBhdGg6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZywgZGF0YTogb2JqZWN0LCBlbmNvZGluZyA9ICd1dGYtOCcpID0+IHtcbiAgY29uc3QganNvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuXG4gIG1ha2VEaXIocGF0aCk7XG4gIGZpbGVNYW5hZ2VyLndyaXRlRmlsZVN5bmMoYCR7dXNlclBhdGh9LyR7cGF0aH0vJHtmaWxlTmFtZX0uanNvbmAsIGpzb25TdHJpbmcsIGVuY29kaW5nKTtcbn07XG5cbi8qKlxuICog6I635Y+WSnNvblxuICpcbiAqIEBwYXJhbSBwYXRoIEpTT07mlofku7bot6/lvoRcbiAqIEBwYXJhbSBjYWxsYmFjayBKc29u6I635Y+W5oiQ5Yqf5ZCO55qE5Zue6LCDXG4gKiBAcGFyYW0gZmFpbEZ1bmMgSnNvbuiOt+WPluWksei0peWQjueahOWbnuiwg1xuICovXG5jb25zdCBnZXRKc29uID0gKHBhdGg6IHN0cmluZywgY2FsbGJhY2s6IChkYXRhOiBvYmplY3QgfCBzdHJpbmcpID0+IHZvaWQsIGZhaWxGdW5jPzogKCkgPT4gdm9pZCkgPT4ge1xuICBsZXQgZGF0YSA9IHJlYWRKc29uKHBhdGgpO1xuXG4gIGlmIChkYXRhKSByZXR1cm4gY2FsbGJhY2soZGF0YSk7XG5cbiAgY29uc3QgdGVtcCA9IHBhdGguc3BsaXQoJy8nKTtcbiAgY29uc3QgZmlsZU5hbWUgPSB0ZW1wLnBvcCgpO1xuICBjb25zdCBmb2xkZXIgPSB0ZW1wLmpvaW4oJy8nKTtcblxuICBtYWtlRGlyKGZvbGRlcik7XG5cbiAgd3guZG93bmxvYWRGaWxlKHtcbiAgICB1cmw6IGBodHRwczovL21wLm5lbnV5b3V0aC5jb20vJHtwYXRofS5qc29uYCxcbiAgICBmaWxlUGF0aDogYCR7dXNlclBhdGh9LyR7Zm9sZGVyfS8ke2ZpbGVOYW1lfWAsXG4gICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhgU2F2ZSAke3BhdGh9Lmpzb24gc3VjY2Vzc2ApO1xuXG4gICAgICAgIGRhdGEgPSByZWFkSnNvbihwYXRoKTtcblxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLndhcm4oYOiOt+WPliR7cGF0aH0uanNvbuWksei0pe+8jOeKtuaAgeeggeS4uiR7cmVzLnN0YXR1c0NvZGV9YCk7XG4gICAgICBsb2dnZXIud2Fybihg6I635Y+WJHtwYXRofS5qc29u5aSx6LSl77yM54q25oCB56CB5Li6JHtyZXMuc3RhdHVzQ29kZX1gKTtcbiAgICAgIGlmIChmYWlsRnVuYykgcmV0dXJuIGZhaWxGdW5jKCk7XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgZmFpbDogZmFpbE1zZyA9PiB7XG4gICAgICBjb25zb2xlLndhcm4oYOS4i+i9vSR7cGF0aH0uanNvbuWksei0pe+8jOmUmeivr+S4umAsIGZhaWxNc2cpO1xuICAgICAgbG9nZ2VyLndhcm4oYOS4i+i9vSR7cGF0aH0uanNvbuWksei0pe+8jOmUmeivr+S4umAsIGZhaWxNc2cpO1xuICAgICAgaWYgKGZhaWxGdW5jKSByZXR1cm4gZmFpbEZ1bmMoKTtcblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICog6Kej5Y6L5paH5Lu2XG4gKiBAcGFyYW0gcGF0aCDljovnvKnmlofku7bot6/lvoRcbiAqIEBwYXJhbSB1bnppcFBhdGgg6Kej5Y6L6Lev5b6EXG4gKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCD5Ye95pWwXG4gKiBAcGFyYW0gYXJncyDlm57osIPlh73mlbDnmoTlj4LmlbBcbiAqL1xuY29uc3QgdW56aXAgPSAocGF0aDogc3RyaW5nLCB1bnppcFBhdGg6IHN0cmluZywgY2FsbGJhY2s/OiAoLi4uYXJnczogYW55W10pID0+IHZvaWQsIC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gIGZpbGVNYW5hZ2VyLnVuemlwKHtcbiAgICB6aXBGaWxlUGF0aDogYCR7dXNlclBhdGh9LyR7cGF0aH1gLCB0YXJnZXRQYXRoOiBgJHt1c2VyUGF0aH0vJHt1bnppcFBhdGh9YCxcbiAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICBpZiAoY2FsbGJhY2spIHJldHVybiBjYWxsYmFjayguLi5hcmdzKTtcblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBmYWlsOiBmYWlsTXNnID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHVuemlwICR7cGF0aH0gZmFpbDpgLCBmYWlsTXNnKTtcbiAgICAgIGxvZ2dlci53YXJuKGB1bnppcCAke3BhdGh9IGZhaWw6YCwgZmFpbE1zZyk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgRGVsZXRlLCBnZXRKc29uLCBNYW5hZ2VyOiBmaWxlTWFuYWdlciwgbGlzdEZpbGUsIHJlYWRGaWxlLCByZWFkSnNvbixcbiAgbWFrZURpciwgc2F2ZUZpbGUsIHNhdmVPbmxpbmVGaWxlLCB3cml0ZUZpbGUsIHdyaXRlSnNvbiwgdW56aXBcbn07Il19