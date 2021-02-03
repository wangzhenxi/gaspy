const path = require('path')
const { execSync } = require('child_process')

module.exports = function () {
  execSync('npx tsc --module commonjs', {
    cwd: path.join(__dirname, '../'),
    stdio: 'inherit',
  })
}
