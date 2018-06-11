# 许可
> Version 1.0.2 update grid update wxml

 **这是一个由Mr.Hope独立编写的项目。全部代码均由Mr.Hope编写，如有抄袭、商用，Mr.Hope保留追究其责任的权利。** 
### 一. 简单界面编写说明

**1. 新建一个json文件，对文件进行合理命名，使用“文件主题+编号”格式，命名为xxx.json。**

**2. 在json中建一个数组，页面的编写主要通过该array来完成。该array的每个元素均为一个Object。对于数组中的每个Object，其内必须包含一个有效的tag值，tag值决定了该object所显示的内容。按照tag值参数表对数组进行填写，编写界面内容。**

**3.上传json文件到服务器的htdocs/miniProgram文件夹，添加json文件名至fileList.json并增加其版本号。**

### 二. 复杂界面编写说明

 对文件进行合理命名，使用“文件主题+编号”格式。

 **1.在指定的路径下新建xxx.js与xxx.wxml文件，并将其界面路径添加至app.json中的pages数组中。**

 **2.在xxx.js中输入：** 
```
var u = getApp().util,
  a = getApp().globalData;
Page({
  onLoad(e) {
    u.gC(this, a, e)
  },
  onPageScroll(e) {
    u.nav(e, this)
  },
  cA(e) {
    u.cA(e, this)
  }
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
    u.pV(e,this);
    other code here......
  },
```
##### **switch函数**
- 若填写了switch函数：
    functionName：switch函数值；
```
→functionName←(e) {
    u.sS(e,this);
    other code here......
  },
```
##### slider函数：
    functionName：switch函数值；
```
  →functionName←(e){
    u.sl(e,this);
    other code here......
  },
```
# tag值参数表
 #### **有效的tag值：** 
