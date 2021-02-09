import path from 'path'
import fs from 'fs'
import { Compiler } from '@gaspy/compiler'
import { getRootPkg, getPkgs, log } from '@gaspy/tool'
import { Gaze } from 'gaze'
import { Gateway } from './Gateway'

interface LauncherOptions {
  port: number
}

interface ILauncher {
  gateway: Gateway
}

// 编译器实例注册中心
const compilierRegister = {}

function watchCompiler(pkg) {
  const gaspyswitch = path.join(pkg.root, 'gaspyswitch.json')
  const gaspyswitchChanged = async () => {
    const json = require(gaspyswitch)
    if (json.runtime) {
      if (compilierRegister[pkg.name]) return
      log(`开始编译 ${pkg.name}`)
      // 初始化编译器
      const compiler = new Compiler(pkg)
      compilierRegister[pkg.name] = compiler
      await compiler.init()
      // 执行编译器
      await compiler.run()
    } else {
      if (!compilierRegister[pkg.name]) return
      log(`关闭编译 ${pkg.name}`)
      await compilierRegister[pkg.name].destroy()
      delete compilierRegister[pkg.name]
    }
  }
  // 主动触发
  gaspyswitchChanged()
  // 监听文件触发
  const watcher = new Gaze(gaspyswitch)
  watcher
    .on('error', (err) => {
      log(`gaze ${pkg.name} error`)
      console.log(err)
    })
    .on('changed', gaspyswitchChanged)
}
class Launcher implements ILauncher {
  gateway = null

  constructor(options: LauncherOptions) {
    const gateway = new Gateway(options)
    this.gateway = gateway
  }

  async init(options, gaspyconfig) {
    // 基础代理
    if (gaspyconfig.devServer && gaspyconfig.devServer.proxy) {
      Object.entries(gaspyconfig.devServer.proxy).forEach(([name, opt]) => {
        this.gateway.proxy(name, opt)
      })
    }
    // 生成编译器
    await this.generateCompiler()
  }

  async generateCompiler() {
    const rootPkgName = getRootPkg().name
    const workspaces = getPkgs()
    workspaces
      .filter((pkg) => {
        // 获取有开发钩子的模块
        const hookpath = path.join(pkg.root, 'ci', 'serve.js')
        try {
          fs.statSync(hookpath)
          return true
        } catch {
          return false
        }
      })
      .forEach((pkg) => {
        // 静态资源代理
        const subpath = pkg.name.replace(`@${rootPkgName}-page/`, '')
        this.gateway.proxy(
          [`/${subpath}`, `/${subpath}/(.*)`],
          {
            root: path.join(pkg.root, 'dist'),
          },
          'static'
        )
        // 根据gaspyswitch判断模块是否编译
        watchCompiler(pkg)
      })
  }

  async run() {
    await this.gateway.run()
  }
}

export default Launcher
