interface EventTouches {
  clientX: number;
  clientY: number;
  force: 1;
  indentifier: number;
  pageX: number;
  pageY: number;
}

/** 小程序事件 */
interface NormalEvent {
  changedTouches: EventTouches[];
  currentTarget: {
    dataset: IAnyObject;
    id: number;
    offsetLeft: number;
    offsetTop: number;
  }
  detail: {
    x: number;
    y: number;
  }
  mark: IAnyObject;
  target: {
    dataset: IAnyObject;
    id: number;
    offsetLeft: number;
    offsetTop: number;
  }
  timeStamp: number;
  touches: EventTouches[];
  type: string;
}

/** 输入事件 */
interface InputEvent extends NormalEvent {
  detail: {
    x: number;
    y: number;
    value: string;
  }
}

/** 滑块事件 */
interface SliderEvent extends NormalEvent {
  detail: {
    x: number;
    y: number;
    value: number;
  }
}

/** 开关事件 */
interface SwitchEvent extends NormalEvent {
  detail: {
    x: number;
    y: number;
    value: boolean;
  }
}

/** 滑块事件 */
interface PickerEvent extends NormalEvent {
  detail: {
    x: number;
    y: number;
    value: string | string[];
  }
}

/** 标记点事件 */
interface MarkerEvent extends NormalEvent {
  markerId: number;
}

/** 常见全部事件 */
interface MiniprogramEvent extends NormalEvent {
  detail: {
    x: number;
    y: number;
    value: any;
  }
  markerId?: number;
}