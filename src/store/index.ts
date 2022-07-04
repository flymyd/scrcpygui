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
    setScrcpyInfo(info: Array<any>) {
      this.scrcpyInfo = info;
    },
    adbInstalled(version: string) {
      this.adbVersion = version;
    }
  },
})