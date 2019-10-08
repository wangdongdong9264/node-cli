#!/usr/bin/env node
const program = require('commander') // node 命令行解决方案

// program
//   .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')

// program.parse(process.argv)
// console.log(`cheese: ${program.cheese}`)

const initial = require('../packages/commands/initial.js')

program
  .version('0.0.1', '-v, --version')
  .command('init')
  .description('initialize your config')
  .action(initial)

program.parse(process.argv)
