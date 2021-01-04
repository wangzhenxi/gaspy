import Koa from 'koa'
import proxy from 'koa-proxies'
import { IGateway } from '../types/Gateway'

export class Gateway implements IGateway {
  app = null

  port = null

  constructor(options) {
    const app = new Koa()
    this.app = app
    this.port = options.port
  }

  use(cb) {
    this.app.use(cb)
  }

  proxy(path, options) {
    this.use(proxy(path, options))
  }

  run() {
    this.app.listen(this.port, () => {
      console.log(`gateway: http://localhost:${this.port}`)
    })
  }
}
