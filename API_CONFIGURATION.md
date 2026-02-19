# API Configuration Guide

## How API Calls Work

The application uses environment-aware API calls that automatically adapt to different environments:

### 1. **Local Development** (default)
- When running `npm run dev`, API calls use `http://localhost:3000`
- Works automatically without any configuration

### 2. **Production Deployment** (AWS Amplify)
- When deployed to AWS Amplify, API calls use the production URL from `NEXT_PUBLIC_SITE_URL`
- Set in `.env` file: `NEXT_PUBLIC_SITE_URL="https://main.d15nk5b2guin5u.amplifyapp.com"`
- Also configured in AWS Amplify Console → Environment variables

### 3. **Integration Testing** (optional)
- To test against production API while developing locally, set:
  ```bash
  NEXT_PUBLIC_API_URL="https://main.d15nk5b2guin5u.amplifyapp.com"
  ```
- This overrides the automatic detection and forces all API calls to the specified URL

## Priority Order

The `getApiBaseUrl()` function uses this priority:

1. **NEXT_PUBLIC_API_URL** (if set) - for integration testing
2. **window.location.origin** (in browser) - automatic detection
3. **NEXT_PUBLIC_SITE_URL** (from .env) - for SSR in production
4. **http://localhost:3000** (fallback) - for local development

## Environment Variables

### Required in Production (.env and AWS Amplify)

```bash
# Production site URL - used for API calls in SSR
NEXT_PUBLIC_SITE_URL="https://main.d15nk5b2guin5u.amplifyapp.com"

# Database connection
DATABASE_URL="mongodb+srv://..."

# Other production variables...
```

### Optional for Integration Testing

```bash
# Force API calls to specific URL (local .env only)
NEXT_PUBLIC_API_URL="https://main.d15nk5b2guin5u.amplifyapp.com"
```

## Testing Scenarios

### Test Local Development
```bash
# Remove NEXT_PUBLIC_API_URL if set
npm run dev
# Visit http://localhost:3000/products
# Should load products from local API
```

### Test Integration with Production API
```bash
# Add to .env.local (don't commit)
echo 'NEXT_PUBLIC_API_URL="https://main.d15nk5b2guin5u.amplifyapp.com"' >> .env.local

npm run dev
# Visit http://localhost:3000/products
# Should load products from production API
```

### Test Production Build Locally
```bash
npm run build
npm start
# Visit http://localhost:3000/products
# Should load products from local API
```

## Troubleshooting

### Products not loading locally?
1. Check if dev server is running: `npm run dev`
2. Verify `.env` doesn't have `NEXT_PUBLIC_API_URL` set
3. Check terminal for API errors
4. Test API directly: `curl http://localhost:3000/api/products`

### Products not loading in production?
1. Verify `NEXT_PUBLIC_SITE_URL` is set in AWS Amplify environment variables
2. Check that `DATABASE_URL` is configured
3. Review AWS Amplify build logs
4. Check browser console for errors

### Integration testing not working?
1. Verify `NEXT_PUBLIC_API_URL` is set in `.env.local`
2. Restart dev server after changing env vars
3. Check that production API is accessible
4. Verify CORS settings if getting cross-origin errors

## Files Modified

- `/src/lib/api.ts` - Contains `getApiBaseUrl()` function
- `/.env` - Contains production environment variables
- This guide - `API_CONFIGURATION.md`

## Best Practices

1. **Never commit** `.env.local` with `NEXT_PUBLIC_API_URL` to git
2. **Always set** `NEXT_PUBLIC_SITE_URL` in production environment
3. **Use environment variables** in AWS Amplify Console, not hardcoded in amplify.yml
4. **Test locally** before deploying to production
5. **Remove** `NEXT_PUBLIC_API_URL` after integration testing

## Related Files

- `/src/lib/api.ts` - API client functions
- `/pages/api/products/index.ts` - Products API endpoint
- `/pages/api/brands/index.ts` - Brands API endpoint
- `/.env` - Environment variables (local)
- AWS Amplify Console → Environment variables (production)
