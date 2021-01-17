import generateTsconfig from './generators/ts_config'
import generateGaspyswitch from './generators/gaspy_switch'

async function bootstrap() {
  // 生成gaspyswitch.json文件
  generateGaspyswitch()

  // 生成tsconfig.json
  generateTsconfig()
}

export { bootstrap }
