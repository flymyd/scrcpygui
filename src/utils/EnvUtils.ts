import { mySettingsStore, useStore } from "@/store";
import { Process } from "./Process";
const store = useStore();
/**
 * check ADB version and write to pinia temporary
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
          } else store.scrcpyVersion = '';
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
 * check available encoders
 */
//TODO
export function getDeviceEncoders() {
  new Process().execFile({
    cmd: 'scrcpy',
    args: ['--encoder', 'foo'],
    stdout(out: string) {
      if (out.indexOf("scrcpy --encoder") !== -1) {
        console.log(out)
      }
    },
  })
}