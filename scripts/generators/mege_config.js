const path = require('path')
const fs = require('fs')
const log = require('../utils/log')
const color = require('../utils/color')
const getPkgs = require('../utils/get_pkgs')

module.exports = function () {
  const pkgs = getPkgs()

  pkgs.forEach((pkg) => {
    let hasMegeconfig = false
    try {
      fs.statSync(path.join(pkg.root, 'megeconfig.json'))
      hasMegeconfig = true
    } catch {}
    if (hasMegeconfig) return

    log(`Writing megeconfig: ${color.blue(pkg.root)}`)
    // 写入megeconfig.json文件
    fs.writeFileSync(
      path.join(pkg.root, 'megeconfig.json'),
      JSON.stringify(
        {
          runtime: false,
        },
        null,
        2
      )
    )
    log(`WriteUp megeconfig: ${color.blue(pkg.root)}`)
  })
}
