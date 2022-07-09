import { defineStore } from 'pinia'

export const useStore = defineStore('default', {
  state: () => ({
    scrcpyVersion: '',
    scrcpyInfo: [],
    adbVersion: '',
    connectedDeviceList: [],
    connectingDeviceInfo: {}
  }),
  getters: {

  },
  actions: {
    getDeviceInfoBySerial() {

    }
  },
})

export const mySettingsStore = defineStore('mySettings', {
  state: () => ({
    adbPath: localStorage.getItem("adbPath") ? localStorage.getItem("adbPath") : '',
    scrcpyPath: localStorage.getItem("scrcpyPath") ? localStorage.getItem("scrcpyPath") : '',
  }),
  getters: {},
  actions: {
    setAdbPath(path: string) {
      this.adbPath = path;
      localStorage.setItem("adbPath", path);
    },
    setScrcpyPath(path: string) {
      this.scrcpyPath = path;
      localStorage.setItem("scrcpyPath", path);
    },
  },
})