const portfinder = require('portfinder')

portfinder.basePort = 3000
portfinder.highestPort = 65535

async function getPort() {
  const port = await portfinder.getPortPromise()
  return port
}

module.exports = getPort
