# Web Scraper App

A consolidated web scraping application with enhanced crawler and scraping capabilities.

## Overview
- Fast HTML scraping and JavaScript-rendered scraping
- Website crawling with depth and page limits
- Social username lookup
- Realistic request headers with rotating browser user agents
- Imported user-agent generator under `import/`
- External client reference copied into `import/client/` for scraper and lookup improvements
- Android image scaling references available in `import/IMAGE_SCALING_REFERENCES.md`, including `Kvngz3n0/Imge-deecoder` and `imagescaler` examples
- Media lookup site extension guidance available in `import/MEDIA_LOOKUP_EXTENSIONS.md`

## Key folders
- `server/` — backend API and scraper logic
- `client/` — frontend interface
- `import/` — imported repository assets and user-agent refresh script

## GitHub APK build
- A GitHub Actions workflow is available at `.github/workflows/apk-build.yml`.
- On push or manual dispatch, it will build the Android debug APK and upload it as an artifact.

## Quick start
```bash
npm run install-all
npm run build
npm run start:server
```

Visit:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Android native setup

To prepare the app for Android with Capacitor:

```bash
npm run install-android
```

If you already have Android Studio / Android SDK installed locally, open the native project:

```bash
npm run android:open
```

To build a debug APK locally:

```bash
npm run android:build
```

The app includes a runtime backend endpoint field so you can configure which API host it uses on the device.

- For Android emulator: use `http://10.0.2.2:5000`
- For a local Android Termux/server backend: use `http://127.0.0.1:5000`
- For a hosted backend: use the public API URL

If the app shows a backend connection error, open the backend host field and set the correct address before retrying.

This mirrors the same native-capable Android workflow used by the GitHub APK build action.
