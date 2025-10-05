# AWS-MERN-DOCKER-EC2


This demo i will use MERN(mongodb,express, react,node.js) to make one user register website.  
Written by pengchao ma in Xi'an

## Features

- Frontend/client, Dockerfile to package an image
- Backend/server, Dockerfile to package an image
- Database, use mongodb:7.0 image

## Usage

- EC2 server needs to install docker, docker-compose
```shell
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker
```
Add current user to docker group
```shell
sudo usermod -aG docker $USER

```
Install docker-compose v2
```shell
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
Add execute
```shell
sudo chmod +x /usr/local/bin/docker-compose
```
Download the repo from my Github
```shell
git clone https://github.com/pengchao2022/aws-mern-ec2-project.git
```
Add execute to the following scripts
```shell
 chmod +x logs.sh start.sh stop.sh 
 ```
 RUN ./start.sh

 ## Notice

 -- Please make sure you have allowed EC2 port 80 and port 5000(for node) in your Inbound rules


