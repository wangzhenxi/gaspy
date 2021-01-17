import path from 'path'
import fs from 'fs'
import { Launcher } from '@gaspy/launcher'
import { initOptions } from './parsers/serve_options'

function getGaspyconfig() {
  let gaspyconfig = {}
  const configfile = path.join(process.cwd(), 'gaspyconfig.json') // 从根节点获取配置
  try {
    fs.statSync(configfile)
    gaspyconfig = require(configfile)
  } catch {}
  return gaspyconfig
}

async function serve(input) {
  const gaspyconfig = getGaspyconfig()
  // 配置预处理
  const options = await initOptions(input)
  const launcher = new Launcher(options)
  // 启动器初始化
  launcher.init(options, gaspyconfig)
  launcher.run()
}

export { serve }
