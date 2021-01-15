const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '../../')

function getSubDeps(subRoot, container = []) {
  // 获取依赖树
  let pkg = null
  try {
    pkg = require(`${subRoot}/package.json`)
  } catch {}
  if (!pkg) {
    const dirs = fs.readdirSync(subRoot)
    dirs.forEach((dir) => {
      const dirpath = path.join(subRoot, dir)
      const stat = fs.statSync(dirpath)
      if (!stat.isDirectory()) return
      getSubDeps(dirpath, container)
    })
  } else {
    const inf = {
      name: pkg.name,
      description: pkg.description,
      root: subRoot,
      deps: [],
    }
    const deps = [
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.dependencies || {}),
    ].filter((dep) => dep.startsWith('@mege/'))
    inf.deps = deps
    container.push(inf)
  }
  return container
}

function sortDeps(pkgs) {
  const ret = []
  // 根据依赖关系排序
  for (let i = 0; i < pkgs.length; i += 1) {
    const pkg = pkgs[i]
    let index = -1
    for (let j = 0; j < pkg.deps.length; j += 1) {
      const dep = pkg.deps[j]
      for (let k = 0; k < ret.length; k += 1) {
        if (ret[k].name === dep) {
          index = k
          break
        }
      }
    }
    ret.splice(index + 1, 0, pkg)
  }
  return ret
}

function getDeps(options = {}) {
  const { sort = false } = options
  const target = path.join(root, 'packages')
  let deps = getSubDeps(target)
  if (sort) {
    deps = sortDeps(deps)
  }
  return deps
}

module.exports = getDeps
