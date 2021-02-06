const generateTsconfig = require('./generators/ts_config')
const clearLib = require('./clearLib')

;(async () => {
  // 生成tsconfig.json
  generateTsconfig()

  // 清空lib
  await clearLib()
})()
