const { execSync } = require('child_process')
const path = require('path')

module.exports = function () {
  execSync('yarn run mege-cli', {
    cwd: path.join(__dirname, '../'),
    stdio: 'inherit',
  })
}
