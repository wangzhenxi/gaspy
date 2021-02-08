import { spawn } from 'child_process'
import * as path from 'path'
import getDeps from './utils/get_pkgs'

const pkgs = getDeps()
pkgs.forEach((pkg) => {
  const filepath = path.join(pkg.root, 'tsconfig.json')
  spawn('tsc', ['-p', filepath, '--module', 'commonjs', '--watch'], {
    stdio: 'inherit',
  })
})
