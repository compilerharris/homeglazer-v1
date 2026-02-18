# Database Connection Troubleshooting

This project uses **MongoDB** as the database. The Prisma schema is configured for MongoDB Atlas.

---

## MongoDB Setup

### Local development

1. Create a MongoDB Atlas cluster (free tier) or use a local MongoDB instance.
2. Get your connection string: `mongodb+srv://user:pass@cluster.mongodb.net/homeglazer?retryWrites=true&w=majority`
3. In `.env.local`:
   ```
   DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/homeglazer?retryWrites=true&w=majority"
   JWT_SECRET="your-jwt-secret"
   ```
4. Push schema: `npx prisma db push`
5. Seed: `npm run db:seed`
6. Create admin: `npx tsx scripts/create-admin.ts`

### Verify the connection

```bash
npx prisma db pull
```

If it succeeds, the database is reachable.

---

## Migrating from PostgreSQL to MongoDB

If you have existing data in PostgreSQL (e.g. Vercel Postgres):

1. Set both URLs in `.env.local`:
   ```
   SOURCE_DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
   DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/homeglazer?retryWrites=true&w=majority"
   ```
2. Run the migration:
   ```bash
   npm run db:migrate-to-mongo
   ```
3. Use `--dry-run` to preview without writing: `npm run db:migrate-to-mongo -- --dry-run`
4. Use `--clear` to truncate MongoDB before insert: `npm run db:migrate-to-mongo -- --clear`
5. After migration, update production `DATABASE_URL` to the MongoDB URL and redeploy.

---

## PostgreSQL SSL (migration only)

When migrating from cloud PostgreSQL (Vercel Postgres, AWS RDS, etc.), you may see:

> Error opening a TLS connection: bad certificate format

Add `sslaccept=accept_invalid_certs` to `SOURCE_DATABASE_URL`:

```
SOURCE_DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require&sslaccept=accept_invalid_certs"
```

The migration script automatically appends this when it detects `sslmode=` in the URL.

---

## If you're on AWS Amplify (deployed site)

1. Add `DATABASE_URL` (MongoDB connection string) in Amplify Console → Environment variables.
2. Ensure the build uses `prisma db push` (see `scripts/build.sh`).
3. Redeploy after changing `DATABASE_URL`.
