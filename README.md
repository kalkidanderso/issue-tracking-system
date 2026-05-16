# Assessment Submission (API + Web)

This repository contains two apps:

- `api/` - Express + MySQL backend
- `web/` - React frontend

## Prerequisites

- Node.js installed
- MySQL running

## Run Backend (API)

1. `cd api`
2. Create `.env` with your MySQL credentials (see your existing `api/.env` format if present).
3. Install + run:
   - `npm install`
   - `npm start`

Backend endpoints are served from the API base URL configured in the server (commonly `http://localhost:3000`).

## Run Frontend (Web)

1. `cd web`
2. Create/update `.env` to point to your backend (example):
   - `REACT_APP_API_URL=http://localhost:3000`
3. Install + run:
   - `npm install`
   - `npm start`

Frontend runs on port `3001` (per `web/package.json`).

## Notes

- This is a single repo containing both `api/` and `web/` for easier review and submission.

