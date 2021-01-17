const path = require('path')
const fs = require('fs')
const log = require('../utils/log')
const color = require('../utils/color')
const getPkgs = require('../utils/get_pkgs')

module.exports = function () {
  const pkgs = getPkgs()

  pkgs.forEach((pkg) => {
    let hasGaspyconfig = false
    try {
      fs.statSync(path.join(pkg.root, 'gaspyconfig.json'))
      hasGaspyconfig = true
    } catch {}
    if (hasGaspyconfig) return

    log(`Writing gaspyconfig: ${color.blue(pkg.root)}`)
    // 写入gaspyconfig.json文件
    fs.writeFileSync(
      path.join(pkg.root, 'gaspyconfig.json'),
      JSON.stringify(
        {
          runtime: false,
        },
        null,
        2
      )
    )
    log(`WriteUp gaspyconfig: ${color.blue(pkg.root)}`)
  })
}
