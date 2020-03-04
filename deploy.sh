#!/bin/bash

docker login -u $DOCKER_USER -p $DOCKER_PASS

docker build -t arifai209/star-hrd:1.0.0 .
docker push arifai209/star-hrd:1.0.0

ssh ubuntu@$HOST << EOF
docker pull arifai209/star-hrd:1.0.0
docker stop arifai209/star-hrd:1.0.0 || true
docker rm arifai209/star-hrd:1.0.0 || true
docker rmi arifai209/star-hrd:1.0.0 || true
docker tag arifai209/star-hrd:1.0.0 arifai209/star-hrd:current
docker run -d --name star-hrd -p 8080:8080 arifai209/star-hrd:current
EOF