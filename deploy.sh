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
cd ~/ahmadrifai/starhrd.site
npm install
npm run pm2 && exit
EOF