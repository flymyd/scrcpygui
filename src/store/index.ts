import { defineStore } from 'pinia'

export const useStore = defineStore('default', {
  state: () => ({
    isInstallScrcpy: false,
    scrcpyVersion: '',
  }),
  getters: {},
  actions: {
    scrcpyInstalled() {
      this.isInstallScrcpy = true;
      const exec = require('child_process').exec;
      let scrcpyWorker;
      scrcpyWorker = exec(`scrcpy --version`)
      scrcpyWorker.stdout.on('data', (data: string) => {
        console.log(data)
        this.scrcpyVersion = data;
      })
    }
  },
})