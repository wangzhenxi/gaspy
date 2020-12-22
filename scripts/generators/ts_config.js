const path = require('path')
const fs = require('fs')
const getPkgs = require('../utils/get_pkgs')

module.exports = function () {
  const pkgs = getPkgs()
  const root = path.join(__dirname, '../../')

  pkgs.forEach((pkg) => {
    let hasTs = false
    try {
      fs.statSync(path.join(pkg.root, 'src', 'index.ts'))
      hasTs = true
    } catch {}
    if (!hasTs) return
    let hasTsconfig = false
    try {
      fs.statSync(path.join(pkg.root, 'tsconfig.json'))
      hasTsconfig = true
    } catch {}
    if (hasTsconfig) return

    // 收集references
    const references = []
    pkg.deps.forEach((dep) => {
      const target = pkgs.find((item) => item.name === dep)
      if (!target.hasTs) return
      references.push({ path: path.relative(pkg.root, target.root) })
    })

    // 写入tsconfig.json文件
    fs.writeFileSync(
      path.join(pkg.root, 'tsconfig.json'),
      JSON.stringify(
        {
          generated: true,
          extends: path.relative(
            pkg.root,
            path.join(root, 'tsconfig.base.json')
          ),
          compilerOptions: {
            outDir: './lib',
            rootDir: './src',
          },
          include: ['./src/**/*'],
          references,
        },
        null,
        2
      )
    )
  })
}
