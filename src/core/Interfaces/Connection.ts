/**
 * 连接设置
 * https://github.com/Genymobile/scrcpy/blob/master/README.md#connection
 */
export interface Connection {
  adbIP: string, //[无线模式]设备的IP
  adbInterface?: number, //[无线模式]adb监听端口，默认5555
  //实际上执行adb devices列出连接设备即可
  serial?: string, //[有线模式]adb devices列出多个设备时指定设备序列号 [无线模式]使用IP:端口的方式连接
}