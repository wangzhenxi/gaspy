const pkg = require('../package.json')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.GASPY_CLI_VERSION = pkg.version
