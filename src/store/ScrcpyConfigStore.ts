import { Connection } from "../core/Interfaces/Connection";
import { InputControl } from "../core/Interfaces/InputControl";
import { Mirror } from "../core/Interfaces/Mirror";
import { Others } from "../core/Interfaces/Others";
import { Capture } from "../core/Interfaces/Capture";
import { UserConfig, UserConfigObject } from "../core/Interfaces/UserConfig";
import { defineStore } from 'pinia'

export const useScrcpyConfigStore = defineStore('scrcpyConfig', {
  state: () => ({
    scrcpyConfigs: localStorage.getItem("scrcpyConfigs") ? JSON.parse(localStorage.getItem("scrcpyConfigs") as string) : { Default: {} }
  }),
  getters: {
    getScrcpyConfig(serial: string = "Default"): UserConfigObject | object {
      return this.scrcpyConfigs[serial] || {};
    }
  },
  actions: {
    saveScrcpyConfig(
      type: "connection" | "mirror" | "capture" | "window" | "input" | "others",
      config: Connection | Mirror | Capture | Window | InputControl | Others, serial: string = "Default"
    ) {
      const userConfig: UserConfigObject = this.scrcpyConfigs[serial];
      let toConfig = userConfig[type];
      toConfig = config;
      localStorage.setItem("scrcpyConfigs", JSON.stringify(this.scrcpyConfigs))
      return;
    },
    addScrcpyConfig(serial: string) {
      this.scrcpyConfigs[serial] = {}
      localStorage.setItem("scrcpyConfigs", JSON.stringify(this.scrcpyConfigs))
      return;
    }
  },
})