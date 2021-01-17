import path from 'path'
import Webpack from 'webpack'
import { ICompiler } from '../types'

class Compiler implements ICompiler {
  pkg = null

  config = null

  constructor(options, pkg) {
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
      console.log('编译成功!')
    })
    return webpackCompiler
  }
}

export { Compiler }
