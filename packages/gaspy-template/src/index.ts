import path from 'path'
import fs from 'fs'
import ejs from 'ejs'
import globby from 'globby'
import { TemplateType } from '../types'

const templateDir = path.join(__dirname, '../templates')

const gaspyOptions = {
  cliVersion: '0.0.2',
}

function render(dirpath, filepath, options = {}) {
  const template = fs.readFileSync(path.join(dirpath, filepath), 'utf-8')
  const content = ejs.render(template, options)

  return content
}

export class Template {
  workspace: string

  type: TemplateType

  constructor(workspace, type = TemplateType.Standard) {
    this.workspace = workspace
    this.type = type
  }

  async output(options) {
    const dirpath = path.join(templateDir, this.type)
    const filepaths = await globby(['**/*'], { cwd: dirpath })
    const files = {}
    filepaths.forEach((filepath) => {
      const targetpath = filepath.replace(/app_name/, options.appName)
      files[targetpath] = render(dirpath, filepath, {
        options,
        gaspy: gaspyOptions,
      })
    })
    return files
  }
}
