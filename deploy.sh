#!/bin/bash

set -e

PATH="/home/reliqa/.local/bin:$PATH"

cd /home/reliqa/frontend/ || exit

git checkout -- deploy.sh

git stash

git pull

(umask 077; glab variable export -R reliqa/frontend --output env > .env.tmp)
mv .env.tmp .env

docker compose up --build --detach