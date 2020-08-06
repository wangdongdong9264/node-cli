const path = require('path')
const fs = require('fs')
const chalk = require('chalk') // 终端彩色输出
const inquirer = require('inquirer')
const shell = require('../lib/shell')

let pwdPath = []
let cmdArr = []
let baseScript = {}
let basePath = ''

/**
 *
 * @description 处理cmd命令
 */
function handleCmd (str) {
  let run = ''
  for (const baseScriptKey in baseScript) {
    if (str === baseScript[baseScriptKey]) {
      run = baseScriptKey
    }
  }
  return [ 'cd ' + basePath , 'npm run ' + run ]
}

/**
 *
 * @description 选择执行命令
 */
function input() {
  inquirer
    .prompt([
      {
        name: 'script',
        type: 'list',
        message: `请选择要执行的命令`,
        choices: cmdArr
      }])
    .then(answers => {
      const cmd = answers['script']
      const arrC = handleCmd(cmd)
      console.log(arrC)
      shell.series(arrC, (err) => {
        if (err) {
          console.log(chalk.red(err))
        } else {
          console.log(chalk.green('Successful execution of the command -> ${cme}'))
        }
        process.exit(0)
      })
  })
}

/**
 *
 * @description 处理数据
 */
function handleData (data) {
  const d = JSON.parse(data)
  console.log(d.scripts)
  const script = d.scripts
  if (script) {
    baseScript = script
    const keys = Object.keys(script)
    keys.forEach((value) => {
      cmdArr.push(script[value])
    })
    // 执行命令
    input()
  }
}

/**
 *
 * @constructor
 * @description 递归找到package 临界点path.length - 1
 */
function Recursion() {
  if (pwdPath.length > 2) {
    // 检测是否有package.json
    const filePath = path.join(pwdPath.join('/'), './package.json')
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8')
      basePath = pwdPath.join('/')
      handleData(data)
    } else {
      pwdPath.pop()
      Recursion()
    }
  } else {
    console.log(chalk.red(`Couldn't find a package.json file`))
  }
}

/**
 *
 * @description 开始
 */
function script(url) {
  pwdPath = url.split('/')
  Recursion()
}

module.exports = script
