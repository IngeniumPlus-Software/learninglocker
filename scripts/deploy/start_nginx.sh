#!/usr/bin/env bash

set -e
cd ~
# Update Nginx conf for environment variables
# Performing this here instead of postcopy script because the conf file is not present when the postcopy runs.
sed -i "s+UI_PORT+$UI_PORT+g" /etc/nginx/conf.d/learning-locker.conf
sed -i "s+API_PORT+$API_PORT+g" /etc/nginx/conf.d/learning-locker.conf
service nginx start