interface Env {
  NODE_ENV: string // node环境
  GASPY_CLI_VERSION: string // CLI的包版本
}

const pv = process.env

const env: Env = {
  NODE_ENV: pv.NODE_ENV === 'production' ? 'production' : 'development',
  GASPY_CLI_VERSION: pv.GASPY_CLI_VERSION,
}

export default env
