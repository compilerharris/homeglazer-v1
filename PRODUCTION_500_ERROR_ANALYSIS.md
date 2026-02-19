# Production API 500 Error - Root Cause Analysis

## ✅ UPDATE: Database Connection Working!

**Diagnostic Result:**
```bash
curl https://main.d15nk5b2guin5u.amplifyapp.com/api/test-db-connection
# Result: {"success":true,"message":"Database connection successful"...}
```

This confirms:
- ✅ Prisma Client is working
- ✅ DATABASE_URL is set correctly
- ✅ MongoDB Atlas is accessible
- ✅ Environment variables are configured

## Problem Summary

When calling `https://main.d15nk5b2guin5u.amplifyapp.com/api/products`, the server returns:
- **HTTP 500 Internal Server Error**
- **HTML error page** instead of JSON response
- This prevents the frontend from loading products in production

**BUT** the test-db-connection endpoint works fine, so the issue is **specific to the products API endpoint**.

## Root Causes (Most Likely - Updated)

### 1. **Response Payload Too Large / Timeout** (MOST LIKELY NOW)
**What's happening:**
- The products query returns ALL products from the database
- With hundreds of products, each having multiple fields (features, specifications, FAQs, etc.)
- The JSON response might be **several megabytes**
- AWS Lambda (which runs Next.js API routes on Amplify) has a **6MB response limit**
- OR the function times out before completing the serialization

**Evidence:**
- Test endpoint (`/api/test-db-connection`) works fine (small response)
- Products endpoint fails (large response with all products)
- Local works because no Lambda limits

**Solution needed:**
- Add pagination to the products API
- Or reduce the amount of data returned per product
- Or implement caching

### 2. **JSON Serialization Error with Prisma JSON Fields**
**What's happening:**
- Prisma JSON fields (prices, specifications, faqs, etc.) might contain data that can't be serialized
- Special characters, circular references, or undefined values
- Next.js can't convert to JSON and throws an error

**Check for:**
- Malformed JSON in database
- Special MongoDB ObjectIds that aren't serializable
- Date objects that need conversion

### 3. **AWS Lambda Memory/Timeout Limits**
**What's happening:**
- AWS Lambda functions have limited memory and timeout settings
- If the products API exceeds these limits, it will terminate with an error

**Check and Increase:**
- Memory allocated to the Lambda function
- Timeout setting for the function (default is 3 seconds)

### 4. **Missing Environment Variables in AWS Amplify**
**What's happening:**
- `DATABASE_URL` or other critical env vars might not be set in AWS Amplify Console
- Without `DATABASE_URL`, Prisma can't connect to MongoDB Atlas
- API returns 500 when trying to query database

**Check in AWS Amplify Console:**
```
Environment variables that MUST be set:
✓ DATABASE_URL
✓ JWT_SECRET  
✓ CRYPTO_SECRET
✓ GMAIL_USER
✓ GMAIL_APP_PASSWORD
✓ S3_BUCKET
✓ S3_REGION
✓ S3_ACCESS_KEY_ID
✓ S3_SECRET_ACCESS_KEY
✓ NEXT_PUBLIC_SITE_URL
```

### 5. **MongoDB Atlas Network Access / IP Whitelist**
**What's happening:**
- MongoDB Atlas might not allow connections from AWS Amplify's IP addresses
- Connection times out or is rejected
- API fails when trying to connect to database

**Check in MongoDB Atlas:**
1. Go to Network Access
2. Verify AWS Amplify IPs are whitelisted (or use `0.0.0.0/0` for allow all)

### 6. **Next.js Build Issues**
**What's happening:**
- API routes might not be built correctly
- TypeScript compilation errors
- Missing dependencies in production build

## How to Diagnose

### Step 1: Check AWS Amplify Build Logs
```bash
# In AWS Amplify Console:
1. Go to your app
2. Click on the latest deployment
3. Check "Build logs" for errors
4. Look for:
   - "prisma generate" output
   - TypeScript compilation errors
   - Missing module errors
```

### Step 2: Check AWS Amplify Environment Variables
```bash
# In AWS Amplify Console:
1. App settings → Environment variables
2. Verify ALL required variables are set:
   DATABASE_URL=mongodb+srv://...
   JWT_SECRET=...
   NEXT_PUBLIC_SITE_URL=https://main.d15nk5b2guin5u.amplifyapp.com
```

### Step 3: Check MongoDB Atlas Logs
```bash
# In MongoDB Atlas:
1. Go to your cluster
2. Click "Metrics" or "Monitoring"
3. Check for connection attempts from AWS
4. Look for authentication failures
```

