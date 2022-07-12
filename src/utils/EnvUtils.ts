import { mySettingsStore, useStore } from "@/store";
import { Process } from "./Process";
/**
 * check ADB version and write to pinia temporary
 */

export function checkADBVersion() {
  const store = useStore();
  new Process().execFile({
    cmd: 'adb',
    args: ['--version'],
    stdout(out: string) {
      if (out.includes("Android")) {
        let arr = out.split("\n")
        if (arr.length > 0) {
          let version = arr[0].match(/([^version ]+)$/)
          if (version && version.length > 0) {
            store.adbVersion = version[0];
          } else store.adbVersion = '';
        }
      }
    },
    close(err: any) {
      if (err !== 0) {
        store.adbVersion = '';
      }
    }
  })
}

/**
 * check Scrcpy version and write to pinia temporary
 */
export function checkScrcpyVersion() {
  const store = useStore();
  new Process().execFile({
    cmd: 'scrcpy',
    args: ['--version'],
    stdout(out: string) {
      if (out.includes("scrcpy")) {
        let arr = out.split("\n") as any
        store.scrcpyInfo = arr;
        if (arr.length > 0) {
          let version = arr[0].match(/(?<=scrcpy ).*?(?= <)/)
          if (version && version.length > 0) {
            store.scrcpyVersion = version[0];
          } else {
            store.scrcpyVersion = ''
            store.scrcpyInfo = [];
          };
        }
      }
    },
    close(err: any) {
      if (err !== 0) {
        store.scrcpyVersion = '';
      }
    }
  })
}
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
/**
 * check available encoders
 */
export function getDeviceEncoders() {
  return new Promise((resolve, reject) => {
    try {
      new Process().execFile({
        cmd: 'scrcpy',
        args: ['--no-power-on', '--encoder', 'foo'],
        stderr(out: string) {
          if (!out.includes("scrcpy")) {
            reject([]);
          }
        },
        stdout(out: string) {
          if (out.includes("scrcpy --encoder")) {
            const reg = /\'(.*?)\'/;
            let res: string[] = [];
            out.split("\n").forEach(row => {
              if (row.includes("--encoder") && reg.test(row)) {
                res.push(row.match(reg)![1])
              }
            })
            resolve(res)
          }
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