#!/bin/bash

set -e

rm -rf .git
rm -rf .gitignore

git config --global user.name "Ahmad Rifa'i"
git config --global user.email "arifai209@gmail.com"

git init .
git add .
git commit -m "Deploying"
git remote add deploy ssh://ubuntu@$HOST/~/ahmadrifai.git
git push --force deploy deploy

ssh ubuntu@HOST "cd ~/ahmadrifai.git/ && npm install && npm run"