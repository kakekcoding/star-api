#!/bin/bash
set -e

rm -rf .git

git config --global user.name "Ahmad Rifa'i"
git config --global user.email "arifai209@gmail.com"

git init .
git add .
git commit -m "Lets deploy to server...."
git remote add deploy $USER@$HOST:/home/$USER/repo/starhrd.git
git push --force deploy master

ssh $USER@$HOST << EOF
cd ~/ahmadrifai/dev.starhrd.site
npm i pm2 -g
npm install
pm2 start api/server.js && exit
EOF