import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

/**
 * Run locally with the same DATABASE_URL / ADMIN_* as Amplify:
 *   npx tsx scripts/verify-admin.ts
 */
async function main() {
  if (!process.env.DATABASE_URL?.trim()) {
    console.error("DATABASE_URL is missing or empty.");
    process.exit(1);
  }
  const username = (process.env.ADMIN_USERNAME || "ADMIN").trim();
  const password = (process.env.ADMIN_PASSWORD || "").trim();
  if (!password) {
    console.error("ADMIN_PASSWORD is missing or empty.");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("ADMIN_PASSWORD must be at least 8 characters (same rule as seed).");
    process.exit(1);
  }

  let userCount = 0;
  try {
    userCount = await prisma.user.count();
  } catch (e) {
    console.error("Cannot reach database:", e instanceof Error ? e.message : e);
    process.exit(1);
  }

  const candidates = await prisma.user.findMany({
    where: { username: { equals: username, mode: "insensitive" }, active: true },
    select: { id: true, username: true, passwordHash: true },
  });

  console.log(`Users in DB (total): ${userCount}`);
  console.log(`Matching "${username}" (active, case-insensitive): ${candidates.length} row(s)`);

  if (candidates.length === 0) {
    console.error(
      "No matching admin user. Run: npm run db:seed (with ADMIN_USERNAME / ADMIN_PASSWORD set)."
    );
    process.exit(1);
  }

  let match = false;
  for (const u of candidates) {
    if (await bcrypt.compare(password, u.passwordHash)) {
      match = true;
      console.log(`Password OK for stored username "${u.username}" (id ${u.id}).`);
      break;
    }
  }
  if (!match) {
    console.error(
      "Password does NOT match any stored hash for that username. Re-run seed with the password you want, or fix ADMIN_PASSWORD in env."
    );
    process.exit(1);
  }
  console.log("Verify OK — same check as production login.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
