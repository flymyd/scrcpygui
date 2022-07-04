import { useStore } from "@/store";
import { Process } from "./Process";
const store = useStore();

// export function getDeviceEncoders() {
//   const exec = require('child_process').exec;
//   return new Promise((resolve, reject) => {
//     let encoderWorker;
//     encoderWorker = exec(`scrcpy --encoder foo`)
//     encoderWorker.stdout.on('data', (data: string) => {
//       console.log(data)
//       if (data.indexOf("scrcpy --encoder") !== -1) {
//         resolve(data);
//       }
//     })
//   })
// }

/**
 * 检查ADB版本
 */
export function checkADBVersion() {
  new Process().execFile({
    cmd: 'adb',
    args: ['--version'],
    stdout(out: string) {
      if (out.indexOf("Android") !== -1) {
        let arr = out.split("\n")
        if (arr.length > 0) {
          let version = arr[0].match(/([^version ]+)$/)
          if (version && version.length > 0) {
            store.adbInstalled(version[0]);
          }
        }
      }
    }
  })
}

export function checkScrcpyVersion() {
  new Process().execFile({
    cmd: 'scrcpy',
    args: ['--version'],
    stdout(out: string) {
      if (out.indexOf("scrcpy") !== -1) {
        let arr = out.split("\n")
        store.setScrcpyInfo(arr);
        if (arr.length > 0) {
          let version = arr[0].match(/(?<=scrcpy ).*?(?= <)/)
          if (version && version.length > 0) {
            store.scrcpyInstalled(version[0]);
          }
        }
      }
    },
  })
}