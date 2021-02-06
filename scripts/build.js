const { spawnSync } = require('child_process')
const path = require('path')
const getDeps = require('./utils/get_pkgs')

const pkgs = getDeps({ sort: true })
pkgs.forEach((pkg) => {
  const filepath = path.join(pkg.root, 'tsconfig.json')
  spawnSync('tsc', ['-p', filepath, '--module', 'commonjs'], {
    stdio: 'inherit',
  })
})
