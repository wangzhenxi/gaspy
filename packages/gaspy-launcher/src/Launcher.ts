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

class CompilerWatcher {
  pkg = null

  gaspyconfig = null

  gaspyswitch = null

  constructor(pkg, gaspyconfig) {
    // 注册编译器
    const gaspyswitch = path.join(pkg.root, 'gaspyswitch.json')
    this.pkg = pkg
    this.gaspyconfig = gaspyconfig
    this.gaspyswitch = gaspyswitch
  }

  run() {
    const { pkg, gaspyswitch } = this
    const compiler = new Compiler(pkg, this.gaspyconfig)
    const gaspyswitchChanged = async () => {
      const json = require(gaspyswitch)
      delete require.cache[gaspyswitch]
      if (json.runtime) {
        if (!compiler.inited) {
          log(`开始编译 ${pkg.name}`)
        }
        // 执行编译器
        await compiler.run()
      } else {
        if (compiler.inited) {
          log(`关闭编译 ${pkg.name}`)
        }
        await compiler.destroy()
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
}

class Launcher implements ILauncher {
  gaspyconfig = null

  gateway = null

  watchers = null

  constructor(options: LauncherOptions) {
    const gateway = new Gateway(options)
    this.gateway = gateway
  }

  async init(gaspyconfig) {
    this.gaspyconfig = gaspyconfig
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
    const watchers = []
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
        const subpath1 = pkg.name.replace(`@${rootPkgName}-page/`, '')
        const subpath2 = pkg.name.replace('@', '')
        ;[
          [`/${subpath1}`, `/${subpath1}/(.*)`],
          [`/${subpath2}`, `/${subpath2}/(.*)`],
        ].forEach((paths) =>
          this.gateway.proxy(
            paths,
            {
              root: path.join(pkg.root, 'dist'),
            },
            'static'
          )
        )
        // 根据gaspyswitch判断模块是否编译
        const watcher = new CompilerWatcher(pkg, this.gaspyconfig)
        watchers.push(watcher)
      })
    this.watchers = watchers
  }

  async run() {
    await this.gateway.run()
    await Promise.all(this.watchers.map((watcher) => watcher.run()))
  }
}

export default Launcher
