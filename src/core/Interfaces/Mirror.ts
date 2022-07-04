/**
 * 镜像设置
 * https://github.com/Genymobile/scrcpy/blob/master/README.md#capture-configuration
 */
export interface Mirror {
  reduceSize?: number, //将镜像分辨率的长边降为该值，短边等比缩放。如设备分辨率为1920*1080，设置1024后变为1024*576
  changeBitRate?: string, //镜像码率，默认为8M
  maxFps?: number, //采集帧率上限
  crop?: string, //可以对设备屏幕进行裁剪，只镜像屏幕的一部分。如scrcpy --crop 1224:1440:0:0 即为显示以 (0,0) 为原点的1224x1440像素区域
  screenOrientation?: number, //屏幕方向 0:自然方向 1:逆时针旋转90° 2:180° 3:顺时针旋转90°
  encoder?: string, //选择编码器
}