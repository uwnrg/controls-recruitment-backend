#!/bin/bash

echo "Adding files and deploying"
git add firebase/hash.json -f
git add firebase/service-account-key.json -f
git commit -m "Deploy"
git push heroku master -f
echo "Resetting files"
git reset HEAD~
echo "Deploy done"


