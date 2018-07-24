# 许可
> Version 1.0.4

 **这是一个由Mr.Hope独立编写的项目。全部代码均由Mr.Hope编写，如有抄袭、商用，Mr.Hope保留追究其责任的权利。** 
### 一. 简单界面编写说明

**1. 新建一个json文件，对文件进行合理命名，使用“文件主题+编号”格式，命名为xxx.json。**

**2. 在json中创建一个array，页面的编写主要通过该array来完成。该array的每个元素均为一个Object。对于数组中的每个Object，其内必须包含一个有效的tag值，tag值决定了该object所显示的内容。按照tag值参数表对数组进行填写，编写界面内容。**

**3.上传json文件到服务器的htdocs/miniProgram文件夹，添加json文件名至fileList.json并增加其版本号。**

### 二. 复杂界面编写说明

 对文件进行合理命名，使用“文件主题+编号”格式。

 **1.在指定的路径下新建xxx.js与xxx.wxml文件，并将其界面路径添加至app.json中的pages数组中。**

 **2.在xxx.js中输入：** 
```
var c = getApp().commmon,
	a = getApp().globalData;
Page({
	onLoad(e) {
		c.getContent(this, a, e)
	},
	onReady() {
		c.preloadPage(this.data.page, a);
	},
	onPageScroll(e) {
		c.nav(e, this)
	},
	cA(e) {
		c.componentAction(e, this)
	},
	**其他函数**
})
```
 _**Tips：**_ 

界面若为首页，请将onLoad改为onShow，并删除back函数。
为了方便查错以及后续更改，在复制粘贴时保留原代码换行及缩进样式。

 **3.在xxx.wxml中输入：** 
```
<import src="/templates/template" />
<view class="{{T}}{{page[0].grey?'grey':''}} {{nm?'nm':''}}">
  <template wx:for="{{page}}" wx:key is="{{T}}{{item.tag}}" data="{{item}}" />
</view>
```
**4. 对照tag值参数表文件进行界面内容编写。**

页面的编写主要通过操纵处于界面data下名为**page**的**array**来完成。该**array**的每个元素均为一个**Object**。对于数组中的每个**Object**，其内必须包含**一个有效的tag值**，**tag值**决定了该object所显示的内容。
 
**5. 在xxx.js中添加与编写函数。**
#####  请在 **→ ←** 中填入pages数组中定义的变量名称。并在“other codes here”处填入其他必要代码。
##### **picker函数**
- 若填写了picker函数：
 functionName：picker函数值；
```
→functionName←(e) {
    u.picker(e,this);
    other code here......
  },
```
##### **switch函数**
- 若填写了switch函数：
    functionName：switch函数值；
```
→functionName←(e) {
    u.Switch(e,this);
    other code here......
  },
```
##### slider函数：
    functionName：switch函数值；
```
  →functionName←(e){
    u.slider(e,this);
    other code here......
  },
```

# tag值参数表
 #### **有效的tag值：** 
- head：小程序界面的头部，包括标题和navigationBar
- h3：大标题
- p：段落
- list：列表
- img：图片
- doc：文档
- phone：电话
- grid：九宫格
- swiper：滑块视图容器
- foot：界面的页脚

#### **tag**的剩余参数请依据填写的tag值按照下表填写。

##### **head参数：**(必填，仅用一次填在最前）
|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|title|是|String|标题和导航栏显示的文字||
|desc|否|String|标题描述文字|该文字只在特定主题下展示|
|action|否|String|左上角按钮触发的函数名称|不填时默认执行返回，设置为true来隐藏默认的返回按钮|
|grey|否|Boolean|属性值为true时会使用灰色背景|不填会使用白色背景|
|display|否|Boolean|设置true隐藏head|默认显示head|

##### **h3参数：**
|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|text|是|String|展示页的大标题文字||
|style|否|String|对标题设置的css样式|当需要改变默认风格时设置|

