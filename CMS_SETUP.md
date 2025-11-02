# CMS System Setup Guide

This document provides instructions for setting up and using the CMS system for managing brands and products.

## ✅ Completed Components

### 1. Database Setup
- ✅ Prisma schema with Users, Brands, Products, and ProductRelatedProducts models
- ✅ Database migrations configured
- ✅ Seed script to migrate existing brands and products from `src/data/products.ts`

### 2. Authentication System
- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Login, logout, and session APIs
- ✅ Protected route middleware

### 3. API Routes
- ✅ Brand management APIs (`/api/brands`)
- ✅ Product management APIs (`/api/products`)
- ✅ Related products APIs (`/api/products/related-options`)
- ✅ Image upload API (`/api/upload`)
- ✅ Authentication APIs (`/api/auth/*`)

### 4. Admin Pages
- ✅ Admin login page (`/admin`)
- ✅ Dashboard (`/admin/dashboard`)
- ✅ Brands listing page (`/admin/brands`)
- ✅ Create brand page (`/admin/brands/new`)

### 5. Components
- ✅ ProtectedRoute component
- ✅ AdminLayout component

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
1. **Set up PostgreSQL database:**
   - Install PostgreSQL if not already installed
   - Create a new database: `createdb homeglazer`

2. **Configure environment variables:**
   Update `.env.local` with your database connection:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/homeglazer?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   ADMIN_EMAIL="admin@homeglazer.com"
   ADMIN_PASSWORD="admin123"
   ```

3. **Run database migrations:**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Seed the database:**
   ```bash
   npm run db:seed
   ```
   This will:
   - Create an admin user with the credentials from `.env.local`
   - Migrate all existing brands and products from `src/data/products.ts`
   - Create related product relationships

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Access Admin Panel
1. Navigate to `http://localhost:3000/admin`
2. Login with:
   - Email: `admin@homeglazer.com` (or from `.env.local`)
   - Password: `admin123` (or from `.env.local`)

## 📋 Remaining Tasks

### Admin Pages to Complete
- [ ] Brand edit page (`/admin/brands/[id]/edit`)
- [ ] Products listing page (`/admin/products`)
- [ ] Product create/edit pages (`/admin/products/new`, `/admin/products/[id]/edit`)
- [ ] Products by brand page (`/admin/brands/[id]/products`)

### UI Components to Create
- [ ] Brand form component (reusable for create/edit)
- [ ] Product form component with:
  - Brand selection
  - All product fields
  - Sheen level dropdown (Ultra Matt, Mat, Low Sheen, High Sheen)
  - Price inputs for quantities
  - Dynamic arrays for colors and features
  - JSON editor for specifications
  - Image upload component
  - Related products multi-select with search

### Frontend Integration
- [ ] Update `pages/products.tsx` to fetch from API instead of static data
- [ ] Create API fetch utilities (`lib/api/products.ts`, `lib/api/brands.ts`)
- [ ] Update product detail pages to use API data
- [ ] Add loading states and error handling

## 🗄️ Database Schema

### Users Table
- Single admin user with email and hashed password

### Brands Table
- id, name, slug, logo, description
- Unique constraint on slug

### Products Table
- id, brandId (FK), name, slug, description, shortDescription, category
- sheenLevel, surfaceType, usage, image
- prices (JSON), colors (JSON array), features (JSON array), specifications (JSON object)
- Unique constraint on (brandId, slug)
- Foreign key cascade delete on brandId

### ProductRelatedProducts Table
- Many-to-many relationship for related products
- Self-referencing with unique constraint on (productId, relatedProductId)

## 🔒 Security Features
- JWT-based authentication
- HttpOnly cookies for tokens
- Password hashing with bcryptjs
- Protected API routes with middleware
- Input validation with Zod
- SQL injection protection via Prisma ORM

## 📝 Notes
- All technologies used are free and open source for commercial use
- Image uploads are stored in `/public/uploads/brands/` and `/public/uploads/products/`
- The seed script preserves existing product relationships based on brandId and sheenLevel matching
- Admin credentials should be changed in production

## 🚀 Next Steps
1. Complete the remaining admin pages (brand edit, product CRUD)
2. Create reusable form components
3. Integrate frontend with API endpoints
4. Add validation and error handling
5. Test all CRUD operations
6. Deploy and configure production database

