import * as portfinder from 'portfinder'

portfinder.basePort = 3000

async function getPort() {
  const port = await portfinder.getPortPromise()
  return port
}

export default getPort
