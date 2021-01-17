import path from 'path'
import fs from 'fs'
import { Launcher } from '@gaspy/launcher'
import { initOptions } from './parsers/serve_options'
import { selectModule } from './utils/select_module'

function getGaspyconfig(root) {
  let gaspyconfig = {}
  const paths = [
    path.join(root, 'gaspyconfig.json'), // 从模块下获取配置
    path.join(process.cwd(), 'gaspyconfig.json'), // 从根节点获取配置
  ]
  paths.some((filepath) => {
    try {
      fs.statSync(filepath)
      gaspyconfig = require(filepath)
      return true
    } catch {}
    return false
  })
  return gaspyconfig
}

async function serve(input) {
  const mod = await selectModule(input.module)
  const hookCallback = require(path.join(mod.root, 'ci', 'serve'))
  const gaspyconfig = getGaspyconfig(mod.root)
  // 配置预处理
  let options = await initOptions(input)
  // 配置二次处理
  options = await hookCallback(options)
  const launcher = new Launcher(options)
  // 启动器初始化
  await launcher.init(mod, options, gaspyconfig)
  launcher.run()
}

export { serve }
