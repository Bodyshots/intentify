#!/bin/bash
source ./venv/bin/activate
docker compose down --volumes
cd frontend
pnpm update
cd ..
docker compose build