const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('./prisma/dev.db');

const email = process.env.ADMIN_EMAIL || 'admin@homeglazer.com';
const password = process.env.ADMIN_PASSWORD || 'admin123';

// Check if user exists
const existing = db.prepare('SELECT * FROM User WHERE email = ?').get(email);

if (existing) {
  console.log('✅ Admin user already exists!');
  console.log(`ID: ${existing.id}`);
  console.log(`Email: ${existing.email}`);
  db.close();
  process.exit(0);
}

// Hash password
const passwordHash = bcrypt.hashSync(password, 10);

// Create admin user
try {
  const result = db.prepare(`
    INSERT INTO User (id, email, passwordHash, createdAt, updatedAt)
    VALUES (?, ?, ?, datetime('now'), datetime('now'))
  `).run(
    `user_${Date.now()}`,
    email,
    passwordHash
  );

  console.log('✅ Admin user created successfully!');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

db.close();

