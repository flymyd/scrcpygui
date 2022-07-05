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
  const store = useStore();
  new Process().execFile({
    cmd: 'scrcpy',
    args: ['--version'],
    stdout(out: string) {
      if (out.includes("scrcpy")) {
        let arr = out.split("\n")
        store.setScrcpyInfo(arr);
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
 * check available encoders
 */
//TODO
export function getDeviceEncoders() {
  new Process().execFile({
    cmd: 'scrcpy',
    args: ['--encoder', 'foo'],
    stdout(out: string) {
      if (out.includes("scrcpy --encoder")) {
        console.log(out)
      }
    },
  })
}