import path from 'path'
import Webpack, { Configuration } from 'webpack'
import { log, exit, env } from '@gaspy/tool'
import DefaultConfig from './DefaultConfig'

interface ICompiler {
  config: Configuration
  run: any
}

class Compiler implements ICompiler {
  inited = false

  pkg = null

  config = null

  watching = null

  constructor(pkg, gaspyconfig?) {
    this.pkg = pkg
    const defaultConfig = new DefaultConfig(pkg, gaspyconfig)
    this.config = defaultConfig
  }

  async init() {
    const hookCallback = require(path.join(this.pkg.root, 'ci', 'serve'))
    // 二次
    const config = await hookCallback(this.config)
    this.config = config
    this.inited = true
  }

  // 监听文件变化进行构建
  async run() {
    // 先初始化
    if (!this.inited) {
      await this.init()
    }
    if (this.watching) return
    // 创建编译器实例
    const compiler = Webpack(this.config)
    // 开启监听
    const watching = compiler.watch(
      {
        aggregateTimeout: 300,
        poll: undefined,
      },
      (err, stats) => {
        const hasErrors = stats.hasErrors()
        const msg = stats.toString({
          chunks: false, // 使构建过程更静默无输出
          colors: true, // 在控制台展示颜色
        })
        if (err || hasErrors) {
          exit(msg)
          return
        }
        console.log(msg)
      }
    )
    // 编译钩子注册
    compiler.hooks.invalid.tap('devServer', () => {
      console.log(`${this.pkg.name} 编译中...`)
    })
    this.watching = watching
  }

  // 一次构建
  async build() {
    const compiler = Webpack(this.config)
    compiler.run(() => {
      log(`编译成功 ${this.pkg.name}`)
    })
  }

  // 停止编译
  destroy() {
    if (!this.watching) return
    this.watching.close(() => {
      log(`编译已关闭 ${this.pkg.name}`)
    })
    this.watching = null
  }
}

export { Compiler }
