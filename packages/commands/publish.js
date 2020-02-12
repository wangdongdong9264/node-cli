/**
 * @description git push
 */

const chalk = require('chalk')
const inquirer = require('inquirer')
const shell = require('../lib/shell')

let config = {
  autoPublish: false
}

function gitCommit() {
  inquirer.prompt([
    {
      name: 'message',
      type: 'input',
      message: `请输入提交的信息`
    }
  ]).then(answers => {
    const message = answers.message
    shell.series([
      'git pull',
      'git add .',
      `git commit -m "${message}"`,
      'git push'
    ], err => {
      if (err) {
        console.log(chalk.red(err))
        process.exit(0)
      }
      console.log(chalk.green('push 成功'))
      process.exit(0)
    })
  }).catch(e => {
    console.log(chalk.red(e))
  })
}

/**
 * @description todo 上传到cdn
 * @param {Object} DongdongConfig 
 */
function publish(DongdongConfig){
  Object.assign(config, DongdongConfig)
  // if(config.autoPublish) gitCommit()
  gitCommit()
}
module.exports = publish
