# LMS Deployment Guide

This repository contains a React frontend and an Express/MongoDB backend.

## Render deployment

Use the following settings on Render:

- **Build command**: `npm install; npm run build`
- **Start command**: `cd backend && npm run dev`
- **Root directory**: repository root
- **Environment variables**:
  - `VITE_FIREBASE_APIKEY`
  - `VITE_FIREBASE_AUTHDOMAIN`
  - `VITE_FIREBASE_PROJECTID`
  - `VITE_FIREBASE_STORAGEBUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APPID`
  - `VITE_RAZORPAY_KEY_ID`
  - `MONGODB_URL`
  - `JWT_SECRET`
  - `CLOUDINARY_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - Any other backend env values used by `backend/config`.

## Notes

- The `frontend/.env` file is intentionally ignored by git.
- Use `frontend/.env.example` as a template for deployment variables.
- The root `package.json` is now configured so Render builds from the repo root.
