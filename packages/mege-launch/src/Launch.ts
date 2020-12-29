import { WebpackConfig } from '@mege/webpack-config'

class Launch {
  webpackConfig: any

  constructor(options) {
    console.log('launch get options: ', options)
    const webpackConfig = new WebpackConfig()
    console.log('webpack config:', webpackConfig)
    this.webpackConfig = webpackConfig
  }

  run() {
    console.log('run', this.webpackConfig)
  }
}

export default Launch
