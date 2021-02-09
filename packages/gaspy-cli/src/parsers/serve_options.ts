import { getPort } from '@gaspy/tool'

interface ServeOptions {
  port: number
}

// 初始化配置
async function initOptions({ port }): Promise<ServeOptions> {
  const options = {
    port,
  }

  // 初始化端口
  if (!port) {
    options.port = await getPort()
  }

  return options
}

export { initOptions }
