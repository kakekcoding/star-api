#!/bin/bash

eval "$(ssh-agent -s)"

# testing connection travis-ci on server
ssh -i travis_rsa deploy@HOST pwd

ssh deploy@$HOST pwd <<EOF
  cd $DEPLOY_DIR
  npm run
EOF