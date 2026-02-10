import type { NextApiRequest, NextApiResponse } from 'next';

// Manual validation function to avoid Zod webpack issues
function validateLogin(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.email || typeof data.email !== 'string' || data.email.trim() === '') {
    errors.push('Email is required');
  } else {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.push('Invalid email address');
    }
  }

  if (!data.password || typeof data.password !== 'string' || data.password.trim() === '') {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('🔵 STEP 1: Login handler called');
  console.log('  → Method:', req.method);
  console.log('  → URL:', req.url);

  if (req.method !== 'POST') {
    console.log('  ❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🟢 STEP 2: Starting login process');

    // Dynamically import modules to prevent module-level errors
    let prisma: any;
    let verifyPassword: any;
    let generateToken: any;

    console.log('🟡 STEP 3: Importing Prisma module...');
    try {
      const prismaModule = await import('@/lib/prisma');
      prisma = prismaModule.prisma;
      console.log('  ✅ Prisma imported successfully');
      console.log('  → Prisma instance:', prisma ? 'exists' : 'null');
    } catch (prismaError: any) {
      console.error('  ❌ Failed to import Prisma:', prismaError);
      console.error('  → Error message:', prismaError?.message);
      console.error('  → Error stack:', prismaError?.stack);
      return res.status(500).json({
        error: 'Database connection failed',
        message:
          process.env.NODE_ENV === 'development'
            ? prismaError?.message || 'Failed to initialize database connection. Check terminal for details.'
            : 'Failed to initialize database connection. Please check server logs.',
      });
    }

    console.log('🟡 STEP 4: Importing auth module...');
    try {
      const authModule = await import('@/lib/auth');
      verifyPassword = authModule.verifyPassword;
      generateToken = authModule.generateToken;
      console.log('  ✅ Auth utilities imported successfully');
      console.log('  → verifyPassword:', verifyPassword ? 'exists' : 'null');
      console.log('  → generateToken:', generateToken ? 'exists' : 'null');
    } catch (authError: any) {
      console.error('  ❌ Failed to import auth utilities:', authError);
      console.error('  → Error message:', authError?.message);
      console.error('  → Error stack:', authError?.stack);
      return res.status(500).json({
        error: 'Authentication service failed',
        message: 'Failed to initialize authentication. Please check server logs.',
      });
    }

    // Ensure all required modules are loaded
    if (!prisma) {
      console.error('  ❌ Prisma client not available');
      return res.status(500).json({
        error: 'Database connection failed',
        message: 'Prisma client not available. Please check server logs.',
      });
    }

    if (!verifyPassword || !generateToken) {
      console.error('  ❌ Auth utilities not available');
      return res.status(500).json({
        error: 'Authentication service failed',
        message: 'Auth utilities not available. Please check server logs.',
      });
    }

    console.log('🟡 STEP 5: Validating request body...');
    // Validate request body
    if (!req.body) {
      console.log('  ❌ Request body is missing');
      return res.status(400).json({
        error: 'Request body is required',
      });
    }

    console.log('  → Request body received:', typeof req.body);
    console.log('  → Body keys:', req.body ? Object.keys(req.body) : 'null');

    console.log('🟡 STEP 6: Running validation...');
    const validationResult = validateLogin(req.body);
    console.log('  → Validation result:', validationResult.isValid);
    if (!validationResult.isValid) {
      console.log('  ❌ Validation failed:', validationResult.errors);
      return res.status(400).json({
        error: 'Validation failed',
        details: validationResult.errors,
      });
    }

    const email = req.body.email.trim();
    const password = req.body.password;
    console.log('🟡 STEP 7: Extracting credentials');
    console.log('  → Email:', email);
    console.log('  → Password length:', password ? password.length : 0);

    // Find user
    console.log('🟡 STEP 8: Querying database for user...');
    let user;
    try {
      console.log('  → About to call prisma.user.findUnique');
      user = await prisma.user.findUnique({
        where: { email },
      });
      console.log('  ✅ Database query completed');
      console.log('  → User found:', user ? 'yes' : 'no');
      if (user) {
        console.log('  → User ID:', user.id);
        console.log('  → User email:', user.email);
      }
    } catch (dbError: any) {
      console.error('  ❌ Database query error:', dbError);
      console.error('  → Error code:', dbError?.code);
      console.error('  → Error message:', dbError?.message);
      console.error('  → Error stack:', dbError?.stack);
      console.error('  → Full error:', JSON.stringify(dbError, Object.getOwnPropertyNames(dbError), 2));
      return res.status(500).json({
        error: 'Database query failed',
        message: process.env.NODE_ENV === 'development' ? dbError?.message : undefined,
      });
    }

    if (!user) {
      console.log('  ❌ User not found for email:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('🟡 STEP 9: Verifying password...');
    // Verify password
    let isValidPassword = false;
    try {
      isValidPassword = await verifyPassword(password, user.passwordHash);
      console.log('  → Password verification result:', isValidPassword);
    } catch (verifyError: any) {
      console.error('  ❌ Password verification error:', verifyError);
      console.error('  → Error message:', verifyError?.message);
      console.error('  → Error stack:', verifyError?.stack);
      return res.status(500).json({
        error: 'Password verification failed',
        message: process.env.NODE_ENV === 'development' ? verifyError?.message : undefined,
      });
    }

    if (!isValidPassword) {
      console.log('  ❌ Invalid password');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('🟡 STEP 10: Generating token...');
    // Generate token
    let token: string;
    try {
      token = generateToken({
        userId: user.id,
        email: user.email,
      });
      console.log('  ✅ Token generated successfully');
      console.log('  → Token length:', token ? token.length : 0);
    } catch (tokenError: any) {
      console.error('  ❌ Token generation error:', tokenError);
      console.error('  → Error message:', tokenError?.message);
      console.error('  → Error stack:', tokenError?.stack);
      return res.status(500).json({
        error: 'Token generation failed',
        message: process.env.NODE_ENV === 'development' ? tokenError?.message : undefined,
      });
    }

    console.log('🟡 STEP 11: Setting cookie...');
    // Set httpOnly cookie
    try {
      res.setHeader(
        'Set-Cookie',
        `token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}; ${
          process.env.NODE_ENV === 'production' ? 'Secure;' : ''
        }`
      );
      console.log('  ✅ Cookie set successfully');
    } catch (cookieError: any) {
      console.error('  ❌ Cookie setting error:', cookieError);
      console.error('  → Error message:', cookieError?.message);
    }

    console.log('🟢 STEP 12: Login successful, returning response');
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error('❌ UNEXPECTED ERROR in login handler:');
    console.error('  → Error type:', error?.constructor?.name);
    console.error('  → Error message:', error?.message);
    console.error('  → Error stack:', error?.stack);
    console.error('  → Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error?.message : undefined,
    });
  }
}

