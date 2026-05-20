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
- `setup-embedded-backend.sh` — a scaffold script showing the plugin and sync steps.
- `server-compatibility.md` — notes on compatibility and how the current backend must be trimmed.

## Next review steps

1. Review `setup-embedded-backend.sh` for the exact Node.js Mobile plugin setup.
2. Review `server-compatibility.md` to decide which backend modules must remain.
3. If you want, I can then implement a concrete Capacitor + Node.js Mobile integration and a minimal bundled server entrypoint.
