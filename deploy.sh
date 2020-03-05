#!/bin/bash
set -e

echo =======================
echo Ready deploy to server
echo "=======================\n\n"

rm -rf .git

git config --global user.name "Ahmad Rifa'i"
git config --global user.email "arifai209@gmail.com"

git init .
git add .
git commit -m "Lets deploy to server...."
git remote add deploy ubuntu@$HOST:/home/ubuntu/repo/starhrd.git
git push --force deploy master

ssh ubuntu@$HOST << EOF
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 12.16.3
cd ~/ahmadrifai/dev.starhrd.site
npm install
cp .env.example .env
pm2 start api/server.js && exit
EOF