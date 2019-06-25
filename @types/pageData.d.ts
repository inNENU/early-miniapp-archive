


declare namespace PageData {
  enum PageDataOption { 'tag', 'head', 'foot', 'content' }

  interface List {
    tag: 'list';
    head: string | boolean;
    content: any[]
    foot?: string;
  }
  type Test = List[];
}
declare interface ComponentData {
  [props: string]: any;
}

// declare type PageData = ComponentData[]
declare type PageData = any;

declare interface PageArg {
  aim: string;
  depth?: number;
  From?: string;
  share?: boolean
}