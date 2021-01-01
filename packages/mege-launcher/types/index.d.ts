import { ICompiler } from '@mege/compiler/types'

export interface LauncherOptions {
  port: number
}

export declare interface ILauncher {
  compiler: ICompiler
}
