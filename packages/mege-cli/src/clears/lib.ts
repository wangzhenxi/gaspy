import path from 'path'
import shell from 'shelljs'
import { log, color, getPkgs } from '@mege/tool'

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
