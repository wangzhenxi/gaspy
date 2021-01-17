import inquirer from 'inquirer'
import { getPkgs } from '@gaspy/tool'
import { Pkg } from '@gaspy/tool/types'

// 选择模块
async function selectModule(modulename): Promise<Pkg> {
  const pkgs = getPkgs()
  if (modulename) {
    const target = pkgs.find((pkg) => pkg.name === modulename)
    if (target) {
      return target
    }
  }
  const choices = pkgs.map((item, index) => ({
    name: item.name,
    value: index,
  }))
  const { index } = await inquirer.prompt({
    type: 'list',
    name: 'index',
    message: '请选择模块',
    choices,
  })
  return pkgs[index]
}

export { selectModule }
