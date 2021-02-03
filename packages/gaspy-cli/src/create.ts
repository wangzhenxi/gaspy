import path from 'path'
import fs from 'fs'
import validateNpmProjectNmae from 'validate-npm-package-name'
import { exit } from '@gaspy/tool'
import shelljs from 'shelljs'
import inquirer from 'inquirer'
import { Creator } from './creator'

interface Options {
  force?: boolean // 是否强制执行文件操作
}

async function create(appName, options: Options = {}) {
  const cwd = process.cwd()

  let name = ''
  let targetDir = ''
  if (appName === '.') {
    name = path.relative('../', cwd)
    targetDir = cwd
  } else {
    name = appName
    targetDir = path.join(cwd, name)
  }

  // 校验包名
  const validateName = validateNpmProjectNmae(name)
  if (validateName.errors) {
    exit(validateName.errors)
  }

  // 生成目录
  if (fs.existsSync(targetDir)) {
    if (fs.readdirSync(targetDir).length) {
      let clean = false || options.force
      if (!clean) {
        const { action } = await inquirer.prompt({
          name: 'action',
          type: 'confirm',
          message: `目标目录 ${targetDir} 已存在，是否确认清空该文件夹？`,
        })
        clean = action
      }
      if (!clean) {
        process.exit(1)
      }
      await shelljs.rm('-rf', `${targetDir}/*`)
    }
  } else {
    shelljs.mkdir(targetDir)
  }

  // 生成模版文件
  const creator = new Creator(name, targetDir)
  await creator.create()
}

export { create }
