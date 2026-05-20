#!/usr/bin/env bash

set -e

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
EMBEDDED_DIR="$BASE_DIR/embedded-server"
ANDROID_ASSETS="$BASE_DIR/../android/app/src/main/assets/nodejs-project"

if [ ! -d "$EMBEDDED_DIR" ]; then
  echo "Embedded server folder not found: $EMBEDDED_DIR"
  exit 1
fi

cd "$EMBEDDED_DIR"

echo "Installing embedded backend dependencies..."
npm install

echo "Preparing Android embedded assets..."
mkdir -p "$ANDROID_ASSETS"
rm -rf "$ANDROID_ASSETS"/*
cp -r "$EMBEDDED_DIR"/* "$ANDROID_ASSETS"/

cat <<'EOF'
Embedded server files copied to the Android assets folder.
Next steps:
  1. Install the NodeJS Mobile plugin in the root project:
     npm install nodejs-mobile-cordova --save
  2. Sync Capacitor:
     npx cap sync android
  3. Update android/app/src/main/java/com/webscraper/app/MainActivity.java
     to start the embedded Node engine.
  4. Build the client and sync the app assets:
     npm --prefix client run build
     npx cap sync android
  5. Build the APK:
     cd android && ./gradlew assembleDebug
EOF
