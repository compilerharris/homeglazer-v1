const { PrismaClient } = require('../node_modules/.prisma/client');
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@homeglazer.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  console.log('Creating admin user...');
  console.log(`Email: ${email}`);

  // Check if admin exists
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log('Admin user already exists!');
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
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

