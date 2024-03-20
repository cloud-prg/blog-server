version="v0.0.1"

echo "**** 开始构建镜像 ****"
npm run build

sudo chmod -R +rw ./src/config

sudo docker build -t bs:${version} .

echo "**** 构建镜像成功 ****"