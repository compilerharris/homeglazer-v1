# Run PostgreSQL to MongoDB Migration

## Status

- **PostgreSQL source**: Connected successfully (1 user read)
- **MongoDB target**: Requires MongoDB Atlas connection string

## Steps to Complete Migration

### 1. Create MongoDB Atlas cluster (if needed)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and sign up
2. Create a **free M0 cluster** (US East or your region)
3. Create a **database user** (username + password)
4. **Network access**: Add `0.0.0.0/0` (allow from anywhere)
5. Get your **connection string**:  
   `mongodb+srv://USER:PASS@cluster.mongodb.net/homeglazer?retryWrites=true&w=majority`  
   Replace `USER` and `PASS` with your credentials. URL-encode the password if it has special chars.

### 2. Add to .env.local

Add this line to `.env.local` (or uncomment and fill in):

```
DATABASE_URL="mongodb+srv://USER:PASS@cluster.mongodb.net/homeglazer?retryWrites=true&w=majority"
```

`SOURCE_DATABASE_URL` is already set (PostgreSQL from Vercel).

### 3. Run the migration

```bash
npm run db:migrate-to-mongo
```

For a clean target (truncate MongoDB first):

```bash
npm run db:migrate-to-mongo -- --clear
```

### 4. After migration – Amplify (required for products to appear)

1. **Amplify Console** → Your app → **Environment variables**
2. Set `DATABASE_URL` = your MongoDB Atlas connection string (same as in .env.local)
3. Remove any old `POSTGRES_URL` or `PRISMA_DATABASE_URL` if present
4. **Redeploy** (trigger new build) – env vars are loaded at build time
5. CMS and frontend require no code changes

**Note:** Committed `.env.production` no longer contains DATABASE_URL. Amplify must have it set in Console.
