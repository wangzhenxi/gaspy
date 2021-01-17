import path from 'path'
import fs from 'fs'
import { log, color, getPkgs } from '@gaspy/tool'

function generateGaspyswitch() {
  const pkgs = getPkgs()

  pkgs.forEach((pkg) => {
    let hasGaspyswitch = false
    try {
      fs.statSync(path.join(pkg.root, 'gaspyswitch.json'))
      hasGaspyswitch = true
    } catch {}
    if (hasGaspyswitch) return

    log(`Writing gaspyswitch: ${color.blue(pkg.root)}`)
    // 写入gaspyswitch.json文件
    fs.writeFileSync(
      path.join(pkg.root, 'gaspyswitch.json'),
      JSON.stringify(
        {
          runtime: false,
        },
        null,
        2
      )
    )
    log(`WriteUp gaspyswitch: ${color.blue(pkg.root)}`)
  })
}

export default generateGaspyswitch
