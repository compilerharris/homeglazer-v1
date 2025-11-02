# CMS Testing Guide

## Quick Start Testing (Step by Step)

### Option 1: Use SQLite for Quick Testing (Recommended for first test)

If you don't have PostgreSQL set up, we can quickly test with SQLite:

1. **Update Prisma schema temporarily:**
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

2. **Then run:**
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

### Option 2: Use PostgreSQL (Production-ready)

1. **Install PostgreSQL** (if not installed):
   - macOS: `brew install postgresql@14`
   - Or download from: https://www.postgresql.org/download/

2. **Start PostgreSQL:**
   ```bash
   # macOS with Homebrew
   brew services start postgresql@14
   ```

3. **Create database:**
   ```bash
   createdb homeglazer
   # Or using psql:
   # psql postgres
   # CREATE DATABASE homeglazer;
   # \q
   ```

4. **Update .env file:**
   ```env
   DATABASE_URL="postgresql://YOUR_USERNAME@localhost:5432/homeglazer?schema=public"
   ```
   Replace `YOUR_USERNAME` with your PostgreSQL username (usually your system username on macOS).

5. **Run setup:**
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

## Testing Steps

### 1. Generate Prisma Client
```bash
npm run db:generate
```

### 2. Run Database Migrations
```bash
npm run db:migrate
```
This will:
- Create all database tables
- Set up relationships and constraints
- Ask for a migration name (you can enter "init")

### 3. Seed the Database
```bash
npm run db:seed
```
This will:
- Create admin user (credentials from .env.local)
- Migrate all existing brands from `src/data/products.ts`
- Migrate all existing products from `src/data/products.ts`
- Create product relationships

### 4. Start Development Server
```bash
npm run dev
```

### 5. Test Admin Login
1. Open browser: `http://localhost:3000/admin`
2. Login with:
   - Email: `admin@homeglazer.com` (or from .env.local)
   - Password: `admin123` (or from .env.local)

### 6. Test Features

**Admin Dashboard:**
- Navigate to `/admin/dashboard`
- Should show stats for brands and products

**Brands Management:**
- Navigate to `/admin/brands`
- Should list all brands
- Click "Add Brand" to create a new brand
- Fill in the form and submit

**Products (Coming Soon):**
- Product management pages need to be completed
- But you can test the API directly

## Testing API Endpoints

You can test APIs directly using curl or Postman:

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@homeglazer.com","password":"admin123"}' \
  -c cookies.txt
```

### Test Get Brands (requires authentication cookie)
```bash
curl http://localhost:3000/api/brands -b cookies.txt
```

### Test Get Products
```bash
curl http://localhost:3000/api/products -b cookies.txt
```

## Common Issues

### Issue: "Missing required environment variable: DATABASE_URL"
**Solution:** Make sure `.env` file exists with DATABASE_URL (Prisma reads from .env, not .env.local)

### Issue: "Error: P1001: Can't reach database server"
**Solution:** 
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env matches your PostgreSQL setup
- Check username and database name

### Issue: "Error: P1000: Authentication failed"
**Solution:** 
- Verify PostgreSQL username in DATABASE_URL
- Check if password is required (add to connection string)

### Issue: Seed script fails
**Solution:**
- Make sure migrations have run first (`npm run db:migrate`)
- Check that database connection is working
- Verify `src/data/products.ts` has valid data

## Database Studio (Optional)

You can view/edit data using Prisma Studio:
```bash
npm run db:studio
```

Then open: `http://localhost:5555`

## Next Steps After Testing

Once basic testing works:
1. Complete remaining admin pages (brand edit, product CRUD)
2. Add product form components
3. Integrate frontend to use API instead of static data
4. Add validation and error handling
5. Test all CRUD operations end-to-end

