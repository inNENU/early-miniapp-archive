/*
 * @Author: Mr.Hope
 * @Date: 2019-07-21 15:53:29
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-07-24 09:43:45
 * @Description: Component声明
 */
declare namespace Component {

  interface ComponentInstanceBaseProps<D extends IAnyObject = any> {
    properties?: IAnyObject;
    /** 页面的初始数据
     * 
     * `data` 是页面第一次渲染使用的**初始数据**。
     * 
     * 页面加载时，`data` 将会以`JSON`字符串的形式由逻辑层传至渲染层，因此`data`中的数据必须是可以转成`JSON`的类型：字符串，数字，布尔值，对象，数组。
     * 
     * 渲染层可以通过 `WXML` 对数据进行绑定。
    */
    data?: D

    /** `setData` 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 `this.data` 的值（同步）。
     *
     * **注意：**
     *
     * 1. **直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致**。
     * 1. 仅支持设置可 JSON 化的数据。
     * 1. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
     * 1. 请不要把 data 中任何一项的 value 设为 `undefined` ，否则这一项将不被设置并可能遗留一些潜在问题。
     */

    setData?<K extends keyof D>(
      /** 这次要改变的数据
       *
       * 以 `key: value` 的形式表示，将 `this.data` 中的 `key` 对应的值改变成 `value`。
       *
       * 其中 `key` 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 `array[2].message`，`a.b.c.d`，并且不需要在 this.data 中预先定义。
       */
      data: D | Pick<D, K> | IAnyObject,
      /** setData引起的界面更新渲染完毕后的回调函数，最低基础库： `1.5.0` */
      callback?: () => void
    ): void;
  }

  interface ComponentInstance<D extends IAnyObject = any, T extends IAnyObject = {}> extends ComponentInstanceBaseProps<D> {

  }

  interface ComponentConstructor {
    <T extends IAnyObject & ComponentInstance>(
      options: ComponentInstance<T> & T
    ): void
  }

}

declare const Component: Component.ComponentConstructor;