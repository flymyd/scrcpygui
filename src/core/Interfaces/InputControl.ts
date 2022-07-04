/**
 * 输入控制
 * https://github.com/Genymobile/scrcpy/#input-control
 */
export interface InputControl{
  hidKeyboard?: boolean, //物理键盘模拟
  hidMouse?: boolean, //物理鼠标模拟
  textInjection?: TextInjection, //文本注入模式
  noKeyRepeat?: boolean, //禁止转发按下键的重复事件
  disableRCandMC?: boolean, //禁用右键和中键的点击事件, 全部转发到设备上
}

enum TextInjection{
  'DEFAULT',
  'PREFER_TEXT',
  'RAW_KEY_EVENTS'
}