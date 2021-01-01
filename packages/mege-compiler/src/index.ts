import path from 'path'
import Webpack from 'webpack'
import { ICompiler } from '../types'

class Compiler implements ICompiler {
  config = null

  constructor(options, pkg) {
    this.config = {
      entry: path.join(pkg.root, 'src', 'index.ts'),
      output: {
        path: path.join(pkg.root, 'dist'),
        filename: '[name].js',
      },
    }
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
