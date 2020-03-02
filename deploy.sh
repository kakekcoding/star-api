#!/bin/bash

eval "$(ssh-agent -s)"

# testing connection travis-ci on server
ssh -i travis_rsa deploy@94.237.67.83 pwd

ssh -i travis_rsa deploy@94.237.67.83 pwd <<EOF
  cd $DEPLOY_DIR
  npm run
EOF