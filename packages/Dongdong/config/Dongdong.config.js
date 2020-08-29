const path = require('path')

module.exports = {
  // 生成的目标目录
  // modulePath: path.resolve('public'),
  modulePath: path.resolve('./'),

  // template 目录
  // 默认是 Dongdong/module
  moduleTemplatePath: path.resolve('Dongdong/templates/module'),
  
  // project git url
  gitUrl: '',

  // 构建命令
  npmBuildCommand: '',

  // assets config
  upload: {
    server: '', // cdn  阿里OSS - 'alioss', 七牛云 - 'qn'
    srcDir: path.resolve('public/assets'), // 要上传的dist文件夹
    config: {
      accessKeyId: '', // AccessKey
      accessKeySecret: '', // SecretKey
      bucket: '',
      region: '',
      ignoreDir: false,
      deduplication: true,
      prefix: 'xxx.xxx.xyz'
    }
  },
  // 是否上传cdn
  autoPublish: false
}
