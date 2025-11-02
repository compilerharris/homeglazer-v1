import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyPassword, generateToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Ensure all required modules are loaded
    if (!prisma) {
      console.error('Prisma client not available');
      return res.status(500).json({
        error: 'Database connection failed',
        message: 'Prisma client not available. Please check server logs.',
      });
    }

    if (!verifyPassword || !generateToken) {
      console.error('Auth utilities not available');
      return res.status(500).json({
        error: 'Authentication service failed',
        message: 'Auth utilities not available. Please check server logs.',
      });
    }

    // Validate request body
    if (!req.body) {
      return res.status(400).json({
        error: 'Request body is required',
      });
    }

    const validationResult = validateLogin(req.body);
    if (!validationResult.isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validationResult.errors,
      });
    }

    const email = req.body.email.trim();
    const password = req.body.password;

    // Find user
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email },
      });
    } catch (dbError: any) {
      console.error('Database query error:', dbError);
      console.error('Error code:', dbError?.code);
      console.error('Error message:', dbError?.message);
      return res.status(500).json({
        error: 'Database query failed',
        message: process.env.NODE_ENV === 'development' ? dbError?.message : undefined,
      });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Set httpOnly cookie
    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}; ${
        process.env.NODE_ENV === 'production' ? 'Secure;' : ''
      }`
    );

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    console.error('Error stack:', error?.stack);
    console.error('Error message:', error?.message);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error?.message : undefined,
    });
  }
}

