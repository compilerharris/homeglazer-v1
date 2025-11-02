# HardReload Project

Welcome! This project has been developed by [HardReload](https://searchmaar.com/hardreload).

## Getting started

> **Prerequisites:**
> The following steps require [NodeJS](https://nodejs.org/en/) to be installed on your system, so please
> Install it beforehand if you haven't already.

### 1. Install Dependencies

First, install the project dependencies:

```bash
npm install
```

### 2. Database Setup

This project uses PostgreSQL for the database. You'll need to configure the database connection.

#### Local Development

1. **Set up PostgreSQL locally** or use a cloud PostgreSQL instance
2. **Create a `.env.local` file** in the root directory:
   ```bash
   cp .env.example .env.local
   ```
3. **Update `DATABASE_URL`** in `.env.local` with your database connection string:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/homeglazer?schema=public"
   ```

#### Production (Vercel)

**Option 1: Vercel Postgres (Recommended)**

1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → Select **Postgres**
4. Vercel will automatically add `DATABASE_URL` as an environment variable
5. Copy the connection string if needed

**Option 2: External PostgreSQL Provider**

1. Set up a PostgreSQL database with any provider (Supabase, Neon, Railway, etc.)
2. Get the connection string
3. Add `DATABASE_URL` to Vercel environment variables:
   - Go to **Project Settings** → **Environment Variables**
   - Add `DATABASE_URL` with your connection string
   - Select all environments (Production, Preview, Development)

### 3. Run Database Migrations

After setting up the database, run the migrations:

```bash
# For development
npm run db:migrate

# For production (Vercel)
npm run db:migrate:deploy
```

### 4. Start Development Server

```bash
npm run dev
```

After a few seconds, your project should be accessible at:
[http://localhost:3000/](http://localhost:3000/)

### 5. Build for Production

```bash
npm run build
```

### Additional Commands

```bash
# Generate Prisma Client
npm run db:generate

# Seed the database (if seed script exists)
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

## Deployment

### Deploying to Vercel

1. **Set up Vercel Postgres** (recommended):
   - Go to your Vercel project → Storage → Create Postgres database
   - Vercel automatically configures `DATABASE_URL`

2. **Or configure external database**:
   - Add `DATABASE_URL` in Vercel environment variables

3. **Run migrations**:
   - Add a build command or use Vercel's Post Deploy hook
   - Or manually run: `npm run db:migrate:deploy`

4. **Deploy**:
   - Push to your connected Git repository
   - Vercel will automatically deploy

## Learn More

To learn more about Next.js and React, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Features, API references, and guides.
- [React Documentation](https://reactjs.org/docs/getting-started.html) - Learn about React fundamentals.
- [Prisma Documentation](https://www.prisma.io/docs) - Database toolkit documentation.
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) - Vercel Postgres documentation.

## Stay in touch

- LinkedIn - [@linkedin-compilerharris](https://www.linkedin.com/in/compilerharris)
- Medium - [@medium-compilerharris](https://medium.com/@compilerharris)
- Twitter - [@compilerharris](https://twitter.com/compilerharris)

## Author

Haris Shaikh
