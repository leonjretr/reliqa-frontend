#!/bin/bash

set -e

cd /home/reliqa/frontend/ || exit

git checkout -- deploy.sh

git stash

git pull

docker compose up --build --detach