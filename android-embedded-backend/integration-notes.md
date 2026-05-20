# Embedded Android backend integration notes

This document describes the first prototype for bundling a Node backend into the Android app.

## Goal

Start a lightweight local backend inside the APK and serve the Capacitor frontend from the same device.

## What this prototype contains

- `embedded-server/package.json`
- `embedded-server/index.js`
- `embedded-server/scraper.js`

This is a minimal backend implementation that supports HTML scraping only.

## Installation steps

1. From the repo root, install the Node.js Mobile Cordova plugin:

```bash
npm install nodejs-mobile-cordova --save
```

2. Sync Capacitor with the Android platform:

```bash
npx cap sync android
```

3. Prepare the embedded backend assets:

```bash
cd android-embedded-backend/embedded-server
npm install
mkdir -p ../../android/app/src/main/assets/nodejs-project
cp -r . ../../android/app/src/main/assets/nodejs-project/
```

The `nodejs-project` asset folder should contain:

- `index.js`
- `package.json`
- `node_modules/`
- `scraper.js`

4. Modify the Android native startup code in `android/app/src/main/java/com/webscraper/app/MainActivity.java`.

Example integration using Node.js Mobile:

```java
package com.webscraper.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.janeasystems.nodejs.NodeJS;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        NodeJS.startEngine(getApplicationContext(), "index.js");
    }
}
```

5. Update the frontend default API endpoint for native mode if needed.

In `client/src/api.ts`, point native Android requests to:

```ts
const androidEmbeddedBase = 'http://127.0.0.1:5000';
```

6. Build the client web assets and sync them to Android:

```bash
npm --prefix client run build
npx cap sync android
```

7. Build the Android APK:

```bash
cd android
./gradlew assembleDebug
```

## Notes

- This prototype intentionally omits Puppeteer and Python scraping support. It only includes HTML scraping via Axios + Cheerio.
- Node.js Mobile on Android may have limitations; this prototype is the first step.
- The embedded backend should be started on app launch before the frontend calls `/api/scrape`.

## Review next steps

- Verify whether `NodeJS.startEngine` is available in the installed plugin version.
- Confirm the bundled `node_modules` directory is small enough for APK packaging.
- If successful, we can expand the embedded backend to include more API endpoints and browser scraping behavior.
