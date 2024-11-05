#!/bin/bash
source ./venv/bin/activate
docker compose down --volumes
docker compose build
docker compose up --wait