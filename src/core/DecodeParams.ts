import { UserConfigObject } from "./Interfaces";

export class ParamsParser {
  private config: UserConfigObject;
  constructor(config: UserConfigObject) {
    this.config = config;
  }
  parse() {
    const configKeys: any = ["connection", "mirror", "capture", "window", "input", "others"];
    let result = [];
    Object.keys(this.config).forEach((k:string) => {
      if (configKeys.includes(k)) {
        const configObj = this.config[k];
        
      }
    })
  }
}