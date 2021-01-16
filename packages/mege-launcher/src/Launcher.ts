import path from 'path'
import fs from 'fs'
import { Compiler } from '@mege/compiler'
import { getRootPkg, findPkg } from '@mege/tool'
import { ILauncher, LauncherOptions } from '../types'
import { Gateway } from './Gateway'

class Launcher implements ILauncher {
  compilers = null

  gateway = null

  constructor(options: LauncherOptions) {
    const gateway = new Gateway(options)
    this.gateway = gateway
  }

  async init(mod, options, megeconfig) {
    // 基础代理
    if (megeconfig.devServer && megeconfig.devServer.proxy) {
      Object.entries(megeconfig.devServer.proxy).forEach(([name, opt]) => {
        this.gateway.proxy(name, opt)
      })
    }
    // 生成编译器
    await this.generateCompiler(mod, options)
  }

  async generateCompiler(mod, options) {
    const rootPkgName = getRootPkg().name
    const workspaces = mod.deps.filter((name) =>
      new RegExp(`@${rootPkgName}`).test(name)
    )
    const pkgs = findPkg(workspaces).filter((pkg) => {
      // 获取有开发钩子的模块
      const hookpath = path.join(pkg.root, 'ci', 'serve.js')
      try {
        fs.statSync(hookpath)
        return true
      } catch {
        return false
      }
    })
    const compilers = await Promise.all(
      pkgs.map(async (pkg) => {
        const compiler = new Compiler(options, pkg)
        await compiler.init()
        const subpath = pkg.name.replace(`@${rootPkgName}/`, '')
        // 静态资源代理
        this.gateway.proxy(
          [`/${subpath}`, `/${subpath}/(.*)`],
          {
            root: path.join(pkg.root, 'dist'),
          },
          'static'
        )
        return compiler
      })
    )
    this.compilers = compilers
  }

  async run() {
    await Promise.all(this.compilers.map((compiler) => compiler.run()))
    await this.gateway.run()
  }
}

export default Launcher
