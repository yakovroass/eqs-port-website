import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "changeme";
  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters (set in .env).");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { username },
    create: { username, passwordHash, isAdmin: true, active: true },
    update: { passwordHash, isAdmin: true, active: true },
  });
  console.log(`Seeded admin user "${username}".`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
