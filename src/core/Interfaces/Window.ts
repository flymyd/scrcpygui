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
}



enum WindowRotation {
  'DEFAULT',  //不旋转
  'LANDSCAPE_LEFT', //逆时针90度
  'FLIP_VERTICAL',  //180度
  'LANDSCAPE_RIGHT',  //顺时针90度
}