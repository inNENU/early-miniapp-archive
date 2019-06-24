/// <reference path="./wx/lib.wx.app.d.ts" />
/// <reference path="./wx/lib.wx.page.d.ts" />

declare module 'wxpage' {
  export namespace WXPage {
    /** 页面跳转参数 */
    interface PageArg {
      /** 页面跳转地址 */
      url: string;
      /** 跳转参数 */
      query: {
        [props: string]: string;
      }
    }
    /** 小程序状态 */
    interface State {
      firstOpen: boolean;
    }
    /** 事件监听器 */
    interface Emitter {
      $on(event: string, callback: (...args: any[]) => void): void;
      $emit(event: string, callback: (...args: any[]) => void): void;
      $off(event: string, callback: (...args: any[]) => void): void;
    }
    /** 页面选项 */
    interface PageOption extends Page.PageInstance {
      onNavigate?(arg: PageArg): void;
      onPreload?(arg: PageArg): void;
      $state?: State;
      $emitter?: Emitter;
      [props: string]: any;
      // setData?(data: object, callback?: () => void): void;
    }
    /** APP选项 */
    interface AppOption extends App.AppInstance {
      config: {
        route: string | string[];
        resolvePath?(name: string): string;
        extendPageBefore?(name: string, def: PageOption, modules: any): void;
        extendPageAfter?(name: string, def: PageOption, modules: any): void;
        extendComponentBefore?(def: any): void;
      },
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
