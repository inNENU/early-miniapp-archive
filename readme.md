 **这是一个由Mr.Hope独立编写的项目。全部代码均由Mr.Hope编写，如有抄袭、商用，Mr.Hope保留追究其责任的权利。** 

### 一. 界面文件初始代码添加
#### 当新建界面以后，请执行以下步骤：
 **1.将界面添加至app.json中的pages数组中。** 

 **2.在js中输入：** 
```
var u = getApp().util, a = getApp().globalData;
Page({
  data: {
    page: [
      **插入内容** 
    ],
  },
  onLoad(e) { this.setData({ T: a.T, nm: a.nm, page: u.sP(this.data.page, a, e) }) },
  onPageScroll(e) { let p = u.nav(e, this.data.page); if (p) { this.setData({ page: p }) } },
  back() { u.back() },
})
```
 _**Tips：**_ 

界面若为首页，请将onLoad改为onShow，并删除back函数。

为了方便查错以及后续更改，在复制粘贴时保留原代码换行及缩进样式。


 **3.在视图层输入：** 
```
<import src="/templates/empty" />
<import src="/templates/iOS" />
<import src="/templates/wechat" />
<view class="{{T}} {{nm?'nm':''}}">
  <template wx:for="{{page}}" wx:key is="{{page[0].T}}{{item.name}}" data="{{item}}" />
</view>
```
 _**Tips：**_ 
如果所输入界面包含列表，请在**第四行{{T}}后**添加**grey**，即：
```
<import src="/templates/empty" />
<import src="/templates/iOS" />
<import src="/templates/wechat" />
<view class="{{T}}grey {{nm?'nm':''}}">
  <template wx:for="{{page}}" wx:key is="{{page[0].T}}{{item.name}}" data="{{item}}" />
</view>
```

至此，界面初始代码添加完成。


### 二、界面内容编写

页面的编写主要通过操纵处于界面data下名为**page**的**array**来完成。该**array**的每个元素均为一个**Object**。对于数组中的每个**Object**，其内必须包含**一个有效的tag值**，**tag值**决定了该object所显示的内容。
 
 #### **有效的tag值：** 
- head：小程序界面的头部，包括标题和navigationBar(必填，仅用一次填在最前）
- h3：大标题
- p：段落
- list：列表
- img：图片
- foot：界面的页脚(必填，仅用一次填在最后）

#### **tag**的剩余参数请依据填写的tag值按照下表填写。

##### **head参数：**
- text：输入标题和导航栏显示的文字；
- top：界面为首页时值为'ture'，非首页不填；
- desc(可选)：标题描述文字，该文字只在特定主题下展示。

##### **h3参数：**
- text：展示页的大标题文字；
- style(可选)：必要时输入css样式改变大标题的风格(字体粗细、大小、对齐、边距等)；

##### **p参数：**
- head：段落的的标题，根据实际情况填写，不填或留空会在段落前留空占位，添加参数false来取消留空占位；
- text：段落的文字，必填项；
- src(可选)：图片的本地路径或在线网址，添加后会在段落的文字底部展示所选图片，

##### **list参数：**
- head：列表的的标题，不填或留空会在标题所在处留空占位，添加参数false来取消留空占位；
- foot(可选)：列表的结尾小标题，不填则没有，不会占据额外空间；
- content： 包含一个数组，其中数组的每个对象是列表的每个组成单元；

  #####  **_列表每个单元内包含的参数_** 
  - icon(可选):列表图标的本地路径或在线网址（此内容尚未实现正在Building）；
  - text：列表单元的显示文字；

  #####  **选项一：普通列表(可带链接)**
  - desc(可选)：列表内容的描述；
  - url(可选)：列表指向的界面链接；

  #####  **选项二：开关模式**
  - switch：开关对应的函数名称；
  - key：开关所改变的变量在storage中的key值；

  #####  **选项三：嵌入式picker**
  - pickerValue：picker选择器中包含的值；
  - pickerKey：picker所改变的变量在storage中的key值；

##### **img参数：**
- src:图片的本地路径或在线网址；
- lazy:图片懒加载，默认不填执行懒加载，若要取消将此属性设为false；
- text(可选)：图片的描述文字，自动最前加入一个三角号，不填则没有描述文字；
- imagemode：图片的显示模式，默认不填设定为widthfix：宽度不变，高度自动变化，保持原图宽高比不变;

  ##### **_其他可以选择的参数：_** 
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

### 三、函数的编写
#####  请在 **→ ←** 中填入pages数组中定义的变量名称。并在“other codes here”处填入其他必要代码。

 ##### **img函数** 

```
  img(e) { let p = u.img(this.data.page, e); this.setData({ page: p }) } },
```
 ##### **picker函数** 

```
  pV(e) { this.setData({ page: u.pV(this.data.page, e) }) },
```
 ##### **switch函数**

- functionName：在page数组中填入的switch值；
- key：在pages数组中填入的key值；
```
→functionName←(e) {
    other code here......
    this.setData({ page: u.sS(this.data.page, e) });
  },
```