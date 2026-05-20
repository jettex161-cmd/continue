# Embedded backend compatibility notes

The current `server/` implementation is not fully compatible with an embedded Node-on-Android runtime.

## Likely incompatible dependencies

- `puppeteer`
  - Requires a desktop Chromium environment and large native binaries.
  - Not practical for Android Node runtimes.
- `jsdom` and `cheerio`
  - These are pure JavaScript and should work fine.
- `express`, `compression`, `cors`, `helmet`
  - These are also pure JavaScript and should work.
- Python scraping support
  - The backend currently spawns `python3` in some paths.
  - An embedded APK would need a separate Python runtime or eliminate this logic.

## Recommended embedded backend scope

For a working standalone APK, keep only the following:

- HTML scraping with `cheerio`
- Basic `express` API endpoints
- Local server startup and request handling

Remove or disable:

- `puppeteer`-based JS rendering
- Python-based engines
- any native modules that are not Android-compatible

## Embedded server file layout

Proposed asset layout inside the APK:

- `android/app/src/main/assets/nodejs-project/package.json`
- `android/app/src/main/assets/nodejs-project/index.js`
- Bundled JavaScript files for the backend runtime

The frontend then calls `http://127.0.0.1:5000/api/...`.
