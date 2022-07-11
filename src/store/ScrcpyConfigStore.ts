import { UserConfigObject, Connection, Mirror, Capture, InputControl, Others } from '@/core/Interfaces';
import { defineStore } from 'pinia'

export const useScrcpyConfigStore = defineStore('scrcpyConfig', {
  state: () => ({
    scrcpyConfigs: localStorage.getItem("scrcpyConfigs") ? JSON.parse(localStorage.getItem("scrcpyConfigs") as string) : {
      Default: {
        intro: 'Default config',
        isDefault: true
      }
    }
  }),
  getters: {
    getScrcpyConfig(serial: string = "Default"): UserConfigObject | object {
      return this.scrcpyConfigs[serial] || {};
    }
  },
  actions: {
    saveScrcpyConfig(
      type: "connection" | "mirror" | "capture" | "window" | "input" | "others" | "intro" | "isDefault",
      config: Connection | Mirror | Capture | Window | InputControl | Others | string | boolean, serial: string = "Default"
    ) {
      const userConfig: UserConfigObject = this.scrcpyConfigs[serial];
      if (type == 'isDefault') {
        this.setAllConfigToNoDefault();
      }
      //@ts-ignore
      userConfig[type] = config;
      localStorage.setItem("scrcpyConfigs", JSON.stringify(this.scrcpyConfigs))
    },
    addScrcpyConfig(serial: string, config: any) {
      if (config.isDefault) {
        this.setAllConfigToNoDefault();
      }
      this.scrcpyConfigs[serial] = config;
      localStorage.setItem("scrcpyConfigs", JSON.stringify(this.scrcpyConfigs))
    },
    deleteScrcpyConfig(serial: string) {
      if (this.scrcpyConfigs[serial]) {
        delete this.scrcpyConfigs[serial]
      }
      localStorage.setItem("scrcpyConfigs", JSON.stringify(this.scrcpyConfigs))
    },
    setAllConfigToNoDefault() {
      Object.keys(this.scrcpyConfigs).forEach(k => {
        if (this.scrcpyConfigs[k].isDefault) {
          this.scrcpyConfigs[k].isDefault = false;
        }
      })
    }
  },
})