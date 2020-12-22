const generateTsconfig = require('./generators/ts_config')
const generatePkgocnfig = require('./generators/mege_config')

// 生成megeconfig.json文件
generatePkgocnfig()

// 生成tsconfig.json
generateTsconfig()
