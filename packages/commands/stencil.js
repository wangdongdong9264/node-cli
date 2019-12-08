// 新建模版
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { vueTemplate, entryTemplate } = require('../Dongdong/template/teamplate_vue.js')

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    console.log(chalk.red(`${path}文件已存在`))
    return
  }
  // return new Promise((resolve, reject) => {
  //   fs.watchFile(path, data, 'utf8', err => {
  //     if (err) {
  //       console.log(chalk.red(`${err.message}`))
  //     } else {
  //       resolve(true)
  //     }
  //   })
  // })
  fs.writeFileSync(path, data, 'utf8')
}

module.exports = function () {
  // todo input用户输入 (容错)
  inquirer
    .prompt([
      {
        name: 'new-template',
        type: 'list',
        message: `请选择要生成文件的类型`,
        choices: [
         'Vue',
         'React'
        ],
        filter: (val) => val.toLowerCase()
      },
      {
        name: 'template-name',
        type: 'input',
        message: `请输入要生成的文件名称(不需要文件后缀)`
      }
    ]).then(answers => {
      const type = answers['new-template']
      const name = answers['template-name']
      const inputName = String(name).trim().toString()
      let componentName = ''
      // 检查
      if (!inputName) {
        console.log(chalk.red(`文件名称有误`))
        return
      }
      // 添加模版
      if (type === 'vue') {
        // 补全后缀名
        if (!inputName.endsWith('.vue')) {
          componentName = inputName + '.vue'
        } else {
          componentName = inputName
        }
        // 文件操作
        try {
          const targetFilePath = path.resolve(componentName)
          generateFile(targetFilePath, vueTemplate(componentName))
          console.log(chalk.green('生成成功')) 
        } catch (error) {
          console.log(chalk.red(`${error.message}`))
        }
      }
    })
}