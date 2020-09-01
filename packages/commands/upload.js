// 上传模块
// 后续可以考虑单例模式

const qiniu = require('qiniu')
const OSS = require('ali-oss')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk') // 终端彩色输出

let UploadConfig = {}
let url = ''

function ali(config) {
  const {
    accessKeyId,
    accessKeySecret,
    bucket,
    region
  } = config

  if (accessKeyId && accessKeySecret && bucket && region) {
    const client = new OSS({
      bucket,
      region,
      accessKeyId,
      accessKeySecret
    })

    async function put (key, file) {
      try {
        //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        let result = await client.put(key, file)
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    }

    // 递归上传
    const uploadAll = (dir, prefix) => {
      const files = fs.readdirSync(dir)
      files.forEach(file => {
        const filePath = path.join(dir, file)
        const key = prefix ? `${prefix}/${file}` : file
        if (fs.lstatSync(filePath).isDirectory()) {
          return uploadAll(filePath, key)
        }
        put(key, filePath)
      })
    }

    // 执行
    if (fs.existsSync(url)) {
      uploadAll(url)
    } else {
      console.log(chalk.yellow(`Path does not exist ！`))
    }

  } else {
    console.log(chalk.yellow(`Parameter error ！`))
  }
}

function qn(config) {
  const {
    accessKeyId,
    accessKeySecret,
    bucket
  } = config
  if (accessKeyId && accessKeySecret && bucket) {
    // 参数都有的情况下执行
    const mac = new qiniu.auth.digest.Mac(accessKeyId, accessKeySecret)
    const config = new qiniu.conf.Config()

    // 单文件上传
    const doUpload = (key, file) => {
      const options = {
        scope: bucket + ':' + key
      }
      const formUploader = new qiniu.form_up.FormUploader(config)
      const putExtra = new qiniu.form_up.PutExtra()
      const putPolicy = new qiniu.rs.PutPolicy(options)
      const uploadToken = putPolicy.uploadToken(mac)
      return new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
          if (err) {
            return reject(err)
          }
          if (info.statusCode === 200) {
            resolve(body)
          } else {
            reject(body)
          }
        })
      })
    }
    // 递归上传
    const uploadAll = (dir, prefix) => {
      const files = fs.readdirSync(dir)
      files.forEach(file => {
        const filePath = path.join(dir, file)
        const key = prefix ? `${prefix}/${file}` : file
        if (fs.lstatSync(filePath).isDirectory()) {
          return uploadAll(filePath, key)
        }
        doUpload(key, filePath)
          .then(resp => console.log(resp))
          .catch(err => console.error(err))
      })
    }
    // 执行
    if (fs.existsSync(url)) {
      uploadAll(url)
    } else {
      console.log(chalk.yellow(`Path does not exist ！`))
    }
  } else {
    console.log(chalk.yellow(`Parameter error ！`))
  }
}

function upload(DongdongConfig) {
  const {
    upload:{
      server,
      srcDir,
      config
    }
  } = DongdongConfig
  Object.assign(UploadConfig, config)
  url = srcDir
  if (server === 'alioss') {
    ali(config)
  } else {
    qn(config)
  }
}
module.exports = upload