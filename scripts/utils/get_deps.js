const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '../../')

function getSubDeps(subRoot, container = []) {
  let pkg = null
  try {
    pkg = require(`${subRoot}/package.json`)
  } catch {}
  if (!pkg) {
    const dirs = fs
      .readdirSync(subRoot)
      .filter((dir) => dir.startsWith('mege-'))
    dirs.forEach((dir) => {
      getSubDeps(path.join(subRoot, dir), container)
    })
  } else {
    const inf = {
      name: pkg.name,
      root: subRoot,
      ts: false,
      deps: [],
    }
    try {
      fs.statSync(path.join(subRoot, 'src', 'index.ts'))
      inf.ts = true
    } catch {}
    const deps = [
      ...Object.keys(pkg.devDependencies),
      ...Object.keys(pkg.dependencies),
    ].filter((dep) => dep.startsWith('@mege/'))
    inf.deps = deps
    container.push(inf)
  }
  return container
}
function getDeps() {
  const target = path.join(root, 'packages')
  const deps = getSubDeps(target)
  return deps
}

module.exports = getDeps
