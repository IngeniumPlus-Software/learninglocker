#!/usr/bin/env bash

# start up nvm so we can use pm2 (npm, yarn...)
cd ~
#nvm use 10
. ~/.nvm/nvm.sh
cd /var/www/learning-locker-latest
pm2 stop pm2/all.json