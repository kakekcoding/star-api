#!/bin/bash

docker login -username $DOCKER_USER --password-stdin $DOCKER_PASS

docker build -t arifai209/star-hrd:1.0.0 .
docker push arifai209/star-hrd:1.0.0

ssh ubuntu@$HOST << EOF
docker pull arifai209/star-hrd:1.0.0
docker stop api-boilerplate || true
docker rm api-boilerplate || true
docker rmi arifai209/star-hrd:1.0.0 || true
docker tag arifai209/star-hrd:1.0.0 arifai209/star-hrd:current
docker run -d --name star-hrd -p 8080:8080 arifai209/star-hrd:current
EOF