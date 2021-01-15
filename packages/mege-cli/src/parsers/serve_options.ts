import { getPort } from '@mege/tool'
import { ServeOptions } from '../../types/parser/serve_options'

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
