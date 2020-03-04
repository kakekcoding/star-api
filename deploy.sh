#!/bin/bash

set -e

WORK_DIR="~/ahmadrifai/dev.starhrd.site"
BRANCH="master"

echo ===================
echo Auto deploy server
echo Processing...
echo ===================

echo Connecting to remote server

ssh ubuntu@$HOST << "ENDSSH"
    whoami

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

    . ~/.nvm/nvm.sh

    nvm install 12.16.1

    cd $WORK_DIR && pwd

    git config --global user.name "Ahmad Rifa'i"
    git config --global user.email "arifai209@gmail.com"

    git remote add deploy ssh://ubuntu@$HOST/~/repo/starhrd.git
    git push -u deploy $BRANCH

    npm install
    npm start
ENDSSH