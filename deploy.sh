#!/bin/bash

set -e

cd ~/ahmadrifai/dev.starhrd.site/
git remote add deploy ssh://ubuntu@$HOST/~/repo/starhrd.git
git push -u deploy master

ssh ubuntu@$HOST "cd ~/ahmadrifai/dev.starhrd.site/ && npm ci && npm run"