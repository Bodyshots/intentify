#!/bin/bash
python3 -m venv venv
source ./venv/bin/activate
cd backend
pip install -r requirements.txt
cd ..
docker compose up -d