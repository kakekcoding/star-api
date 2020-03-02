#!/bin/bash

eval "$(ssh-agent -s)"
echo -e "Host $HOST\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config

ssh deploy@$HOST <<EOF
  cd $DEPLOY_DIR
  npm run
EOF