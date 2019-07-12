/// <reference path="./wx/lib.wx.app.d.ts" />
/// <reference path="./wx/lib.wx.page.d.ts" />
/// <reference path="./globalData.d.ts" />
declare module 'wxpage' {
  /** WXPage库 */
  export namespace WXPage {
    /** 页面跳转参数 */
    interface PageArg {
      /** 页面跳转地址 */
      url?: string;
      /** 跳转参数 */
      query: {
        aim: string;
        [props: string]: string;
      }
    }
    /** 小程序状态 */
    interface State {
      /** 是否是打开的第一个页面 */
      firstOpen: boolean;
    }
    /** 事件监听器 */
    interface Emitter {
      $on(event: string, callback: (...args: any[]) => void): void;
      $emit(event: string, callback: (...args: any[]) => void): void;
      $off(event: string, callback: (...args: any[]) => void): void;
    }
    /** 页面注册选项 */
    interface PageOption extends Page.PageInstance {
      /** 
       * 页面即将被导航时触发
       *
       * 需要在调用页面中使用`this.$navigate(pageName或pageShortName)`
       * 才能正确触发`onNavigate`
       * 
       * 另外需要特别注意第一次进入一个分包界面
       * 或者是通过微信小程序二维码或微信内分享直接跳转到小程序子页面时同样不会触发
       */
      onNavigate?(arg: PageArg): void;
      /** 
       * 页面预加载时触发
       *
       * 需要在调用页面中使用`this.preload(pageName或pageShortName)`
       */
      onPreload?(arg: PageArg): void;
      /** 一些由wxpage生成的页面状态 */
      $state?: State;
      $emitter?: Emitter;
      /** 
       * 开始监听一个事件
       * 
       * @param eventName 开始监听的事件名称
       * @param callback 当监听事件被触发时执行的回调
       */
      $on?(eventName: string, callback: (...args: any[]) => void): void;
      /** 
        * 触发一个事件
        * 
        * @param eventName 触发的事件名称
        * @param callback 当监听事件被触发时执行的回调
        */
      /** 触发一个事件 */
      $emit?(event: string, callback: (...args: any[]) => void): void;
      /** 结束一个事件监听 */
      $off?(event: string, callback: (...args: any[]) => void): void;
      [props: string]: any;
    }
    /** APP选项 */
    interface AppOption extends App.AppInstance {
      /** 小程序路径解析配置 */
      config: {
        /** 小程序包含路径 */
        route: string | string[];
        /**
         * 解析短名称路径
         *
         * @param name 调用时的页面短名称
         * @returns 页面地址
         */
        resolvePath?(name: string): string;
        extendPageBefore?(name: string, def: PageOption, modules: any): void;
        extendPageAfter?(name: string, def: PageOption, modules: any): void;
        extendComponentBefore?(def: any): void;
      },
      /** 小程序的全局数据 */
      globalData: GlobalData
      /**
       * 小程序在切入后台后被唤醒
       *
       * @param time 休眠时间(单位ms)
       */
      onAwake?(time: number): void;
      [props: string]: any;
    }
  }


  interface Wxpage {
    A(options: WXPage.AppOption): void;
    (name: string, options: WXPage.PageOption): void;
  }

  const wxpage: Wxpage;
  export default wxpage;
}
