# 许可
---
 **这是一个由Mr.Hope独立编写的项目。全部代码均由Mr.Hope编写，如有抄袭、商用，Mr.Hope保留追究其责任的权利。** 



#开发说明
---
### 一. 简单界面编写说明

**1. 新建一个json文件，对文件进行合理命名，使用“文件主题+编号”格式，命名为xxx.json。**

**2. 在json中创建一个array，页面的编写主要通过该array来完成。该array的每个元素均为一个Object。对于数组中的每个Object，其内必须包含一个有效的tag值，tag值决定了该object所显示的内容。按照tag值参数表对数组进行填写，编写界面内容。每一个Objedct最终被渲染成为了页面的一部分。**

**3.提交json文件至QQ1178522294**

### 二. 复杂界面编写说明

 对文件进行合理命名，使用“文件主题+编号”格式。

 **1.在指定的路径下新建xxx.js与xxx.wxml文件，并将其界面路径添加至app.json中的pages数组中。**

 **2.在xxx.js中输入：** 
```
var P = require('`page函数库路径`'),
  S = require('`setPage函数库路径`'),
  a = getApp().globalData;
Page({
	data:{
		page:[
			**此处填写page**
		]
	},
	onPreload(res) {

  },
	onNavigate(res){

	},
  onLoad() {
    this.setData({
      T: a.T,
      nm: a.nm
    })
    if (!this.set) {
      S.Set(this.data.page, a, null, this, false);
    };
    S.Notice(this.aim);
  },
  onReady() {
    S.preLoad(this, a);
  },
  onPageScroll(e) {
    S.nav(e, this)
  },
  cA(e) {
    S.component(e, this)
  },
  onShareAppMessage() {
    return {
      title: "你想要的分享标题",
      path: `界面路径`
    }
  },
	**其他函数**
})
```
 _**Tips：**_ 
为了方便查错以及后续更改，在复制粘贴时保留原代码换行及缩进样式。

 **3.在xxx.wxml中输入：** 
```
<import src="/templates/template" />
<template is="all" data="{{page,T,nm}}" />
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
    S.picker(e,this);
    other code here......
  },
```
##### **switch函数**
- 若填写了switch函数：
    functionName：switch函数值；
```
→functionName←(e) {
    S.Switch(e,this);
    other code here......
  },
```
##### slider函数：
    functionName：switch函数值；
```
  →functionName←(e){
    S.slider(e,this);
    other code here......
  },
```