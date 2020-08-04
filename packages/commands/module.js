const path = require('path')
const fs = require('fs')
const chalk = require('chalk') // 终端彩色输出
const inquirer = require('inquirer') // 交互式命令

let templatePath = '' // 要拷贝的目标所在路径
let targetRootPath = '' // 目标文件夹根路径

function deleteFolderRecursive(path) {
  // 清空文件夹
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      let curPath = path + '/' + file
      // 是否是文件夹
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

function copyTemplates(name) {
  // 复制模版
  function readAndCopyFile(parentPath, tempPath) {
    const files = fs.readdirSync(parentPath)
    files.forEach((file => {
      const curPath = `${parentPath}/${file}`
      const stat = fs.statSync(curPath)
      const filePath = `${targetRootPath}/${tempPath}/${file}`
      if (stat.isDirectory()) {
        fs.mkdirSync(filePath)
        readAndCopyFile(curPath, `${tempPath}/${file}`)
      } else {
        const contents = fs.readFileSync(curPath, 'utf8')
        fs.writeFileSync(filePath, contents, 'utf8')
      }
    }))
  }
  readAndCopyFile(templatePath, name)
}

function run(targetRootPath, name) {
  const targetDir = path.join(targetRootPath, name) // 生成的目录
  if (fs.existsSync(targetDir)) {
    // 存在目录 则提问是否覆盖
    inquirer
      .prompt([
        /* Pass your questions in here */
        {
          name: 'module-overwrite',
          type: 'confirm',
          message: `Module named ${name} is already existed, are you sure to overwrite?`,
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
        if (answers['module-overwrite']) {
          // 覆盖
          deleteFolderRecursive(targetDir)
          console.log(chalk.yellow(`Module already existed , removing!`))
          fs.mkdirSync(targetDir)
          copyTemplates(name)
          console.log(chalk.green(`Generate new module "${name}" finished!`))
        }
      })
  } else {
    // 创建目录 复制文件
    fs.mkdirSync(targetDir)
    copyTemplates(name)
    console.log(chalk.green(`Generate new module "${name}" finished!`))
  }
}

function generateModule(meetConfig, name) {
  templatePath = path.join(__dirname, '..', 'Dongdong/module') // 静态 后期更改成配置文件的形式
  targetRootPath = meetConfig.modulePath ? meetConfig.modulePath : './'
  /**
   *  @description 用户可能配置了 `modulePath` 但是没有创建
   * 
   */
  if (fs.existsSync(targetRootPath)) {
    console.log(chalk.green(`check modulePath ok`))
    run(targetRootPath, name)
  } else {
    // 提示是否要创建
    inquirer
      .prompt([{
        name: 'check-rootPath',
        type: 'confirm',
        message: `modulePath does not exist，Is it created? (y/n)`,
        validate: function (input) {
          if (input.lowerCase !== 'y' && input.lowerCase !== 'n') {
            return 'Please input y/n !'
          } else {
            return true
          }
        }
      }])
      .then(answers => {
        if (answers['check-rootPath']) {
          fs.mkdirSync(targetRootPath)
          console.log(chalk.green(`create RootPath success`))
        } else {
          return false
        }
        // 执行下一条命令
        run(targetRootPath, name)
      })
      .catch(err => {
        console.log(chalk.red(err))
      })
  }
}
module.exports = generateModule