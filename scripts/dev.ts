const { spawn } = require('child_process')
const path = require('path')
const getDeps = require('./utils/get_pkgs')

const pkgs = getDeps()
pkgs.forEach((pkg) => {
  const filepath = path.join(pkg.root, 'tsconfig.json')
  spawn('tsc', ['-p', filepath, '--module', 'commonjs', '--watch'], {
    stdio: 'inherit',
  })
})
