#!/bin/bash

eval "$(ssh-agent -s)"

git config --global push.default matching
git remote add deploy ssh://git@$HOST$DEPLOY_DIR
git push deploy

ssh deploy@$HOST <<EOF
  cd $DEPLOY_DIR
  npm run
EOF