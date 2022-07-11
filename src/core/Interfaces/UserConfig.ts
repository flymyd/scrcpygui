import { Capture } from "./Capture";
import { Connection } from "./Connection";
import { InputControl } from "./InputControl";
import { Mirror } from "./Mirror";
import { Others } from "./Others";

export interface UserConfigObject {
  connection: Connection,
  mirror: Mirror,
  capture: Capture,
  window: Window,
  input: InputControl,
  others: Others,
  isDefault: boolean,
  intro: string
}

export interface UserConfig {
  [key: string]: UserConfigObject
}