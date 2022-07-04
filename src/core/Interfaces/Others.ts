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

