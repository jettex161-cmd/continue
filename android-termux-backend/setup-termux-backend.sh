#!/usr/bin/env bash

set -e

if [ -z "$PREFIX" ]; then
  echo "This script is intended to run inside Termux."
  echo "Open Termux, navigate to the repo directory, and run this script there."
  exit 1
fi

echo "Updating Termux packages..."
pkg update -y
pkg upgrade -y

echo "Installing required packages..."
pkg install -y nodejs git curl

echo "The repo must be available in the current directory. If needed, clone it from your host or GitHub."

if [ ! -f package.json ] || [ ! -d server ]; then
  echo "No repository root found in the current directory."
  echo "Please cd into the copied repository root before running this script."
  exit 1
fi

cd server

if [ -f package-lock.json ]; then
  echo "Installing server dependencies..."
  npm install
else
  echo "Warning: package-lock.json not found. Ensure this is the repo root."
fi

echo "Building server..."
npm run build

echo "Copy or create a .env file using $(pwd)/../android-termux-backend/.env.example"
echo "Then start the backend with: npm start"
echo "Once the server is running, point your Android app to http://127.0.0.1:5000"
