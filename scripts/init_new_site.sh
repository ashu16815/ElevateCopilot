#!/usr/bin/env bash
set -e
BR=mission-rebuild-from-scratch
MSG='Rebuild: mission-first AI literacy platform (auth, profiles+consents, referrals, sessions, resources, impact, blog, privacy, analytics).'

if [ -d .git ]; then
  git checkout -b "$BR" || git checkout "$BR"
  git add -A
  git commit -m "$MSG" || echo 'Nothing to commit'
  echo 'Branch ready:' $BR
  echo 'Push with: git push -u origin' $BR
else
  echo 'Not a git repo. Run: git init && git add -A && git commit -m "init"'
fi
