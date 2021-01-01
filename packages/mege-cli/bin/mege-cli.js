#!/usr/bin/env node

const path = require('path')
const program = require('commander')
const { Launcher } = require('@mege/launcher')
const { getPort, selectModule } = require('../lib')

console.log('welcome to mege-cli!!!')

program
  .command('init')
  .description('初始化webpack配置')
  .action((input) => {
    const _options = input.opts()
    console.log('init', _options)
  })

program
  .command('serve')
  .description('本地启动模块')
  .option('-p, --port <port>', '启动端口', '')
  .option('-m, --module <module>', '启动模块', '')
  .action(async (input) => {
    const _options = input.opts()
    const mod = await selectModule(input.module)
    const hookCallback = require(`${path.join(mod.root, 'ci', 'serve')}`)
    // 配置预处理
    let options = await initOptions(_options)
    // 配置二次处理
    options = await hookCallback(options)
    const launcher = await new Launcher(options, mod)
    launcher.run()
  })

program.parse(process.argv)

// 初始化配置
async function initOptions({ port }, pkg) {
  const options = {}

  // 初始化端口
  let _port = port
  if (!_port) {
    _port = await getPort(_port)
  } else {
    _port = Number(_port)
  }
  options.port = _port

  return options
}
