const program = require('commander')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const getPort = require('./utils/get_port')
const getPkgs = require('./utils/get_pkgs')

program
  .version('0.0.1')
  .description('启动模块')
  .option('-p, --port <port>', '启动端口', '')
  .option('-sh, --selectHook', '选择钩子', false)
  .option('-hk, --hook <hook>', '默认钩子', 'devServer')
  .option('-m, --module <module>', '启动模块', '')

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

// 选择模块
async function selectModule(modulename) {
  const pkgs = getPkgs()
  if (modulename) {
    const target = pkgs.find((pkg) => pkg.name === modulename)
    if (target) {
      return target
    }
  }
  const choices = pkgs.map((item, index) => ({
    name: item.name,
    value: index,
  }))
  const { index } = await inquirer.prompt({
    type: 'list',
    name: 'index',
    message: '请选择模块',
    choices,
  })
  return pkgs[index]
}

// 选择钩子
async function selectHook(selectable, defaulthook, mod) {
  const hooks = fs
    .readdirSync(path.join(mod.root, 'ci'))
    .map((filename) => filename.slice(0, /\./.exec(filename).index))
  if (!selectable && hooks.includes(defaulthook)) return defaulthook
  const choices = ['bootstrap', 'devServer', 'build', 'deploy']
    .filter((hookname) => hooks.includes(hookname))
    .map((hookname) => ({
      name: hookname,
    }))
  const { name } = await inquirer.prompt({
    type: 'list',
    name: 'name',
    message: '请选择钩子：',
    choices,
  })
  return name
}

;(async function () {
  const input = program.parse(process.argv).opts()
  const options = await initOptions(input)
  const mod = await selectModule(input.module)
  const hook = await selectHook(input.selectHook, input.hook, mod)
  try {
    const cb = require(`${path.join(mod.root, 'ci', hook)}`)
    cb(options)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
