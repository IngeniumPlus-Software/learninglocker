#!/usr/bin/env bash

set -e

cd /var/www/learning-locker-latest
# unzip our latest
unzip output.zip -d /var/www/learning-locker-latest/
# recreate .env file that has been deleted during code deployment
cat /etc/profile.d/ips-env.sh | sed "s/export//" | sed "s/'//g" >> /var/www/learning-locker-latest/.env
# make sure that nodejs user has control
chown nodejs -R /var/www/learning-locker-latest/