# Dongdong-cli

## 说明

基于node `10.16.3`

## 开始

```
// 标准开头
#!/usr/bin/env node
```

### 测试

```sh
npm link
```

#### 取消私有模块

```sh
npm unlink <CliName>
```

#### 0.0.1版本

* 测试命令是否执行

#### 0.0.2版本

* 增加模版
* 与配置文件关联

#### 0.3.0版本

* 添加 vue模版

#### 0.4.0版本

* 添加git push

#### 0.4.1版本

* 添加vue typeScript 模版

#### 0.4.2版本

* 添加 简单的 vue-ts 项目模版

#### 0.4.3版本

* 恢复之前的 新建逻辑
* 修复 没有先执行init命令 无法新建（new）

#### 0.5.0版本

* 获取 package.json 中的script
* 可选择执行 script 脚本命令

#### 0.6.0版本 todo

* 上传 oss （qiniu/ali） 

