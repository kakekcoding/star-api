#!/bin/bash

set -e

ssh ubuntu@$HOST 
cd ~/ahmadrifai/dev.starhrd.site/
git remote add deploy ssh://ubuntu@$HOST/~/repo/starhrd.git
git push -u deploy master