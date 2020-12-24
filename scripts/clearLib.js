const path = require('path')
const shell = require('shelljs')
const log = require('./utils/log')
const color = require('./utils/color')
const getPkgs = require('./utils/get_pkgs')

module.exports = function () {
  const pkgs = getPkgs()

  return Promise.all(
    pkgs.map(async (pkg) => {
      log(`Clearing: ${color.blue(pkg.root)}`)
      await shell.rm('-rf', path.join(pkg.root, 'lib'))
      log(`Cleared: ${color.blue(pkg.root)}`)
    })
  )
}
