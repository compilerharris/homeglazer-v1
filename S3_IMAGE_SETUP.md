# S3 Image Setup for Production (Amplify)

Room images and uploads are **excluded from the Amplify deploy** (bundle size limit). They must be served from S3.

## Prerequisites

- Terraform has created the S3 bucket (or you have an S3 bucket with public read)
- AWS credentials for uploads

## Step 1: Add Amplify Environment Variable

In **AWS Amplify Console** → Your App → **Environment variables**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_S3_MEDIA_URL` | `https://<bucket>.s3.<region>.amazonaws.com` |

Get the value from Terraform:
```bash
cd terraform
terraform output media_base_url
```

Example: `https://homeglazer-prod-media-123456789.s3.us-east-1.amazonaws.com`

**Important:** No trailing slash. This is inlined at build time, so trigger a new build after adding.

## Step 2: Upload Room Images (Visualiser)

From project root, with S3 credentials in `.env.local` or environment:

```bash
npm run upload:visualiser
```

This uploads `public/assets/images/{bedroom,bathroom,kitchen,livingroom,...}` to S3 at `visualiser/assets/images/...`.

## Step 3: Upload Media (uploads/, media/)

```bash
npm run upload:media
```

This uploads `public/uploads/` and `public/media/` to S3.

## Required Env Vars for Upload Scripts

```env
S3_BUCKET=homeglazer-prod-media-ACCOUNT_ID
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
```

## Verify

After deploy, open:
- Advanced visualiser final preview: `/colour-visualiser/advanced/final-preview`
- Basic visualiser: `/colour-visualiser/basic/asian-paints/Greys/confetti-8300`

Room images should load from S3. If you see "Image unavailable", check:
1. `NEXT_PUBLIC_S3_MEDIA_URL` is set in Amplify and a new build was triggered
2. `npm run upload:visualiser` was run successfully
3. S3 bucket has public read policy (Terraform sets this)
