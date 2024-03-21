echo "**** 清除所有容器 ****"
sudo docker rm -f $(sudo docker ps -a -q)
echo "**** 清除完成 ****"