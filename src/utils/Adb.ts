import {Process} from "@/utils/Process";

/**
 * 获取已连接的设备信息
 */
export function getAttachedDevices() {
    return new Promise((resolve, reject) => {
        try {
            new Process().exec({
                cmd: 'adb devices',
                stderr() {
                    reject([]);
                },
                stdout(out: string) {
                    if (out.indexOf("List of devices attached") !== -1) {
                        let res = out.split("\n");
                        let deviceList: string[] = [];
                        res.forEach(row => {
                            if (row.indexOf("\tdevice") !== -1) {
                                deviceList.push(row.split("\tdevice")![0]);
                            }
                        })
                        resolve(deviceList)
                    } else reject([]);
                },
                close() {
                    reject([]);
                }
            })
        } catch (e) {
            reject([]);
        }
    })
}