- head：小程序界面的头部，包括标题和navigationBar(必填，仅用一次填在最前）
- h3：大标题
- p：段落
- list：列表
- img：图片
- doc：文档
- phone：电话
- foot：界面的页脚(必填，仅用一次填在最后）
- grid：九宫格
- swiper：滑块

#### **tag**的剩余参数请依据填写的tag值按照下表填写。

##### **head参数：**
- text：输入标题和导航栏显示的文字；
- desc(可选)：标题描述文字，该文字只在特定主题下展示。
- top(根据需要)：界面为首页时值为'ture'，非首页不填；
- grey(根据需要)：添加"grey:true"属性值会用灰色背景取代默认的白色背景；

##### **h3参数：**
- text：展示页的大标题文字；
- style(可选)：必要时输入css样式改变大标题的风格(字体粗细、大小、对齐、边距等)；

##### **p参数：**
- head(可选)：段落的的标题，根据实际情况填写，不填或留空会在段落前留空占位，添加参数false来取消留空占位；
- text：段落的文字；
- src(可选)：图片的本地路径或在线网址，添加后会在段落的文字底部展示所选图片；
- res(可选)：图片在服务器上的网址(在需要高清图片的时候使用此选项)；

##### **list参数：**
- head(可选)：列表的的标题，不填或留空会在标题所在处留空占位，添加参数false来取消留空占位；
- foot(可选)：列表的结尾小标题，不填则没有，不会占据额外空间；
- content：其本身是一个数组，数组的每个对象是列表的每个组成单元；

  #####  **_列表每个单元内包含的参数_** 
  - icon(可选):列表图标的本地路径或在线网址；
  - text：列表单元的显示文字；

  #####  **选项一：普通列表(可带链接)**
  - desc(可选)：列表内容的描述；
  - aim(可选)：当指向简单界面时填写，填入对应界面的json文件名；
  - url(可选)：当指向复杂界面时填写，填入列表指向的界面路径；

  #####  **选项二：开关**
  - Switch(可选)：开关对应的函数名称，不填默认触发switch函数——改变界面当前开关状态与storage中swiKey的值；（填写后不支持简单界面）
  - swiKey：开关所改变的变量在本地存储中的变量值；

  #####  **选项三：选择器**（不支持简单界面）
  - pickerValue：选择器中包含的值；
  - key：选择器所改变的变量在本地存储中的变量值；
  - single(可选)：其值为true时为单列选择器，不填为多列选择器；
  - inlay(可选)：其值为true时为嵌入式picker，不填为弹出式picker；
  - picker(可选)：picker选择器对应的函数名称(不填默认触发pV函数);

  #####  **选项四：按钮**（不支持简单界面）
  - button：按钮对应的函数名称；

  #####  **选项五：滑块**（不支持简单界面）
  - slider：滑块对应的的函数名称；
  - min(可选)：滑块的最小值(不填默认为0)；
  - max(可选)：滑块的最大值(不填默认为100)；
  - step(可选)：滑块的步长(不填默认为1)；
  - sliKey：滑块所改变的变量在本地存储中的变量值；

##### **img参数：**
- src：图片的本地路径或在线网址；
- res(可选)：图片在服务器上的网址(在需要高清图片的时候使用此选项)；
- lazy(根据需要)：图片懒加载，默认不填执行懒加载，若要取消将此属性设为false；
- text(可选)：图片的描述文字，自动最前加入一个三角号，不填则没有描述文字；
- imagemode(根据需要)：图片的显示模式，不填为appData设定的默认值；

  ##### **_可以选择的参数：_** 
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

##### **doc参数：**
- docName：文档的名称；
- docType：文档的类型，可以填写的值有“doc、docx、ppt、pptx、xls、xlsx、pdf”；
- url：文档在服务器的路径；

##### **phone参数：**
- num：电话号码；
- lName(可选)：姓；
- fName：名；
- org(可选)：联系人所在公司；
- remark(可选)：联系人的备注；
- workNum(可选)：工作电话；
- nickName(可选)：昵称；
- head(可选)：头像图片路径(仅限本地路径)；
- wechat(可选)：微信号；
- province(可选)：联系地址省份；
- city(可选)：联系地址城市；
- street(可选)：联系地址街道；
- postCode(可选)：联系地址邮政编码；
- title(可选)：职位；
- hostNum(可选)：公司电话；
- website(可选)：网站；
- email(可选)：电子邮件；
- homeNum(可选)：住宅电话；

##### **grid参数：**（强烈推荐使用4的整数倍）
- head：九宫格的标题文字；
- foot：九宫格的页脚文字；
- content：其本身是一个数组，数组的每个对象是九宫格的每个格子内容；

  #####  **_列表每个单元内包含的参数_** 
  - icon：九宫格的图标的在线路径或本地路径；
  - text：九宫格的文字；
  - url：九宫格指向的页面路径；

  ##### **swiper参数：**
- url：填入一个数组，数组依次是swiper展示的图片的在线网址或本地路径；
- Class(可选)：swiper的类名，方便使用css样式表中的定义；
- style(可选)：必要时输入css样式改变swiper的风格；
- indicatorDots(可选)：是否显示面板指示点，不填默认为true，取消显示将此项设置为false；
- dotColor(可选)：指示点颜色，不填默认为rgba(255, 255, 255, 0.5)即50%透明度的纯白色；
- dotActiveColor(可选)：当前选中的指示点颜色，不填默认为#fff(纯白色)；
- autoplay(可选)：是否自动切换，不填默认为true，取消自动切换将此项设置为false；
- interval(可选)：自动切换时间间隔，不填默认为5000；
- duration(可选)：滑动动画时长，不填默认为500；
- circular(可选)：是否采用衔接滑动，不填默认为true，取消自动切换将此项设置为false；
- vertical(可选)：滑动方向是否为纵向，不填默认为false，取消自动切换将此项设置为true；
- preMargin(可选)：前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值，不填默认为0px；
- nextMargin(可选)：后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值，不填默认为0px；
- change(可选)：swiper改变时触发的函数名称，不填默认触发cA；
- animation(可选)：swiper动画结束时触发的函数名称，不填默认触发cA；
- imgClass(可选)：swiper中图片的类名，方便使用css样式表中的定义；
- imgMode(可选)：swiper中图片的显示模式，不填默认为widthFix；

  ##### **_可以选择的参数：_** 
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