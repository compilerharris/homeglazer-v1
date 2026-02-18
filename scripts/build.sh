#!/usr/bin/env bash
set -e
prisma generate
if [[ -n "$DATABASE_URL" && "$DATABASE_URL" == mongodb* ]]; then
  prisma db push
else
  echo "Skipping prisma db push (DATABASE_URL not set or not MongoDB)"
fi
npm run prebuild
next build
