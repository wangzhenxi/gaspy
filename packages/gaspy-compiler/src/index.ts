import path from 'path'
import Webpack, { Configuration } from 'webpack'
import { log } from '@gaspy/tool'

interface ICompiler {
  config: Configuration
  run: any
}

class Compiler implements ICompiler {
  pkg = null

  config = null

  constructor(pkg) {
    this.pkg = pkg
    const defaultConfig = {
      entry: path.join(pkg.root, 'src', 'index.ts'),
      output: {
        path: path.join(pkg.root, 'dist'),
        filename: '[name].js',
      },
    }
    this.config = defaultConfig
  }

  async init() {
    const hookCallback = require(path.join(this.pkg.root, 'ci', 'serve'))
    // 二次
    const config = await hookCallback(this.config)
    this.config = config
  }

  run() {
    const webpackCompiler = Webpack(this.config)
    webpackCompiler.run(() => {
      log(`编译成功 ${this.pkg.name}`)
    })
    return webpackCompiler
  }

  // 摧毁实例
  destroy() {
    console.log('TODO', this.pkg)
  }
}

export { Compiler }
