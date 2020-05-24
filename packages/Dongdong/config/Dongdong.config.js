const path = require('path')

module.exports = {
  // 生成的目标目录
  modulePath: path.resolve('public'),

  // template 目录
  // 默认是 Dongdong/module
  moduleTemplatePath: path.resolve('Dongdong/templates/module'),
  
  // project git url
  gitUrl: '',

  // 构建命令
  npmBuildCommand: '',

  // assets config
  upload: {
    // cdn  阿里OSS - 'alioss', 七牛云 - 'qn'
    server: '',
    config: {
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
      region: '',
      srcDir: path.resolve('public/assets'), // 要上传的dist文件夹
      ignoreDir: false,
      deduplication: true,
      prefix: 'xxx.xxx.xyz'
    }
  },
  // 是否上传cdn
  autoPublish: false
}
