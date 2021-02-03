#!/usr/bin/env node

const program = require('commander')
const { log } = require('@gaspy/tool')
const { create, bootstrap, serve } = require('../lib')

log('welcome to gaspy-cli!!!')

program
  .command('create <app-name>')
  .description('创建一个新应用')
  .option('-f --force', '强制执行文件操作', false)
  .action((name, input) => {
    const _options = input.opts()
    create(name, _options)
  })

program
  .command('bootstrap')
  .description('模块基础配置引导程序')
  .action(async (input) => {
    const _options = input.opts()
    bootstrap(_options)
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

program.parse(process.argv)
