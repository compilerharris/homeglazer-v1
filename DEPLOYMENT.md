# Vercel Deployment Guide

## Prerequisites
- A GitHub, GitLab, or Bitbucket account
- Your project code pushed to a Git repository
- A Vercel account (free tier available)

## Step 1: Push Your Code to Git

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub/GitLab/Bitbucket**:
   ```bash
   # Create a new repository on GitHub/GitLab/Bitbucket first
   git remote add origin https://github.com/yourusername/homeglazer-v1.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Create Vercel Account & Connect Project

1. **Go to Vercel**: https://vercel.com
2. **Sign up** (or log in) - You can use GitHub/GitLab/Bitbucket to sign in
3. **Click "Add New Project"**
4. **Import your repository**:
   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Authorize Vercel to access your repositories
   - Find and select `homeglazer-v1` repository
   - Click "Import"

## Step 3: Configure Project Settings

In the "Configure Project" screen:

1. **Project Name**: Keep default or change to `homeglazer`
2. **Framework Preset**: Should auto-detect "Next.js" - keep it
3. **Root Directory**: Leave as `./` (default)
4. **Build Command**: Leave as `npm run build` (default)
5. **Output Directory**: Leave as `.next` (default)
6. **Install Command**: Leave as `npm install` (default)
7. **DO NOT DEPLOY YET** - We need to set up the database first!

## Step 4: Set Up Vercel Postgres Database

1. **In Vercel Dashboard**, go to your project
2. **Click "Storage" tab** (in the top navigation)
3. **Click "Create Database"**
4. **Select "Postgres"**
5. **Configure Database**:
   - Database Name: `homeglazer` (or your preferred name)
   - Region: Choose closest to you (e.g., `iad1` for US East)
   - Click "Create"
6. **Wait for database creation** (takes ~30 seconds)
7. **Vercel automatically adds `DATABASE_URL`** as an environment variable - this is done for you!

## Step 5: Add Environment Variables

1. **Go to Project Settings** (gear icon in your project dashboard)
2. **Click "Environment Variables"** (left sidebar)
3. **Add `JWT_SECRET`**:
   - Click "Add New"
   - Key: `JWT_SECRET`
   - Value: Generate a secure random string (see below)
   - Select all environments: Production, Preview, Development
   - Click "Save"

**Generate JWT Secret** (run this command locally):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste it as the `JWT_SECRET` value.

## Step 6: Run Database Migrations

After the first deployment, you need to run migrations:

### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Link your project**:
   ```bash
   vercel link
   ```
   - Select your project when prompted

4. **Pull environment variables**:
   ```bash
   vercel env pull .env.local
   ```

5. **Run migrations**:
   ```bash
   npm run db:migrate:deploy
   ```

### Option B: Using Vercel Dashboard (Post Deploy Hook)

1. After first deployment, go to **Project Settings** → **Git**
2. Scroll to **Deploy Hooks**
3. Or manually run migrations after first deployment

## Step 7: Deploy

1. **Go back to your project** in Vercel dashboard
2. **Click "Deploy"** (if you haven't already)
3. **Wait for deployment** (~2-3 minutes)
4. **Check build logs** for any errors

## Step 8: Verify Deployment

1. **Visit your deployment URL**: `https://your-project.vercel.app`
2. **Test admin login**: Go to `/admin` and try logging in
3. **Test products page**: Go to `/products`
4. **Check for errors** in Vercel dashboard → Deployments → [Latest] → Logs

## Troubleshooting

### Database Connection Errors
- Verify `DATABASE_URL` is set in Environment Variables
- Check that migrations have been run
- Verify database is active in Storage tab

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel auto-detects, but you can set it in settings)

### Authentication Errors
- Verify `JWT_SECRET` is set in all environments
- Check that admin user exists in database

## Quick Commands Reference

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migrations
npm run db:migrate:deploy

# Deploy
vercel

# View logs
vercel logs
```

## Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Ensure database migrations have run
4. Check that database is accessible

