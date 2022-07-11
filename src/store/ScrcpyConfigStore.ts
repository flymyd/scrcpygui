import { Connection } from "../core/Interfaces/Connection";
import { InputControl } from "../core/Interfaces/InputControl";
import { Mirror } from "../core/Interfaces/Mirror";
import { Others } from "../core/Interfaces/Others";
import { Capture } from "../core/Interfaces/Capture";
import { UserConfig, UserConfigObject } from "../core/Interfaces/UserConfig";
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