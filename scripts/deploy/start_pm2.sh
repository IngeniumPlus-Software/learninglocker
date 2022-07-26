#!/usr/bin/env bash

set -e
cd ~
# start up nvm so we can use pm2 (npm, yarn...)
. ~/.nvm/nvm.sh
cd /var/www/learning-locker-latest
pm2 start pm2/xapi.json