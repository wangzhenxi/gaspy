import fs from 'fs'
import path from 'path'
import getRootPkg from './get_root_pkg'
import { Pkg } from '../../types'

interface GetPkgsOptions {
  sort?: boolean
}

const rootPkg = getRootPkg()

const rootPkgName = rootPkg.name

function getSubPkgs(subRoot, container = []): Pkg[] {
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
      getSubPkgs(dirpath, container)
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
    ].filter((dep) => dep.startsWith(`@${rootPkgName}/`))
    inf.deps = deps
    container.push(inf)
  }
  return container
}

function sortPkgs(pkgs): Pkg[] {
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

// 获取所有依赖包
function getPkgs(options: GetPkgsOptions = {}): Pkg[] {
  const { sort = false } = options
  const target = path.join(rootPkg.root, 'packages')
  let pkgs = getSubPkgs(target)
  if (sort) {
    pkgs = sortPkgs(pkgs)
  }
  return pkgs
}

export default getPkgs
