# Android embedded backend (Option 1)

This folder contains a prototype design for bundling a minimal Node backend inside an Android APK.

## Goal

Build a standalone Android app that includes the frontend and a bundled local backend server, so the app can run without requiring a separate remote server.

## Approach

The intended architecture is:

1. Use a Node-on-Android runtime such as Node.js Mobile (`nodejs-mobile-cordova` / `nodejs-mobile-react-native`).
2. Package the `server/` backend code as part of the Android app assets.
3. Start the local backend server from native Android code on app startup.
4. Point the Capacitor frontend to the local URL `http://127.0.0.1:5000`.

## Important compatibility note

The current backend depends on several modules that are not guaranteed to work inside Node.js Mobile on Android:

- `puppeteer` is very likely incompatible because it requires a desktop Chromium environment.
- Python-based scraping and shell command execution will not work unless you also embed a Python runtime.
- Native Node modules and heavy binaries may fail on Android.

This option is therefore a prototype for a lightweight embedded backend. For a full feature set, the backend code must be simplified to use pure JavaScript scraping and avoid unsupported native binaries.

## What is included here

- `README.md` — this design and execution notes.
- `setup-embedded-backend.sh` — a helper script to prepare the embedded backend files.
- `server-compatibility.md` — notes on compatibility and how the current backend must be trimmed.
- `embedded-server/` — a minimal embedded server prototype based on Express, Axios and Cheerio.
- `integration-notes.md` — concrete integration instructions for Android.

## Next review steps

1. Review `embedded-server/` to see the minimal HTML scraping backend.
2. Run `android-embedded-backend/setup-embedded-backend.sh` to copy the prototype into the Android assets.
3. Update `android/app/src/main/java/com/webscraper/app/MainActivity.java` with the NodeJS Mobile startup code.
4. Build the Android APK and test basic embedded scraping from the packaged app.
