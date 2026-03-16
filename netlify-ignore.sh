#!/usr/bin/env bash

# Called by Netlify's ignore command (netlify.toml [build] ignore).
# Exit 0 = skip build, exit 1 = proceed with build.
#
# Skip builds where only links.yaml changed (radar API commits).
# This saves build minutes by batching radar changes into a nightly build.
# Note: Netlify build hooks bypass the ignore command entirely, so
# the scheduled GitHub Action nightly build always proceeds.

CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD 2>/dev/null)

# If we can't determine changes (e.g. first build), always build
if [ -z "$CHANGED_FILES" ]; then
  exit 1
fi

# If every changed file is links.yaml, skip the build
NON_RADAR_CHANGES=$(echo "$CHANGED_FILES" | grep -v "^src/content/radar/links.yaml$")

if [ -z "$NON_RADAR_CHANGES" ]; then
  echo "Only links.yaml changed — skipping build (will be picked up by nightly build)"
  exit 0
fi

# Other files changed — proceed with build
exit 1
