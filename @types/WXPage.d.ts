/*
 * @Author: Mr.Hope
 * @Date: 2019-08-14 22:13:31
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-08-27 11:50:36
 * @Description: MPPage声明文件
 */

/// <reference path="./globalData.d.ts" />

declare namespace MPPage {
  /** 页面跳转参数 */
  interface MPPageLifeTimeOptions {
    /** 页面跳转地址 */
    url?: string;
    /** 跳转参数 */
    query: {
      aim: string;
      [props: string]: string;
    };
    [props: string]: any;
  }

  /** 小程序状态 */
  interface State {
    /** 是否是打开的第一个页面 */
    firstOpen: boolean;
  }

  /** 事件监听器 */
  interface Emitter {
    on(event: string, callback: (...args: any[]) => void): void;
    emit(event: string, callback: (...args: any[]) => void): void;
    off(event: string, callback: (...args: any[]) => void): void;
  }


  /** 页面注册选项 */
  interface PageOption {
    /**
     * 页面即将被导航时触发
     *
     * 需要在调用页面中使用`this.$navigate(pageName或pageShortName)`
     * 才能正确触发`onNavigate`
     *
     * 另外需要特别注意第一次进入一个分包界面
     * 或者是通过微信小程序二维码或微信内分享直接跳转到小程序子页面时同样不会触发
     */
    onNavigate?(arg: MPPageLifeTimeOptions): void;
    /**
     * 页面预加载时触发
     *
     * 需要在调用页面中使用`this.preload(pageName或pageShortName)`
     */
    onPreload?(arg: MPPageLifeTimeOptions): void;
  }


  /** 页面实例 */
  interface PageInstance {
    /** 一些由wxpage生成的页面状态 */
    $state: State;
    $emitter: Emitter;
    /**
     * 开始监听一个事件
     *
     * @param eventName 开始监听的事件名称
     * @param callback 当监听事件被触发时执行的回调
     */
    $on(eventName: string, callback: (...args: any[]) => void): void;
    /**
     * 触发一个事件
     *
     * @param eventName 触发的事件名称
     * @param args 传递的参数
     */
    $emit(event: string, ...args: any[]): void;
    /** 结束一个事件监听 */
    $off(event: string, callback: (...args: any[]) => void): void;

    /**
     * 导航
     *
     * @param eventName 触发的事件名称
     * @param args 传递的参数
     */
    $route(path: string): void;

    /**
     * 存放的数据，该数据只能取一次
     *
     * @param key 存储时的键值
     * @param data 存储时的数据
     */
    $put(key: string, data: any): void;

    /**
     * 取出存放的数据
     *
     * @param key 要取得数据的键值
     */
    $take(key: string): any;

    /**
     * 触发某个页面的预加载
     *
     * @param path 该页面的路径或简称
     */
    $preload(path: string): void;

    /**
     * 返回上一页
     *
     * @param delta 返回的层数
     */
    $back(delta?: number): void;

    /**
     * relauch到某个界面
     *
     * @param path 该页面的路径或简称
     */
    $launch(path?: string): void;
  }

  /** 页面构造器 */
  interface PageConstructor {
    (
      name: string,
      options: PageOption
    ): void;
  }

  /** 组件实例 */
  interface ComponentInstance {
    /**
     * 开始监听一个事件
     *
     * @param eventName 开始监听的事件名称
     * @param callback 当监听事件被触发时执行的回调
     */
    $on(eventName: string, callback: (...args: any[]) => void): void;
    /**
     * 触发一个事件
     *
     * @param eventName 触发的事件名称
     * @param args 传递的参数
     */
    $emit(event: string, ...args: any[]): void;
    /** 结束一个事件监听 */
    $off(event: string, callback: (...args: any[]) => void): void;
    /**
     * 导航
     *
     * @param eventName 触发的事件名称
     * @param args 传递的参数
     */
    $route(path: string): void;
  }

  /** APP选项 */
  interface AppOption {
    /** 小程序路径解析配置 */
    config: {
      /** 小程序路径 */
      route: string | string[];

      /**
       * 解析简称
       *
       * @param name 页面简称
       * @returns 实际页面的地址
       */
      resolvePath?(name: string): string;
      extendPageBefore?(name: string, def: PageOption, modules: any): void;
      extendPageAfter?(name: string, def: PageOption, modules: any): void;
      extendComponentBefore?(def: any): void;
    };
    /**
     * 小程序在切入后台后被唤醒
     *
     * @param time 休眠时间(单位ms)
     */
    onAwake?(time: number): void;
  }
}

declare namespace WechatMiniprogram {
  // FIXME:
  interface GetRealtimeLogManager {
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    setFilterMsg(filterMsg: string): void;
  }
  interface Wx {
    getRealtimeLogManager(): GetRealtimeLogManager;
  }

  // QQ兼容
  interface GetSystemInfoSyncResult {
    /** 运行环境 */
    AppPlatform: 'qq' | undefined;
  }

  namespace Page {
    type MPInstance<
      D extends DataOption,
      C extends CustomOption> = MPPage.PageInstance & Instance<D, C>

    type MPOption<
      D extends DataOption,
      C extends CustomOption> =
      Partial<MPPage.PageOption> &
      ThisType<MPInstance<D, C>> &
      Options<D, C>;

    interface MPConstructor {
      <D extends DataOption,
        C extends CustomOption>(
        name: string,
        options: MPOption<D, C>
      ): void;
    }
  }

  namespace Component {
    type MPInstance<D extends DataOption,
      P extends PropertyOption,
      M extends MethodOption> = MPPage.ComponentInstance & Instance<D, P, M>;

    type MPOption<D extends DataOption,
      P extends PropertyOption,
      M extends MethodOption> =
      ThisType<MPInstance<D, P, M>> &
      Options<D, P, M>;

    interface MPConstructor {
      <
        D extends DataOption,
        P extends PropertyOption,
        M extends MethodOption>(
        options: MPOption<D, P, M>
      ): string;
    }
  }

  namespace App {
    /** 全局数据 */
    interface Globaldata {
      globalData: GlobalData;
    }

    type MPInstance<T extends IAnyObject> = Option & T & Globaldata;

    type MPOption<T extends IAnyObject> =
      Partial<MPPage.AppOption> & Partial<Option> &
      T & ThisType<MPInstance<T>>;

    interface MPConstructor {
      <T extends IAnyObject>(options: MPOption<T>): void;
    }

    interface GetApp {
      (opts?: GetAppOption): MPInstance<IAnyObject>;
    }
  }
}

declare module 'wxpage' {
  interface WXPage extends WechatMiniprogram.Page.MPConstructor {
    A: WechatMiniprogram.App.MPConstructor;
    C: WechatMiniprogram.Component.MPConstructor;
  }

  const wxpage: WXPage;
  export default wxpage;
}