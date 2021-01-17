import { Gateway } from './Gateway.d'

export interface LauncherOptions {
  port: number
}

export declare interface ILauncher {
  gateway: Gateway
}
