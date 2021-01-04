import path from 'path'
import shell from 'shelljs'
import log from '../utils/log'
import color from '../utils/color'
import { getPkgs } from '../utils/get_pkgs'

function clearLib() {
  const pkgs = getPkgs()

  return Promise.all(
    pkgs.map(async (pkg) => {
      log(`Clearing: ${color.blue(pkg.root)}`)
      await shell.rm('-rf', path.join(pkg.root, 'lib'))
      log(`Cleared: ${color.blue(pkg.root)}`)
    })
  )
}
export default clearLib
