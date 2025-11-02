const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function verifyAdmin() {
  const email = 'admin@homeglazer.com';
  const password = 'admin123';
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      console.log('❌ Admin user not found');
      return;
    }
    
    console.log('✅ Admin user found:');
    console.log(`  ID: ${user.id}`);
    console.log(`  Email: ${user.email}`);
    
    // Test password verification
    const isValid = await bcrypt.compare(password, user.passwordHash);
    console.log(`  Password verification: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    
    if (!isValid) {
      console.log('⚠️  Password mismatch! Regenerating password hash...');
      const newHash = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: newHash },
      });
      console.log('✅ Password hash updated!');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyAdmin();

