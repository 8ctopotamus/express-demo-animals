const chalk = require('chalk')

const logger = (req, res, next) => {
  console.log(chalk.white.bgBlue.bold(`${req.method} request hit path ${req.url}`))

  next()
}

module.exports = logger