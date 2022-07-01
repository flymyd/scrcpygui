export interface Streaming {
  reduceSize?: number, //将镜像分辨率的长边降为该值，短边等比缩放。如设备分辨率为1920*1080，设置1024后变为1024*576
  changeBitRate?: string, //镜像码率，默认为8M
  maxFps?: number, //采集帧率上限
  
}