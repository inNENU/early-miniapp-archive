# 参数说明

> Version 1.0.8
>
> Author：Mr.Hope
> Last edit at 2018/02/08
---

## **有效的tag值：**

- [head](#head参数必填仅用一次填在最前)：小程序界面的头部，包括标题和navigationBar
- [h3](#h3参数)：大标题
- [p](#p参数)：段落(可附带段落标题和段落图片)
- [list](#list参数)：列表(可附带普通文字描述、跳转组件、按钮、选择器、开关和滑块等)
- [img](#img参数)：图片(可附带图片说明)
- [doc](#doc参数)：文档(支持office与pdf文件)
- [phone](#phone参数)：电话(用于电话展示、快速保存联系人或拨打电话)
- [grid](#grid参数)：九宫格(展示格子)
- [swiper](#swiper参数)：滑块视图容器(可以制作图片轮播图)
- [audio](#audio参数)：音频(页面音频播放)
- [gzh](#gzh参数)：公众号跳转组件(仅支持跳转绑定公众号图文)
- [foot](#foot参数)：界面的页脚(页脚信息展示)

## **head参数：**(必填，仅用一次填在最前）

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|title|是|String|标题和导航栏显示的文字||
|desc|否|String|标题描述文字|该文字只在特定主题下展示|
|action|否|String|左上角按钮触发的函数名称|不填时默认执行返回，设置为true来隐藏默认的返回按钮|
|grey|否|Boolean|设置true使用灰色背景|默认为白色背景|
|display|否|Boolean|设置true隐藏head|默认显示head|
|shareable|否|Boolean|设置界面是否可以被分享|默认为false|
|contact|否|Boolean|显示“联系开发者”按钮|默认为false|
|feedback|否|Boolean|显示“意见反馈”按钮|默认为false|

## **h3参数：**

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|text|是|String|展示页的大标题文字||
|style|否|String|设置标题风格|填入css样式|

## **p参数：**

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|head|否|String或Boolean|填入段落的的标题|填入true会在段落前留空占位|
|text|是|String|段落的文字||
|align|否|String|段落的对齐方式|仅支持left(默认)、right、center、justify|
|src|否|String|图片的本地路径或在线网址|会在段落文字底部展示所选图片|
|desc|是|String|图片的描述文字|填入后会自动最前加入一个三角号，不填则没有描述文字|
|res|否|String|图片在服务器上的网址|需要高清图片时设置|
|imgmode|否|String|图片的显示模式|默认为widthFix|
|style|否|String|设置段落文字风格|填入css样式|

## **list参数：**

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|head|否|String或Boolean|列表的的标题，不填会在标题所在处留空占位|设置为false来取消留空占位|
|foot|否|String|列表的结尾小标题||
|content|是|array|该array的每个element为列表的每个组成单元||

### 列表每一项参数：

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|icon|否|String|列表图标的本地路径或在线网址||
|text|是|String|列表单元的显示文字||
|display|否|Boolean|设置为false时隐藏该列表项|默认为true|

#### 选项一：普通列表(可带链接)

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|desc|否|String|列表内容的描述||
|aim|否|String|对应界面的json文件名|当指向简单界面时填写|
|url|否|String|列表指向的界面路径|当指向复杂界面时填写|
|navigate|否|Boolean|设置true使用navigator组件|默认为false|
|openType|否|String|微信提供的开放能力|仅navigate为true时有效|
|target|否|String|跳转目标|仅navigate为true时有效|

#### 选项二：开关（填写Switch后不支持简单界面）

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|swiKey|是|String|所控变量在storage中的key值||
|Switch|否|String|开关对应的函数名称|不填仅改变storage中swiKey的值|
|color|否|String|开关颜色|同css的color填入rgb代码|

#### 选项三：选择器

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|pickerValue|是|String|选择器中包含的值|使用变量表示时不支持简单界面|
|key|是|String|选择器所改变的变量在本地存储中的名称||
|single|否|Boolean|设置true时为单列选择器|默认为多列选择器|
|inlay|否|Boolean|设置true时为嵌入式picker|默认为弹出式picker|
|picker|否|String|picker选择器对应的函数名称|不填仅改变界面显示值与storage中key的值；|

#### 选项四：按钮（不支持简单界面）

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|button|是|String|按钮对应的函数名称||
|disabled|否|Boolean|设置为true会禁用按钮|默认不禁用|

#### 选项五：滑块（不支持简单界面）

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|slider|是|String|滑块对应的的函数名称||
|sliKey|是|String|所控变量在storage中的key值||
|min|否|Number|滑块的最小值|默认为0|
|max|否|Number|滑块的最大值|默认为100|
|step|否|Number|滑块的步长|默认为1|

## **img参数：**

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|src|是|String|图片的本地路径或在线网址||
|res|否|String|图片在服务器上的网址|需要高清图片的时候使用|
|lazy|否|Boolean|设置false取消图片lazyload|默认执行lazyload|
|desc|否|String|图片的描述文字|填入后会自动最前加入一个三角号，不填则没有描述文字|
|imgmode|否|String|图片显示模式|默认为widthFix|

*Tips：* 图片懒加载是指只有图片滚动到页面显示区域才开始加载图片。

## **doc参数：**

|参数|必填|值类型|内容|
|-|:-:|:-:|-|
|docName|是|String|文档名称|
|url|是|String|文档在线路径|

> 文档类别仅支持doc、docx、ppt、pptx、xls、xlsx、pdf、jpg、jpeg、png、gif。
>
> 文档名称请加入文件后缀名，文件名称中不要加入其他的`.`避免造成解析错误。

## **phone参数：**

|参数|必填|值类型|内容|
|-|:-:|:-:|-|
|num|是|String或Number|联系人电话号码|
|fName|是|String|联系人的名|
|lName|否|String|填入联系人的姓|
|org|否|String|联系人所在公司|
|remark|否|String|联系人的备注|
|workNum|否|String或Number|联系人的工作电话|
|nickName|否|String|联系人的昵称|
|head|否|String|联系人头像图片路径(仅限本地路径)|
|wechat|否|String|联系人的微信号|
|province|否|String|联系人的地址省份|
|city|否|String|联系人的地址城市|
|street|否|String|联系人的地址街道|
|postCode|否|String|联系人的地址邮政编码|
|title|否|String|联系人的职位|
|hostNum|否|String|联系人的公司电话|
|website|否|String|联系人的网站|
|email|否|String|联系人的电子邮件|
|homeNum|否|String或Number|联系人的住宅电话|

## **grid参数**（强烈推荐使用4的整数倍）：

|参数|必填|值类型|内容|
|-|:-:|:-:|-|
|head|否|String|九宫格的标题文字|
|foot|否|String|九宫格的页脚文字|
|content|是|array|该array的每个element是九宫格的每个格子内容|

### 每个格子参数如下：

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|:-:|
|icon|否|String|九宫格的图标的在线路径或本地路径||
|text|否|String|九宫格的文字||
|aim|否|String|对应界面的json文件名|当指向简单界面时填写|
|url|否|String|九宫格指向的界面路径|当指向复杂界面时填写|

## **swiper参数：**

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|url|是|array|swiper展示的图片的在线网址或本地路径|将所有图片按顺序填入该array的每个element|
|Class|否|String|swiper的类名|默认为width:100%;height:400rpx;|
|style|否|String|swiper的样式|使用css改变swiper的风格|
|indicatorDots|否|Boolean|设置false不显示面板指示点|默认显示|
|dotColor|否|String|指示点颜色|默认为#ffffff88|
|dotActiveColor|否|String|当前选中的指示点颜色|默认为#fff|
|autoplay|否|Boolean|设置为false取消自动切换|默认开启|
|interval|否|Number|自动切换时间间隔|默认为5000|
|duration|否|Number|滑动动画时长|默认为500|
|circular|否|Boolean|设置为false不采用衔接滑动|默认开启|
|vertical|否|Boolean|设置true滑动方向为纵向|默认为横向|
|preMargin|否|String|露出出前一项的边距|默认为0px，接受 px 和 rpx 值|
|nextMargin|否|String|露出出后一项的边距|默认为0px，接受 px 和 rpx 值|
|change|否|String|swiper改变时触发的函数名称|默认不触发函数|
|animation|否|String|swiper动画结束时触发的函数名称|默认不触发函数|
|imgClass|否|String|swiper中图片的类名|默认为width:100%!important;height:100%!important;|
|imgMode|否|String|swiper中图片的显示模式|默认为aspectFill|

## **audio参数：**

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|res|是|String|音频文件的在线网址或本地路径||
|loop|否|Boolean|是否循环播放|默认为false|
|controls|否|Boolean|设置false来取消显示默认控件|默认显示|
|name|否|Boolean|音频名字|controls为false时无效|
|author|否|Boolean|音频作者|controls为false时无效|

## **video参数：**

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|res|是|String|要播放视频的资源地址||
|loop|否|Boolean|是否循环播放|默认为false|
|controls|否|Boolean|设置false来取消显示默认控件|默认显示|
|poster|否|String|视频封面的图片网络资源地址|controls为false时无效|
|autoplay|否|Boolean|是否自动播放|默认为false|
|startTime|否|Boolean|视频初始播放位置||
|danmu-list|否|Object Array|弹幕列表||
|danmu-btn|否|Boolean|是否显示弹幕按钮|只在初始化有效|

## **gzh参数：**

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|url|是|String|跳转的图文链接||
|src|是|String|封面图片在线地址||
|title|是|String|图文标题||
|desc|是|String|图文描述||
|icon|否|String|公众号的头像在线地址||
|gzhName|否|String|公众号名称||

## **intro参数：**

|参数|必填|值类型|内容|
|-|:-:|:-:|-|
|name|是|String|介绍主题的名字|
|src|是|String|头像图标在线地址|
|desc|是|String|介绍主题的描述|

## **foot参数：**

|参数|必填|值类型|内容|
|-|:-:|:-:|-|
|desc|否|String|页脚的额外描述文字|
|author|否|String|编辑人|
|time|否|String|编辑时间|

## imgMode可以选择的参数：

- widthFix：宽度不变，高度自动变化，保持原图宽高比不变;
- scaleToFill：保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素；
- aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来；
- aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来；
- top：不缩放图片，只显示图片的顶部区域；
- bottom：不缩放图片，只显示图片的底部区域；
- center：不缩放图片，只显示图片的中间区域；
- left：不缩放图片，只显示图片的左边区域；
- right：不缩放图片，只显示图片的右边区域；
- top left：不缩放图片，只显示图片的左上边区域；
- top right：不缩放图片，只显示图片的右上边区域；
- bottom left：不缩放图片，只显示图片的左下边区域；
- bottom right：不缩放图片，只显示图片的右下边区域；