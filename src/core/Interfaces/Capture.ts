/**
 * 采集和录制设置
 * https://github.com/Genymobile/scrcpy/blob/master/README.md#capture
 */
export interface Capture {
  recordFile?: string,  //录制屏幕的文件保存路径
  recordWithoutMirror?: boolean, //是否仅录制而不进行屏幕镜像
  v4l2loopback?: string, //开启V4L2回环串流（暂不支持）
  displayBuffer?: number, //设置显示缓冲时延，单位ms
}