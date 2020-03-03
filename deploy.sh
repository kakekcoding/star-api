#!/bin/bash

set -e

rm -rf .git
rm -rf .gitignore

git config --global user.name "Ahmad Rifa'i"
git config --global user.email "arifai209@gmail.com"

git init .
git add .
git commit -m "Deploying"
git remote add deploy ssh://ubuntu@$HOST/~/star-hrd.git
git push -u deploy master

ssh ubuntu@$HOST "cd ~/star-hrd.git/ && npm install && npm run"