const chalk = require('chalk')
const shell = require('shelljs')
const child_process = require('child_process')

/**
 * @description 就是这样
 */
exports.exec = function (cmd, cb) {
  const parts = cmd.split(/\s+/g)
  const p = child_process.spawn(parts[0], parts.slice(1), {
    stdio: 'inherit'
  })
  p.on('exit', code => {
    let error = null
    if (code) {
      errStr = `命令${cmd}运行出错，错误代码：${code}`
      error = new Error(errStr)
    }
    if (cb) cb(error)
  })
}

exports.series = function(cmds, cb){
  const execNext = () => {
    const cmd = cmds.shift()
    console.log(chalk.blue('run command: ') + chalk.magenta(cmd))
    shell.exec(cmd, err => {
      if (err) {
        cb(err)
      } else {
        if (cmds.length) execNext()
        else cb(null)
      }
    })
  }
  execNext()
}
