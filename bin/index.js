#!/usr/bin/env node
const program = require('commander') // node 命令行解决方案
const path = require('path')
const fs = require('fs')

// program
//   .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')

// program.parse(process.argv)
// console.log(`cheese: ${program.cheese}`)

const initial = require('../packages/commands/initial.js')
const gmodule = require('../packages/commands/module.js')
const stencil = require('../packages/commands/stencil.js')
const publish = require('../packages/commands/publish.js')
let config = {} // 配置文件信息
if (fs.existsSync(path.resolve('Dongdong.config.js'))) {
  config = require(path.resolve('Dongdong.config.js'))
}

program
  .version('0.4.1', '-v, --version')
  .command('init')
  .description('initialize your config')
  .action(initial)

program
  .command('new [module]')
  .description('generator a new module')
  .action(function (module) {
    gmodule(config, module)
  })
program
  .command('template')
  .description('created template')
  .action(stencil)

program
  .command('publish')
  .description('easy git push')
  .action(function() {
    publish(config)
  })

program.parse(process.argv)
