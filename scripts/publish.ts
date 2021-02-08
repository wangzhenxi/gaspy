import { spawnSync } from 'child_process'
import getDeps from './utils/get_pkgs'
import log from './utils/log'
import color from './utils/color'

const pkgs = getDeps({ sort: true })
pkgs.forEach((pkg) => {
  log(`npm publishing: ${color.blue(pkg.name)}`)
  spawnSync('yarn', ['npm', 'publish', '--tolerate-republish'], {
    cwd: pkg.root,
    stdio: 'inherit',
  })
})
