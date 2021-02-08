import { spawnSync } from 'child_process'
import * as path from 'path'
import getDeps from './utils/get_pkgs'
import log from './utils/log'
import color from './utils/color'

const pkgs = getDeps({ sort: true })
pkgs.forEach((pkg) => {
  log(`building: ${color.blue(pkg.name)}`)
  const filepath = path.join(pkg.root, 'tsconfig.json')
  spawnSync('tsc', ['-p', filepath, '--module', 'commonjs'], {
    stdio: 'inherit',
  })
  log(`builded: ${color.blue(pkg.name)}`)
})
