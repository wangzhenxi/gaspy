import path from 'path'
import log from '../utils/log'
import color from '../utils/color'
import { getPkgs } from '../utils/get_pkgs'

function generateLib() {
  const pkgs = getPkgs({ sort: true })

  return Promise.all(
    pkgs.map(async (pkg) => {
      let ciBootstrap = null
      try {
        ciBootstrap = require(path.join(pkg.root, 'ci', 'bootstrap'))
      } catch {}
      if (!ciBootstrap) return

      log(`Compiling: ${color.blue(pkg.root)}`)
      await ciBootstrap()
      log(`Compiled: ${color.blue(pkg.root)}`)
    })
  )
}

export default generateLib
