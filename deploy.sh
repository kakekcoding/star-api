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
    cd $WORK_DIR

    git config --global user.name "Ahmad Rifa'i"
    git config --global user.email "arifai209@gmail.com"

    git remote add deploy ssh://ubuntu@$HOST/~/repo/starhrd.git
    git push -u deploy $BRANCH

    npm install
    npm run
ENDSSH