import fs from 'fs'
import path from 'path'
import { Template } from '@gaspy/template'

function ensureDirSync(dir) {
  if (fs.existsSync(dir)) return
  const parent = path.join(dir, '../')
  ensureDirSync(parent)
  fs.mkdirSync(dir)
}

function writeFile(filePath, fileContent) {
  ensureDirSync(path.dirname(filePath))
  fs.writeFileSync(filePath, fileContent)
}

function writeFileTree(workspace, files = {}) {
  Object.entries(files).forEach(([filename, fileContent]) => {
    const filePath = path.join(workspace, filename)
    writeFile(filePath, fileContent)
  })
}

export class Creator {
  name: string

  workspace: string

  constructor(name, workspace) {
    this.name = name
    this.workspace = workspace
  }

  async create() {
    const template = new Template(this.workspace)
    const files = await template.output({
      appName: this.name,
    })
    writeFileTree(this.workspace, files)
  }
}