##### **p参数：**
|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|head|否|String或Boolean|填入段落的的标题|填入true会在段落前留空占位|
|text|是|String|段落的文字||
|src|否|String|图片的本地路径或在线网址|会在段落文字底部展示所选图片|
|res|否|String|图片在服务器上的网址|需要高清图片时设置|
|imgmode|否|String|图片的显示模式|默认为widthFix|
|style|否|String|对段落文字设置的css样式|当需要改变默认风格时设置|

##### **list参数：**
|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|head|否|String或Boolean|列表的的标题，不填会在标题所在处留空占位|设置为false来取消留空占位|
|foot|否|String|列表的结尾小标题||
|content|是|array|该array的每个element为列表的每个组成单元||

**_列表每个单元内包含的参数_**

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|icon|否|String|列表图标的本地路径或在线网址||
|text|是|String|列表单元的显示文字||

**选项一：普通列表(可带链接)**

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|desc|否|String|列表内容的描述||
|aim|否|String|对应界面的json文件名|当指向简单界面时填写|
|url|否|String|列表指向的界面路径|当指向复杂界面时填写|

**选项二：开关**

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|Switch|否|String|开关对应的函数名称|不填会自动改变界面当前开关状态与storage中swiKey的值（填写后不支持简单界面）|
|swiKey|是|String|开关所改变的变量在本地存储中的属性名||

**选项三：选择器**

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|pickerValue|是|String|选择器中包含的值|使用变量表示时不支持简单界面|
|key|是|String|选择器所改变的变量在本地存储中的名称||
|single|否|Boolean|设置true时为单列选择器|默认为多列选择器|
|inlay|否|Boolean|设置true时为嵌入式picker|默认为弹出式picker|
|picker|否|String|picker选择器对应的函数名称|不填会自动改变界面当前选择状态与storage中key的值；|

**选项四：按钮**（不支持简单界面）

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|button|是|String|按钮对应的函数名称||
|disabled|否|Boolean|设置为true会禁用按钮|默认不禁用|
|open-type|是|String|填入微信支持的开放能力||

**选项五：滑块**（不支持简单界面）

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|slider|是|String|滑块对应的的函数名称||
|sliKey|是|String|滑块所改变的变量在本地存储中的名称||
|min|否|Number|滑块的最小值|默认为0|
|max|否|Number|滑块的最大值|默认为100|
|step|否|Number|滑块的步长|默认为1|

##### **img参数：**
|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|src|是|String|图片的本地路径或在线网址||
|res|否|String|图片在服务器上的网址|需要高清图片的时候使用|
|lazy|否|Boolean|设置false取消图片懒加载功能|默认执行lazyload|
|text|否|String|图片的描述文字|填入后会自动最前加入一个三角号，不填则没有描述文字|
|imgmode|否|String|图片的显示模式|默认为widthFix|

##### **doc参数：**
|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|-|
|docName|是|String|文档的名称||
|docType|是|String|文档的类|可以填写的值有doc、docx、ppt、pptx、xls、xlsx、pdf|
|url|是|String|文档在服务器的路径||

##### **phone参数：**
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

##### **grid参数：**（强烈推荐使用4的整数倍）
|参数|必填|值类型|内容|
|-|:-:|:-:|-|
|head|否|String|九宫格的标题文字|
|foot|否|String|九宫格的页脚文字|
|content|是|array|该array的每个element是九宫格的每个格子内容|

**_列表每个单元内包含的参数_** 

|参数|必填|值类型|内容|备注|
|-|:-:|:-:|-|:-:|
|icon|否|String|九宫格的图标的在线路径或本地路径||
|text|否|String|九宫格的文字||
|aim|否|String|对应界面的json文件名|当指向简单界面时填写|
|url|否|String|九宫格指向的界面路径|当指向复杂界面时填写|

##### **swiper参数：**
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

#### **imgMode可以选择的参数：**
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