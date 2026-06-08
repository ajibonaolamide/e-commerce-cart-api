const prisma = require('./prisma/client');

async function test() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully ✅");
  } catch (err) {
    console.error("DB connection failed ❌", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
