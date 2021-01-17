import generateTsconfig from './generators/ts_config'
import generateGaspyswitch from './generators/gaspy_switch'
import generateLib from './generators/lib'
import clearLib from './clears/lib'

async function bootstrap() {
  // 生成gaspyswitch.json文件
  generateGaspyswitch()

  // 生成tsconfig.json
  generateTsconfig()

  // 清空lib
  await clearLib()

  // 编译模块
  await generateLib()
}

export { bootstrap }
