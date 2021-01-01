import { Compiler } from '@mege/compiler'
import { ILauncher, LauncherOptions } from '../types'

class Launcher implements ILauncher {
  compiler = null

  constructor(options: LauncherOptions, pkg) {
    const compiler = new Compiler(options, pkg)
    this.compiler = compiler
  }

  run() {
    this.compiler.run()
  }
}

export default Launcher
