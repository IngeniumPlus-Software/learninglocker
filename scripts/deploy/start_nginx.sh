#!/usr/bin/env bash

set -e
cd ~
# Update Nginx conf for environment variables
# Performing this here instead of postcopy script because the conf file is not present when the postcopy runs.
cat /etc/nginx/conf.d/learning-locker.conf | sed "s/UI_PORT/$UI_PORT/" | sed "s/API_PORT/$API_PORT/" > /var/www/learning-locker-latest/learning-locker.conf & mv -f /var/www/learning-locker-latest/learning-locker.conf /etc/nginx/conf.d/learning-locker.conf
service nginx start