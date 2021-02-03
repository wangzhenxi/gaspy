import log from './log'
import color from './color'

function exit(error, options) {
  const { code = 1, noExit = false } = options || {}

  if (Array.isArray(error)) {
    error.forEach((err) => {
      exit(err, {
        noExit: true,
      })
    })
  } else if (typeof error === 'string') {
    log(color.red(error))
  } else {
    console.log(error)
  }

  if (noExit) return
  process.exit(code)
}

export default exit
