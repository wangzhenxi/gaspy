import path from 'path'
import { log, color, getPkgs } from '@gaspy/tool'

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
