import * as path from 'path'
import * as shell from 'shelljs'
import log from './utils/log'
import color from './utils/color'
import getPkgs from './utils/get_pkgs'

export default function () {
  const pkgs = getPkgs()

  return Promise.all(
    pkgs.map(async (pkg) => {
      log(`Clearing: ${color.blue(pkg.root)}`)
      await shell.rm('-rf', path.join(pkg.root, 'lib'))
      log(`Cleared: ${color.blue(pkg.root)}`)
    })
  )
}
