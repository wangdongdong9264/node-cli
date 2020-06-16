FROM node
## 镜像
RUN mkdir -p /home/Service
## RUN：用于执行后面跟着的命令行命令
WORKDIR /home/Service
## WORKDIR 指定工作目录。用 WORKDIR 指定的工作目录，会在构建镜像的每一层中都存在。（WORKDIR 指定的工作目录，必须是提前创建好的）。 docker build 构建镜像过程中的，每一个 RUN 命令都是新建的一层。只有通过 WORKDIR 创建的目录才会一直存在。
COPY . /home/Service
## COPY 复制指令，从上下文目录中复制文件或者目录到容器里指定路径。
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
EXPOSE 8080
## EXPOSE 仅仅只是声明端口
CMD npm run serve
## CMD 类似于 RUN 指令，用于运行程序，但二者运行的时间点不同:
## CMD 在docker run 时运行。
## RUN 是在 docker build。
## 作用：为启动的容器指定默认要运行的程序，程序运行结束，容器也就结束。CMD 指令指定的程序可被 docker run 命令行参数中指定要运行的程序所覆盖。
## 注意：如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效。
## 如果想运行多条指令可以这样：
## CMD git pull && npm install && npm start
