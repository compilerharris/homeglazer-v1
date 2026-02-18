# Amplify Environment Variables Setup Guide

## Current Issue: API 500 Errors Despite MongoDB Network Access Configured

Since MongoDB Atlas network access is already configured (`0.0.0.0/0`), the issue is likely that **DATABASE_URL is not set in Amplify Console**.

## Step-by-Step: Set DATABASE_URL in Amplify Console

### 1. Access Amplify Console

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Select your app: **homeglazer-v1** (or your app name)
3. Click on your app to open it

### 2. Navigate to Environment Variables

1. In the left sidebar, click **"Environment variables"**
2. You should see a list of existing environment variables (if any)

### 3. Add DATABASE_URL

1. Click **"Manage variables"** or **"Add environment variable"**
2. Add the following:

   **Key:** `DATABASE_URL`
   
   **Value:** 
   ```
   mongodb+srv://hamfulldesigns_db_user:POonbCrz55EnA36S@homeglazerdb.noif1b9.mongodb.net/homeglazerdb?appName=homeglazerdb
   ```

3. **Important:** Make sure to:
   - Copy the entire connection string exactly as shown above
   - Do NOT include quotes around the value
   - Ensure there are no extra spaces
   - The value should match your `.env.local` file (line 10)

4. Click **"Save"**

### 4. Verify Other Required Variables

While you're in Environment Variables, also check/verify these:

| Variable | Required | Example Value |
|----------|----------|---------------|
| `DATABASE_URL` | ✅ **REQUIRED** | `mongodb+srv://user:pass@cluster.mongodb.net/dbname?appName=...` |
| `JWT_SECRET` | Optional (for auth) | Random string |
| `CRYPTO_SECRET` | Optional (for encryption) | Random string |
| `GMAIL_USER` | Optional (for contact form) | `homeglazer@gmail.com` |
| `GMAIL_APP_PASSWORD` | Optional (for contact form) | App password |

### 5. Trigger New Build

**CRITICAL:** After setting environment variables, you MUST trigger a new build:

1. Go to **"Build history"** in the left sidebar
2. Click **"Redeploy this version"** or **"Start new build"**
3. Wait for the build to complete (usually 5-10 minutes)

**Why:** Environment variables are only available at build time and runtime. A new build is required for changes to take effect.

## Verification Steps

### 1. Test Database Connection

After the build completes, visit:
```
https://main.d15nk5b2guin5u.amplifyapp.com/api/test-db-connection
```

Expected response if working:
```json
{
  "success": true,
  "message": "Database connection successful",
  "diagnostics": {
    "databaseUrl": "Set",
    "connection": "Connected",
    "blogPostsCount": <number>,
    ...
  }
}
```

If `databaseUrl` shows "Not set", the environment variable wasn't configured correctly.

### 2. Test API Routes

After build completes, test:
- `/api/products` - Should return product list (not 500 error)
- `/api/brands` - Should return brand list (not 500 error)
- `/blog` - Should show blog posts

### 3. Check Build Logs

1. Go to **Build history** → Latest build
2. Check the **preBuild** phase logs
3. Look for: `"ERROR: DATABASE_URL is not set"` - if you see this, the variable isn't set
4. Look for Prisma connection errors in the build phase

## Common Issues

### Issue: "DATABASE_URL is not set" in build logs

**Solution:** 
- Go back to Environment Variables
- Verify `DATABASE_URL` is spelled exactly (case-sensitive)
- Ensure there are no extra spaces
- Click "Save" again
- Trigger a new build

### Issue: Build succeeds but APIs still return 500

**Possible causes:**
1. Environment variable was added AFTER the build started
   - **Fix:** Trigger a new build after setting the variable

2. Connection string format is incorrect
   - **Fix:** Verify it matches exactly: `mongodb+srv://user:pass@cluster.mongodb.net/dbname?appName=...`

3. MongoDB credentials are incorrect
   - **Fix:** Verify username/password in MongoDB Atlas → Database Access

4. Database name mismatch
   - **Fix:** Verify database name in connection string matches MongoDB Atlas

### Issue: Test connection shows "Not set" but variable exists

**Solution:**
- Ensure variable name is exactly `DATABASE_URL` (case-sensitive, no spaces)
- Check if variable is set for the correct branch (main/production)
- Trigger a new build after adding the variable

## Quick Checklist

- [ ] MongoDB Atlas network access configured (`0.0.0.0/0`) ✅ (Already done)
- [ ] `DATABASE_URL` added in Amplify Console Environment Variables
- [ ] Connection string matches `.env.local` exactly
- [ ] New build triggered after setting environment variable
- [ ] Build completed successfully
- [ ] `/api/test-db-connection` shows "Connected"
- [ ] `/api/products` returns data (not 500)
- [ ] `/api/brands` returns data (not 500)
- [ ] `/blog` shows blog posts

## Next Steps

1. **Set DATABASE_URL in Amplify Console** (if not already done)
2. **Trigger a new build**
3. **Wait for build to complete**
4. **Test `/api/test-db-connection`** to verify connection
5. **Test `/api/products` and `/api/brands`** to verify APIs work
6. **Test `/blog` page** to verify blog posts load

If issues persist after setting DATABASE_URL and rebuilding, check the build logs and the test-db-connection API response for specific error messages.
