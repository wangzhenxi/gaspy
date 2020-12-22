const program = require('commander')
const getPort = require('./utils/get_port')

program
  .version('0.0.1')
  .description('启动模块')
  .option('-p, --port <port>', '启动端口', '')
  .option('-d, --debug', '调试模式', false)

async function initOptions({ port, debug }) {
  let _port = port
  if (!_port) {
    _port = await getPort(_port)
  } else {
    _port = Number(_port)
  }
  return {
    port: _port,
    debug,
  }
}

initOptions(program.parse(process.argv).opts()).then((options) => {
  console.log(options)
})
