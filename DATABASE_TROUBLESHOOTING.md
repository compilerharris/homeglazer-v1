# Database Connection Troubleshooting

## Error: "Error opening a TLS connection: bad certificate format"

This occurs when connecting to cloud PostgreSQL (Vercel Postgres, AWS RDS, etc.) with SSL. The fix is to add `sslaccept=accept_invalid_certs` to your `DATABASE_URL`.

**Option 1 – Edit `.env` directly**

If your URL looks like:
```
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

Change it to:
```
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require&sslaccept=accept_invalid_certs"
```

**Option 2 – Use the import script (automatic)**

The `scripts/import-asian-paints-products.js` script automatically appends this parameter when it detects `sslmode=` in `DATABASE_URL`, so no manual change is needed.

---

## Error: "Can't reach database server at `db.prisma.io:5432`"

This means your app cannot connect to the PostgreSQL database. The hostname `db.prisma.io` is used by **Vercel Postgres**.

---

## If you're on Vercel (deployed site)

### Step 1: Check your database in Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Open your **Home Glazer** project
3. Click the **Storage** tab (top navigation)
4. Look for a **Postgres** database

### Step 2: If the database is paused or missing

**Database paused (common on free tier):**
- Click the database
- Click **Resume** or **Restore** if you see it
- Wait 1–2 minutes for it to come back online

**No database:**
- Click **Create Database**
- Select **Postgres**
- Choose a region (e.g. `iad1` for US East)
- Click **Create**
- Vercel will add `DATABASE_URL` to your environment variables

### Step 3: Redeploy

1. Go to the **Deployments** tab
2. Click the **...** on the latest deployment
3. Choose **Redeploy**

Or push a small change to trigger a new deployment.

---

## If you're running locally (`npm run dev`)

### Option A: Use Vercel Postgres (same as production)

1. In Vercel: Project → **Settings** → **Environment Variables**
2. Copy the `DATABASE_URL` value (or pull it with Vercel CLI)
3. In your project root, create or update `.env.local`:
   ```
   DATABASE_URL="postgresql://..."
   JWT_SECRET="your-jwt-secret"
   ```
4. Ensure the Vercel Postgres database is **running** (not paused) in the Storage tab

### Option B: Use local PostgreSQL

1. Install PostgreSQL locally (e.g. `brew install postgresql@15`)
2. Start it: `brew services start postgresql@15`
3. Create a database: `createdb homeglazer`
4. In `.env.local`:
   ```
   DATABASE_URL="postgresql://localhost:5432/homeglazer?schema=public"
   JWT_SECRET="your-jwt-secret"
   ```
5. Run migrations: `npx prisma migrate deploy`
6. Create admin: `npx tsx scripts/create-admin.ts`

---

## Verify the connection

Run this in your project directory:

```bash
npx prisma db pull
```

If it succeeds, the database is reachable. If it fails, the DATABASE_URL or database status is wrong.
