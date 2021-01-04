import path from 'path'
import fs from 'fs'
import log from '../utils/log'
import color from '../utils/color'
import { getPkgs } from '../utils/get_pkgs'

function generateMegeswitch() {
  const pkgs = getPkgs()

  pkgs.forEach((pkg) => {
    let hasMegeswitch = false
    try {
      fs.statSync(path.join(pkg.root, 'megeswitch.json'))
      hasMegeswitch = true
    } catch {}
    if (hasMegeswitch) return

    log(`Writing megeswitch: ${color.blue(pkg.root)}`)
    // 写入megeswitch.json文件
    fs.writeFileSync(
      path.join(pkg.root, 'megeswitch.json'),
      JSON.stringify(
        {
          runtime: false,
        },
        null,
        2
      )
    )
    log(`WriteUp megeswitch: ${color.blue(pkg.root)}`)
  })
}

export default generateMegeswitch
