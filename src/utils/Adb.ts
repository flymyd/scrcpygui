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
                    if (out.includes("List of devices attached")) {
                        let res = out.split("\n");
                        let deviceList: string[] = [];
                        res.forEach(row => {
                            if (row.includes("\tdevice")) {
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