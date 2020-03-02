#!/bin/bash

eval "$(ssh-agent -s)"
ssh-add .ssh/id_rsa

git config --global push.default matching
git remote add deploy ssh://git@$IP$DEPLOY_DIR
git push deploy

ssh deploy@$IP -p $PORT <<EOF
  cd $DEPLOY_DIR
  crystal build --release --no-debug index.cr
EOF