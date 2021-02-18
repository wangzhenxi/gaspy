import path from 'path'
import fs from 'fs'
import { Launcher } from '@gaspy/launcher'
import { initOptions } from './parsers/serve_options'

async function getGaspyconfig() {
  let gaspyconfig = {}
  const configfile = path.join(process.cwd(), 'gaspyconfig.js') // 从根节点获取配置
  if (fs.existsSync(configfile)) {
    const cb = require(configfile)
    gaspyconfig = cb()
  }

  return gaspyconfig
}

async function serve(input) {
  // 配置预处理
  const options = await initOptions(input)
  const launcher = new Launcher(options)
  // 启动器初始化
  const gaspyconfig = await getGaspyconfig()
  launcher.init(gaspyconfig)
  launcher.run()
}

export { serve }
