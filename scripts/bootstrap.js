const generateTsconfig = require('./generators/ts_config')
const generatePkgocnfig = require('./generators/mege_config')
const generateLib = require('./generators/lib')
const clearLib = require('./clearLib')

;(async () => {
  // 生成megeconfig.json文件
  generatePkgocnfig()

  // 生成tsconfig.json
  generateTsconfig()

  // 清空lib
  await clearLib()

  // 编译模块
  await generateLib()
})()
