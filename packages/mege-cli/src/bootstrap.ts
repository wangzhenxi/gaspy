import generateTsconfig from './generators/ts_config'
import generateMegeswitch from './generators/mege_switch'
import generateLib from './generators/lib'
import clearLib from './clears/lib'

async function bootstrap() {
  // 生成megeswitch.json文件
  generateMegeswitch()

  // 生成tsconfig.json
  generateTsconfig()

  // 清空lib
  await clearLib()

  // 编译模块
  await generateLib()
}

export { bootstrap }
