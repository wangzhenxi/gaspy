const { spawnSync } = require('child_process')
const getDeps = require('./utils/get_pkgs')
const log = require('./utils/log')
const color = require('./utils/color')

const pkgs = getDeps({ sort: true })
pkgs.forEach((pkg) => {
  log(`npm publishing: ${color.blue(pkg.name)}`)
  spawnSync('yarn', ['npm', 'publish', '--tolerate-republish'], {
    cwd: pkg.root,
    stdio: 'inherit',
  })
})
