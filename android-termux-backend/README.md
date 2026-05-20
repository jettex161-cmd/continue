# Android Termux backend (Option 2)

This folder contains a reviewable Termux-based backend option for Android.

## Goal

Run the existing `server/` backend directly on an Android device using Termux, and connect the Capacitor APK frontend to it.

## Approach

1. Install Termux on the Android device.
2. Install Node.js and Git inside Termux.
3. Clone or copy this repository into Termux.
4. Install server dependencies and build the backend.
5. Run the backend inside Termux on `127.0.0.1:5000`.
6. Use the installed APK frontend and point it to `http://127.0.0.1:5000`.

## What is included here

- `README.md` — instructions and review notes.
- `setup-termux-backend.sh` — a setup script for Termux.
- `.env.example` — Termux backend environment example.
