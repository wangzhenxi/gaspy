import fs from 'fs'
import path from 'path'
import { env } from '@gaspy/tool'
import HtmlWebpackPlugin from 'html-webpack-plugin'

function getPublicPath(pkg) {
  return pkg.name.replace('@', '') || ''
}

function getHtmlFilepath(pkg, gaspyconfig) {
  let filename = null
  const pagehtml = path.join(pkg.root, 'src', 'index.html')
  if (fs.existsSync(pagehtml)) {
    filename = pagehtml
  }
  if (!filename && gaspyconfig.template) {
    const defaulthtml = gaspyconfig.template
    filename = defaulthtml
  }
  return filename
}

class DefaultConfig {
  constructor(pkg, gaspyconfig?) {
    const config = {
      mode: env.NODE_ENV,
      entry: path.join(pkg.root, 'src', 'index.ts'),
      output: {
        path: path.join(pkg.root, 'dist'),
        filename: '[name].js',
        publicPath: getPublicPath(pkg),
      },
      plugins: [],
    }
    // html
    const htmlfile = getHtmlFilepath(pkg, gaspyconfig)
    if (htmlfile) {
      config.plugins.push(
        new HtmlWebpackPlugin({
          template: htmlfile,
          inject: 'body',
        })
      )
    }
    return config
  }
}

export default DefaultConfig
