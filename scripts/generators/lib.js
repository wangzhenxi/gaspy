const path = require('path')
const log = require('../utils/log')
const color = require('../utils/color')
const getPkgs = require('../utils/get_pkgs')

module.exports = function () {
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
