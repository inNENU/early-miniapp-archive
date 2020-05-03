# 参数说明

[![作者：Mr.Hope](https://img.shields.io/badge/作者-Mr.Hope-blue.svg?style=for-the-badge)](https://mrhope.site)

![Node CI](https://github.com/Mister-Hope/inNENU-mp/workflows/Node%20CI/badge.svg)

<!--
wx9ce37d9662499df3

wx33acb831ee1831a5

"plugins": {
  "tencentvideo": {
    "version": "1.3.6",
      "provider": "wxa75efa648b60994b"
  }
}
-->

## **有效的 tag 值：**

- [head](#head参数)：小程序界面的头部，包括标题和 navigationBar
- [title](#title参数)：大标题
- [p](#p参数)：段落(可附带段落标题和段落图片)
- [list](#list参数)：列表(可附带普通文字描述、跳转组件、按钮、选择器、开关和滑块等)
- [img](#img参数)：图片(可附带图片说明)
- [doc](#doc参数)：文档(支持 office 与 pdf 文件)
- [phone](#phone参数)：电话(用于电话展示、快速保存联系人或拨打电话)
- [grid](#grid参数)：九宫格(展示格子)
- [swiper](#swiper参数)：滑块视图容器(可以制作图片轮播图)
- [media](#media参数)：媒体(页面音频视频播放)
- [gzh](#gzh参数)：公众号跳转组件(仅支持跳转绑定公众号图文)
- [foot](#foot参数)：界面的页脚(页脚信息展示)

## head 参数

生成导航栏。必填，仅用一次填在第一个。

| 参数     | 必填 |      值类型       | 内容             | 备注                                                                                 |
| -------- | :--: | :---------------: | ---------------- | ------------------------------------------------------------------------------------ |
| title    |  是  |      String       | 导航栏标题       | 一般不超过八个字，六字以下为佳                                                       |
| desc     |  否  |      String       | 标题描述文字     | 该描述文字仅在特定主题下展示，所以仅供补充界面主题，不可放置重要信息                 |
| action   |  否  | String \| Boolean | 左上角按钮函数名 | 填入按钮点击时所触发的函数名称，不填时默认执行返回，设置为 true 来隐藏默认的返回按钮 |
| grey     |  否  |      Boolean      | 使用灰色背景     | 默认为白色背景                                                                       |
| hidden   |  否  |      Boolean      | 隐藏 head        | 默认显示 head                                                                        |
| leftText |  否  |      String       | 左上角按钮文字   | 设置左上角文字，默认为上一级页面标题，一般不用填写                                   |

### share 参数

生成右下角的分享按钮，页面自动包含，填写在`head`选项中

| 参数      | 必填 | 值类型  | 内容             | 备注                                       |
| --------- | :--: | :-----: | ---------------- | ------------------------------------------ |
| shareable |  否  | Boolean | 可被分享         | 是否可以使用小程序的界面分享，默认为 false |
| contact   |  否  | Boolean | “联系开发者”按钮 | 是否在分享弹出菜单中显示，默认为 true      |
| feedback  |  否  | Boolean | “意见反馈”按钮   | 是否在分享弹出菜单中显示，默认为 true      |

## title 参数

文字标题

| 参数  | 必填 | 值类型 | 内容          |
| ----- | :--: | :----: | ------------- |
| text  |  是  | String | 大标题文字    |
| style |  否  | String | 标题 css 样式 |

## p 参数

生成段落文字

| 参数    | 必填 |       值类型       | 内容         | 备注                                                     |
| ------- | :--: | :----------------: | ------------ | -------------------------------------------------------- |
| head    |  否  | String \| Boolean  | 段落标题     | 填入 true 会留空占位                                     |
| text    |  是  | String \| String[] | 段落文字     | 测试中，如为数组则视每个元素为一个段落                   |
| align   |  否  |        Enum        | 段落对齐方式 | 仅支持`'left'`(默认)、`'right'`、`'center'`、`'justify'` |
| src     |  否  |       String       | 图片路径     | 会在段落文字底部展示所选图片，本地在线路径均可           |
| desc    |  否  |       String       | 图片描述文字 | 填入后会自动最前加入一个三角号，不填则没有描述文字       |
| res     |  否  |       String       | 图片高清地址 | 需要高清图片时设置                                       |
| imgmode |  否  |        Enum        | 图片显示模式 | 默认为 widthFix，具体选项见本页底部                      |
| style   |  否  |       String       | 段落文字样式 | 填入 css 样式，会对段落的默认样式进行覆盖                |

## list 参数

生成一个带有跳转功能、可包含图标的列表

| 参数    | 必填 |      值类型       | 内容     | 备注                                                    |
| ------- | :--: | :---------------: | -------- | ------------------------------------------------------- |
| head    |  否  | String \| Boolean | 头部标题 | 不填会在标题所在处留空占位，设置为 false 来取消留空占位 |
| foot    |  否  |      String       | 结尾标题 |                                                         |
| content |  是  |   SimpleList[]    | 列表内容 |                                                         |

### SimpleList 参数

列表每一项参数

#### 通用参数

| 参数   | 必填 | 值类型  | 内容                         |
| ------ | :--: | :-----: | ---------------------------- |
| icon   |  否  | String  | 列表图标的本地路径或在线网址 |
| text   |  是  | String  | 列表单元的显示文字           |
| hidden |  否  | Boolean | 设置为`true`时隐藏该列表项   |
| desc   |  否  | String  | 列表内容的描述               |

- 指向动态页面

| 参数 | 必填 | 值类型 | 内容                   |
| ---- | :--: | :----: | ---------------------- |
| aim  |  否  | String | 对应界面的 json 文件名 |

- 指向自定义页面页面

| 参数 | 必填 | 值类型 | 内容                       |
| ---- | :--: | :----: | -------------------------- |
| url  |  否  | String | 列表指向的界面路径或短名称 |

## List 参数

生成一个带有跳转功能、可包含图标、滑块、开关、选择器、自定义按钮功能、微信原生功能的高级列表

| 参数    | 必填 |      值类型       | 内容     | 备注                                                    |
| ------- | :--: | :---------------: | -------- | ------------------------------------------------------- |
| head    |  否  | String \| Boolean | 头部标题 | 不填会在标题所在处留空占位，设置为 false 来取消留空占位 |
| foot    |  否  |      String       | 结尾标题 |                                                         |
| content |  是  |  AdvancedList[]   | 列表内容 |                                                         |

### AdvancedList 参数

高级列表每一项参数

#### AdvancedList 通用参数

下面参数是通用语每一个选项的参数。

| 参数   | 必填 | 值类型  | 内容                         |
| ------ | :--: | :-----: | ---------------------------- |
| icon   |  否  | String  | 列表图标的本地路径或在线网址 |
| text   |  是  | String  | 列表单元的显示文字           |
| hidden |  否  | Boolean | 设置为`true`时隐藏该列表项   |
| desc   |  否  | String  | 列表内容的描述               |

#### 跳转列表

- 指向动态页面

| 参数 | 必填 | 值类型 | 内容                   |
| ---- | :--: | :----: | ---------------------- |
| aim  |  否  | String | 对应界面的 json 文件名 |

- 指向自定义页面页面

| 参数 | 必填 | 值类型 | 内容                       |
| ---- | :--: | :----: | -------------------------- |
| url  |  否  | String | 列表指向的界面路径或短名称 |

#### 原生能力

使用微信 navigator 的原生能力。

| 参数     | 必填 | 值类型  | 内容                          | 备注                       |
| -------- | :--: | :-----: | ----------------------------- | -------------------------- |
| navigate |  否  | Boolean | 设置 true 使用 navigator 组件 | 默认为 false               |
| openType |  否  | String  | 小程序提供的开放能力          | 仅 navigate 为 true 时有效 |
| target   |  否  | String  | 跳转目标                      | 仅 navigate 为 true 时有效 |

#### 开关

渲染一个开关。目前 Switch 函数无法在动态页面中定义。

| 参数   | 必填 | 值类型 | 内容                           | 备注                              |
| ------ | :--: | :----: | ------------------------------ | --------------------------------- |
| swiKey |  是  | String | 所控变量在 storage 中的 key 值 |                                   |
| Switch |  否  | String | 开关对应的函数名称             | 不填仅改变 storage 中 swiKey 的值 |
| color  |  否  | String | 开关颜色                       | 同 css 的 color 填入 rgb 代码     |

#### 选择器

渲染一个选择器。目前 Switch 函数无法在动态页面中定义。

| 参数        | 必填 | 值类型  | 内容                                 | 备注                                       |
| ----------- | :--: | :-----: | ------------------------------------ | ------------------------------------------ |
| pickerValue |  是  | String  | 选择器中包含的值                     | 使用变量表示时不支持简单界面               |
| key         |  是  | String  | 选择器所改变的变量在本地存储中的名称 |                                            |
| single      |  否  | Boolean | 设置 true 时为单列选择器             | 默认为多列选择器                           |
| inlay       |  否  | Boolean | 设置 true 时为嵌入式 picker          | 默认为弹出式 picker                        |
| picker      |  否  | String  | picker 选择器对应的函数名称          | 不填仅改变界面显示值与 storage 中 key 的值 |

#### 按钮

渲染一个自定义按钮，目前 button 函数无法在动态页面中定义。

| 参数     | 必填 | 值类型  | 内容         | 备注                                          |
| -------- | :--: | :-----: | ------------ | --------------------------------------------- |
| button   |  是  | String  | 按钮函数名   | 填入按钮点击后触发的函数名                    |
| disabled |  否  | Boolean | 是否禁用按钮 | 默认为`false`(不禁用)，一般仅供开发界面时使用 |

#### 滑块

渲染一个自定义滑块，目前 slider 函数无法在动态页面中定义。

| 参数   | 必填 | 值类型 | 内容                 | 备注                                       |
| ------ | :--: | :----: | -------------------- | ------------------------------------------ |
| sliKey |  是  | String | 滑块 Key 值          | 滑块所控变量在 storage 中的 key 值         |
| slider |  否  | String | 滑块对应的的函数名称 | 不填仅改变界面显示值与 storage 中 key 的值 |
| min    |  否  | Number | 滑块的最小值         | 默认为 0                                   |
| max    |  否  | Number | 滑块的最大值         | 默认为 100                                 |
| step   |  否  | Number | 滑块的步长           | 默认为 1                                   |

## img 参数

图片组件。

| 参数    | 必填 | 值类型  | 内容                     | 备注                                               |
| ------- | :--: | :-----: | ------------------------ | -------------------------------------------------- |
| src     |  是  | String  | 图片的本地路径或在线网址 |                                                    |
| res     |  否  | String  | 图片在服务器上的网址     | 需要高清图片的时候使用                             |
| lazy    |  否  | Boolean | 图片懒加载               | 默认执行 lazyload，设置 false 取消                 |
| desc    |  否  | String  | 图片的描述文字           | 填入后会自动最前加入一个三角号，不填则没有描述文字 |
| imgmode |  否  | String  | 图片显示模式             | 默认为 widthFix                                    |

_Tips：_ 图片懒加载是指只有图片滚动到页面显示区域才开始加载图片。

## doc 参数

文档组件。

| 参数         | 必填 | 值类型  | 内容                                  |
| ------------ | :--: | :-----: | ------------------------------------- |
| docName      |  是  | String  | 文档名称，需要使用`文件名.后缀`的格式 |
| url          |  是  | String  | 文档在线路径                          |
| downloadable |  否  | Boolean | 是否显示下载按钮                      |

> 文档类别仅支持 doc、docx、ppt、pptx、xls、xlsx、pdf、jpg、jpeg、png、gif。
>
> 文档名称务必加入文件后缀名，文件名称中不要加入其他的`.`避免造成解析错误。

## phone 参数

电话组件。

| 参数     | 必填 | 值类型 | 内容                             |
| -------- | :--: | :----: | -------------------------------- |
| num      |  是  | String | 联系人电话号码                   |
| fName    |  是  | String | 联系人的名                       |
| lName    |  否  | String | 填入联系人的姓                   |
| org      |  否  | String | 联系人所在公司                   |
| remark   |  否  | String | 联系人的备注                     |
| workNum  |  否  | String | 联系人的工作电话                 |
| nickName |  否  | String | 联系人的昵称                     |
| head     |  否  | String | 联系人头像图片路径(仅限本地路径) |
| wechat   |  否  | String | 联系人的微信号                   |
| province |  否  | String | 联系人的地址省份                 |
| city     |  否  | String | 联系人的地址城市                 |
| street   |  否  | String | 联系人的地址街道                 |
| postCode |  否  | String | 联系人的地址邮政编码             |
| title    |  否  | String | 联系人的职位                     |
| hostNum  |  否  | String | 联系人的公司电话                 |
| website  |  否  | String | 联系人的网站                     |
| email    |  否  | String | 联系人的电子邮件                 |
| homeNum  |  否  | String | 联系人的住宅电话                 |

## **grid 参数**

九宫格组件。

| 参数    | 必填 | 值类型 | 内容                                           |
| ------- | :--: | :----: | ---------------------------------------------- |
| head    |  否  | String | 九宫格的标题文字                               |
| foot    |  否  | String | 九宫格的尾部文字                               |
| content |  是  | Grid[] | 该 array 的每个 element 是九宫格的每个格子内容 |

### Grid 参数

| 参数 | 必填 | 值类型 | 内容                             |         备注         |
| ---- | :--: | :----: | -------------------------------- | :------------------: |
| icon |  否  | String | 九宫格的图标的在线路径或本地路径 |                      |
| text |  否  | String | 九宫格文字                       |                      |
| aim  |  否  | String | 对应界面的 json 文件名           | 当指向简单界面时填写 |
| url  |  否  | String | 九宫格指向的界面路径             | 当指向复杂界面时填写 |

## swiper 参数

轮播图组件。

| 参数           | 必填 |  值类型  | 内容                                  | 备注                                               |
| -------------- | :--: | :------: | ------------------------------------- | -------------------------------------------------- |
| url            |  是  | string[] | swiper 展示的图片的在线网址或本地路径 | 将所有图片按顺序填入该 array 的每个 element        |
| Class          |  否  |  String  | swiper 的类名                         | 默认为 width:100%;height:400rpx;                   |
| style          |  否  |  String  | swiper 的样式                         | 填入 css 样式                                      |
| indicatorDots  |  否  | Boolean  | 面板指示点                            | 默认显示，设置 false 取消                          |
| dotColor       |  否  |  String  | 指示点颜色                            | 默认为#ffffff88                                    |
| dotActiveColor |  否  |  String  | 当前选中的指示点颜色                  | 默认为#fff                                         |
| autoplay       |  否  | Boolean  | 设置为 false 取消自动切换             | 默认开启                                           |
| interval       |  否  |  Number  | 自动切换时间间隔                      | 默认为 5000                                        |
| duration       |  否  |  Number  | 滑动动画时长                          | 默认为 500                                         |
| circular       |  否  | Boolean  | 设置为 false 不采用衔接滑动           | 默认开启                                           |
| vertical       |  否  | Boolean  | 设置 true 滑动方向为纵向              | 默认为横向                                         |
| preMargin      |  否  |  String  | 前一项露出边距                        | 默认为 0px，接受 px 和 rpx 值                      |
| nextMargin     |  否  |  String  | 后一项露出边距                        | 默认为 0px，接受 px 和 rpx 值                      |
| change         |  否  |  String  | swiper 改变时触发的函数名称           | 默认不触发函数                                     |
| animation      |  否  |  String  | swiper 动画结束时触发的函数名称       | 默认不触发函数                                     |
| imgClass       |  否  |  String  | swiper 中图片的类名                   | 默认为 width:100%!important;height:100%!important; |
| imgMode        |  否  |  String  | swiper 中图片的显示模式               | 默认为 aspectFill                                  |

> 注：swiper 默认高度为 400rpx，可以通过 style 属性调节

## media 参数

媒体组件，可用作插入视频和音频。

| 参数     | 必填 |       值类型       | 内容                          | 备注         |
| -------- | :--: | :----------------: | ----------------------------- | ------------ |
| type     |  是  | 'audio' \| 'video' | 媒体种类                      |              |
| src      |  是  |       String       | 媒体文件的在线网址或本地路径  |              |
| loop     |  否  |      Boolean       | 是否循环播放                  | 默认为 false |
| controls |  否  |      Boolean       | 设置 false 来取消显示默认控件 | 默认显示     |

### audio 参数

| 参数   | 必填 | 值类型 | 内容     | 备注                     |
| ------ | :--: | :----: | -------- | ------------------------ |
| name   |  否  | String | 音频名字 | controls 为 false 时无效 |
| author |  否  | String | 音频作者 | controls 为 false 时无效 |

### video 参数

| 参数       | 必填 |    值类型    | 内容                       | 备注                     |
| ---------- | :--: | :----------: | -------------------------- | ------------------------ |
| poster     |  否  |    String    | 视频封面的图片网络资源地址 | controls 为 false 时无效 |
| autoplay   |  否  |   Boolean    | 是否自动播放               | 默认为 false             |
| startTime  |  否  |    Number    | 视频初始播放位置           |                          |
| danmu-list |  否  | Object Array | 弹幕列表                   |                          |
| danmu-btn  |  否  |   Boolean    | 是否显示弹幕按钮           | 只在初始化有效           |

## gzh 参数

公众号组件，可在有能力使用 web-view 的小程序上直接跳转到公众号文章。

| 参数    | 必填 | 值类型 | 内容                 | 备注 |
| ------- | :--: | :----: | -------------------- | ---- |
| url     |  是  | String | 跳转的图文链接       |      |
| src     |  是  | String | 封面图片在线地址     |      |
| title   |  是  | String | 图文标题             |      |
| desc    |  是  | String | 图文描述             |      |
| icon    |  否  | String | 公众号的头像在线地址 |      |
| gzhName |  否  | String | 公众号名称           |      |

## intro 参数

介绍组件，用于对个人、组织、机构的简单介绍。

| 参数 | 必填 | 值类型 | 内容             |
| ---- | :--: | :----: | ---------------- |
| name |  是  | String | 主体名称         |
| src  |  是  | String | 头像图标在线地址 |
| desc |  是  | String | 主体描述         |

## foot 参数

页脚组件。

| 参数   | 必填 | 值类型 | 内容                                          |
| ------ | :--: | :----: | --------------------------------------------- |
| desc   |  否  | String | 页脚的额外描述文字                            |
| author |  否  | String | 编辑人，默认为`Mr.Hope`，设置`''`来隐藏编辑人 |
| time   |  否  | String | 编辑时间                                      |

## 其他参数

### imgMode 参数

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

## popup 参数

| 参数        | 必填 |  值类型  | 内容                            |
| ----------- | :--: | :------: | ------------------------------- |
| title       |  是  |  String  | 主标题                          |
| subtitle    |  是  |  String  | 副标题                          |
| text        |  是  |  String  | 弹窗文字                        |
| desc        |  否  |  String  | 弹窗文字解释                    |
| more        |  否  | Booelean | 是否显示更多按钮，默认为`false` |
| cancel      |  否  | Booelean | 设置为`false`来隐藏取消按钮     |
| confirmText |  否  |  String  | 确定按钮文字，默认为'确定'      |
| cancelText  |  否  |  String  | 取消按钮文字，默认为'取消'      |