### Step 4: Test Database Connection
```bash
# Create a test API endpoint: /pages/api/test-db.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Test simple query
    const count = await prisma.product.count();
    
    return res.status(200).json({
      success: true,
      message: 'Database connection successful',
      productCount: count,
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV,
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV,
      }
    });
  }
}
```

## Quick Diagnosis Steps

### Test with Limited Products
Deploy the test endpoint and check:
```bash
# Test with 5 products
curl https://main.d15nk5b2guin5u.amplifyapp.com/api/test-products?limit=5

# Test with 50 products  
curl https://main.d15nk5b2guin5u.amplifyapp.com/api/test-products?limit=50

# Test with all products
curl https://main.d15nk5b2guin5u.amplifyapp.com/api/test-products?limit=1000
```

If small limits work but large limits fail → **Response too large**
If all limits fail → **Serialization error**

### Check AWS Amplify Logs
1. Go to AWS Amplify Console
2. Your app → Monitoring → Logs
3. Look for:
   - `RangeError: Maximum call stack size exceeded` → Serialization issue
   - `Task timed out after X seconds` → Timeout
   - `Response payload size exceeded maximum` → Payload too large

## Solutions

### Solution 1: Add Pagination to Products API (RECOMMENDED)
```typescript
// pages/api/products/index.ts
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  try {
    // Implement pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    // Fetch products with pagination
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      // ... other query options
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
}
```

### Solution 2: Fix Prisma Client in Production Build (RECOMMENDED)

**Option A: Keep Prisma in dependencies (not devDependencies)**
```json
// package.json
{
  "dependencies": {
    "prisma": "^5.x.x",        // ← Move from devDependencies
    "@prisma/client": "^5.x.x"
  }
}
```

**Option B: Generate Prisma Client BEFORE npm prune**
```yaml
# amplify.yml
build:
  commands:
    - npm run build              # This runs "prisma generate" via postinstall
postBuild:
  commands:
    # DON'T remove Prisma files
    - |
      rm -rf node_modules/@swc node_modules/@esbuild node_modules/esbuild 2>/dev/null || true
      rm -rf .next/cache 2>/dev/null || true
    # Skip npm prune or exclude Prisma
    - npm prune --production || true
    # Ensure Prisma Client exists
    - ls -la node_modules/.prisma/client
    - ls -la node_modules/@prisma/client
```

**Option C: Explicitly preserve Prisma during prune**
```yaml
# amplify.yml
postBuild:
  commands:
    # Keep Prisma packages even after pruning
    - |
      npm prune --production
      npm install prisma @prisma/client --save
      npx prisma generate
```

### Solution 3: Verify Environment Variables
```bash
# AWS Amplify Console → Environment variables → Add/Edit:
DATABASE_URL=mongodb+srv://hamfulldesigns_db_user:POonbCrz55EnA36S@homeglazerdb.noif1b9.mongodb.net/homeglazerdb?appName=homeglazerdb
NEXT_PUBLIC_SITE_URL=https://main.d15nk5b2guin5u.amplifyapp.com
# ... all other variables from .env file
```

### Solution 4: Fix MongoDB Atlas Network Access
```bash
# MongoDB Atlas → Network Access → Add IP Address:
- Add: 0.0.0.0/0 (allow all) - for testing
- Or add specific AWS Amplify IP ranges
```

## Why Local Works But Production Fails

| Aspect | Local Development | Production (AWS Amplify) |
|--------|------------------|------------------------|
| **Dependencies** | All deps installed (dev + prod) | Only production deps after `npm prune` |
| **Prisma** | Generated via `npm install` postinstall | May be removed by `npm prune --production` |
| **Env Variables** | From `.env` file | Must be set in Amplify Console |
| **Database Access** | Your local IP is whitelisted | AWS IPs must be whitelisted |
| **Error Visibility** | Console logs visible | Need to check CloudWatch/Amplify logs |

## Next Steps

1. **Immediate Fix:**
   - Check AWS Amplify build logs for Prisma errors
   - Verify environment variables in Amplify Console
   - Test database connection using test endpoint

2. **Permanent Fix:**
   - Move `prisma` to `dependencies` in `package.json`
   - Or modify `amplify.yml` to preserve Prisma after npm prune
   - Verify deployment and test production API

3. **Verification:**
   ```bash
   # After deploying fix:
   curl https://main.d15nk5b2guin5u.amplifyapp.com/api/products
   # Should return JSON array of products, not HTML error page
   ```

## Related Files
- `/pages/api/products/index.ts` - Products API endpoint
- `/src/lib/prisma.ts` - Prisma client initialization
- `/amplify.yml` - AWS Amplify build configuration
- `/package.json` - Dependencies and scripts
- AWS Amplify Console - Environment variables
- MongoDB Atlas - Network access settings
