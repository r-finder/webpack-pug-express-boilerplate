#!/bin/sh

rm -rf ./dist
mkdir ./dist
npm run watch &
cp ./src/server/* ./dist
node ./dist/app.js