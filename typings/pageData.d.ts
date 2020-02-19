declare namespace PageData {
  enum PageDataOption {
    'tag',
    'head',
    'foot',
    'content'
  }

  interface List {
    tag: 'list';
    head: string | boolean;
    content: any[];
    foot?: string;
  }
  type Test = List[];
}

/** 组件数据 */
declare type ComponentData = Record<string, any>;

/** 页面数据 */
declare type PageData = ComponentData[];

declare interface PageArg {
  aim?: string;
  depth?: number;
  From?: string;
  share?: boolean;
}
