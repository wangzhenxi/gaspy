import path from 'path'
import fs from 'fs'
import { Launcher } from '@mege/launcher'
import { initOptions } from './parsers/serve_options'
import { selectModule } from './utils/select_module'

function getMegeconfig(root) {
  let megeconfig = {}
  const paths = [
    path.join(root, 'megeconfig.json'), // 从模块下获取配置
    path.join(process.cwd(), 'megeconfig.json'), // 从根节点获取配置
  ]
  paths.some((filepath) => {
    try {
      fs.statSync(filepath)
      megeconfig = require(filepath)
      return true
    } catch {}
    return false
  })
  return megeconfig
}

async function serve(input) {
  const mod = await selectModule(input.module)
  const hookCallback = require(path.join(mod.root, 'ci', 'serve'))
  const megeconfig = getMegeconfig(mod.root)
  // 配置预处理
  let options = await initOptions(input)
  // 配置二次处理
  options = await hookCallback(options)
  const launcher = new Launcher(options)
  // 启动器初始化
  await launcher.init(mod, options, megeconfig)
  launcher.run()
}

export { serve }
