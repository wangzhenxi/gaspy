import path from 'path'

function getRootPkg() {
  const root = process.cwd() || process.env.MEGE_ROOT
  const rootPkg = require(path.join(root, 'package.json'))
  return {
    name: rootPkg.name,
    description: rootPkg.description,
    root,
    deps: [],
  }
}

export default getRootPkg
