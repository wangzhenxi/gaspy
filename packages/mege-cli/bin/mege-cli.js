#!/usr/bin/env node

const program = require('commander')
const { Launch } = require('@mege/launch')
const { getPort } = require('../lib/utils/get_port')

console.log('welcome to mege-cli!!!')

program
  .command('init')
  .description('初始化webpack配置')
  .action((input) => {
    const _options = input.opts()
    console.log('init', _options)
  })

program
  .command('start')
  .description('本地启动模块')
  .option('-p, --port <port>', '启动端口', '')
  .option('-sh, --selectHook', '选择钩子', false)
  .option('-hk, --hook <hook>', '默认钩子', 'devServer')
  .option('-m, --module <module>', '启动模块', '')
  .action(async (input) => {
    const _options = input.opts()
    const options = await initOptions(_options)
    const launch = await new Launch(options)
    launch.run()
  })

program.parse(process.argv)

// 初始化配置
async function initOptions({ port }) {
  let _port = port
  if (!_port) {
    _port = await getPort(_port)
  } else {
    _port = Number(_port)
  }
  return {
    port: _port,
  }
}
