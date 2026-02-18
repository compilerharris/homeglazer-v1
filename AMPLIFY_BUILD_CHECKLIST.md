# Amplify Build Setup Checklist

## Likely cause of build failure

The build fails because **`canvas`** (used by `pages/api/visualizer/render-image.ts`) requires native system libraries (Cairo, Pango) that are not installed by default on Amplify's build environment.

**Fix applied:** `amplify.yml` now installs these in preBuild:
- `cairo-devel`, `cairo-gobject-devel`
- `pango-devel`
- `libjpeg-turbo-devel`, `giflib-devel`, `zlib-devel`

---

## Cross-check

| Item | Status |
|------|--------|
| **Platform** | `WEB_COMPUTE` (required for Next.js SSR) |
| **Repo** | `beckhamza/homeglazer-v1` |
| **Branch** | `main` |
| **Framework** | Next.js - SSR |
| **DATABASE_URL** | Must be set in Amplify Console, include DB name: `...mongodb.net/dbname?appName=...` |
| **MongoDB Atlas** | Network access: Allow `0.0.0.0/0` for Amplify IPs |
| **S3 env vars** | `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` |
| **Build script** | `prisma generate && prisma db push && prebuild && next build` |

---

## Build flow

1. Clone → preBuild (DATABASE_URL check, install canvas deps, npm ci)
2. Build → `npm run build` (prisma db push, generate-wall-masks, next build)
3. Deploy → `.next` output

---

## Other possible failure points

- **prisma db push** – MongoDB connection or invalid DATABASE_URL
- **generate-wall-masks** – Missing `public/visualizerManifest.json` or SVGs
- **next build** – Memory, sharp, or other dependency issues
