const path = require('path')
const fs = require('fs')
const chalk = require('chalk') // 终端彩色输出
const figlet = require('figlet') // 字体图
const inquirer = require('inquirer') // 交互式命令

function copyMeetConfigJS(err, data) {
  figlet('Hello Dongdong', function(err, data) {
    if (err) {
      console.log(chalk.red('Something went wrong...'))
      console.dir(err)
      return
    }
    console.log(chalk.yellow(data))
    // 文件操作
    const targetFilePath = path.resolve('Dongdong.config.js')
    const templatePath = path.join(__dirname, '../Dongdong/config/Dongdong.config.js')
    const contents = fs.readFileSync(templatePath, 'utf8')
    fs.writeFileSync(targetFilePath, contents, 'utf8')
    console.log(chalk.green('Initialize config success \n'));
    process.exit(0)
  })
}

module.exports = function () {
  if (fs.existsSync(path.resolve('Dongdong.config.js'))) {
      // 连续提问
      inquirer
        .prompt([
          /* Pass your questions in here */
          {
            name: 'init-confirm',
            type: 'confirm',
            message: `Dongdong.config.js is already existed, are you sure to overwrite?`,
            validate: function (input) {
              if (input.lowerCase !== 'y' && input.lowerCase !== 'n') {
                return 'Please input y/n !'
              } else {
                return true
              }
            }
          }
        ])
        .then(answers => {
          // Use user feedback for... whatever!!
          if (answers['init-confirm']) {
            copyMeetConfigJS()
          } else {
            process.exit(0)
          }
        })
        .catch(err => {
          console.log(chalk.red(err))
        })
  } else {
    copyMeetConfigJS()
  }
}
