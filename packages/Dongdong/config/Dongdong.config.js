const path = require('path')

module.exports = {
  // 生成的目标目录
  // modulePath: path.resolve('public'),
  modulePath: path.resolve('./'),

  // template 目录
  // 默认是 Dongdong/module
  moduleTemplatePath: path.resolve('Dongdong/templates/module'), // TODO
  
  // project git url
  gitUrl: '', // TODO

  // 构建命令
  npmBuildCommand: '', // TODO

  // assets config
  upload: {
    server: '', // upload  阿里OSS - 'alioss', 七牛云 - 'qn'
    srcDir: path.resolve('public/assets'), // 要上传的dist文件夹
    config: {
      accessKeyId: '', // AccessKey
      accessKeySecret: '', // SecretKey
      bucket: '',
      region: '' // qn 暂时不支持
    }
  },
  // 是否自动上传cdn
  autoPublish: false // TODO
}
