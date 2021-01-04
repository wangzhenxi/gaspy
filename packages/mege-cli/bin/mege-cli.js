#!/usr/bin/env node

const program = require('commander')
const { serve, bootstrap } = require('../lib')

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
    serve(_options)
  })

program.command('bootstrap').action(async (input) => {
  const _options = input.opts()
  bootstrap(_options)
})

program.parse(process.argv)
