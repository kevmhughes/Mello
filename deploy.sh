#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<kevmhughes>.github.io/<simple-Vue-application>
git push -f git@github.com:kevmhughes/simple-Vue-application.git master:gh-pages

cd -