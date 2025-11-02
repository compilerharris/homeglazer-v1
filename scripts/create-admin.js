const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@homeglazer.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  console.log('Creating admin user...');
  console.log(`Email: ${email}`);

  try {
    // Check if admin exists
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      console.log('✅ Admin user already exists!');
      console.log(`ID: ${existing.id}`);
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log(`ID: ${admin.id}`);
    console.log(`Email: ${admin.email}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });

