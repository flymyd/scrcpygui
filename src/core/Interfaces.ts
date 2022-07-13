import { TextInjection, WindowRotation } from "./Enum"
/**
 * 镜像设置
 * https://github.com/Genymobile/scrcpy/blob/master/README.md#capture-configuration
 */
export interface Mirror {
  reduceSize?: string, //将镜像分辨率的长边降为该值，短边等比缩放。如设备分辨率为1920*1080，设置1024后变为1024*576
  changeBitRate?: number, //镜像码率，默认为8M
  maxFps?: number, //采集帧率上限
  crop?: string, //可以对设备屏幕进行裁剪，只镜像屏幕的一部分。如scrcpy --crop 1224:1440:0:0 即为显示以 (0,0) 为原点的1224x1440像素区域
  screenOrientation?: number, //屏幕方向 0:自然方向 1:逆时针旋转90° 2:180° 3:顺时针旋转90°
  encoder?: string, //选择编码器
  [key: string]: any,
}
/**
 * 采集和录制设置
 * https://github.com/Genymobile/scrcpy/blob/master/README.md#capture
 */
export interface Capture {
  recordFile?: string,  //录制屏幕的文件保存路径
  recordWithoutMirror?: boolean, //是否仅录制而不进行屏幕镜像
  v4l2loopback?: string, //设置V4L2回环串流设备
  displayBuffer?: number, //设置显示缓冲时延，单位ms
  v4l2Buffer?: number,   //设置V4L2回环串流缓冲时延，单位ms
}
/**
 * 连接设置
 * https://github.com/Genymobile/scrcpy/blob/master/README.md#connection
 */
export interface Connection {
  //* 当只有一个设备时, 无线连接附加--select-tcpip, 否则附加--select-usb
  serial?: string, //[有线模式]使用序列号连接 [无线模式]使用IP:端口的方式连接
}
/**
 * 窗口设置
 * https://github.com/Genymobile/scrcpy/blob/master/README.md#window-configuration
 */
export interface Window {
  title?: string, //设置scrcpy窗口标题，默认为设备型号
  xCoor?: number, //窗口初始化时的X坐标
  yCoor?: number, //窗口初始化时的Y坐标
  width?: number, //窗口初始化时的宽度
  height?: number, //窗口初始化时的高度
  borderless?: boolean, //无边框
  alwaysOnTop?: boolean, //总在顶部
  fullscreen?: boolean, //以全屏模式启动
  rotation?: WindowRotation, //屏幕旋转, 它只影响显示, 不影响录制
  [key: string]: any,
}
/**
 * 其它选项
 * https://github.com/Genymobile/scrcpy/#other-mirroring-options
 */
export interface Others {
  readonly?: boolean,   //禁用交互事件, 只读
  monitor?: string | number, //选择多显示器之中的一个
  stayAwake?: boolean, //保持亮屏
  closeScreen?: boolean, //镜像时熄屏
  closeScreenAfterDisconnected?: boolean, //退出时熄屏
  autoScreenOn?: boolean, //禁止在镜像启动时自动点亮屏幕
  showTouches?: boolean, //为屏幕上的触摸提供指示
  disableScreensaver?: boolean, //关闭屏保
  pushDestination?: string, //推送非APK文件的目标目录, 如/sdcard/Movies/
}
/**
 * 输入控制
 * https://github.com/Genymobile/scrcpy/#input-control
 */
export interface InputControl {
  disableClipBoardAutoSync?: boolean,  //关闭剪贴板自动同步
  hidKeyboard?: boolean, //物理键盘模拟
  hidMouse?: boolean, //物理鼠标模拟
  forwardAllClicks?: boolean,  //转发所有鼠标按钮
  textInjection?: TextInjection, //文本注入模式, --prefer-text或--raw-key-events
  noKeyRepeat?: boolean, //禁止转发按下键的重复事件
}
export interface UserConfigObject {
  connection: Connection,
  mirror: Mirror,
  capture: Capture,
  window: Window,
  input: InputControl,
  others: Others,
  isDefault: boolean,
  intro: string
}

export interface UserConfig {
  [key: string]: UserConfigObject
}

