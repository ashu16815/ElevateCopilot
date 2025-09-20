#!/usr/bin/env bash
set -e
BR=mission-ai-literacy
msg='Pivot to mission-first AI literacy: free sessions, resources, impact pages, feature-flag to revert to paid'

if [ -d .git ]; then
  git checkout -b "$BR" || git checkout "$BR"
  git add -A
  git commit -m "$msg" || echo 'Nothing to commit (maybe already staged)'
  echo '---'
  echo "Branch ready: $BR"
  echo 'Push with:'
  echo "  git push -u origin $BR"
else
  echo 'This project is not a git repo yet. Run: git init && git add -A && git commit -m "Initial"'
fi
