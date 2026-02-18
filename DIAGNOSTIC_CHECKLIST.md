# Diagnostic Checklist for API 500 Errors

## Current Status
- ✅ MongoDB Atlas network access configured (`0.0.0.0/0`)
- ❓ DATABASE_URL in Amplify Console (needs verification)
- ❌ API routes returning 500 errors
- ❌ Blog page not loading data

## Immediate Diagnostic Steps

### Step 1: Check if DATABASE_URL is Set in Amplify

1. Go to AWS Amplify Console → Your App → **Environment variables**
2. Look for `DATABASE_URL` in the list
3. **If NOT present:** Add it (see AMPLIFY_ENV_SETUP.md)
4. **If present:** Verify it matches exactly:
   ```
   mongodb+srv://hamfulldesigns_db_user:POonbCrz55EnA36S@homeglazerdb.noif1b9.mongodb.net/homeglazerdb?appName=homeglazerdb
   ```

### Step 2: Test Database Connection

Visit this URL on your production site:
```
https://main.d15nk5b2guin5u.amplifyapp.com/api/test-db-connection
```

**Check the response:**

#### If `databaseUrl: "Not set"`:
- DATABASE_URL is not configured in Amplify Console
- **Action:** Add DATABASE_URL in Amplify Console → Environment variables
- **Then:** Trigger a new build

#### If `databaseUrl: "Set"` but `connection: "Failed"`:
- DATABASE_URL is set but connection is failing
- **Check error details** in the response:
  - `P1001` or `ENOTFOUND` → Network/connection issue
  - `P1000` or `Authentication failed` → Wrong username/password
  - `MongoNetworkError` → Connection timeout (check network access again)

#### If `connection: "Connected"`:
- Database connection is working!
- Check `blogPostsCount` - if 0, there are no published blog posts
- **Action:** Verify blog posts exist in MongoDB Atlas with `published: true`

### Step 3: Check Amplify Build Logs

1. Go to Amplify Console → **Build history**
2. Open the latest build
3. Check **preBuild** phase:
   - Look for: `"ERROR: DATABASE_URL is not set"`
   - If you see this, DATABASE_URL is missing
4. Check **build** phase:
   - Look for Prisma errors
   - Look for MongoDB connection errors
   - Look for `prisma db push` success/failure

### Step 4: Verify MongoDB Credentials

1. Go to MongoDB Atlas → **Database Access**
2. Verify user exists: `hamfulldesigns_db_user`
3. Verify password matches (or reset if needed)
4. Ensure user has read/write permissions

### Step 5: Verify Database Name

1. Go to MongoDB Atlas → **Collections**
2. Verify database name: `homeglazerdb`
3. Verify `BlogPost` collection exists
4. Check if there are documents with `published: true`

## Common Scenarios

### Scenario A: Build Fails with "DATABASE_URL is not set"
**Cause:** Environment variable not set in Amplify Console
**Fix:** Add DATABASE_URL in Amplify Console → Environment variables → Trigger new build

### Scenario B: Build Succeeds but APIs Return 500
**Possible Causes:**
1. DATABASE_URL set incorrectly (typo, wrong format)
2. MongoDB credentials incorrect
3. Database name mismatch
4. Connection string format issue

**Fix:** 
- Verify DATABASE_URL matches exactly: `mongodb+srv://user:pass@cluster.mongodb.net/dbname?appName=...`
- Check `/api/test-db-connection` for specific error
- Verify MongoDB credentials in Atlas

### Scenario C: Connection Works but No Data
**Cause:** Database is empty or no published blog posts
**Fix:** 
- Check MongoDB Atlas for blog posts
- Ensure posts have `published: true`
- Run migration if needed: `npm run db:migrate-to-mongo`

## Quick Fix Commands

If you have SSH access to Amplify (unlikely), you could test:
```bash
# Check if DATABASE_URL is set
echo $DATABASE_URL

# Test connection manually
node -e "require('@prisma/client').PrismaClient.$connect()"
```

## Next Actions Based on Test Results

### If `/api/test-db-connection` shows "Not set":
1. Add DATABASE_URL in Amplify Console
2. Trigger new build
3. Test again

### If `/api/test-db-connection` shows connection error:
1. Check error code in response
2. Verify MongoDB credentials
3. Verify connection string format
4. Check MongoDB Atlas → Database Access

### If `/api/test-db-connection` shows "Connected":
1. Check `blogPostsCount` - if 0, add blog posts
2. Verify APIs work: `/api/products`, `/api/brands`
3. Check blog page: `/blog`

## Expected Final State

After fixing:
- ✅ `/api/test-db-connection` → `success: true, connection: "Connected"`
- ✅ `/api/products` → Returns product array (not 500)
- ✅ `/api/brands` → Returns brand array (not 500)
- ✅ `/blog` → Shows blog posts
