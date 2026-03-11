image.png# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a **Next.js 14** (Pages Router) application called **HomeGlazer** — a painting services website with product catalog, colour visualiser, budget calculator, blog, and admin panel. Single `package.json`, not a monorepo.

### Tech Stack

- **Runtime**: Node.js 20 (see `.nvmrc`)
- **Package manager**: npm (see `package-lock.json`)
- **Framework**: Next.js 14 with TypeScript
- **Database**: MongoDB via Prisma ORM (`prisma/schema.prisma` uses `mongodb` provider)
- **Auth**: Custom JWT + bcryptjs (cookie-based)

### Running the App

- `npm run dev` — starts Next.js dev server on port 3000
- The `DATABASE_URL` environment variable is pre-configured as a secret pointing to MongoDB Atlas

### Database

- Prisma config is in `prisma.config.js` — it loads `.env` via `dotenv/config`, but the `DATABASE_URL` environment variable (injected as a secret) takes precedence over any `.env` file
- `npx prisma db push` syncs the schema with MongoDB (no SQL migrations for MongoDB)
- `npx prisma db seed` seeds brands, products, and an admin user (`admin@homeglazer.com` / `admin123`)
- `npx prisma studio` opens a database GUI on port 5555

### Important Caveats

- **No ESLint or test framework configured**: The project has no `lint` or `test` scripts in `package.json`, and no `.eslintrc` config. Use `npx tsc --noEmit` for type checking.
- **Prisma config reads `.env` not `.env.local`**: The `prisma.config.js` uses `require('dotenv/config')` which reads `.env`, but the shell-injected `DATABASE_URL` env var takes priority over both. Next.js reads `.env.local` for its own env vars.
- **MongoDB required**: The Prisma schema targets `mongodb`. A local `mongod` or MongoDB Atlas connection is required. MongoDB 7.0 is installed on this VM at `/usr/bin/mongod`.
- **`next.config.js` requires `wp-redirects.json`**: This file must exist at the repo root (it already does).
- **`postinstall` runs `prisma generate`**: Running `npm install` automatically generates the Prisma client.
- **Admin panel**: Available at `/admin/login` with credentials from the seed script.
- **Start MongoDB locally**: `sudo mongod --dbpath /data/db --fork --logpath /var/log/mongodb/mongod.log` (only needed if `DATABASE_URL` points to localhost).
