import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const username = (process.env.ADMIN_USERNAME || "ADMIN").trim();
  const password = (process.env.ADMIN_PASSWORD || "changeme").trim();
  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters (set in .env).");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const existing = await prisma.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
    select: { id: true },
  });
  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: { passwordHash, isAdmin: true, active: true },
    });
  } else {
    await prisma.user.create({
      data: { username, passwordHash, isAdmin: true, active: true },
    });
  }
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
