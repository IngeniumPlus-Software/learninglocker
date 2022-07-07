#!/usr/bin/env bash

set -e

cd /var/www/learning-locker-latest

unzip output.zip -d /var/www/learning-locker-latest/
cp /var/www/learning-locker-latest/health.js /var/www/learning-locker-latest/ui/dist/public/health.js

#run this as nodejs
su nodejs
cd ~
. ~/.nvm/nvm.sh