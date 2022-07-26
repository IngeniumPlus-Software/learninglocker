#!/usr/bin/env bash

set -e
cd ~
# Update Nginx conf for environment variables
# Performing this here instead of postcopy script because the conf file is not present when the postcopy runs.
sed "s/XAPI_PORT/$EXPRESS_PORT/" /etc/nginx/conf.d/learning-locker.conf > ~/learning-locker.conf & mv -f ~/learning-locker.conf /etc/nginx/conf.d/learning-locker.conf
service nginx start