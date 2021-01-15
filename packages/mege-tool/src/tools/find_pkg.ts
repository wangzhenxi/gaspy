import { Pkg } from '../../types'
import getPkgs from './get_pkgs'

// 查找包名对应依赖包
function findPkg(pkgNames = [], options): Pkg[] {
  const pkgs = getPkgs(options)
  const target = []
  pkgs.forEach((pkg) => {
    if (pkgNames.length === target.length) return
    const exist = pkgNames.includes(pkg.name)
    if (!exist) return
    target.push(pkg)
  })
  return target
}

export default findPkg
