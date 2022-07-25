import { UserConfigObject, Connection, Mirror, Capture, InputControl, Others } from '@/core/Interfaces';
import { defineStore } from 'pinia'
import { config } from 'process';

export const useScrcpyConfigStore = defineStore('scrcpyConfig', {
  state: () => ({
    scrcpyConfigs: localStorage.getItem("scrcpyConfigs") ? JSON.parse(localStorage.getItem("scrcpyConfigs") as string) : {
      Default: {
        intro: 'Default config',
        isDefault: true
      }
    },
    //设备使用的配置名
    deviceUsingConfigs: localStorage.getItem("deviceUsingConfigs") ? JSON.parse(localStorage.getItem("deviceUsingConfigs") as string) : {},
  }),
  getters: {

  },
  actions: {
    getScrcpyConfig(configName: string = "Default"): UserConfigObject | object {
      return this.scrcpyConfigs[configName] || {};
    },
    saveScrcpyConfig(
      type: "connection" | "mirror" | "capture" | "window" | "input" | "others" | "intro" | "isDefault",
      config: Connection | Mirror | Capture | Window | InputControl | Others | string | boolean, configName: string = "Default"
    ) {
      const userConfig: UserConfigObject = this.scrcpyConfigs[configName];
      if (type == 'isDefault') {
        this.setAllConfigToNoDefault();
      }
      //@ts-ignore
      userConfig[type] = config;
      localStorage.setItem("scrcpyConfigs", JSON.stringify(this.scrcpyConfigs))
    },
    addScrcpyConfig(configName: string, config: any) {
      if (config.isDefault) {
        this.setAllConfigToNoDefault();
      }
      this.scrcpyConfigs[configName] = config;
      localStorage.setItem("scrcpyConfigs", JSON.stringify(this.scrcpyConfigs))
    },
    deleteScrcpyConfig(configName: string) {
      if (this.scrcpyConfigs[configName]) {
        delete this.scrcpyConfigs[configName]
      }
      localStorage.setItem("scrcpyConfigs", JSON.stringify(this.scrcpyConfigs))
    },
    setAllConfigToNoDefault() {
      Object.keys(this.scrcpyConfigs).forEach(k => {
        if (this.scrcpyConfigs[k].isDefault) {
          this.scrcpyConfigs[k].isDefault = false;
        }
      })
    },
    setDeviceUsingConfig(serial: string, configName: string) {
      this.deviceUsingConfigs[serial] = configName;
      localStorage.setItem("deviceUsingConfigs", JSON.stringify(this.deviceUsingConfigs))
    },
    getDeviceUsingConfig(serial: string): UserConfigObject | object {
      return this.scrcpyConfigs[this.deviceUsingConfigs[serial] ?? 'Default'] || {};
    },
  },
})