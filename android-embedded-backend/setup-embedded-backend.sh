#!/usr/bin/env bash

# Scaffold script for preparing an embedded Android backend.
# This script is intentionally non-destructive and prints the expected commands.

set -e

cat <<'EOF'
1. Install the Node.js Mobile Cordova plugin in the root project:
   npm install nodejs-mobile-cordova --save

2. Add the plugin to the Capacitor Android project:
   npx cap sync android

3. Copy the built server output into the Android assets folder.
   Example target: android/app/src/main/assets/nodejs-project/

4. Add native Android startup code to launch the local server:
   - Use the NodeJS Mobile native bridge
   - Start the server script from assets
   - Bind to http://127.0.0.1:5000

5. Update the frontend API base URL to the local host address.

Note: this is a scaffold for review, not a complete automated installer.
EOF
