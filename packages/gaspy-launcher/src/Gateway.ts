import Koa from 'koa'
import Router from 'koa-router'
import httpProxy from 'koa-proxies'
import staticSend from 'koa-send'
import { IGateway } from '../types/Gateway'

export class Gateway implements IGateway {
  app = null

  router = null

  port = null

  constructor(options) {
    const app = new Koa()
    const router = new Router()
    this.app = app
    this.router = router
    this.port = options.port
  }

  use(cb) {
    this.app.use(cb)
  }

  proxy(path, options, type = 'http') {
    switch (type) {
      case 'http':
        this.use(httpProxy(path, options))
        break
      case 'static':
        this.router.get(path, async (ctx) => {
          // 重写路径
          const prefixRxp = new RegExp(
            `^${Array.isArray(path) ? path[0] : path}`
          )
          const targetPath = ctx.path.replace(prefixRxp, '') || '/'
          const _options = {
            index: 'index.html',
            ...options,
          }
          try {
            await staticSend(ctx, targetPath, _options)
          } catch (err) {
            if (err.status !== 404) {
              throw err
            }
          }
        })
        break
      default:
        throw new Error(`不支持代理${type}`)
    }
  }

  routerRegister() {
    this.app.use(this.router.routes(), this.router.allowedMethods())
  }

  run() {
    this.routerRegister()
    this.app.listen(this.port, () => {
      console.log(`gateway: http://localhost:${this.port}`)
    })
  }
}
