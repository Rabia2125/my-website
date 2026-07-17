const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');

// 1. Supabase Client Setup (Apni keys .env se lein)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Yeh 'service_role' key hai, isliye admin access milega
);

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin123'; // Yahan apna password rakhein

  console.log('Seeding Admin User...');

  // 2. Supabase Auth mein user create karein
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
  });

  if (authError) {
    console.error('Error creating Auth user:', authError.message);
    return;
  }

  // 3. Apni 'User' table mein role update karein
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: 'ADMIN' },
    create: {
      id: authData.user.id, // Auth ka ID yahan use karein
      email: adminEmail,
      password: 'hashed_in_supabase_auth', // Password ab Auth sambhalega
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin created in Auth and User table:', admin.email);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());