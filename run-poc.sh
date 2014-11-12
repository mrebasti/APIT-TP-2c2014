#!/bin/bash

mongod --fork --logpath ./log.txt

git pull
cd frontend
npm install
nodejs index.js
