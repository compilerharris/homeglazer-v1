# Amplify Build Setup Checklist

## Canvas fix (applied)

The original **`canvas`** package required native libs (Cairo, Pango) that fail on Amplify. Replaced with **`@napi-rs/canvas`** (prebuilt binaries, zero system deps).

---

## Build output size (220 MB limit)

Amplify limits deployment to ~220 MB. `amplify.yml` postBuild removes:
- `public/media/products` – product images (served from S3)
- `public/uploads` – user uploads (served from S3)
- `public/assets/Ai` – AI images (excluded from API)
- `public/assets/images/{bedroom,bathroom,kitchen,...}` – room images (served from S3)
- `node_modules/@swc`, `@esbuild`, `esbuild` – build-only deps

**Before first deploy:** Upload media assets to S3 (run both scripts):
```bash
# From project root, with S3_* env vars (or .env.local)
npm run upload:visualiser   # Room images for colour visualiser
npm run upload:media        # uploads/, media/ (hero, certificates, testimonials, etc.)
```

**Amplify env vars:** Add `NEXT_PUBLIC_S3_MEDIA_URL` = `https://<bucket>.s3.<region>.amazonaws.com` (from `terraform output s3_media_base_url`). Images use this base URL when S3 is configured.

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
| **NEXT_PUBLIC_S3_MEDIA_URL** | `https://<bucket>.s3.<region>.amazonaws.com` (from terraform output) |
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
