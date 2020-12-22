const path = require('path')
const fs = require('fs')
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
  })
}
