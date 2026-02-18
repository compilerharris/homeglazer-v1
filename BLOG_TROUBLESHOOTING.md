# Blog Page Troubleshooting Guide

## Current Issue: Blog page loads but shows "Unable to load blog posts" + API 500 errors

The blog page is loading correctly, but blog posts are not being fetched from MongoDB. Additionally, `/api/products` and `/api/brands` are returning 500 errors. This indicates a database connection issue affecting all API routes.

## Diagnostic Steps

### 1. Test Database Connection

Visit this URL on your production site to test the database connection:
```
https://main.d15nk5b2guin5u.amplifyapp.com/api/test-db-connection
```

This will show:
- Whether DATABASE_URL is set
- Connection status
- Number of published blog posts
- Any error details

### 2. Check Amplify Environment Variables

1. Go to AWS Amplify Console
2. Select your app
3. Go to **Environment variables**
4. Verify `DATABASE_URL` is set to:
   ```
   mongodb+srv://hamfulldesigns_db_user:POonbCrz55EnA36S@homeglazerdb.noif1b9.mongodb.net/homeglazerdb?appName=homeglazerdb
   ```
5. Ensure it matches your `.env.local` file exactly

### 3. Check MongoDB Atlas Network Access

**This is the most common issue!**

1. Log into [MongoDB Atlas](https://cloud.mongodb.com/)
2. Go to **Network Access** (left sidebar)
3. Check your IP allowlist:
   - **Option 1 (Recommended for testing)**: Add `0.0.0.0/0` to allow all IPs
   - **Option 2 (More secure)**: Add specific AWS Amplify IP ranges
4. Click **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`)
5. Wait 1-2 minutes for changes to propagate
6. Trigger a new Amplify build

### 4. Verify Database Has Blog Posts

1. Connect to MongoDB Atlas using MongoDB Compass or Atlas UI
2. Navigate to your database: `homeglazerdb`
3. Check the `BlogPost` collection
4. Verify there are documents with `published: true`

### 5. Check Amplify Build Logs

1. Go to Amplify Console → Your App → **Build history**
2. Open the latest build
3. Check for errors related to:
   - `DATABASE_URL` not set
   - Prisma connection errors
   - MongoDB connection failures

### 6. Common Error Messages and Solutions

| Error Message | Solution |
|--------------|----------|
| "Database connection failed" | Check MongoDB Atlas Network Access allows `0.0.0.0/0` |
| "Connection timeout" | Same as above - network access issue |
| "Authentication failed" | Verify DATABASE_URL username/password are correct |
| "Database configuration error" | Check DATABASE_URL is set in Amplify Console |
| "500 Internal Server Error" (API routes) | Same root cause - MongoDB connection issue |

### 7. API Routes Returning 500 Errors

If `/api/products` and `/api/brands` are returning 500 errors:

1. **Root Cause**: Same database connection issue affecting all routes
2. **Solution**: Fix MongoDB Atlas network access (see step 3 above)
3. **Verification**: After fixing, test:
   - `/api/products` should return product list
   - `/api/brands` should return brand list
   - `/api/test-db-connection` should show success

## Quick Fix Checklist

- [ ] DATABASE_URL is set in Amplify Console Environment Variables
- [ ] MongoDB Atlas Network Access includes `0.0.0.0/0` (or Amplify IPs)
- [ ] Database has blog posts with `published: true`
- [ ] New Amplify build triggered after setting environment variables
- [ ] Test connection API shows success: `/api/test-db-connection`

## After Fixing

1. Trigger a new Amplify build
2. Wait for build to complete
3. Visit `/blog` page
4. Check `/api/test-db-connection` for diagnostics
5. Verify blog posts appear

## Still Not Working?

Check the Amplify build logs and server logs for detailed error messages. The improved error handling will show specific error codes that can help diagnose the issue.
