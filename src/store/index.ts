import { defineStore } from 'pinia'

export const useStore = defineStore('default', {
  state: () => ({
    scrcpyVersion: '',
    scrcpyInfo: [],
    adbVersion: '',
  }),
  getters: {},
  actions: {
    scrcpyInstalled(version: string) {
      this.scrcpyVersion = version;
    },
    setScrcpyInfo(info: any) {
      this.scrcpyInfo = info;
    },
    adbInstalled(version: string) {
      this.adbVersion = version;
    }
  },
})

export const mySettingsStore = defineStore('mySettings', {
  state: () => ({
    autoStart: false,
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