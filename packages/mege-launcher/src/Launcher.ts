import { Compiler } from '@mege/compiler'
import { ILauncher, LauncherOptions } from '../types'
import { Gateway } from './Gateway'

class Launcher implements ILauncher {
  compilers = null

  gateway = null

  constructor(options: LauncherOptions, pkg, megeconfig) {
    const gateway = new Gateway(options)
    this.gateway = gateway
    // 基础代理
    if (megeconfig.devServer && megeconfig.devServer.proxy) {
      this.proxy(megeconfig.devServer.proxy)
    }
    // 生成编译器
    // TODO
    // this.generateCompiler(options, pkg)
  }

  proxy(proxys) {
    Object.entries(proxys).forEach(([name, opt]) => {
      this.gateway.proxy(name, opt)
    })
  }

  generateCompiler(options, pkg) {
    const compilers = pkg.deps.map((dep) => {
      const compiler = new Compiler(options, dep)
      return compiler
    })
    this.compilers = compilers
  }

  run() {
    this.gateway.run()
  }
}

export default Launcher
