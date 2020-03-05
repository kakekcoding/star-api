#!/bin/bash

set -e

rm -rf .git

git config --global user.name "Ahmad Rifa'i"
git config --global user.email "arifai209@gmail.com"

git init .
git add .
git commit -m "Go to deploy..."
git remote add deploy ubuntu@$HOST:/home/ubuntu/repo/starhrd.git
git pull deploy master
git push deploy master

ssh ubuntu@$HOST << EOF
cd ~/ahmadrifai/dev.starhrd.site
npm install
cp .env.example .env
npm start
EOF