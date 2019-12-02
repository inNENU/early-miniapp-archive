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

declare type ComponentData = Record<string, any>;

declare type PageData = ComponentData[]

declare interface PageArg {
  aim?: string;
  depth?: number;
  From?: string;
  share?: boolean
}