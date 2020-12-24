const generateTsconfig = require('./generators/ts_config')
const generatePkgocnfig = require('./generators/mege_config')
const generateLib = require('./generators/lib')

// 生成megeconfig.json文件
generatePkgocnfig()

// 生成tsconfig.json
generateTsconfig()

// 编译模块
generateLib()
