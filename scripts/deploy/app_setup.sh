#!/usr/bin/env bash

set -e

cd /var/www/learning-locker-latest

unzip output.zip -d /var/www/learning-locker-latest/
cp /var/www/learning-locker-latest/health.js /var/www/html/health.js