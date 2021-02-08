import generateTsconfig from './generators/ts_config'
import clearLib from './clearLib'

;(async () => {
  // 生成tsconfig.json
  generateTsconfig()

  // 清空lib
  await clearLib()
})()
